import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Chip, LinearProgress, Box, Typography, Grid,
} from '@material-ui/core';

import { showNotification } from '../../redux/actions/HttpNotifications';

import localization from '../../localization';
import api from '../../api';
import generateData from '../../services/useData/tableMarkups/orderDetails';

import Products from './SubSections/Products';
import OrderRow from './OrderRow';
import Events from './SubSections/Events';
import './orderDetailsScreen.scss';

const OrderDetailsScreen = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [orderHasChanges, setOrderChanges] = useState(false);
  const [orderRows, setOrderRows] = useState(null);
  const [customer, setCustomer] = useState({ name: '-' });

  const [currentOrderData, setCurrentOrderData] = useState(null);
  const [orderData, setOrderData] = useState(null);

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

    try {
      api.getOrderById(id).then(({ data: order }) => {
        if (!isCancelled) {
          setOrderData(order);
          setCurrentOrderData(order);
        }
        Promise.allSettled([
          api.getCustomerById(order.customer?.id),
          api.getPaymentById(order.id),
        ]).then(([customerData, payment]) => {
          const rows = generateData(
            order,
            payment.value ? payment.value.data : null,
          );
          setOrderRows(rows);
          setCustomer(customerData.value ? customerData.value.data : null);
          setLoading(false);
        });
      });
    } catch (error) {
      if (!isCancelled) {
        setLoading(false);
      }
    }

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
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box display="flex" flexDirection="row">
          <Typography variant="body2" color="primary">
            {localization.t('general.order')}
            {' / '}
          </Typography>
          <Typography variant="body2" color="secondary">
            {id}
          </Typography>
        </Box>
      </Box>
      <Box py={2} mt={3}>
        <Typography gutterBottom variant="h3">
          {id}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        {customer && (
          <>
            <Box pr={2}>
              <Typography variant="body2" gutterBottom>
                {localization.t('labels.customer')}
              </Typography>
            </Box>
            <Chip
              label={customer.status === 'RUNNING' ? 'LIVE' : 'TEST'}
              style={{
                backgroundColor: customer.status === 'RUNNING' ? '#99de90' : '',
                color: '#fff',
              }}
            />
          </>
        )}
      </Box>
      {orderRows && (
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <Box my={3} bgcolor="#fff" boxShadow={2} height="100%">
              <Box py={3} pl={2}>
                <Typography gutterBottom variant="h4">
                  {localization.t('labels.general')}
                </Typography>
              </Box>
              <OrderRow
                customerId={currentOrderData.customer?.id}
                creationDate={currentOrderData.createDate}
                rowData={orderRows.general}
              />
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box my={3} bgcolor="#fff" boxShadow={2} height="100%">
              <Box py={3} pl={2}>
                <Typography gutterBottom variant="h4">
                  {localization.t('labels.endUser')}
                </Typography>
              </Box>

              <OrderRow rowData={orderRows.endUser} />
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box my={3} bgcolor="#fff" boxShadow={2} height="100%">
              <Box py={3} pl={2}>
                <Typography gutterBottom variant="h4">
                  {localization.t('labels.paymentAttempt1_1')}
                </Typography>
              </Box>
              <OrderRow rowData={orderRows.paymentAttempt} />
            </Box>
          </Grid>
        </Grid>
      )}

      <Products orderData={orderData} />
      <Events orderData={orderData} />
    </>
  );
};

export default OrderDetailsScreen;
