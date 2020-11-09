import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  LinearProgress,
  Box,
  Typography,
  Zoom,
  Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { FolderOpen } from '@material-ui/icons';
import localization from '../../localization';
import { showNotification } from '../../redux/actions/HttpNotifications';
import OrderDetails from '../../components/OrderDetails';
import api from '../../api';

const OrderDetailsScreen = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [orderHasChanges, setOrderChanges] = useState(false);

  const [currentOrderData, setCurrentOrderData] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentProductsData, setCurrentProductsData] = useState(null);

  const saveDetails = () => {
    api.updateOrderById(currentOrderData.id, currentOrderData).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      window.location.reload();
    });
  };

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
    setOrderChanges(
      JSON.stringify(currentOrderData) !== JSON.stringify(orderData),
    );
    return () => {
      setOrderChanges(false);
    };
  }, [currentOrderData, orderData]);

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
      <Zoom in={orderHasChanges}>
        <Button
          id="save-detail-button"
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={saveDetails}
        >
          {/* toDo Add localization */}
          Save
        </Button>
      </Zoom>
      {currentOrderData && (
        <OrderDetails
          currentOrderData={currentOrderData}
          orderData={orderData}
          setCurrentOrderData={setCurrentOrderData}
          customer={currentCustomer}
          productsData={currentProductsData}
        />
      )}
    </>
  );
};

export default OrderDetailsScreen;
