import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { useDetailsData } from '../../services/useData';
import DetailLayout from '../../layouts/DetailLayout';
import api from '../../api';
import generateData from '../../services/useData/tableMarkups/storeDetails';

const StoreDetailsScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  const requests = async () => {
    let payload = null;
    const storeData = await api.getStoreById(id);
    const customer = await api.getCustomerById(storeData?.data?.customerId);
    payload = generateData(storeData.data, customer.data.name);
    return payload;
  };

  const store = useDetailsData(setLoading, requests);
  if (isLoading) return <LinearProgress />;

  return store ? <DetailLayout data={store} /> : <></>;
};

export default StoreDetailsScreen;
