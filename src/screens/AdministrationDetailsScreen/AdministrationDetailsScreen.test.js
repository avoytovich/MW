import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Tab } from '@material-ui/core';
import CustomerDetails from './CustomerDetails';
import AdministrationDetailsScreen from './AdministrationDetailsScreen';
import api from '../../api';

jest.mock('../../api', () => ({
  getCustomerById: jest.fn(),
  getSubscriptionsOptions: jest.fn(),
  getFulfillmentsOptions: jest.fn(),
  getPaymentConfigOptions: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ id: 12 })),
}));

const customerData = {
  id: 'test_id',
  status: 'RUNNING',
  fulfillments: { avast: 'avast' },
  subscriptions: { CASTOR_ABO_1Y_30P: 'CASTOR_ABO_1Y_30P' },
  paymentServiceConfiguration: {
    promoteOneClickPayment: false,
    blackListedPaymentTypes: ['amex'],
    availableAdditionalPaymentTypes: ['invoice'],
    maxPaymentsParts: 1,
    minPaymentAmountInPercent: 10,
    signedPartialAmountRequired: false,
  },
  features: {
    sgOrdersManagement: false,
    connectManagement: false,
    resellerManagement: false,
    onboardingManagement: false,
    remittanceManagement: false,
    productManagement: true,
    seller: true,
    sellOnBehalf: true,
    createInvoice: true,
    sendOrderConfirmationEmail: true,
    subscriptionUpgradeAuthorized: false,
    usingSubscriptionV1: false,
    usingFulfillmentV1: false,
    usingBillingPlan: false,
  },
};

const mockSetState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init) => [init, mockSetState]);

describe('<AdministrationDetailsScreen/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when component mounts', () => {
    it('should call api.getCustomerById', () => {
      mount(<AdministrationDetailsScreen />);
      expect(api.getCustomerById).toHaveBeenCalledTimes(1);
      expect(api.getCustomerById).toHaveBeenCalledWith(12);
    });

    it('should call api.getSubscriptionsOptions', async () => {
      api.getCustomerById.mockImplementation(() =>
        Promise.resolve({
          data: 'dta',
        }),
      );
      mount(<AdministrationDetailsScreen />);
      await api.getCustomerById();
      expect(api.getSubscriptionsOptions).toHaveBeenCalledTimes(1);
    });

    it('should call api.getFulfillmentsOptions', async () => {
      api.getCustomerById.mockImplementation(() =>
        Promise.resolve({
          data: 'data',
        }),
      );
      api.getSubscriptionsOptions.mockImplementation(() =>
        Promise.resolve({ data: { items: [] } }),
      );
      mount(<AdministrationDetailsScreen />);
      await api.getCustomerById();
      await api.getSubscriptionsOptions();
      expect(api.getFulfillmentsOptions).toHaveBeenCalledTimes(1);
    });
  });

  it('should call api.getPaymentConfigOptions', async () => {
    api.getCustomerById.mockImplementation(() =>
      Promise.resolve({
        data: customerData,
      }),
    );
    api.getSubscriptionsOptions.mockImplementation(() =>
      Promise.resolve({ data: { items: [] } }),
    );
    api.getFulfillmentsOptions.mockImplementation(() =>
      Promise.resolve({ data: { items: [1, 2, 3] } }),
    );
    mount(<AdministrationDetailsScreen />);
    await api.getCustomerById();
    await api.getSubscriptionsOptions();
    await api.getFulfillmentsOptions();
    expect(api.getPaymentConfigOptions).toHaveBeenCalledTimes(1);
  });
  describe('when component render', () => {
    let wrapper;
    beforeAll(async () => {
      useStateSpy.mockRestore();
      api.getCustomerById.mockImplementation(() =>
        Promise.resolve({
          data: customerData,
        }),
      );
      api.getSubscriptionsOptions.mockImplementation(() =>
        Promise.resolve({ data: { items: [] } }),
      );
      api.getFulfillmentsOptions.mockImplementation(() =>
        Promise.resolve({ data: { items: [] } }),
      );
      api.getPaymentConfigOptions.mockImplementation(() =>
        Promise.resolve({ data: { paymentTypes: [] } }),
      );
      wrapper = mount(<AdministrationDetailsScreen />);
      await act(async () => {
        await api.getCustomerById();
        await api.getSubscriptionsOptions();
        await api.getFulfillmentsOptions();
        await api.getPaymentConfigOptions();
        wrapper.update();
      });
    });
    it('should show <CustomerDetails /> if Customer tab is active', () => {
      expect(
        wrapper
          .find(Tab)
          .first()
          .getDOMNode()
          .attributes.getNamedItem('aria-selected').value,
      ).toEqual('true');
      expect(wrapper.find(CustomerDetails)).toHaveLength(1);
    });

    it('should update customerData prop', () => {
      expect(wrapper.find(CustomerDetails).props().currentCustomer).toEqual(
        customerData,
      );
    });
  });
});
