import React from 'react';
import { shallow } from 'enzyme';
import NotificationDetailScreen from './NotificationDetailScreen';
import { Tab, Tabs, Button } from '@mui/material';
import useNotificationDetail from '../../services/useData/useNotificationDetail';
import General from './SubSections/General';
import HttpHeaders from './SubSections/HttpHeaders';
import OAuthConfiguration from './SubSections/OAuthConfiguration';
import TLSconfiguration from './SubSections/TLSconfiguration';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SelectCustomerNotification from '../../components/utils/SelectCustomerNotification';

jest.mock('../../services/useData/useNotificationDetail', () => jest.fn());
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useHistory: jest.fn(() => ({})),
}));

describe('<NotificationDetailScreen/> ', () => {
  let wrapper;

  it('should return SelectCustomerNotification if nxState.selectedCustomer.id not exist and id of MetaRole equal to  "add"', () => {
    useSelector.mockImplementation(() => ({ selectedCustomer: {} }))
    useParams.mockImplementation(() => ({ id: 'add' }))
    useNotificationDetail.mockImplementation(() => ({
      curNotification: null,
    })
    )
    wrapper = shallow(
      <NotificationDetailScreen />,
    );
    expect(wrapper.find(SelectCustomerNotification)).toHaveLength(1);
    jest.clearAllMocks();

  });

  describe('NotificationDetailScreen with selectedCustomer and id', () => {
    beforeEach(() => {
      useSelector.mockImplementation(() => ({ selectedCustomer: { id: 1 } }))
      useParams.mockImplementation(() => ({ id: 1 }))
    });

    describe('NotificationDetailScreen with data no equal to null', () => {
      beforeEach(() => {
        useNotificationDetail.mockImplementation(() => ({
          curNotification: {},
          notification: { id: '1' }
        })
        )
        wrapper = shallow(
          <NotificationDetailScreen />,
        );
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should contains 4 tabs', () => {
        const tabs = wrapper.find(Tab);
        expect(tabs.length).toEqual(4)
      });

      it('should return General component on first tab', () => {
        wrapper.find(Tabs).props().onChange({}, 0);
        expect(wrapper.find(General)).toHaveLength(1);
        expect(wrapper.find(HttpHeaders)).toHaveLength(0);
        expect(wrapper.find(OAuthConfiguration)).toHaveLength(0);
        expect(wrapper.find(TLSconfiguration)).toHaveLength(0);
      });

      it('should return HttpHeaders component on second tab', () => {
        wrapper.find(Tabs).props().onChange({}, 1);
        expect(wrapper.find(General)).toHaveLength(0);
        expect(wrapper.find(HttpHeaders)).toHaveLength(1);
        expect(wrapper.find(OAuthConfiguration)).toHaveLength(0);
        expect(wrapper.find(TLSconfiguration)).toHaveLength(0);
      });

      it('should return OAuthConfiguration component on third tab', () => {
        wrapper.find(Tabs).props().onChange({}, 2);
        expect(wrapper.find(General)).toHaveLength(0);
        expect(wrapper.find(HttpHeaders)).toHaveLength(0);
        expect(wrapper.find(OAuthConfiguration)).toHaveLength(1);
        expect(wrapper.find(TLSconfiguration)).toHaveLength(0);
      });

      it('should return TLSconfiguration component on fourth tab', () => {
        wrapper.find(Tabs).props().onChange({}, 3);
        expect(wrapper.find(General)).toHaveLength(0);
        expect(wrapper.find(HttpHeaders)).toHaveLength(0);
        expect(wrapper.find(OAuthConfiguration)).toHaveLength(0);
        expect(wrapper.find(TLSconfiguration)).toHaveLength(1);
      });

    })
    it('Button should be disabled if curNotification.name is empty', () => {
      useNotificationDetail.mockImplementation(() => ({
        curNotification: { name: '' },
        notification: { id: '1' }
      })
      )
      wrapper = shallow(
        <NotificationDetailScreen />,
      );
      expect(wrapper.find(Button).props().disabled).toEqual(true);
      jest.clearAllMocks();

    });
    it('Button should not be disabled if curNotification.name is not empty', () => {
      useNotificationDetail.mockImplementation(() => ({
        curNotification: { name: 'someName' },
        notification: { id: '1' }
      })
      )
      wrapper = shallow(
        <NotificationDetailScreen />,
      );
      expect(wrapper.find(Button).props().disabled).toEqual(false);
      jest.clearAllMocks();
    });
  });
});

