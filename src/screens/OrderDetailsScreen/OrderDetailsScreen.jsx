import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Chip,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';

import { toast } from 'react-toastify';
import parentPaths from '../../services/paths';
import localization from '../../localization';
import api from '../../api';
import { generateData } from '../../services/useData/tableMarkups/orderDetails';

import OrderDetailsView from './OrderDetailsView';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import ConfirmationPopup from '../../components/Popup/ConfirmationPopup/index';
import CancelOrderPopup from '../../components/Popup/CancelOrderPopup/index';
import { tabLabels } from './utils';

const OrderDetailsScreen = () => {
  const [curLanguage, setCurLanguage] = useState('');
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [orderRows, setOrderRows] = useState(null);
  const [customer, setCustomer] = useState({ name: '-' });
  const [curTab, setCurTab] = useState(0);
  const [currentOrderData, setCurrentOrderData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const resyncPayment = () => {
    api
      .resyncPayments(currentOrderData?.id)
      .then(() => toast(localization.t('general.updatesHaveBeenSaved')));
  };

  useEffect(() => {
    let isCancelled = false;

    api.getOrderById(id).then(({ data: order }) => {
      if (!isCancelled) {
        setOrderData(order);
        setCurrentOrderData(order);
        setCurLanguage(order.endUser.locale);
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
    }).catch(() => {
      setLoading(false);
    });
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <DetailPageWrapper
      nxStateNotNeeded
      id={id}
      name={`${localization.t('labels.order')} ${localization.t('labels.id')} ${currentOrderData?.id}`}
      isLoading={isLoading}
      curParentPath={parentPaths.orderlist}
      curData={currentOrderData}
      addFunc={null}
      updateFunc={null}
      beforeSend={null}
      extraActions={(
        <Box display='flex' alignItems='flex-end'>
          <Button
            aria-haspopup='true'
            variant='contained'
            color='primary'
            aria-controls='checkoutMenu'
            onClick={handleClick}
            size='large'
          >
            {localization.t('forms.buttons.actions')}
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
            <MenuItem><ConfirmationPopup currentOrderData={currentOrderData} id={id} /></MenuItem>
            <MenuItem onClick={resyncPayment}>
              <Button color="inherit" fullWidth>{localization.t('forms.buttons.resyncPayments')}</Button>
            </MenuItem>
            <MenuItem><CancelOrderPopup currentOrderData={currentOrderData} id={id} /></MenuItem>
          </Menu>
        </Box>
      )}
      extraHeader={(
        <Box display='flex' flexDirection='row' justifyContent='space-between'>
          <Box display='flex' flexDirection='column'>
            <Box display='flex' alignItems='center'>
              {customer && (
                <>
                  <Box p={2}>
                    <Typography variant='body2' gutterBottom>
                      {customer.name}
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
        </Box>
      )}
      tabs={{
        curTab,
        setCurTab,
        tabLabels,
      }}
    >
      <OrderDetailsView
        orderData={orderData}
        currentOrderData={currentOrderData}
        customer={customer}
        orderRows={orderRows}
        curLanguage={curLanguage}
        id={id}
        curTab={curTab}
      />
    </DetailPageWrapper>
  );
};

export default OrderDetailsScreen;
