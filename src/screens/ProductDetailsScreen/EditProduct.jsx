import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import * as R from 'ramda';

import localization from '../../localization';
import ProductDetailsView from './ProductDetailsView';
import { showNotification } from '../../redux/actions/HttpNotifications';
import api from '../../api';
import { handleGetOptions, handleGetProductDetails } from './utils';
import {
  productRequiredFields,
  backToFront,
  frontToBack,
  localizedValues,
} from '../../services/helpers/dataStructuring';

const EditProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
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
  const [productHasLocalizationChanges, setProductLocalizationChanges] = useState(false);
  const [productVariations, setSubProductVariations] = useState({});
  const [productDetails, setProductDetails] = useState(null);
  const [variablesDescriptions, setVariablesDescriptions] = useState([]);

  const saveDetails = () => {
    if (productHasChanges) {
      const sendObj = currentProductData?.parentId
        ? frontToBack(currentProductData)
        : { ...currentProductData };

      if (!sendObj.businessSegment) {
        delete sendObj.businessSegment;
      }

      api.updateProductById(currentProductData.id, sendObj).then(() => {
        dispatch(showNotification(localization.t('general.updatesHaveBeenSaved')));
        window.location.reload();
      });
    }

    if (productHasLocalizationChanges) {
      const i18nFields = Object.entries(productHasLocalizationChanges.i18nFields).reduce(
        (accumulator, [key, value]) => ({ ...accumulator, [key]: frontToBack(value || {}) }),
        {},
      );

      const localizedValuesToSave = localizedValues.reduce((acc, cur) => {
        const localizedValue = Object.entries(i18nFields).reduce((ac, [key, value]) => {
          if (i18nFields[key][cur]) {
            return { ...ac, [key]: value[cur] };
          }
          return ac;
        }, {});
        return {
          ...acc,
          [cur]: localizedValue || {},
        };
      }, {});

      if (productHasLocalizationChanges.i18nFields) {
        delete productHasLocalizationChanges.i18nFields;
      }
      const dataToSave = R.mergeRight(productHasLocalizationChanges, localizedValuesToSave);
      if (!productHasLocalizationChanges?.customerId) {
        productHasLocalizationChanges.customerId = currentProductData?.customerId?.state
          ? currentProductData?.customerId?.value
          : currentProductData?.customerId;
      }
      api
        .updateProductLocalsById(
          currentProductData?.descriptionId?.state
            ? currentProductData.descriptionId.value
            : currentProductData.descriptionId,
          dataToSave,
        )
        .then(() => {
          dispatch(showNotification(localization.t('general.updatesHaveBeenSaved')));
          window.location.reload();
        });
    }
  };
  const filterCheckoutStores = () => {
    const res = [];
    const storesList = currentProductData?.sellingStores?.state // eslint-disable-line
      ? currentProductData?.sellingStores?.state === 'inherits'
        ? currentProductData?.sellingStores?.parentValue
        : currentProductData?.sellingStores?.value
      : currentProductData?.sellingStores;
    storesList.forEach((item) => {
      const selectedStore = selectOptions?.sellingStores?.filter((store) => store.id === item);

      if (selectedStore[0]) {
        const { value, hostnames } = selectedStore[0];
        hostnames.forEach((hostname) => res.push({ value, hostname }));
      }
    });
    setCheckOutStores(res);
  };

  useEffect(() => {
    let isCancelled = false;

    api.getProductById(id).then(({ data: product }) => {
      if (!isCancelled) {
        if (product?.parentId) {
          api.getProductById(product.parentId).then(({ data }) => {
            const result = backToFront(productRequiredFields(data), product);
            const initData = JSON.parse(JSON.stringify(result));
            handleGetProductDetails(
              result?.descriptionId,
              setVariablesDescriptions,
              setProductDetails,
            );
            setProductData(initData);
            setCurrentProductData(result);
            setLoading(false);
          });
        } else {
          const checkedProduct = productRequiredFields(product);
          setProductData(checkedProduct);
          const newHashes = JSON.stringify(checkedProduct);
          setCurrentProductData(JSON.parse(newHashes));
          setLoading(false);
        }
      }
      const { customerId, id: _id, descriptionId } = product;
      handleGetOptions(
        customerId,
        _id,
        descriptionId,
        isCancelled,
        setSelectOptions,
        selectOptions,
        setSubProductVariations,
        setProductDetails,
      );
    });
    return () => {
      isCancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (
      JSON.stringify(currentProductData?.sellingStores)
      !== JSON.stringify(productData?.sellingStores)
    ) {
      filterCheckoutStores();
    }
    setProductChanges(JSON.stringify(currentProductData) !== JSON.stringify(productData));

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
      productHasLocalizationChanges={productHasLocalizationChanges}
      productId={id}
      saveData={saveDetails}
      selectOptions={selectOptions}
      setProductData={setCurrentProductData}
      currentProductData={currentProductData}
      productData={productData}
      productHasChanges={productHasChanges}
      checkOutStores={checkOutStores}
      setProductLocalizationChanges={setProductLocalizationChanges}
      productVariations={productVariations}
      setProductDetails={setProductDetails}
      productDetails={productDetails}
      parentId={currentProductData?.parentId}
      variablesDescriptions={variablesDescriptions}
    />
  );
};

export default EditProduct;
