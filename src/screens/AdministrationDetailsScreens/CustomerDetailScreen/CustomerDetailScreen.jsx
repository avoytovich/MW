import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  LinearProgress, Tabs, Tab, Zoom, Button,
} from '@material-ui/core';
import CustomerDetails from './CustomerDetails';
import api from '../../../api';
import localization from '../../../localization';

import { showNotification } from '../../../redux/actions/HttpNotifications';

import './CustomerDetailScreen.scss';

const CustomerDetailScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [hasChanges, setHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);
  const [selectOptions, setSelectOptions] = useState({
    subscriptions: null,
    fulfillments: null,
    availablePaymentTypes: null,
    blackPaymentTypes: null,
  });
  const [customerData, setCustomerData] = useState(null);
  const [curTab, setCurTab] = useState(0);

  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const saveCustomer = () => {
    api.updateCustomerById(id, currentCustomer).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      setUpdate((u) => u + 1);
    });
  };
  const checkIfValuesExist = (data) => {
    let res = { ...data };
    if (!data.paymentServiceConfiguration.availableAdditionalPaymentTypes) {
      res = {
        ...res,
        paymentServiceConfiguration: {
          ...res.paymentServiceConfiguration,
          availableAdditionalPaymentTypes: [],
        },
      };
    }
    if (!data.paymentServiceConfiguration.blackListedPaymentTypes) {
      res = {
        ...res,
        paymentServiceConfiguration: {
          ...res.paymentServiceConfiguration,
          blackListedPaymentTypes: [],
        },
      };
    }
    return res;
  };
  useEffect(() => {
    let isCancelled = false;
    const requests = async () => {
      try {
        const customer = await api.getCustomerById(id);
        const subscriptionsOptions = await api.getSubscriptionsOptions();
        const fulfillmentsOptions = await api.getFulfillmentsOptions();
        const paymentTypesOptions = await api.getPaymentConfigOptions();
        if (!isCancelled) {
          const CheckedData = checkIfValuesExist(customer.data);
          setCustomerData(CheckedData);
          setCurrentCustomer(CheckedData);
          setSelectOptions({
            ...selectOptions,
            subscriptions: subscriptionsOptions.data.items,
            fulfillments: fulfillmentsOptions.data.items,
            paymentTypes: paymentTypesOptions.data.paymentTypes,
          });
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
  }, [curTab, update]);

  useEffect(() => {
    setHasChanges(
      JSON.stringify(currentCustomer) !== JSON.stringify(customerData),
    );
    return () => setHasChanges(false);
  }, [currentCustomer]);

  if (isLoading) return <LinearProgress />;
  return (
    <div className='customerAdministration-screen'>
      <Tabs
        value={curTab}
        onChange={(newTab) => setCurTab(newTab)}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label='Customer' />
      </Tabs>

      {curTab === 0 && currentCustomer && (
        <CustomerDetails
          currentCustomer={currentCustomer}
          setCurrentCustomer={setCurrentCustomer}
          selectOptions={selectOptions}
        />
      )}

      <Zoom in={hasChanges}>
        <Button
          id='save-customerAdministration-button'
          color='primary'
          size='large'
          type='submit'
          variant='contained'
          onClick={saveCustomer}
        >
          {localization.t('forms.buttons.save')}
        </Button>
      </Zoom>
    </div>
  );
};

export default CustomerDetailScreen;
