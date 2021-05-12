import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  LinearProgress, Tabs, Tab, Zoom, Button, Box, Typography,
} from '@material-ui/core';
import { structureSelectOptions } from '../../../services/helpers/dataStructuring';
import api from '../../../api';
import localization from '../../../localization';
import { checkRequiredFields, formatBeforeSanding } from './utils';
import { showNotification } from '../../../redux/actions/HttpNotifications';
import TabSection from '../../../components/utils/TabSection';
import General from './SubSections/General';
import CustomBreadcrumbs from '../../../components/utils/CustomBreadcrumbs';

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
    api.updateCustomerById(id, formatBeforeSanding(currentCustomer)).then(() => {
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
  }, [update]);

  useEffect(() => {
    setHasChanges(
      JSON.stringify(currentCustomer) !== JSON.stringify(customerData),
    );
    return () => setHasChanges(false);
  }, [currentCustomer]);

  if (currentCustomer === null) return <LinearProgress />;
  return (
    <div className='customerAdministration-screen'>
      {id !== 'add' && (
        <Box mx={2}>
          <CustomBreadcrumbs
            url='/settings/administration/customers'
            section={localization.t('general.customer')}
            id={customerData.id}
          />
        </Box>
      )}
      <Box
        display='flex'
        flexDirection='row'
        m={2}
        justifyContent='space-between'
      >
        <Box alignSelf='center'>
          <Typography data-test='discountName' gutterBottom variant='h3'>
            {customerData.name}
          </Typography>
        </Box>
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
      </Box>
      <Box my={2} bgcolor='#fff'>
        <Tabs
          value={curTab}
          onChange={(e, newTab) => setCurTab(newTab)}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label='General' />
          <Tab label='Features' />
          <Tab label='Payment Service Configuration' />
          <Tab label='Assets' />
        </Tabs>
      </Box>
      {curTab === 0 && currentCustomer && (
        <TabSection label='general'>
          <General
            currentCustomer={currentCustomer}
            setCurrentCustomer={setCurrentCustomer}
            selectOptions={selectOptions}
          />
        </TabSection>
      )}
      {curTab === 1 && currentCustomer && (
        <TabSection label='features' />
      )}
      {curTab === 2 && currentCustomer && (
        <TabSection label='paymentServiceConfiguration' />
      )}
      {curTab === 3 && currentCustomer && (
        <TabSection label='assets' />
      )}

    </div>
  );
};

export default CustomerDetailScreen;
