import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  LinearProgress, Tabs, Tab, Zoom, Button,
} from '@material-ui/core';
import { structureSelectOptions } from '../../../services/helpers/dataStructuring';
import CustomerDetails from './CustomerDetails';
import api from '../../../api';
import localization from '../../../localization';
import checkRequiredFields from './utils';
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

  const saveCustomer = () => {
    api.updateCustomerById(id, currentCustomer).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      setUpdate((u) => u + 1);
    });
  };

  useEffect(() => {
    let customerRequest;
    if (id === 'add') {
      customerRequest = Promise.resolve({
        data: {},
      });
    } else {
      customerRequest = api.getCustomerById(id);
    }
    customerRequest.then(({ data }) => {
      const checkedData = checkRequiredFields(data);
      console.log('CheckedData', checkedData)

      setCustomerData(checkedData);
      setCurrentCustomer(checkedData);
      Promise.allSettled([
        api.getSubscriptionsOptions(),
        api.getFulfillmentsOptions(),
        api.getPaymentConfigOptions(),
      ]).then(([subscriptionsOptions, fulfillmentsOptions, paymentTypesOptions]) => {
        setSelectOptions({
          ...selectOptions,
          subscriptions: structureSelectOptions(subscriptionsOptions.value?.data.items, 'code') || [],
          fulfillments: structureSelectOptions(fulfillmentsOptions.value?.data.items, 'name') || [],
          paymentTypes: paymentTypesOptions.value?.data.paymentTypes,
        });
      });
    });
  }, [curTab, update]);
  console.log('selectOptions',selectOptions)

  useEffect(() => {
    setHasChanges(
      JSON.stringify(currentCustomer) !== JSON.stringify(customerData),
    );
    return () => setHasChanges(false);
  }, [currentCustomer]);

  if (currentCustomer === null) return <LinearProgress />;
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
