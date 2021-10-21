import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LinearProgress,
  Zoom,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  Breadcrumbs,
} from '@material-ui/core';
import { toast } from 'react-toastify';

import Payment from './SubSections/Payment';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import General from './SubSections/General';
import Design from './SubSections/Design';
import LocalizedContent from './SubSections/LocalizedContent';
import StoreSection from './StoreSection';
import SelectCustomerNotification from '../../components/utils/SelectCustomerNotification';
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
  tabLabels,
  formatBeforeSending,
  resourceLabel,
} from './utils';

import api from '../../api';

const StoreDetailsScreen = () => {
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);
  const [customerName, setCustomerName] = useState(null);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const [currentStoreResources, setCurrentStoreResources] = useState([]);
  const [storeResources, setStoreResources] = useState([]);
  const [resourcesHasChanges, setResourcesHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);
  const [selectedLang, setSelectedLang] = useState(0);

  const [isLoading, setLoading] = useState(true);
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
    || !currentStoreData?.routes[0].hostname;

  const saveDetails = () => {
    const updatedData = formatBeforeSending(
      currentStoreData,
      currentStoreResources,
      resourcesHasChanges,
    );

    updatedData.saleLocales = updatedData?.saleLocales
      ?.filter((locale) => !!updatedData.thankYouDesc[locale]);

    if (!updatedData?.saleLocales?.length) {
      delete updatedData.saleLocales;
      delete updatedData.thankYouDesc;
    }

    if (id === 'add') {
      api.addNewStore(updatedData).then((res) => {
        const location = res.headers.location.split('/');
        const newId = location[location.length - 1];
        toast(localization.t('general.updatesHaveBeenSaved'));
        history.push(`${parentPaths.stores}/${newId}`);
        setUpdate((u) => u + 1);
      });
    } else {
      api.updateStoreById(currentStoreData.id, updatedData).then(() => {
        toast(localization.t('general.updatesHaveBeenSaved'));
        setUpdate((u) => u + 1);
      });
    }
  };

  useEffect(() => {
    let isCancelled = false;

    let roleRequest;

    if (id === 'add') {
      roleRequest = Promise.resolve({
        data: {
          customerId: nxState?.selectedCustomer?.id,
          logoFavicon: '',
          bannerInvoice: '',
          bannerOrderConfEmail: '',
          logoStore: '',
        },
      });
    } else {
      roleRequest = api.getStoreById(id);
    }

    roleRequest.then(({ data: store }) => {
      if (!isCancelled) {
        const checkedStore = storeRequiredFields(store);
        const resourcesArray = structureResources(store);
        setStoreResources(JSON.parse(JSON.stringify(resourcesArray)));
        setCurrentStoreResources(
          JSON.parse(JSON.stringify(resourcesArray)),
        );
        setStoreData(checkedStore);
        setCurrentStoreData(checkedStore);
        api
          .getCustomerById(store?.customerId)
          .then(({ data: customer }) => {
            setCurrentCustomerData(customer);
          });
        setLoading(false);

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
    });

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

  if (isLoading) return <LinearProgress />;

  if (id === 'add' && !nxState?.selectedCustomer?.id) return <SelectCustomerNotification />;

  const validation = () => {
    if (checkExistingLabelsUrl(currentStoreResources)) {
      if (!checkLabelDuplicate(currentStoreResources)) {
        return false;
      }
    }
    return true;
  };

  return (
    storeData && (
      <>
        {id !== 'add' && (
          <Box mx={2}>
            <CustomBreadcrumbs
              url={`${parentPaths.stores}`}
              section={localization.t('general.store')}
              id={storeData.id}
            />
          </Box>
        )}
        <Box
          display='flex'
          flexDirection='row'
          m={2}
          justifyContent='space-between'
        >
          <Box alignSelf='center'>
            <Typography data-test='discountName' gutterBottom variant='h3'>
              {storeData.name}
            </Typography>
            <Box py={2}>
              <Breadcrumbs color='secondary' aria-label='breadcrumb'>
                <Typography color='primary'>
                  {localization.t('labels.customerId')}
                </Typography>
                {currentCustomerData && (
                  <Typography color='secondary'>
                    {customerName}
                  </Typography>
                )}
              </Breadcrumbs>
            </Box>
          </Box>

          <Zoom in={storeHasChanges || resourcesHasChanges}>
            <Box mb={1} mr={1}>
              <Button
                disabled={validation() || handleDisabledSave}
                id='save-discount-button'
                color='primary'
                size='large'
                type='submit'
                variant='contained'
                onClick={saveDetails}
              >
                {localization.t('general.save')}
              </Button>
            </Box>
          </Zoom>
        </Box>
        <Box my={2} bgcolor='#fff'>
          <Tabs
            value={curTab}
            indicatorColor='primary'
            textColor='primary'
            onChange={(event, newValue) => {
              setCurTab(newValue);
            }}
            aria-label='disabled tabs example'
          >
            {tabLabels.map((tab) => (
              <Tab key={tab} label={localization.t(`labels.${tab}`)} />
            ))}
          </Tabs>
        </Box>
        {curTab === 0 && (
          <StoreSection label={tabLabels[0]}>
            <General
              currentStoreData={currentStoreData}
              setCurrentStoreData={setCurrentStoreData}
              selectOptions={selectOptions}
            />
          </StoreSection>
        )}
        {curTab === 1 && (
          <Design
            resourceLabel={resourceLabel}
            currentStoreResources={currentStoreResources}
            setCurrentStoreResources={setCurrentStoreResources}
            selectOptions={selectOptions}
            currentStoreData={currentStoreData}
            setCurrentStoreData={setCurrentStoreData}
          />
        )}
        {curTab === 2 && (
          <StoreSection label={tabLabels[2]}>
            <Payment
              selectOptions={selectOptions}
              currentStoreData={currentStoreData}
              setCurrentStoreData={setCurrentStoreData}
            />
          </StoreSection>
        )}
        {curTab === 3 && (
          <StoreSection label={tabLabels[3]}>
            <LocalizedContent
              selectedLang={selectedLang}
              setSelectedLang={setSelectedLang}
              currentStoreData={currentStoreData}
              setCurrentStoreData={setCurrentStoreData}
            />
          </StoreSection>
        )}
      </>
    )
  );
};

export default StoreDetailsScreen;
