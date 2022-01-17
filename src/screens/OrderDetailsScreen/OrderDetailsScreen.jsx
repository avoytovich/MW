import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
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
import CustomerStatusLabel from '../../components/utils/CustomerStatusLabel';
import ConfirmationPopup from '../../components/Popup/ConfirmationPopup/index';
import CancelOrderPopup from '../../components/Popup/CancelOrderPopup/index';
import { tabLabels } from './utils';

const OrderDetailsScreen = () => {
  const [curLanguage, setCurLanguage] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [update, setUpdate] = useState(0);
  const { id } = useParams();
  const [orderRows, setOrderRows] = useState(null);
  const [customer, setCustomer] = useState({ name: '-' });
  const [curTab, setCurTab] = useState(0);
  const [currentOrderData, setCurrentOrderData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const resyncPayment = () => {
    api
      .resyncPayments(currentOrderData?.id)
      .then(() => toast(localization.t('general.updatesHaveBeenSaved')));
  };

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

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
        const sud = [];
        order.lineItems.forEach(((item) => {
          if (item.subscriptionId) {
            sud.push(api.getSubscriptionById(item.subscriptionId));
          }
        }
        ));
        if (sud.length > 0) {
          Promise.allSettled([...sud]).then((sudData) => {
            const subscriptionData = [];
            sudData.forEach((e) => {
              if (e.value?.data) {
                subscriptionData.push(e.value?.data);
              }
            });
            setSubscriptions(subscriptionData);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      });
    }).catch(() => {
      setLoading(false);
    });
    return () => {
      isCancelled = true;
    };
  }, [update]);

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
      extraHeader={<CustomerStatusLabel customer={customer} />}
      tabs={{
        curTab,
        setCurTab,
        tabLabels,
      }}
    >
      <OrderDetailsView
        setUpdate={setUpdate}
        subscriptions={subscriptions}
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
