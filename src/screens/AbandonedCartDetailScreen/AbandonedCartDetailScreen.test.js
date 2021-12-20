import React from 'react';
import { shallow } from 'enzyme';
import AbandonedCartDetailScreen from './AbandonedCartDetailScreen';
import { Button } from '@mui/material';
import useAbandonedCartDetailScreen from './useAbandonedCartDetailScreen';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import DateRangePicker from '../../components/utils/Modals/DateRangePicker';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SelectCustomerNotification from '../../components/utils/SelectCustomerNotification';

jest.mock('./useAbandonedCartDetailScreen', () => jest.fn());
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useHistory: jest.fn(() => ({})),
}));

describe('<AbandonedCartDetailScreen/> ', () => {
  let wrapper;

  it('should return SelectCustomerNotification if nxState.selectedCustomer.id not exist and id of abandonedCart equal to  "add"', () => {
    useSelector.mockImplementation(() => ({ selectedCustomer: {} }))
    useParams.mockImplementation(() => ({ id: 'add' }))
    useAbandonedCartDetailScreen.mockImplementation(() => ({
      curAbandonedCart: null,
    })
    )
    wrapper = shallow(
      <AbandonedCartDetailScreen />,
    );
    expect(wrapper.find(SelectCustomerNotification)).toHaveLength(1);
    jest.clearAllMocks();

  });

  describe('AbandonedCartDetailScreen with selectedCustomer and id', () => {
    beforeEach(() => {
      useSelector.mockImplementation(() => ({ selectedCustomer: { id: 1 } }))
      useParams.mockImplementation(() => ({ id: 1 }))
    });


    it('All inputs and CustomBreadcrumbs should be on the page', () => {
      useAbandonedCartDetailScreen.mockImplementation(() => ({
        curAbandonedCart: {},
        abandonedCart: { id: '1' }
      })
      )
      wrapper = shallow(
        <AbandonedCartDetailScreen />,
      );
      expect(wrapper.find(CustomBreadcrumbs)).toHaveLength(1);
      expect(wrapper.find({ 'data-test': "status" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "name" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "date" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "delayMn" }).length).toEqual(1)
      jest.clearAllMocks();
    });

    it('If validPeriod equal unlimited DateRangePicker, startDate, endDate inputs should not be on the page', () => {
      useAbandonedCartDetailScreen.mockImplementation(() => ({
        curAbandonedCart: { validPeriod: 'unlimited' },
        abandonedCart: { id: '1' }
      })
      )
      wrapper = shallow(
        <AbandonedCartDetailScreen />,
      );
      expect(wrapper.find(DateRangePicker)).toHaveLength(0);
      expect(wrapper.find({ 'data-test': "startDate" }).length).toEqual(0)
      expect(wrapper.find({ 'data-test': "endDate" }).length).toEqual(0)
      jest.clearAllMocks();
    });

    it('If validPeriod equal between, DateRangePicker should be returned but startDate, endDate inputs should not be on the page', () => {
      useAbandonedCartDetailScreen.mockImplementation(() => ({
        curAbandonedCart: { validPeriod: 'between' },
        abandonedCart: { id: '1' }
      })
      )
      wrapper = shallow(
        <AbandonedCartDetailScreen />,
      );
      expect(wrapper.find(DateRangePicker)).toHaveLength(1);
      expect(wrapper.find({ 'data-test': "startDate" }).length).toEqual(0)
      expect(wrapper.find({ 'data-test': "endDate" }).length).toEqual(0)
      jest.clearAllMocks();
    });

    it('If validPeriod equal after,startDate  should be returned but DateRangePicker, endDate inputs should not be on the page', () => {
      useAbandonedCartDetailScreen.mockImplementation(() => ({
        curAbandonedCart: { validPeriod: 'after' },
        abandonedCart: { id: '1' }
      })
      )
      wrapper = shallow(
        <AbandonedCartDetailScreen />,
      );
      expect(wrapper.find(DateRangePicker)).toHaveLength(0);
      expect(wrapper.find({ 'data-test': "startDate" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "endDate" }).length).toEqual(0)
      jest.clearAllMocks();
    });

    it('If validPeriod equal before, endDate should be returned but DateRangePicker, startDate  inputs should not be on the page', () => {
      useAbandonedCartDetailScreen.mockImplementation(() => ({
        curAbandonedCart: { validPeriod: 'before' },
        abandonedCart: { id: '1' }
      })
      )
      wrapper = shallow(
        <AbandonedCartDetailScreen />,
      );
      expect(wrapper.find(DateRangePicker)).toHaveLength(0);
      expect(wrapper.find({ 'data-test': "startDate" }).length).toEqual(0)
      expect(wrapper.find({ 'data-test': "endDate" }).length).toEqual(1)
      jest.clearAllMocks();
    });

    it('Button should be disabled if curAbandonedCart.name is empty', () => {
      useAbandonedCartDetailScreen.mockImplementation(() => ({
        curAbandonedCart: { name: '' },
        abandonedCart: { id: '1' }
      })
      )
      wrapper = shallow(
        <AbandonedCartDetailScreen />,
      );
      expect(wrapper.find(Button).props().disabled).toEqual(true);
      jest.clearAllMocks();

    });
    it('Button should not be disabled if curAbandonedCart.name is not empty', () => {
      useAbandonedCartDetailScreen.mockImplementation(() => ({
        curAbandonedCart: { name: 'someName' },
        abandonedCart: { id: '1' }
      })
      )
      wrapper = shallow(
        <AbandonedCartDetailScreen />,
      );
      expect(wrapper.find(Button).props().disabled).toEqual(false);
      jest.clearAllMocks();
    });
  });
});
