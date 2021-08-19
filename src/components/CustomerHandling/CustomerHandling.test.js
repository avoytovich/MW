import React from 'react';
import { mount } from 'enzyme';

import CustomerHandling from './CustomerHandling';

import { waitForComponentToPaint } from '../utils/Tests/helpers';

import api from '../../api';

jest.mock('../../api', () => ({
  getCustomers: jest.fn(() => Promise.resolve({ data: { items: [] }})),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('CustomerHandling', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<CustomerHandling />);
    waitForComponentToPaint(wrapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the customers', () => {
    expect(api.getCustomers).toHaveBeenCalledTimes(1);
  });

  it('should fetch new customers on search change', () => {
    const searchInput = wrapper.find('input[name="customer-search"]');
    searchInput.simulate('change', { target: { value: 'test-id' } });

    const mockRequest = { page: 0, filters: `&name=test-id*`, sortParams: 'name' };
    expect(api.getCustomers).toHaveBeenCalledTimes(2);
    expect(api.getCustomers).toHaveBeenCalledWith(mockRequest);
  });
});
