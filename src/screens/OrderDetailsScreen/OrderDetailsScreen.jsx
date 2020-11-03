import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress, Box, Typography } from '@material-ui/core';
import { FolderOpen } from '@material-ui/icons';
import OrderDetails from '../../components/OrderDetails';
import api from '../../api';

const OrderDetailsScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  const [currentOrderData, setCurrentOrderData] = useState(null);

  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentProductsData, setCurrentProductsData] = useState(null);
  useEffect(() => {
    let isCancelled = false;
    const productsIds = [];

    const requests = async () => {
      try {
        const order = await api.getOrderById(id);
        order.data.lineItems.forEach((item) => {
          const product = `id=${item.productId}`;
          if (!productsIds.includes(product)) {
            productsIds.push(product);
          }
        });
        const products = await api.getProductsByIds(productsIds.join('&'));
        const customer = await api.getCustomerById(order?.data?.customer?.id);

        if (!isCancelled) {
          setCurrentOrderData(order.data);
          setCurrentCustomer(customer.data.name);
          setCurrentProductsData(products.data);
          setLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };
    requests();
    return () => {
      isCancelled = true;
    };
  }, []);

  if (isLoading) return <LinearProgress />;
  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box>
          <FolderOpen color="secondary" />
        </Box>
        <Box>
          <Typography component="div" color="primary">
            {/* toDo Add localization */}
            <Box fontWeight={500}> Order</Box>
          </Typography>
        </Box>
      </Box>
      <OrderDetails
        orderData={currentOrderData}
        setOrderData={setCurrentOrderData}
        customer={currentCustomer}
        productsData={currentProductsData}
      />
    </>
  );
};

export default OrderDetailsScreen;
