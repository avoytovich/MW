import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import localization from '../../localization';
import ProductDetailsView from './ProductDetailsView';
import { showNotification } from '../../redux/actions/HttpNotifications';
import api from '../../api';
import handleGetOptions from './utils';
import { productRequiredFields } from '../../services/helpers/dataStructuring';

const EditProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [inputErrors, setInputErrors] = useState({});
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
  const [
    productHasLocalizationChanges,
    setProductLocalizationChanges,
  ] = useState(false);

  const saveDetails = () => {
    if (productHasChanges) {
      const sendObj = { ...currentProductData };

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
        .updateProductLocalsById(
          currentProductData.descriptionId,
          productHasLocalizationChanges,
        )
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
    api.getProductById(id).then(({ data: product }) => {
      if (!isCancelled) {
        const checkedProduct = productRequiredFields(product);
        setProductData(checkedProduct);
        setCurrentProductData(checkedProduct);
        setLoading(false);
      }
      handleGetOptions(
        product.customerId,
        isCancelled,
        setSelectOptions,
        selectOptions,
      );
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
      productHasLocalizationChanges={productHasLocalizationChanges}
      productId={id}
      saveData={saveDetails}
      inputErrors={inputErrors}
      setInputErrors={setInputErrors}
      selectOptions={selectOptions}
      setProductData={setCurrentProductData}
      currentProductData={currentProductData}
      productData={productData}
      productHasChanges={productHasChanges}
      checkOutStores={checkOutStores}
      setProductLocalizationChanges={setProductLocalizationChanges}
    />
  );
};

export default EditProduct;
