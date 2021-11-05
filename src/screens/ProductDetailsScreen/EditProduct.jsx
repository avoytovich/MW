import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import * as R from 'ramda';

import localization from '../../localization';
import ProductDetailsView from './ProductDetailsView';
import api from '../../api';
import LoadingErrorNotification from '../../components/utils/LoadingErrorNotification';

import { handleGetOptions, handleGetProductDetails } from './utils';
import {
  productRequiredFields,
  backToFront,
  frontToBack,
  localizedValues,
} from '../../services/helpers/dataStructuring';

const EditProduct = () => {
  const { id } = useParams();

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
  const [storeLanguages, setStoreLanguages] = useState([]);

  const saveDetails = () => {
    if (productHasChanges) {
      const sendObj = currentProductData?.parentId
        ? frontToBack(currentProductData)
        : { ...currentProductData };

      if (!sendObj.businessSegment) {
        delete sendObj.businessSegment;
      }

      api.updateProductById(currentProductData.id, sendObj).then(() => {
        toast(localization.t('general.updatesHaveBeenSaved'));
        window.location.reload();
      });
    }

    if (productHasLocalizationChanges) {
      const frontToBackObj = frontToBack(productHasLocalizationChanges);
      const i18nFields = Object.entries(frontToBackObj.i18nFields).reduce(
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
      if (frontToBackObj.i18nFields) {
        delete frontToBackObj.i18nFields;
      }
      const dataToSave = R.mergeRight(frontToBackObj, localizedValuesToSave);
      if (!frontToBackObj?.customerId) {
        frontToBackObj.customerId = currentProductData?.customerId?.state
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
          toast(localization.t('general.updatesHaveBeenSaved'));
          window.location.reload();
        });
    }
  };
  const filterCheckoutStores = () => {
    let newLanguages = [];
    const res = [];
    const storesList = currentProductData?.sellingStores?.state // eslint-disable-line
      ? currentProductData?.sellingStores?.state === 'inherits'
        ? currentProductData?.sellingStores?.parentValue
        : currentProductData?.sellingStores?.value
      : currentProductData?.sellingStores;
    storesList.forEach((item) => {
      const selectedStore = selectOptions?.sellingStores?.filter((store) => store.id === item);

      if (selectedStore[0]) {
        const languages = selectedStore[0].saleLocales ? [...selectedStore[0].saleLocales] : [];
        if (!languages.includes(selectedStore[0].defaultLocale)) {
          languages.push(selectedStore[0].defaultLocale);
        }
        newLanguages = [...new Set([...newLanguages, ...languages])];
        const { value, hostnames } = selectedStore[0];
        hostnames.forEach((hostname) => res.push({ value, hostname }));
      }
    });
    setStoreLanguages(newLanguages);
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
        setLoading,
        customerId,
        _id,
        descriptionId,
        isCancelled,
        setSelectOptions,
        selectOptions,
        setSubProductVariations,
        setProductDetails,
      );
    }).catch(() => setLoading(false));
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
  if (!isLoading && !currentProductData) return <LoadingErrorNotification />;

  return (
    <ProductDetailsView
      storeLanguages={storeLanguages}
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
