import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  LinearProgress,
  Box,
  Typography,
  Zoom,
  Button,
} from '@material-ui/core';

import { FolderOpen } from '@material-ui/icons';

import { showNotification } from '../../redux/actions/HttpNotifications';

import localization from '../../localization';
import api from '../../api';

import General from './SubSections/General';
import EndUser from './SubSections/EndUser';
import Payments from './SubSections/Payments';
import Products from './SubSections/Products';
// import Subscriptions from './SubSections/Subscriptions';
import Events from './SubSections/Events';

const OrderDetailsScreen = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [orderHasChanges, setOrderChanges] = useState(false);

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

    (async () => {
      try {
        const order = await api.getOrderById(id);

        if (!isCancelled) {
          setOrderData(order.data);
          setCurrentOrderData(order.data);
          setLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    })();

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
          <Box>
            <FolderOpen color="secondary" />
          </Box>
          <Box ml={2}>
            <Typography component="div" color="primary">
              <Box fontWeight={500}>
                {localization.t('general.order')}
                {' / '}
                {id}
              </Box>
            </Typography>
          </Box>
        </Box>

        <Zoom in={orderHasChanges}>
          <Box mb={1}>
            <Button
              id="save-detail-button"
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              onClick={saveDetails}
            >
              {localization.t('general.save')}
            </Button>
          </Box>
        </Zoom>
      </Box>

      <Box display="flex">
        <Box pr={1} width="100%">
          <General orderData={orderData} />
        </Box>

        <Box pl={1} width="100%">
          <EndUser orderData={orderData} />
        </Box>
      </Box>

      <Payments orderData={orderData} />

      <Products orderData={orderData} />

      {/* <Subscriptions orderData={orderData} /> */}

      <Events orderData={orderData} />
    </>
  );
};

export default OrderDetailsScreen;
