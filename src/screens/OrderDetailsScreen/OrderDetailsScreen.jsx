import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  LinearProgress,
  Zoom,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import { FolderOpen } from '@material-ui/icons';
import OrderDetails from '../../components/OrderDetails';
import api from '../../api';

const OrderDetailsScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [storeHasChanges, setStoreChanges] = useState(false);

  const [orderData, setOrderData] = useState(null);
  const [currentOrderData, setCurrentOrderData] = useState(null);

  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentProductsData, setCurrentProductsData] = useState(null);
  const saveDetails = () => {};

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
          setOrderData(order.data);
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

  useEffect(() => {
    setStoreChanges(
      JSON.stringify(currentOrderData) !== JSON.stringify(orderData),
    );
    return () => {
      setStoreChanges(false);
    };
  }, [currentOrderData]);

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
            <Box fontWeight={500}> Store</Box>
          </Typography>
        </Box>
      </Box>
      <Zoom in={storeHasChanges}>
        <Button
          id="save-detail-button"
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={saveDetails}
        >
          Save
        </Button>
      </Zoom>
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
