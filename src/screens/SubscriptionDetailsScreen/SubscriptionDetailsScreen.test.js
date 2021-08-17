import React from 'react';
import { mount } from 'enzyme';

import SubscriptionDetailsScreen from './SubscriptionDetailsScreen';
import { waitForComponentToPaint } from '../../components/utils/Tests/helpers';

import api from '../../api';

jest.mock('../../api', () => ({
  getSubscriptionById: jest.fn(() => Promise.resolve({})),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ id: 123 })),
}));

const mockSetState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init) => [init, mockSetState]);

describe('<SubscriptionDetailsScreen />', () => {
  let wrapper;      

  beforeEach(async() => {
    wrapper = mount(<SubscriptionDetailsScreen />);
    await waitForComponentToPaint(wrapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call api.getSubscriptionById', () => {
    expect(api.getSubscriptionById).toHaveBeenCalledTimes(1);
    expect(api.getSubscriptionById).toHaveBeenCalledWith(123);
  });
});
