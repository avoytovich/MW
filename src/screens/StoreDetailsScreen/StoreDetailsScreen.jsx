import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FolderOpen } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import {
  LinearProgress,
  Zoom,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import localization from '../../localization';
import { showNotification } from '../../redux/actions/HttpNotifications';
import StoreDetails from '../../components/StoreDetails';
import api from '../../api';

const StoreDetailsScreen = () => {
  const dispatch = useDispatch();
  const [inputErrors, setInputErrors] = useState({});

  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [storeHasChanges, setStoreChanges] = useState(false);
  const [selectOptions, setSelectOptions] = useState({ theme: null });
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
  const checkRequiredFields = (store) => {
    let resObj = { ...store };

    if (!resObj.status) {
      resObj = { ...resObj, status: '' };
    }
    if (!resObj.routes) {
      resObj = { ...resObj, routes: [] };
    }
    if (!resObj.routes[0]) {
      resObj = { ...resObj, routes: [{ hostname: '' }] };
    }
    if (!resObj.routes[0].hostname) {
      const newArr = [!resObj.routes];
      newArr[0] = { ...newArr[0], hostname: '' };
      resObj = { ...resObj, routes: newArr };
    }
    if (!resObj.defaultLocale) {
      resObj = { ...resObj, defaultLocale: '' };
    }
    if (!resObj.saleLocales) {
      resObj = { ...resObj, saleLocales: [] };
    }
    if (!resObj.designs) {
      resObj = { ...resObj, designs: {} };
    }
    if (!resObj.designs.endUserPortal) {
      resObj = {
        ...resObj,
        designs: {
          ...resObj.designs,
          endUserPortal: { themeRef: {} },
        },
      };
    }
    if (!Object.keys(resObj.designs.endUserPortal.themeRef).length) {
      resObj = {
        ...resObj,
        designs: {
          ...resObj.designs,
          endUserPortal: { themeRef: { customerId: '', name: '' } },
        },
      };
    }
    if (!resObj.designs.checkout) {
      resObj = {
        ...resObj,
        designs: {
          ...resObj.designs,
          checkout: {},
        },
      };
    }
    if (!resObj.designs.checkout.themeRef) {
      resObj = {
        ...resObj,
        designs: {
          ...resObj.designs,
          checkout: {
            ...resObj.designs.checkout,
            themeRef: { customerId: '', name: '' },
          },
        },
      };
    }
    if (!resObj.designs.checkout.fontRef) {
      resObj = {
        ...resObj,
        designs: {
          ...resObj.designs,
          checkout: {
            ...resObj.designs.checkout,
            fontRef: { customerId: '', name: '' },
          },
        },
      };
    }
    if (!resObj.designs.checkout.i18nRef) {
      resObj = {
        ...resObj,
        designs: {
          ...resObj.designs,
          checkout: {
            ...resObj.designs.checkout,
            i18nRef: { customerId: '' },
          },
        },
      };
    }
    if (!resObj.designs.checkout.layoutRef) {
      resObj = {
        ...resObj,
        designs: {
          ...resObj.designs,
          checkout: {
            ...resObj.designs.checkout,
            layoutRef: { customerId: '', name: '' },
          },
        },
      };
    }
    if (!resObj.designs.paymentComponent) {
      resObj = {
        ...resObj,
        designs: {
          ...resObj.designs,
          paymentComponent: {
            rankedPaymentTabsByCountriesList: [{ rankedPaymentTabs: [] }],
          },
        },
      };
    }

    return resObj;
  };

  const saveDetails = () => {
    api.updateStoreById(currentStoreData.id, currentStoreData).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      window.location.reload();
    });
  };

  useEffect(() => {
    let isCancelled = false;
    const requests = async () => {
      try {
        const store = await api.getStoreById(id);
        const customer = await api.getCustomerById(store?.data?.customerId);
        const themeOptions = await api.getDesignsThemes();
        const fontOptions = await api.getDesignsFonts();
        const layoutOptions = await api.getDesignsLayouts();
        const translationOptions = await api.getDesignsTranslations();

        const customersIds = getCustomersIdsArray(
          ...fontOptions.data.items,
          ...themeOptions.data.items,
          ...layoutOptions.data.items,
          ...translationOptions.data.items,
        );
        const customers = await api.getCustomersByIds(customersIds.join('&'));
        const paymentMethodsOptions = await api.getPaymentMethodsOptions();

        if (!isCancelled) {
          const checkedStore = checkRequiredFields(store.data);

          setStoreData(checkedStore);
          setCurrentStoreData(checkedStore);
          setCurrentCustomerData(customer.data);
          setSelectOptions({
            ...selectOptions,
            customers: customers.data.items,
            font: fontOptions.data.items,
            theme: themeOptions.data.items,
            paymentMethods: paymentMethodsOptions.data,
            layout: layoutOptions.data.items,
            translation: translationOptions.data.items,
          });
          setLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };
    requests();
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    setStoreChanges(
      JSON.stringify(currentStoreData) !== JSON.stringify(storeData),
    );
    return () => {
      setStoreChanges(false);
    };
  }, [currentStoreData, storeData]);

  if (isLoading) return <LinearProgress />;

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box>
          <FolderOpen color="secondary" />
        </Box>
        <Box>
          <Typography component="div" color="primary">
            <Box fontWeight={500}>{localization.t('general.store')}</Box>
          </Typography>
        </Box>
      </Box>
      <Zoom in={storeHasChanges}>
        <Box mb={1}>
          <Button
            disabled={Object.keys(inputErrors).length !== 0}
            id="save-detail-button"
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            onClick={saveDetails}
          >
            {localization.t('general.save')}
          </Button>
        </Box>
      </Zoom>
      {currentStoreData && (
        <StoreDetails
          inputErrors={inputErrors}
          setInputErrors={setInputErrors}
          storeData={storeData}
          selectOptions={selectOptions}
          setCurrentStoreData={setCurrentStoreData}
          customerData={currentCustomerData}
          currentStoreData={currentStoreData}
        />
      )}
    </>
  );
};

export default StoreDetailsScreen;
