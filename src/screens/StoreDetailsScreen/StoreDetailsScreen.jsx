import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
import { setHeaderCustomerName } from '../../redux/actions/TableData';

const StoreDetailsScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const [customerName, setCustomerName] = useState(null);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const [localizedErrors, setLocalizedErrors] = useState({});

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
  const [isRankingOpen, setIsRankingOpen] = useState(false);

  const myRefGeneral = useRef(null);
  const myRefDesign = useRef(null);
  const myRefPayment = useRef(null);
  const myRefLocalizedContent = useRef(null);

  const refScrool = [
    myRefGeneral,
    myRefDesign,
    myRefPayment,
    myRefLocalizedContent,
  ];

  const dispatch = useDispatch();

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
  const checkThankYouDesc = () => {
    const res = Object.keys(currentStoreData.thankYouDesc)
      .filter((it) => !!currentStoreData.thankYouDesc[it].deliveryRemark);
    return res.length > 0 && !currentStoreData.thankYouDesc[currentStoreData.defaultLocale];
  };
  const handleDisabledSave = (currentStoreData?.externalContextAlias
    && !!currentStoreData?.externalContextGenerationParams.length)
    || !currentStoreData?.name
    || !currentStoreData?.defaultLocale
    || !currentStoreData?.displayName
    || !currentStoreData?.routes[0]?.hostname
    || (!currentStoreData?.emailSenderOverride.startsWith(`${currentCustomerData?.iamClient?.realmName}-`)
      && currentStoreData?.emailSenderOverride !== currentCustomerData?.iamClient?.realmName)
    || Object.keys(errors).filter((item) => (!tabLabels.includes(item))).length > 0
    || checkThankYouDesc()
    || Object.keys(localizedErrors).length > 0;

  const beforeSend = () => {
    const updatedData = formatBeforeSending(
      currentStoreData,
      currentStoreResources,
      resourcesHasChanges,
    );
    return updatedData;
  };

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
        setStoreData(JSON.parse(JSON.stringify(checkedStore)));
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
          api.getCustomers(),
          api.getDesignsThemes(),
          api.getDesignsFonts(),
          api.getDesignsLayouts(),
          api.getDesignsTranslations(),
          api.getPaymentMethodsOptions(),
        ]).then(
          ([
            customersList,
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

            const customersListArr = [...customersList?.value?.data?.items] || [];

            if (store?.designs?.endUserPortal?.i18nRef?.customerId) {
              const [hasSelectedI18nCustomer] = customersListArr
                .filter((c) => c.id === store?.designs?.endUserPortal?.i18nRef?.customerId);

              if (!hasSelectedI18nCustomer) {
                customersIds.push(`id=${store?.designs?.endUserPortal?.i18nRef?.customerId}`);
              }
            }

            if (store?.designs?.checkout?.i18nRef?.customerId) {
              const [hasSelectedI18nCustomer] = customersListArr
                .filter((c) => c.id === store?.designs?.checkout?.i18nRef?.customerId);

              if (!hasSelectedI18nCustomer) {
                customersIds.push(`id=${store?.designs?.checkout?.i18nRef?.customerId}`);
              }
            }

            api
              .getCustomersByIds(customersIds.join('&'))
              .then(({ data: customers }) => {
                setSelectOptions({
                  ...selectOptions,
                  customersList: [
                    ...customersList?.value?.data?.items,
                    ...customers?.items?.filter(
                      (c) => c.id === store?.designs?.endUserPortal?.i18nRef?.customerId
                        || c.id === store?.designs?.checkout?.i18nRef?.customerId,
                    ),
                  ] || [],
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
                    {
                      options: paymentMethodsOptions.value?.data,
                      optionValue: 'id',
                    },
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

  if (currentCustomerData) {
    dispatch(setHeaderCustomerName({ ...currentCustomerData }));
  }

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
        scope: 'store',
        setCurTab,
        curTab,
        tabLabels,
      }}
      errors={errors}
      setErrors={setErrors}
      isRankingOpen={isRankingOpen}
      extraHeader={(
        <CustomerStatusLabel
          customer={currentCustomerData}
        />
      )}
      customer={currentCustomerData}
      refScrool={refScrool}
    >
      <StoreDetailsView
        localizedErrors={localizedErrors}
        setLocalizedErrors={setLocalizedErrors}
        errors={errors}
        setErrors={setErrors}
        isRankingOpen={isRankingOpen}
        setIsRankingOpen={setIsRankingOpen}
        currentStoreData={currentStoreData}
        selectOptions={selectOptions}
        setCurrentStoreData={setCurrentStoreData}
        currentStoreResources={currentStoreResources}
        setCurrentStoreResources={setCurrentStoreResources}
        curTab={curTab}
        setCurTab={setCurTab}
        customer={currentCustomerData}
        refScrool={refScrool}
      />
    </DetailPageWrapper>
  );
};

export default StoreDetailsScreen;
