import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab, Box } from '@material-ui/core';

import {
  assetsLabels,
} from './utils';

import TabSection from '../../components/utils/TabSection';
import General from './SubSections/General';
import Features from './SubSections/Features';
import AssetsResource from '../../components/AssetsResoursesWithSelectLabel';
import PaymentServiceConfiguration from './SubSections/PaymentServiceConfiguration';

import './CustomerDetailScreen.scss';

const defaultResources = { key: 0, label: null, url: null };

const CustomerDetailsView = ({
  currentCustomer, setCurrentCustomer, selectOptions, id,
}) => {
  const [curTab, setCurTab] = useState(0);

  return (
    <>
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
            resources={
              currentCustomer?.assets?.length ? currentCustomer.assets : [{ ...defaultResources }]
            }
            setResources={(newValue) => {
              setCurrentCustomer({ ...currentCustomer, assets: newValue });
            }}
          />
        </TabSection>
      )}
    </>
  );
};
CustomerDetailsView.propTypes = {
  setCurrentCustomer: PropTypes.func,
  currentCustomer: PropTypes.object,
  selectOptions: PropTypes.object,
  id: PropTypes.string,
};

export default CustomerDetailsView;
