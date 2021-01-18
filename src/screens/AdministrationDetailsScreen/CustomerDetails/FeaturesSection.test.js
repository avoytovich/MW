import React from 'react';
import { mount } from 'enzyme';
import FeaturesSection from './FeaturesSection';

let currentCustomer = {
  features: {
    sgOrdersManagement: false,
    connectManagement: true,
    resellerManagement: false,
    onboardingManagement: true,
    remittanceManagement: true,
    productManagement: true,
    seller: true,
    sellOnBehalf: true,
    createInvoice: true,
    sendOrderConfirmationEmail: true,
    subscriptionUpgradeAuthorized: true,
    usingSubscriptionV1: true,
    usingFulfillmentV1: false,
    usingBillingPlan: true,
  },
};

describe('AdministrationDetailsScreen <FeaturesSection/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <FeaturesSection
        setCurrentCustomer={(newData) => {
          currentCustomer = newData;
        }}
        currentCustomer={currentCustomer}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('input should be populated with customer.features', () => {
    expect(
      wrapper.find(
        `input[name="resellerManagement"][checked="${currentCustomer.features.resellerManagement}"]`,
      ).exists,
    ).toBeTruthy();
    expect(
      wrapper.find(
        `input[name="onboardingManagement"][checked="${currentCustomer.features.onboardingManagement}"]`,
      ).exists,
    ).toBeTruthy();
    expect(
      wrapper.find(
        `input[name="remittanceManagement"][checked="${currentCustomer.features.remittanceManagement}"]`,
      ).exists,
    ).toBeTruthy();
    expect(
      wrapper.find(
        `input[name="productManagement"][checked="${currentCustomer.features.productManagement}"]`,
      ).exists,
    ).toBeTruthy();
    expect(
      wrapper.find(
        `input[name="seller"][checked="${currentCustomer.features.seller}"]`,
      ).exists,
    ).toBeTruthy();
    expect(
      wrapper.find(
        `input[name="sellOnBehalf"][checked="${currentCustomer.features.sellOnBehalf}"]`,
      ).exists,
    ).toBeTruthy();
    expect(
      wrapper.find(
        `input[name="createInvoice"][checked="${currentCustomer.features.createInvoice}"]`,
      ).exists,
    ).toBeTruthy();
    expect(
      wrapper.find(
        `input[name="sendOrderConfirmationEmail"][checked="${currentCustomer.features.sendOrderConfirmationEmail}"]`,
      ).exists,
    ).toBeTruthy();
    expect(
      wrapper.find(
        `input[name="subscriptionUpgradeAuthorized"][checked="${currentCustomer.features.subscriptionUpgradeAuthorized}"]`,
      ).exists,
    ).toBeTruthy();
    expect(
      wrapper.find(
        `input[name="usingSubscriptionV1"][checked="${currentCustomer.features.usingSubscriptionV1}"]`,
      ).exists,
    ).toBeTruthy();
    expect(
      wrapper.find(
        `input[name="usingFulfillmentV1"][checked="${currentCustomer.features.usingFulfillmentV1}"]`,
      ).exists,
    ).toBeTruthy();
  });

  it('should change currentCustomer when some update is made', async () => {
    wrapper
      .find('input[name="resellerManagement"]')
      .simulate('change', {
        target: { checked: false },
      });
    expect(currentCustomer.features.resellerManagement).toEqual(false);
  });
});
