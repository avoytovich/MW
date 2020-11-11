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
          endUserPortal: { themeRef: { customerId: '', name: '' } },
        },
      };
    }
    if (!resObj.designs.checkout) {
      resObj = {
        ...resObj,
        designs: {
          ...resObj.designs,
          checkout: { themeRef: { customerId: '', name: '' } },
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
        const themeOptions = await api.getThemeOptions();
        if (!isCancelled) {
          const checkedStore = checkRequiredFields(store.data);
          setStoreData(checkedStore);
          setCurrentStoreData(checkedStore);
          setCurrentCustomerData(customer.data);
          setSelectOptions({
            ...selectOptions,
            theme: themeOptions.data.items,
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
            {/* toDo Add localization */}
            <Box fontWeight={500}> Store</Box>
          </Typography>
        </Box>
      </Box>
      <Zoom in={storeHasChanges}>
        <Button
          disabled={Object.keys(inputErrors).length !== 0}
          id="save-detail-button"
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={saveDetails}
        >
          {/* toDo Add localization */}
          Save
        </Button>
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