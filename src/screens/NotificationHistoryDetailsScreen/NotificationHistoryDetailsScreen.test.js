import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import NotificationHistoryDetailsScreen from './NotificationHistoryDetailsScreen';

const mockNotificationHistoryData = {
  data: {},
}

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('../../api', () => ({
  getNotificationHistoryById: () => Promise.resolve(mockNotificationHistoryData),
  getCustomerById: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ id: 'f49501f6-dde0-4293-9d3f-00773f1d9848' })),
  useHistory: jest.fn(() => ({})),
}));

describe('<NotificationHistoryDetailsScreen />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = mount(<NotificationHistoryDetailsScreen />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(wrapper)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
