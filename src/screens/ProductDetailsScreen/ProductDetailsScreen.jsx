import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  LinearProgress,
  Zoom,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';

import localization from '../../localization';
import { showNotification } from '../../redux/actions/HttpNotifications';
import api from '../../api';

import General from './SubSections/General';

import LocalizedContent from './SubSections/LocalizedContent';
import Prices from './SubSections/Prices';
import FulfillmentAndSubscription from './SubSections/FulfillmentAndSubscription';

import CheckoutMenu from './CheckoutMenu';
import SectionLayout from './SectionLayout';

import {
  productRequiredFields,
  structureSelectOptions,
  renewingProductsOptions,
} from '../../services/helpers/dataStructuring';

const allTabs = [
  'general',
  'fulfillmentAndSubscription',
  'localizedContent',
  'prices',
  'productVariations',
  'productFiles',
];

const ProductDetailsScreen = () => {
  const dispatch = useDispatch();
  const [inputErrors, setInputErrors] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [curTab, setCurTab] = useState(0);

  const [productHasChanges, setProductChanges] = useState(false);
  const [productHasLocalizationChanges, setProductLocalizationChanges] = useState(false);
  const [selectOptions, setSelectOptions] = useState({
    sellingStores: null,
    renewingProducts: null,
    subscriptionModels: null,
    catalogs: null,
    priceFunctions: null,
  });
  const [productData, setProductData] = useState(null);
  const [currentProductData, setCurrentProductData] = useState(null);

  const [checkOutStores, setCheckOutStores] = useState([]);

  const saveDetails = () => {
    if (productHasChanges) {
      const updateDate = Date.now();
      const sendObj = { ...currentProductData, updateDate };

      if (!sendObj.businessSegment) {
        delete sendObj.businessSegment;
      }

      api.updateProductById(currentProductData.id, sendObj).then(() => {
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        window.location.reload();
      });
    }

    if (productHasLocalizationChanges) {
      api
        .updateProductLocalsById(currentProductData.descriptionId, productHasLocalizationChanges)
        .then(() => {
          dispatch(
            showNotification(localization.t('general.updatesHaveBeenSaved')),
          );
          window.location.reload();
        });
    }
  };

  const filterCheckoutStores = () => {
    const res = [];
    currentProductData?.sellingStores.forEach((item) => {
      const selectedStore = selectOptions.sellingStores.filter(
        (store) => store.id === item,
      );

      if (selectedStore[0]) {
        const { value, hostnames } = selectedStore[0];
        hostnames.forEach((hostname) => res.push({ value, hostname }));
      }
    });
    setCheckOutStores(res);
  };

  useEffect(() => {
    let isCancelled = false;
    let subscriptionOptions = null;

    api.getProductById(id).then(({ data: product }) => {
      const { customerId } = product;
      if (!isCancelled) {
        const checkedProduct = productRequiredFields(product);
        setProductData(checkedProduct);
        setCurrentProductData(checkedProduct);
        setLoading(false);
      }
      const promiseArray = [
        api.getSellingStoreOptions(customerId),
        api.getRenewingProductsByCustomerId(customerId),
        api.getFulfillmentTemplateByCustomerId(customerId),
        api.getCatalogsByCustomerId(customerId),
        api.getPriceFunctionsCustomerByIds(customerId),
      ];
      api.getCustomerById(customerId).then(({ data: curCustomer }) => {
        if (curCustomer?.usingSubscriptionV1) {
          promiseArray.push(api.getSubscriptionModelsByCustomerId(customerId));
        } else {
          subscriptionOptions = Object.keys(
            curCustomer?.subscriptions,
          ).map((item) => ({ id: item, value: item }));
        }
        Promise.all(promiseArray).then(
          ([
            sellingStores,
            renewingProducts,
            fulfillmentTemplates,
            catalogs,
            priceFunctionsOptions,
            subscriptions,
          ]) => {
            if (!subscriptionOptions) {
              subscriptionOptions = structureSelectOptions(
                subscriptions.data?.items,
                'name',
              );
            }
            setSelectOptions({
              ...selectOptions,
              sellingStores:
                structureSelectOptions(
                  sellingStores.data?.items,
                  'name',
                  'hostnames',
                ) || [],
              renewingProducts:
                renewingProductsOptions(renewingProducts.data?.items) || [],

              fulfillmentTemplates:
                structureSelectOptions(
                  fulfillmentTemplates.data?.items,
                  'name',
                ) || [],
              catalogs:
                structureSelectOptions(catalogs.data?.items, 'name') || [],
              priceFunctions:
                structureSelectOptions(
                  priceFunctionsOptions.data?.items,
                  'name',
                ) || [],
              subscriptionModels: subscriptionOptions || [],
            });
          },
        );
      });
    });
    return () => {
      isCancelled = true;
    };
  }, []);
  useEffect(() => {
    if (
      JSON.stringify(currentProductData?.sellingStores)
      !== JSON.stringify(productData?.sellingStores)
    ) {
      filterCheckoutStores();
    }

    setProductChanges(
      JSON.stringify(currentProductData) !== JSON.stringify(productData),
    );
    return () => {
      setProductChanges(false);
    };
  }, [currentProductData]);

  useEffect(() => {
    if (selectOptions.sellingStores) {
      filterCheckoutStores();
    }
  }, [selectOptions.sellingStores]);
  if (isLoading) return <LinearProgress />;

  return (
    <>
      <Box display="flex" flexDirection="row" mx={2} pb={2}>
        <Typography component="div" color="primary">
          <Box fontWeight={500}>
            {localization.t('general.product')}
            {'/'}
          </Box>
        </Typography>
        <Typography component="div" color="secondary">
          <Box fontWeight={500}>{id}</Box>
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        m={2}
        justifyContent="space-between"
      >
        <Box alignSelf="center">
          <Typography data-test="productName" gutterBottom variant="h3">
            {currentProductData.genericName}
          </Typography>
        </Box>

        <Box display="flex" flexDirection="row">
          <Zoom in={productHasChanges || !!productHasLocalizationChanges}>
            <Box mb={1} mr={1}>
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

          <Box>
            {selectOptions.sellingStores && (
              <CheckoutMenu
                checkOutStores={checkOutStores}
                currentProductData={currentProductData}
                sellingStores={selectOptions.sellingStores}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Box m={2} bgcolor="#fff">
        <Tabs
          value={curTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setCurTab(newValue);
          }}
          aria-label="disabled tabs example"
        >
          <Tab label={localization.t(`labels.${allTabs[0]}`)} />
          <Tab label={localization.t(`labels.${allTabs[1]}`)} />
          <Tab label={localization.t(`labels.${allTabs[2]}`)} />
          <Tab label={localization.t(`labels.${allTabs[3]}`)} />
          <Tab label={localization.t(`labels.${allTabs[4]}`)} />
          <Tab label={localization.t(`labels.${allTabs[5]}`)} />
        </Tabs>
      </Box>
      <Box display="flex">
        {curTab === 0 && (
          <SectionLayout label={allTabs[0]}>
            <General
              inputErrors={inputErrors}
              setInputErrors={setInputErrors}
              selectOptions={selectOptions}
              setProductData={setCurrentProductData}
              currentProductData={currentProductData}
              productData={productData}
            />
          </SectionLayout>
        )}

        {curTab === 1 && (
          <SectionLayout label={allTabs[1]}>
            <FulfillmentAndSubscription
              selectOptions={selectOptions}
              setProductData={setCurrentProductData}
              currentProductData={currentProductData}
              productData={productData}
            />
          </SectionLayout>
        )}

        {curTab === 2 && (
          <SectionLayout label={allTabs[2]}>
            <LocalizedContent
              setProductData={setCurrentProductData}
              currentProductData={currentProductData}
              productData={productData}
              setNewData={setProductLocalizationChanges}
            />
          </SectionLayout>
        )}

        {curTab === 3 && (
          <SectionLayout label={allTabs[3]}><Prices /></SectionLayout>
        )}
        {curTab === 4 && <SectionLayout label={allTabs[4]} />}
        {curTab === 5 && <SectionLayout label={allTabs[5]} />}
      </Box>
    </>
  );
};

export default ProductDetailsScreen;
