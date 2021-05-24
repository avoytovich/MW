import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import api from '../../api';
import { showNotification } from '../../redux/actions/HttpNotifications';
import handleGetOptions from './utils';
import { defaultProduct } from '../../services/helpers/dataStructuring';
import localization from '../../localization';
import ProductDetailsView from './ProductDetailsView';
import {
  productRequiredFields,
  backToFront,
  frontToBack,
} from '../../services/helpers/dataStructuring';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const customerId = useSelector(
    ({ account: { nexwayState } }) => nexwayState?.selectedCustomer?.id,
  );
  const history = useHistory();

  const [currentProductData, setCurrentProductData] = useState(defaultProduct);
  const [selectOptions, setSelectOptions] = useState({
    sellingStores: null,
    renewingProducts: null,
    subscriptionModels: null,
    catalogs: null,
    priceFunctions: null,
  });
  const [productVariations, setSubProductVariations] = useState({});

  const [isLoading, setLoading] = useState(true);
  const [productHasChanges, setProductChanges] = useState(false);

  const [productData, setProductData] = useState(null);
  const [checkOutStores, setCheckOutStores] = useState([]);
  const [productHasLocalizationChanges, setProductLocalizationChanges] = useState(false);

  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    setCurrentProductData({ ...currentProductData, customerId });
  }, [customerId]);
  // ToDo: refactor handleGetOptions props !!!
  useEffect(() => {
    const parentId = history?.state?.parentId;
    let isCancelled = false;
    parentId
      ? api.getProductById(parentId).then(({ data: product }) => {
          if (!isCancelled) {
            const checkedProduct = productRequiredFields(product);
            setProductData(checkedProduct);
            setCurrentProductData(backToFront(checkedProduct));
            setLoading(false);
          }
          const { customerId, id, descriptionId } = product;
          handleGetOptions(
            customerId,
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
          customerId,
          null,
          null,
          isCancelled,
          setSelectOptions,
          selectOptions,
          setSubProductVariations,
          () => {},
        );
    return () => {
      isCancelled = true;
    };
  }, [history?.state]);

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
    if (currentProductData?.id) {
      delete dataToSave.id;
      dataToSave.parentId = currentProductData?.id;
    }
    api.addNewProduct(dataToSave).then((res) => {
      const location = res.headers.location.split('/');
      const id = location[location.length - 1];
      dispatch(showNotification(localization.t('general.updatesHaveBeenSaved')));
      history.push(`/overview/products/${id}`);
    });
  };

  if (!customerId) {
    return <>Select customer</>;
  }
  return (
    <ProductDetailsView
      selectOptions={selectOptions}
      setProductData={setCurrentProductData}
      currentProductData={currentProductData}
      saveData={saveProduct}
      productVariations={productVariations}
      parentId={history?.state?.parentId}
      productDetails={productDetails}
      setProductLocalizationChanges={setProductLocalizationChanges}
      productHasLocalizationChanges={productHasLocalizationChanges}
    />
  );
};

export default CreateProduct;
