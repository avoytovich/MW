import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import localization from '../../localization';
import ProductDetailsView from './ProductDetailsView';
import { showNotification } from '../../redux/actions/HttpNotifications';
import api from '../../api';

import {
  productRequiredFields,
  structureSelectOptions,
  renewingProductsOptions,
} from '../../services/helpers/dataStructuring';

const ProductDetailsScreen = () => {
  const dispatch = useDispatch();

  const [inputErrors, setInputErrors] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  const [productHasChanges, setProductChanges] = useState(false);
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
  const handleGetOptions = (customerId, isCancelled) => {
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
  };
  useEffect(() => {
    let isCancelled = false;
    api.getProductById(id).then(({ data: product }) => {
      if (!isCancelled) {
        const checkedProduct = productRequiredFields(product);
        setProductData(checkedProduct);
        setCurrentProductData(checkedProduct);
        setLoading(false);
      }
      handleGetOptions(product.customerId, isCancelled);
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
    <ProductDetailsView
      saveData={saveDetails}
      inputErrors={inputErrors}
      setInputErrors={setInputErrors}
      selectOptions={selectOptions}
      setProductData={setCurrentProductData}
      currentProductData={currentProductData}
      productData={productData}
      productHasChanges={productHasChanges}
      checkOutStores={checkOutStores}
    />
  );
};

export default ProductDetailsScreen;
