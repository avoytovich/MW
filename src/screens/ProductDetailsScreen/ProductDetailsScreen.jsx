import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import api from '../../api';
import generateData from '../../services/useData/tableMarkups/productDetails';

import { useDetailsData } from '../../services/useData';
import DetailLayout from '../../layouts/DetailLayout';

const ProductDetailsScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  const requests = async () => {
    let store = '';
    let payload = null;
    const productData = await api.getProductById(id);
    const storesId = productData.data?.sellingStores?.[0];
    if (storesId) {
      const storeFetch = await api.getStoreById(storesId);
      store = storeFetch?.data?.name;
    }
    payload = generateData(productData.data, store);
    return payload;
  };
  const product = useDetailsData(setLoading, requests);

  if (isLoading) return <LinearProgress />;
  return product ? <DetailLayout data={product} /> : <></>;
};

export default ProductDetailsScreen;
