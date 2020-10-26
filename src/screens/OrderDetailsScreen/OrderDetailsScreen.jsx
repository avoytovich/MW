import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { useDetailsData } from '../../services/useData';
import DetailLayout from '../../layouts/DetailLayout';
import api from '../../api';
import generateData from '../../services/useData/tableMarkups/orderDetails';

const OrderDetailsScreen = () => {
  const [isLoading, setLoading] = useState(true);

  const { id } = useParams();

  const requests = async () => {
    let payload = null;
    const productsIds = [];
    const orderData = await api.getOrderById(id);
    orderData.data.lineItems.forEach((item) => {
      const product = `id=${item.productId}`;
      if (!productsIds.includes(product)) {
        productsIds.push(product);
      }
    });
    const products = await api.getProductsByIds(productsIds.join('&'));
    const customer = await api.getCustomerById(orderData?.data?.customer?.id);
    payload = generateData(orderData.data, customer.data.name, products.data);
    return payload;
  };

  const order = useDetailsData(setLoading, requests);

  if (isLoading) return <LinearProgress />;
  return order ? <DetailLayout data={order} /> : <></>;
};

export default OrderDetailsScreen;
