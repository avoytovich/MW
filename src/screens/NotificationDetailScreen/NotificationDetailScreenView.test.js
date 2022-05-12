import React from 'react';
import { shallow } from 'enzyme';
import NotificationDetailScreenView from './NotificationDetailScreenView';
import General from './SubSections/General';
import HttpHeaders from './SubSections/HttpHeaders';
import OAuthConfiguration from './SubSections/OAuthConfiguration';
import TLSconfiguration from './SubSections/TLSconfiguration';

describe('<NotificationDetailScreenView/> ', () => {
  let wrapper;
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return General component on first tab', () => {
    wrapper = shallow(
      <NotificationDetailScreenView
        curTab={0}
        curNotification={{}}
        setCurNotification={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.find(General)).toHaveLength(1);
    expect(wrapper.find(HttpHeaders)).toHaveLength(0);
    expect(wrapper.find(OAuthConfiguration)).toHaveLength(0);
    expect(wrapper.find(TLSconfiguration)).toHaveLength(0);
  });

  it('should return HttpHeaders component on second tab', () => {
    wrapper = shallow(
      <NotificationDetailScreenView
        curTab={1}
        curNotification={{}}
        setCurNotification={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.find(General)).toHaveLength(0);
    expect(wrapper.find(HttpHeaders)).toHaveLength(1);
    expect(wrapper.find(OAuthConfiguration)).toHaveLength(0);
    expect(wrapper.find(TLSconfiguration)).toHaveLength(0);
  });

  it('should return OAuthConfiguration component on third tab', () => {
    wrapper = shallow(
      <NotificationDetailScreenView
        curTab={2}
        curNotification={{}}
        setCurNotification={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.find(General)).toHaveLength(0);
    expect(wrapper.find(HttpHeaders)).toHaveLength(0);
    expect(wrapper.find(OAuthConfiguration)).toHaveLength(1);
    expect(wrapper.find(TLSconfiguration)).toHaveLength(0);
  });

  it('should return TLSconfiguration component on fourth tab', () => {
    wrapper = shallow(
      <NotificationDetailScreenView
        curTab={3}
        curNotification={{}}
        setCurNotification={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.find(General)).toHaveLength(0);
    expect(wrapper.find(HttpHeaders)).toHaveLength(0);
    expect(wrapper.find(OAuthConfiguration)).toHaveLength(0);
    expect(wrapper.find(TLSconfiguration)).toHaveLength(1);
  });
});

