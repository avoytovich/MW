import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  LinearProgress,
  Zoom,
  Button,
  Box,
  Typography,
  Grid,
} from '@material-ui/core';
import Payment from './SubSections/Payment';

import General from './SubSections/General';
import Design from './SubSections/Design';
import AssetsResource from './SubSections/AssetsResource';
import StoreSection from './StoreSection';
import {
  storeRequiredFields,
  structureSelectOptions,
} from '../../services/helpers/dataStructuring';
import localization from '../../localization';
import { showNotification } from '../../redux/actions/HttpNotifications';
import {
  formDesignOptions,
  structureResources,
  checkLabelDuplicate,
  resourcesKeys,
} from './utils';

import api from '../../api';

const StoreDetailsScreen = () => {
  const dispatch = useDispatch();

  const [currentStoreResources, setCurrentStoreResources] = useState([]);
  const [storeResources, setStoreResources] = useState([]);
  const [resourcesHasChanges, setResourcesHasChanges] = useState(false);

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

  const saveDetails = () => {
    const updatedData = { ...currentStoreData };
    if (resourcesHasChanges) {
      let notUsedKeys = [...resourcesKeys];
      currentStoreResources.forEach((item) => {
        notUsedKeys = notUsedKeys.filter((key) => key !== item.label);
        updatedData[item.label] = item.url;
      });
      notUsedKeys.forEach((key) => {
        delete updatedData[key];
      });
    }
    api.updateStoreById(currentStoreData.id, updatedData).then(() => {
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
        api.getStoreById(id).then(({ data: store }) => {
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
                  ...fontOptions.value.data.items,
                  ...themeOptions.value.data.items,
                  ...layoutOptions.value.data.items,
                  ...translationOptions.value.data.items,
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

  if (isLoading) return <LinearProgress />;

  return (
    storeData && (
      <>
        <Box display="flex" flexDirection="row" mx={2} pb={2}>
          <Typography component="div" color="primary">
            <Box fontWeight={500}>
              {localization.t('general.store')}
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
            <Box display="flex" flexDirection="row">
              <Typography component="div" color="primary">
                <Box fontWeight={500}>
                  {localization.t('labels.customerId')}
                  {'/'}
                </Box>
              </Typography>
              <Typography component="div" color="secondary">
                <Box fontWeight={500}>{currentCustomerData?.id}</Box>
              </Typography>
            </Box>
          </Box>

          <Zoom in={storeHasChanges || resourcesHasChanges}>
            <Box mb={1} mr={1}>
              <Button
                disabled={
                  checkLabelDuplicate(currentStoreResources) ||
                  (currentStoreData.externalContextAlias &&
                    !!currentStoreData.externalContextGenerationParams.length)
                }
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
        <Grid container spacing={2}>
          <Grid item md={12}>
            <StoreSection label="general">
              <General
                currentStoreData={currentStoreData}
                setCurrentStoreData={setCurrentStoreData}
                selectOptions={selectOptions}
              />
            </StoreSection>
          </Grid>
          <Grid item md={5} sm={12}>
            <Design
              selectOptions={selectOptions}
              currentStoreData={currentStoreData}
              setCurrentStoreData={setCurrentStoreData}
            />
          </Grid>
          <Grid item md={7} sm={12}>
            <StoreSection label="payment">
              <Payment
                selectOptions={selectOptions}
                currentStoreData={currentStoreData}
                setCurrentStoreData={setCurrentStoreData}
              />
            </StoreSection>
          </Grid>
          <Grid item md={12}>
            <StoreSection label="assetsResource">
              <AssetsResource
                resources={currentStoreResources}
                setResources={setCurrentStoreResources}
                currentStoreData={currentStoreData}
                setCurrentStoreData={setCurrentStoreData}
              />
            </StoreSection>
          </Grid>
        </Grid>
      </>
    )
  );
};

export default StoreDetailsScreen;
