import React from 'react';
import { Tab } from '@mui/material';
import { mount } from 'enzyme';

import MyAccountScreen from './MyAccountScreen';

import { waitForComponentToPaint } from '../../components/utils/Tests/helpers';
import CustomCard from '../../components/utils/CustomCard';

import api from '../../api';

const mockCustomerData = {
  data: {
    customerId: 'test-customer-id',
    firstName: 'test-first-name',
    lastName: 'test-last-name',
    email: 'test-email',
    userName: 'test-user-name',
  }
};

const mockStoresData = { 
  data: { items: { stores: [
    { id: 'store-id-1', name: 'store-name-1' },
    { id: 'store-id-2', name: 'store-name-2' }
  ]}}
};

const mockProductsData = { 
  data: { items: { products: [
    { id: 'product-id-1', name: 'product-name-1' },
    { id: 'product-id-2', name: 'product-name-2' }
  ]}}
};

jest.mock('../../api', () => ({
  getIdentityById: jest.fn(() => Promise.resolve(mockCustomerData)),
  getStores: jest.fn(() => Promise.resolve(mockStoresData)),
  getProducts: jest.fn(() => Promise.resolve(mockProductsData)),
  updateIdentityById: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

describe('<MyAccountScreen />', () => {
  let wrapper;      

  beforeEach(async() => {
    wrapper = mount(<MyAccountScreen />);
    await waitForComponentToPaint(wrapper);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should fetch identity data', () => {
    expect(api.getIdentityById).toHaveBeenCalledTimes(1);
    expect(api.getStores).toHaveBeenCalledTimes(1);
    expect(api.getStores).toHaveBeenCalledWith({ filters: '&customerId=test-customer-id' });
    expect(api.getProducts).toHaveBeenCalledTimes(1);
    expect(api.getProducts).toHaveBeenCalledWith({ filters: '&customerId=test-customer-id' });
  });

  it('should have My Account tab', () => {
    expect(wrapper.find(Tab)).toHaveLength(1);
    expect(wrapper.find(Tab).first().text()).toEqual('My Account');
  });

  it('should have three <CustomCard />', () => {
    expect(wrapper.find(CustomCard)).toHaveLength(3);
  });

  it('should have identity details populated to form elements', () => {
    const { firstName, lastName, email, userName } = mockCustomerData.data;

    expect(wrapper.find('input[name="firstName"]').instance().value).toEqual(firstName);
    expect(wrapper.find('input[name="lastName"]').instance().value).toEqual(lastName);
    expect(wrapper.find('input[name="email"]').instance().value).toEqual(email);
    expect(wrapper.find('input[name="userName"]').instance().value).toEqual(userName);
  });

  it('should have correct stores data populated', async() => {
    expect(api.getStores()).resolves.toEqual(mockStoresData);
  });

  it('should have correct products data populated', async() => {
    expect(api.getProducts()).resolves.toEqual(mockProductsData);
  });

  it('should have short error details by default', async() => {
    const errorSwitch = wrapper.find('input[name="errorDetails"]');
    expect(errorSwitch.instance().checked).toEqual(false);
  });
});
