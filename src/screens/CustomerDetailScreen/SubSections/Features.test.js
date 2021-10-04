import React from 'react';
import { shallow } from 'enzyme';
import { FormControlLabel } from '@material-ui/core';
import Features from './Features';

const features = {
  createInvoice: true,
  onboardingManagement: true,
  productManagement: true,
  remittanceManagement: true,
  resellerManagement: true,
  sellOnBehalf: true,
  seller: true,
  sendOrderConfirmationEmail: true,
  sgOrdersManagement: true,
  subscriptionUpgradeAuthorized: true,
  usingFulfillmentV1: true,
  usingSubscriptionV1: true,
}


describe('CustomerDetailScreen <Features/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Features
        currentCustomer={{ features: features }}
        setCurrentCustomer={jest.fn()}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should return correct number of FormControlLabels', () => {
    expect(wrapper.find(FormControlLabel).length).toEqual(Object.keys(features).length)
  });
});
