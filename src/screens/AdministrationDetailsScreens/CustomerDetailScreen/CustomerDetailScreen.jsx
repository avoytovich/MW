import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import {
  LinearProgress, Tabs, Tab, Zoom, Button, Box, Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';

import api from '../../../api';
import localization from '../../../localization';
import useCustomerDetailData from '../../../services/useData/useCustomerDetailData';
import {
  formatBeforeSanding,
  assetsLabels,
  checkLabelDuplicate,
} from './utils';

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
  const [curTab, setCurTab] = useState(0);

  const {
    customerData,
    currentCustomer,
    setCurrentCustomer,
    hasChanges,
    setUpdate,
    selectOptions,
  } = useCustomerDetailData(id);

  const saveCustomer = () => {
    if (id === 'add') {
      api.addCustomerById(currentCustomer).then((res) => {
        const location = res.headers.location.split('/');
        const newId = location[location.length - 1];
        toast(localization.t('general.updatesHaveBeenSaved'));
        history.push(`/settings/administration/customers/${newId}`);
        setUpdate((u) => u + 1);
      });
    } else {
      api.updateCustomerById(id, formatBeforeSanding(currentCustomer)).then(() => {
        toast(localization.t('general.updatesHaveBeenSaved'));
        setUpdate((u) => u + 1);
      });
    }
  };

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
          <Tab data-test='general' label='General' />
          <Tab data-test='features' label='Features' />
          <Tab data-test='paymentServiceConfiguration' label='Payment Service Configuration' disabled={id === 'add'} />
          <Tab data-test='reports' label='Reports' disabled={id === 'add'} />
          <Tab data-test='assets' label='Assets' disabled={id === 'add'} />
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
