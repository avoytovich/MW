import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import {
  LinearProgress, Tabs, Tab, Zoom, Button, Box, Typography,
} from '@material-ui/core';
import { structureSelectOptions } from '../../../services/helpers/dataStructuring';
import api from '../../../api';
import localization from '../../../localization';
import {
  checkRequiredFields,
  formatBeforeSanding,
  formatPaymentOptions,
  assetsLabels,
  checkLabelDuplicate,
} from './utils';
import { showNotification } from '../../../redux/actions/HttpNotifications';
import TabSection from '../../../components/utils/TabSection';
import General from './SubSections/General';
import Features from './SubSections/Features';
import AssetsResource from '../../../components/AssetsResoursesWithSelectLabel';
import PaymentServiceConfiguration from './SubSections/PaymentServiceConfiguration';
import CustomBreadcrumbs from '../../../components/utils/CustomBreadcrumbs';

import './CustomerDetailScreen.scss';

const CustomerDetailScreen = () => {
  const history = useHistory();

  const { id } = useParams();
  const dispatch = useDispatch();
  const [hasChanges, setHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);
  const [selectOptions, setSelectOptions] = useState({
    subscriptions: null,
    fulfillments: null,
    additionalPaymentTypes: null,
    blackPaymentTypes: null,
    forcedPaymentTypes: null,
  });
  const [customerData, setCustomerData] = useState(null);
  const [curTab, setCurTab] = useState(0);

  const [currentCustomer, setCurrentCustomer] = useState(null);

  const saveCustomer = () => {
    if (id === 'add') {
      api.addCustomerById(currentCustomer).then((res) => {
        const location = res.headers.location.split('/');
        const newId = location[location.length - 1];
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        history.push(`/settings/administration/customers/${newId}`);
        setUpdate((u) => u + 1);
      });
    } else {
      api.updateCustomerById(id, formatBeforeSanding(currentCustomer)).then(() => {
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        setUpdate((u) => u + 1);
      });
    }
  };

  useEffect(() => {
    let customerRequest;
    const createCustomer = id === 'add';
    if (id === 'add') {
      customerRequest = Promise.resolve({
        data: {},
      });
    } else {
      customerRequest = api.getCustomerById(id);
    }
    customerRequest.then(({ data }) => {
      const checkedData = checkRequiredFields(data, createCustomer);
      setCustomerData(checkedData);
      setCurrentCustomer(checkedData);
      Promise.allSettled([
        api.getSubscriptionsOptions(),
        api.getFulfillmentsOptions(),
        api.getPaymentConfigOptions(),
      ]).then(([subscriptionsOptions, fulfillmentsOptions, paymentTypesOptions]) => {
        const allPayments = formatPaymentOptions(paymentTypesOptions.value?.data.paymentTypes);
        setSelectOptions({
          ...selectOptions,
          subscriptions: structureSelectOptions(subscriptionsOptions.value?.data.items, 'code') || [],
          fulfillments: structureSelectOptions(fulfillmentsOptions.value?.data.items, 'name') || [],
          additionalPaymentTypes: allPayments.additional || [],
          blackPaymentTypes: allPayments.black || [],
          forcedPaymentTypes: allPayments.forced || [],
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
            disabled={checkLabelDuplicate(currentCustomer.assets)}
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
          <Tab label='Payment Service Configuration' disabled={id === 'add'} />
          <Tab label='Reports' disabled={id === 'add'} />
          <Tab label='Assets' disabled={id === 'add'} />
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
        <TabSection label='features'>
          <Features
            currentCustomer={currentCustomer}
            setCurrentCustomer={setCurrentCustomer}
          />
        </TabSection>
      )}
      {curTab === 2 && currentCustomer && (
        <TabSection label='paymentServiceConfiguration'>
          <PaymentServiceConfiguration
            currentCustomer={currentCustomer}
            setCurrentCustomer={setCurrentCustomer}
            selectOptions={selectOptions}
          />
        </TabSection>
      )}
      {curTab === 3 && currentCustomer && (
        <TabSection label='reports' />
      )}
      {curTab === 4 && currentCustomer && (
        <TabSection label='assets'>
          <AssetsResource
            labelOptions={assetsLabels}
            maxPayloadFiles={2}
            resources={currentCustomer.assets}
            setResources={(newValue) => {
              setCurrentCustomer({ ...currentCustomer, assets: newValue });
            }}
          />
        </TabSection>
      )}

    </div>
  );
};

export default CustomerDetailScreen;
