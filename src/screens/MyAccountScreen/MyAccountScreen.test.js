import React from 'react';
import { Tab } from '@material-ui/core';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import MyAccountScreen from './MyAccountScreen';
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
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('<MyAccountScreen />', () => {
  let wrapper;      

  beforeEach(async () => {
    await act(async() => {
      wrapper = mount(<MyAccountScreen />);
    });

    wrapper.update();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should fetch identity data', () => {
    expect(api.getIdentityById).toHaveBeenCalledTimes(1);
    expect(api.getStores).toHaveBeenCalledTimes(1);
    expect(api.getStores).toHaveBeenCalledWith(0, '&customerId=test-customer-id');
    expect(api.getProducts).toHaveBeenCalledTimes(1);
    expect(api.getProducts).toHaveBeenCalledWith(0, '&customerId=test-customer-id');
  });

  it('should have My Account tab', () => {
    expect(wrapper.find(Tab)).toHaveLength(1);
    expect(wrapper.find(Tab).first().text()).toEqual('My Account');
  });

  it('should have two <CustomCard />', () => {
    expect(wrapper.find(CustomCard)).toHaveLength(2);
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
});
