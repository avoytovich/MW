import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Box, Typography, Tabs, Tab,
} from '@material-ui/core';
import api from '../../api';
import { showNotification } from '../../redux/actions/HttpNotifications';

import {
  defaultProduct,
  structureSelectOptions,
  renewingProductsOptions,
} from '../../services/helpers/dataStructuring';
import localization from '../../localization';
import General from '../ProductDetailsScreen/SubSections/General';
import Prices from '../ProductDetailsScreen/SubSections/Prices';
import FulfillmentAndSubscription from '../ProductDetailsScreen/SubSections/FulfillmentAndSubscription';
import SectionLayout from '../ProductDetailsScreen/SectionLayout';

const allTabs = [
  'general',
  'fulfillmentAndSubscription',
  'localizedContent',
  'prices',
  'productVariations',
  'productFiles',
];

const CreateProductScreen = () => {
  const customerId = useSelector(
    ({ account: { nexwayState } }) => nexwayState?.selectedCustomer?.id,
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [tabsDisabled, setTabsDisabled] = useState(true);
  const [curTab, setCurTab] = useState(0);
  const [selectOptions, setSelectOptions] = useState({
    sellingStores: null,
    renewingProducts: null,
    subscriptionModels: null,
    catalogs: null,
    priceFunctions: null,
  });
  const [currentProductData, setCurrentProductData] = useState(defaultProduct);
  useEffect(() => {
    setCurrentProductData({ ...currentProductData, customerId });
  }, [customerId]);

  useEffect(() => {
    const {
      catalogId,
      publisherRefId,
      genericName,
      type,
      prices,
    } = currentProductData;

    if (
      catalogId
      && publisherRefId
      && genericName
      && type
      && prices.defaultCurrency
      && prices.priceByCountryByCurrency[prices.defaultCurrency].default.value
    ) {
      setTabsDisabled(false);
    } else {
      setTabsDisabled(true);
    }
  }, [currentProductData]);

  useEffect(() => {
    let isCancelled = false;
    let subscriptionOptions = null;

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
          if (!isCancelled) {
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
          }
        },
      );
    });
    return () => {
      isCancelled = true;
    };
  }, []);

  if (!customerId) {
    return <>Select customer</>;
  }
  const saveProduct = () => {
    if (!currentProductData.businessSegment) {
      delete currentProductData.businessSegment;
    }
    api.addNewProduct(currentProductData).then((res) => {
      const location = res.headers.location.split('/');
      const id = location[location.length - 1];
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      history.push(`/overview/products/${id}`);
    });
  };
  return (
    <>
      <Box display="flex" flexDirection="row" mx={2} pb={2}>
        <Typography component="div" color="primary">
          <Box fontWeight={500}>{localization.t('general.product')}</Box>
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" m={2} justifyContent="flex-end">
        <Box mb={1} mr={1}>
          <Button
            disabled={tabsDisabled}
            id="save-detail-button"
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            onClick={saveProduct}
          >
            {localization.t('general.save')}
          </Button>
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
          <Tab
            disabled={tabsDisabled}
            label={localization.t(`labels.${allTabs[1]}`)}
          />
          <Tab
            disabled={tabsDisabled}
            label={localization.t(`labels.${allTabs[2]}`)}
          />
          <Tab label={localization.t(`labels.${allTabs[3]}`)} />
          <Tab
            disabled={tabsDisabled}
            label={localization.t(`labels.${allTabs[4]}`)}
          />
          <Tab
            disabled={tabsDisabled}
            label={localization.t(`labels.${allTabs[5]}`)}
          />
        </Tabs>
      </Box>
      <Box display="flex">
        {curTab === 0 && (
          <SectionLayout label={allTabs[0]}>
            <General
              selectOptions={selectOptions}
              setProductData={setCurrentProductData}
              currentProductData={currentProductData}
            />
          </SectionLayout>
        )}
        {curTab === 1 && (
          <SectionLayout label={allTabs[1]}>
            {/* <FulfillmentAndSubscription
              selectOptions={selectOptions}
              setProductData={setCurrentProductData}
              currentProductData={currentProductData}
            /> */}
          </SectionLayout>
        )}
        {curTab === 2 && <SectionLayout label={allTabs[2]} />}
        {curTab === 3 && (
          <SectionLayout label={allTabs[3]}>{/* <Prices /> */}</SectionLayout>
        )}
        {curTab === 4 && <SectionLayout label={allTabs[4]} />}
        {curTab === 5 && <SectionLayout label={allTabs[5]} />}
      </Box>
    </>
  );
};

export default CreateProductScreen;
