import React from 'react';
import { mount } from 'enzyme';
import { Tab } from '@material-ui/core';
import NotificationScreen from './NotificationScreen';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));
jest.mock('../../services/useData');
describe('<NotificationScreen/>', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have 3 tabs with Notifications, Notification Definitions, Notifications History', () => {
    wrapper = mount(
      <Router>
        <NotificationScreen
          location={{ pathname: '/settings/notifications' }}
        />
      </Router>,
    );
    expect(wrapper.find(Tab)).toHaveLength(3);
    expect(wrapper.find(Tab).at(0).text()).toEqual('Notifications');
    expect(wrapper.find(Tab).at(1).text()).toEqual('Notification Definitions');
    expect(wrapper.find(Tab).at(2).text()).toEqual('Notifications History');
  });

  it('should show Notification Definition tab if path is /settings/notification-definition', () => {
    wrapper = mount(
      <Router>
        <NotificationScreen
          location={{ pathname: '/settings/notification-definition' }}
        />
      </Router>,
    );
    expect(
      wrapper
        .find(Tab)
        .first()
        .getDOMNode()
        .attributes.getNamedItem('aria-selected').value,
    ).toEqual('true');
  });
  it('should Notifications tab be active if path is /settings/notifications', () => {
    wrapper = mount(
      <Router>
        <NotificationScreen
          location={{ pathname: '/settings/notifications' }}
        />
      </Router>,
    );
    expect(
      wrapper
        .find(Tab)
        .last()
        .getDOMNode()
        .attributes.getNamedItem('aria-selected').value,
    ).toEqual('false');
    expect(
      wrapper
        .find(Tab)
        .first()
        .getDOMNode()
        .attributes.getNamedItem('aria-selected').value,
    ).toEqual('true');
  });
});
