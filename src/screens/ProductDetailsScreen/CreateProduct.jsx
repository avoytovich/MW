import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import api from '../../api';
import { showNotification } from '../../redux/actions/HttpNotifications';
import handleGetOptions from './utils';
import { defaultProduct } from '../../services/helpers/dataStructuring';
import localization from '../../localization';
import ProductDetailsView from './ProductDetailsView';

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

  useEffect(() => {
    setCurrentProductData({ ...currentProductData, customerId });
  }, [customerId]);

  useEffect(() => {
    let isCancelled = false;
    handleGetOptions(customerId, isCancelled, setSelectOptions, selectOptions);
    return () => {
      isCancelled = true;
    };
  }, []);

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
  if (!customerId) {
    return <>Select customer</>;
  }
  return (
    <ProductDetailsView
      selectOptions={selectOptions}
      setProductData={setCurrentProductData}
      currentProductData={currentProductData}
      saveData={saveProduct}
    />
  );
};

export default CreateProduct;
