import React from 'react';
import { shallow } from 'enzyme';
import MetaRoleDetailScreen from './MetaRoleDetailScreen';
import { Tab, Tabs, Button } from '@mui/material';
import useMetaRoleDetailData from '../../../services/useData/useMetaRoleDetailData';
import General from './SubSections/General';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Clearances from './SubSections/Clearances';
import SelectCustomerNotification from '../../../components/utils/SelectCustomerNotification';

jest.mock('../../../services/useData/useMetaRoleDetailData', () => jest.fn());
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('../../../services/useData/useMetaRoleDetailData', () => jest.fn());

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useHistory: jest.fn(() => ({})),
}));

describe('<MetaRoleDetailScreen/> ', () => {
  let wrapper;

  it('should return SelectCustomerNotification if nxState.selectedCustomer.id not exist and id of MetaRole equal to  "add"', () => {
    useSelector.mockImplementation(() => ({ selectedCustomer: {} }))
    useParams.mockImplementation(() => ({ id: 'add' }))
    useMetaRoleDetailData.mockImplementation(() => ({
      curMetaRole: null,
    })
    )
    wrapper = shallow(
      <MetaRoleDetailScreen />,
    );
    expect(wrapper.find(SelectCustomerNotification)).toHaveLength(1);
    jest.clearAllMocks();

  });

  describe('MetaRoleDetailScreen with selectedCustomer and id', () => {
    beforeEach(() => {
      useSelector.mockImplementation(() => ({ selectedCustomer: { id: 1 } }))
      useParams.mockImplementation(() => ({ id: 1 }))

    });

    describe('MetaRoleDetailScreen with data no equal to null', () => {
      beforeEach(() => {
        useMetaRoleDetailData.mockImplementation(() => ({
          curMetaRole: {},
        })
        )
        wrapper = shallow(
          <MetaRoleDetailScreen />,
        );
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should contains 2 tabs', () => {
        const tabs = wrapper.find(Tab);
        expect(tabs.length).toEqual(2)
      });

      it('should return General component on first tab', () => {
        wrapper.find(Tabs).props().onChange({}, 0);
        expect(wrapper.find(General)).toHaveLength(1);
        expect(wrapper.find(Clearances)).toHaveLength(0);
      });

      it('should return Clearances component on second tab', () => {
        wrapper.find(Tabs).props().onChange({}, 1);
        expect(wrapper.find(General)).toHaveLength(0);
        expect(wrapper.find(Clearances)).toHaveLength(1);
      });

    })
    it('Button should be disabled if curMetaRole.name is empty', () => {
      useMetaRoleDetailData.mockImplementation(() => ({
        curMetaRole: { name: '' },
      })
      )
      wrapper = shallow(
        <MetaRoleDetailScreen />,
      );
      expect(wrapper.find(Button).props().disabled).toEqual(true);
      jest.clearAllMocks();

    });
    it('Button should not be disabled if curMetaRole.name is not empty', () => {
      useMetaRoleDetailData.mockImplementation(() => ({
        curMetaRole: { name: 'someName' },
      })
      )
      wrapper = shallow(
        <MetaRoleDetailScreen />,
      );
      expect(wrapper.find(Button).props().disabled).toEqual(false);
      jest.clearAllMocks();
    });
  });
});

