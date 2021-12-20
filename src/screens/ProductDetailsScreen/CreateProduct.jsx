import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as R from 'ramda';
import { LinearProgress } from '@mui/material';
import SelectCustomerNotification from '../../components/utils/SelectCustomerNotification';
import api from '../../api';

import { handleGetOptions, handleGetProductDetails } from './utils';
import {
  defaultProduct,
  productRequiredFields,
  backToFront,
  frontToBack,
  localizedValues,
} from '../../services/helpers/dataStructuring';
import localization from '../../localization';
import ProductDetailsView from './ProductDetailsView';
import parentPaths from '../../services/paths';

const CreateProduct = () => {
  const customerId = useSelector(
    ({ account: { nexwayState } }) => nexwayState?.selectedCustomer?.id,
  );
  const history = useHistory();
  const [storeLanguages, setStoreLanguages] = useState([]);
  const [productData, setProductData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [currentProductData, setCurrentProductData] = useState(defaultProduct);
  const [selectOptions, setSelectOptions] = useState({
    sellingStores: null,
    renewingProducts: null,
    subscriptionModels: null,
    catalogs: null,
    priceFunctions: null,
  });
  const [productVariations, setSubProductVariations] = useState({});

  const [productHasLocalizationChanges, setProductLocalizationChanges] = useState(false);

  const [productDetails, setProductDetails] = useState(null);
  const [variablesDescriptions, setVariablesDescriptions] = useState([]);

  useEffect(() => {
    setProductData({ ...currentProductData, customerId });
    setCurrentProductData({ ...currentProductData, customerId });
  }, [customerId]);
  // ToDo: refactor handleGetOptions props !!!
  const parentId = history?.location?.state?.parentId;
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    parentId
      ? api.getProductById(parentId)
        .then(({ data: product }) => {
          if (!isCancelled) {
            const checkedProduct = productRequiredFields(product);
            handleGetProductDetails(
              checkedProduct?.descriptionId,
              setVariablesDescriptions,
              setProductDetails,
            );
            setCurrentProductData(backToFront(checkedProduct));
          }
          const { customerId: _customerId, id, descriptionId } = product;
          handleGetOptions(
            setLoading,
            _customerId,
            id,
            descriptionId,
            isCancelled,
            setSelectOptions,
            selectOptions,
            setSubProductVariations,
            setProductDetails,
          );
        })

      : handleGetOptions(
        setLoading,
        customerId,
        null,
        null,
        isCancelled,
        setSelectOptions,
        selectOptions,
        setSubProductVariations,
        (catalogId) => {
          setCurrentProductData((c) => ({ ...c, catalogId }));
        },
      );

    return () => {
      isCancelled = true;
    };
  }, [history?.state]);

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

      if (selectedStore?.[0]) {
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
  };
  const saveProduct = () => {
    if (!currentProductData.businessSegment) {
      delete currentProductData.businessSegment;
    }
    const dataToSave = frontToBack(currentProductData);
    if (!dataToSave?.customerId) {
      dataToSave.customerId = currentProductData?.customerId?.state
        ? currentProductData?.customerId?.value
        : currentProductData?.customerId;
    }
    if (parentId) {
      delete dataToSave.id;
      dataToSave.parentId = parentId;
    }
    api.addNewProduct(dataToSave).then((res) => {
      const location = res.headers.location.split('/');
      const id = location[location.length - 1];
      api.getProductById(id).then(({ data }) => {
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
          const localizationChangesToSave = R.mergeRight(
            frontToBackObj, localizedValuesToSave,
          );
          if (!frontToBackObj?.customerId) {
            frontToBackObj.customerId = currentProductData?.customerId?.state
              ? currentProductData?.customerId?.value
              : currentProductData?.customerId;
          }
          api
            .updateProductLocalsById(
              data.descriptionId,
              {
                ...localizationChangesToSave,
                description: `description of product ${currentProductData.genericName}`,
                catalogId: data.catalogId,
              },
            )
            .then(() => {
              toast(localization.t('general.updatesHaveBeenSaved'));
              history.push(`${parentPaths.productlist}/${id}`);
            });
        } else {
          toast(localization.t('general.updatesHaveBeenSaved'));
          history.push(`${parentPaths.productlist}/${id}`);
        }
      });
    });
  };

  useEffect(() => {
    if (
      JSON.stringify(currentProductData?.sellingStores)
      !== JSON.stringify(productData?.sellingStores)
    ) {
      filterCheckoutStores();
    }
  }, [currentProductData]);

  useEffect(() => {
    if (selectOptions.sellingStores) {
      filterCheckoutStores();
    }
  }, [selectOptions.sellingStores]);
  if (isLoading) return <LinearProgress />;
  if (!customerId) {
    return <SelectCustomerNotification />;
  }

  if (!customerId) {
    return <div data-test='emptyProductDetailsView'>Select customer</div>;
  }

  return (
    <ProductDetailsView
      storeLanguages={storeLanguages}
      setProductDetails={setProductDetails}
      selectOptions={selectOptions}
      setProductData={setCurrentProductData}
      currentProductData={currentProductData}
      saveData={saveProduct}
      productVariations={productVariations}
      parentId={parentId}
      productDetails={productDetails}
      setProductLocalizationChanges={setProductLocalizationChanges}
      productHasLocalizationChanges={productHasLocalizationChanges}
      variablesDescriptions={variablesDescriptions}
    />
  );
};

export default CreateProduct;
