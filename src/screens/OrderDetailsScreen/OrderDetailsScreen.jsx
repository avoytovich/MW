import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Chip,
  LinearProgress,
  Box,
  Typography,
  Grid,
  Button,
  Menu,
  MenuItem,
  Tabs,
  Tab,
} from '@material-ui/core';

import { showNotification } from '../../redux/actions/HttpNotifications';

import localization from '../../localization';
import api from '../../api';
import generateData from '../../services/useData/tableMarkups/orderDetails';
import { tabLabels } from './utils';
import Products from './SubSections/Products';
import OrderRow from './OrderRow';
import Events from './SubSections/Events';
import ConfirmationPopup from '../../components/Popup/ConfirmationPopup/index';
import CancelOrderPopup from '../../components/Popup/CancelOrderPopup/index';
import './orderDetailsScreen.scss';

const OrderDetailsScreen = () => {
  const dispatch = useDispatch();
  const [curTab, setCurTab] = useState(0);

  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [orderHasChanges, setOrderChanges] = useState(false);
  const [orderRows, setOrderRows] = useState(null);
  const [customer, setCustomer] = useState({ name: '-' });

  const [currentOrderData, setCurrentOrderData] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

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
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
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
                    backgroundColor:
                      customer.status === 'RUNNING' ? '#99de90' : '',
                    color: '#fff',
                  }}
                />
              </>
            )}
          </Box>
        </Box>

        <Box display="flex" alignItems="flex-end">
          <Button
            aria-haspopup="true"
            variant="contained"
            color="primary"
            aria-controls="checkoutMenu"
            onClick={handleClick}
            size="large"
          >
            Actions
          </Button>
          <Menu
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <ConfirmationPopup />
            </MenuItem>
            <MenuItem>
              <CancelOrderPopup />
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box my={2} bgcolor="#fff">
        <Tabs
          value={curTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setCurTab(newValue);
          }}
          aria-label="disabled tabs example"
        >
          {tabLabels.map((tab) => (
            <Tab key={tab} label={localization.t(`labels.${tab}`)} />
          ))}
        </Tabs>
      </Box>
      {curTab === 0 && orderRows && (
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
      {curTab === 1 && <Products orderData={orderData} />}
      {curTab === 2 && <Events orderData={orderData} />}
    </>
  );
};

export default OrderDetailsScreen;
