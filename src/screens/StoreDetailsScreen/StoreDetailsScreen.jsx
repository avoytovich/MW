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
import General from './SubSections/General';
import StoreSection from './StoreSection';
import { storeRequiredFields } from '../../services/helpers/dataStructuring';
import localization from '../../localization';
import { showNotification } from '../../redux/actions/HttpNotifications';
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
          const checkedStore = storeRequiredFields(store.data);

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
    storeData && (
      <>
        <Box display="flex" flexDirection="row" mx={2} pb={2}>
          <Typography component="div" color="primary">
            <Box fontWeight={500}>
              {localization.t('general.discount')}
              {'/'}
            </Box>
          </Typography>
          <Typography component="div" color="secondary">
            <Box fontWeight={500}>{storeData.id}</Box>
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          m={2}
          justifyContent="space-between"
        >
          <Box alignSelf="center">
            <Typography data-test="discountName" gutterBottom variant="h3">
              {storeData.name}
            </Typography>
          </Box>
          <Zoom in={storeHasChanges}>
            <Box mb={1} mr={1}>
              <Button
                id="save-discount-button"
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
        </Box>
        <StoreSection label="general">
          <General
            currentStoreData={currentStoreData}
            setCurrentStoreData={setCurrentStoreData}
            selectOptions={selectOptions}
          />
        </StoreSection>
        <StoreSection label="cappingAndLimits"></StoreSection>
        <StoreSection label="eligibility"></StoreSection>
      </>
      // <>
      //   <Box display="flex" flexDirection="row" justifyContent="space-between">
      //     <Box display="flex" flexDirection="row">
      //       <Box>
      //         <FolderOpen color="secondary" />
      //       </Box>
      //       <Box>
      //         <Typography component="div" color="primary">
      //           <Box fontWeight={500}>{localization.t('general.store')}</Box>
      //         </Typography>
      //       </Box>
      //     </Box>
      //     <Zoom in={storeHasChanges}>
      //       <Box mb={1}>
      //         <Button
      //           disabled={Object.keys(inputErrors).length !== 0}
      //           id="save-detail-button"
      //           color="primary"
      //           size="large"
      //           type="submit"
      //           variant="contained"
      //           onClick={saveDetails}
      //         >
      //           {localization.t('general.save')}
      //         </Button>
      //       </Box>
      //     </Zoom>
      //   </Box>
      //   {currentStoreData && (
      //     <StoreDetails
      //       inputErrors={inputErrors}
      //       setInputErrors={setInputErrors}
      //       storeData={storeData}
      //       selectOptions={selectOptions}
      //       setCurrentStoreData={setCurrentStoreData}
      //       customerData={currentCustomerData}
      //       currentStoreData={currentStoreData}
      //     />
      //   )}
      // </>
    )
  );
};

export default StoreDetailsScreen;
