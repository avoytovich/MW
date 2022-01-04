import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import StoreDetailsView from './StoreDetailsView';
import CustomerStatusLabel from '../../components/utils/CustomerStatusLabel';

import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import {
  storeRequiredFields,
  structureSelectOptions,
} from '../../services/helpers/dataStructuring';
import { getCustomerName } from '../../services/helpers/customersHelper';
import localization from '../../localization';
import parentPaths from '../../services/paths';
import {
  formDesignOptions,
  structureResources,
  checkLabelDuplicate,
  checkExistingLabelsUrl,
  formatBeforeSending,
  checkGroupFields,
  tabLabels,
} from './utils';

import api from '../../api';

const StoreDetailsScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const [customerName, setCustomerName] = useState(null);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const [currentStoreResources, setCurrentStoreResources] = useState([]);
  const [storeResources, setStoreResources] = useState([]);
  const [resourcesHasChanges, setResourcesHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [curTab, setCurTab] = useState(0);
  const { id } = useParams();
  const [storeHasChanges, setStoreChanges] = useState(false);
  const [selectOptions, setSelectOptions] = useState({
    customers: null,
    font: null,
    theme: null,
    paymentMethods: null,
    layout: null,
    translation: null,
  });
  const [storeData, setStoreData] = useState(null);
  const [currentStoreData, setCurrentStoreData] = useState(null);

  const [currentCustomerData, setCurrentCustomerData] = useState(null);
  const getCustomersIdsArray = (...array) => {
    const res = [];
    array.forEach((item) => {
      const customerId = `id=${item.customerId}`;
      if (!res.includes(customerId)) {
        res.push(customerId);
      }
    });
    return res;
  };
  const handleDisabledSave = (currentStoreData?.externalContextAlias
    && !!currentStoreData?.externalContextGenerationParams.length)
    || !currentStoreData?.name
    || !currentStoreData?.defaultLocale
    || !currentStoreData?.displayName
    || !currentStoreData?.routes[0].hostname
    || Object.keys(errors).length > 0
    || (Object.keys(currentStoreData.thankYouDesc).length > 1 && currentStoreData.thankYouDesc[currentStoreData.defaultLocale] === '');

  const beforeSend = () => {
    const updatedData = formatBeforeSending(
      currentStoreData,
      currentStoreResources,
      resourcesHasChanges,
    );
    return updatedData;
  };

  useEffect(() => {
    let isCancelled = false;

    let fetchedData;

    if (id === 'add') {
      fetchedData = Promise.resolve({
        data: {
          customerId: nxState?.selectedCustomer?.id,
        },
      });
    } else {
      fetchedData = api.getStoreById(id);
    }

    fetchedData.then(({ data: store }) => {
      if (!isCancelled) {
        const checkedStore = storeRequiredFields(store);
        const resourcesArray = structureResources(store);
        setStoreResources(JSON.parse(JSON.stringify(resourcesArray)));
        setCurrentStoreResources(
          JSON.parse(JSON.stringify(resourcesArray)),
        );
        setStoreData(checkedStore);
        setCurrentStoreData(checkedStore);
        if (store?.customerId) {
          api.getCustomerById(store?.customerId)
            .then(({ data: customer }) => {
              setCurrentCustomerData(customer);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }

        Promise.allSettled([
          api.getDesignsThemes(),
          api.getDesignsFonts(),
          api.getDesignsLayouts(),
          api.getDesignsTranslations(),
          api.getPaymentMethodsOptions(),
        ]).then(
          ([
            themeOptions,
            fontOptions,
            layoutOptions,
            translationOptions,
            paymentMethodsOptions,
          ]) => {
            const customersIds = getCustomersIdsArray(
              ...fontOptions?.value?.data?.items || [],
              ...themeOptions?.value?.data?.items || [],
              ...layoutOptions?.value?.data?.items || [],
              ...translationOptions?.value?.data?.items || [],
            );

            api
              .getCustomersByIds(customersIds.join('&'))
              .then(({ data: customers }) => {
                setSelectOptions({
                  ...selectOptions,
                  customers: customers.items,
                  font: formDesignOptions(
                    fontOptions.value?.data.items,
                    customers.items,
                  ),
                  theme: formDesignOptions(
                    themeOptions.value?.data.items,
                    customers.items,
                  ),
                  paymentMethods: structureSelectOptions(
                    paymentMethodsOptions.value?.data,
                    'id',
                  ),
                  layout: formDesignOptions(
                    layoutOptions.value?.data.items,
                    customers.items,
                  ),
                  translation: formDesignOptions(
                    translationOptions.value?.data.items,
                    customers.items,
                  ),
                });
              });
          },
        );
      }
    })
      .catch(() => setLoading(false));

    return () => {
      isCancelled = true;
    };
  }, [update]);

  useEffect(() => {
    setResourcesHasChanges(
      JSON.stringify(currentStoreResources) !== JSON.stringify(storeResources),
    );
    return () => {
      setResourcesHasChanges(false);
    };
  }, [currentStoreResources]);

  useEffect(() => {
    setStoreChanges(
      JSON.stringify(currentStoreData) !== JSON.stringify(storeData),
    );
    return () => {
      setStoreChanges(false);
    };
  }, [currentStoreData, storeData]);

  useEffect(() => {
    if (currentCustomerData?.id) {
      getCustomerName(currentCustomerData?.id).then((name) => setCustomerName(name));
    }
  }, [currentCustomerData?.id]);

  const validation = () => {
    if (checkExistingLabelsUrl(currentStoreResources)) {
      if (!checkLabelDuplicate(currentStoreResources)) {
        if (!checkGroupFields(currentStoreData)) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <DetailPageWrapper
      nxState={nxState}
      headerTitleCopy={storeData?.id}
      id={id}
      name={id !== 'add' ? `${storeData?.name} - ${storeData?.id}` : `${localization.t('general.new')} ${localization.t(
        'general.store',
      )}`}
      saveIsDisabled={validation() || handleDisabledSave}
      hasChanges={storeHasChanges || resourcesHasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.stores}
      curData={currentStoreData}
      addFunc={api.addNewStore}
      updateFunc={api.updateStoreById}
      beforeSend={beforeSend}
      setUpdate={setUpdate}
      tabs={{
        setCurTab,
        curTab,
        tabLabels,
      }}
      extraHeader={(
        <CustomerStatusLabel
          customer={currentCustomerData}
        />
      )}
    >
      <StoreDetailsView
        errors={errors}
        setErrors={setErrors}
        currentStoreData={currentStoreData}
        selectOptions={selectOptions}
        setCurrentStoreData={setCurrentStoreData}
        currentStoreResources={currentStoreResources}
        setCurrentStoreResources={setCurrentStoreResources}
        curTab={curTab}
      />
    </DetailPageWrapper>
  );
};

export default StoreDetailsScreen;
