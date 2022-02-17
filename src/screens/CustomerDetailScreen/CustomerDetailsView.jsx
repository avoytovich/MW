import React from 'react';
import PropTypes from 'prop-types';

import {
  assetsLabels,
} from './utils';

import TabSection from '../../components/utils/TabSection';
import General from './SubSections/General';
import Features from './SubSections/Features';
import AssetsResource from '../../components/AssetsResoursesWithSelectLabel';
import PaymentServiceConfiguration from './SubSections/PaymentServiceConfiguration';
import LocalizedContactPageUrl from './SubSections/LocalizedContactPageUrl';

import './CustomerDetailScreen.scss';

const defaultResources = { key: 0, label: null, url: null };

const CustomerDetailsView = ({
  currentCustomer, setCurrentCustomer, selectOptions, curTab,
}) => (
  <>
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
    {curTab === 5 && currentCustomer && (
      <TabSection label='localizedContactPageUrl'>
        <LocalizedContactPageUrl
          currentCustomer={currentCustomer}
          setCurrentCustomer={setCurrentCustomer}
        />
      </TabSection>
    )}
  </>
);

CustomerDetailsView.propTypes = {
  setCurrentCustomer: PropTypes.func,
  currentCustomer: PropTypes.object,
  selectOptions: PropTypes.object,
  id: PropTypes.string,
  curTab: PropTypes.number,
};

export default CustomerDetailsView;
