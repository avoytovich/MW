import React from 'react';
import { shallow } from 'enzyme';
import CustomerDetailScreen from './CustomerDetailScreen';
import { Tab, Tabs, Button, LinearProgress } from '@material-ui/core';
import useCustomerDetailData from '../../../services/useData/useCustomerDetailData';
import General from './SubSections/General';
import Features from './SubSections/Features';
import AssetsResource from '../../../components/AssetsResoursesWithSelectLabel';
import PaymentServiceConfiguration from './SubSections/PaymentServiceConfiguration';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from '../../../components/utils/CustomBreadcrumbs';

jest.mock('../../../services/useData/useCustomerDetailData', () => jest.fn());
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('../../../services/useData/useCustomerDetailData', () => jest.fn());

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useHistory: jest.fn(() => ({})),
}));

describe('<CustomerDetailScreen/> ', () => {
  let wrapper;

  it('Should not draw CustomBreadcrumbs if id is equals "add"', () => {
    useParams.mockImplementation(() => ({ id: 'add' }))
    useCustomerDetailData.mockImplementation(() => ({
      currentCustomer: {},
      customerData: {},
    })
    )
    wrapper = shallow(
      <CustomerDetailScreen />,
    );
    expect(wrapper.find(CustomBreadcrumbs)).toHaveLength(0);
    jest.clearAllMocks();
  });

  it('PaymentServiceConfiguration, reports and assets tabs should be disabled if id equals "add" ', () => {
    useParams.mockImplementation(() => ({ id: 'add' }))
    useCustomerDetailData.mockImplementation(() => ({
      currentCustomer: {},
      customerData: {},
    })
    )
    wrapper = shallow(
      <CustomerDetailScreen />,
    );
    expect(wrapper.find({ 'data-test': "paymentServiceConfiguration" }).props().disabled).toEqual(true);
    expect(wrapper.find({ 'data-test': "reports" }).props().disabled).toEqual(true);
    expect(wrapper.find({ 'data-test': "assets" }).props().disabled).toEqual(true);

    jest.clearAllMocks();
  });

  it('Should return LinearProgress if data is null', () => {
    useParams.mockImplementation(() => ({ id: 1 }))
    useCustomerDetailData.mockImplementation(() => ({
      currentCustomer: null,
    })
    )
    wrapper = shallow(
      <CustomerDetailScreen />,
    );
    expect(wrapper.find(LinearProgress)).toHaveLength(1);
    jest.clearAllMocks();
  });

  describe('CustomerDetailScreen with id is not equal "add"', () => {
    beforeEach(() => {
      useParams.mockImplementation(() => ({ id: 1 }))
    });

    describe('CustomerDetailScreen with data no equal null', () => {
      beforeEach(() => {
        useCustomerDetailData.mockImplementation(() => ({
          currentCustomer: {},
          customerData: { id: '1' },
        })
        )
        wrapper = shallow(
          <CustomerDetailScreen />,
        );
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should contains 5 tabs', () => {
        const tabs = wrapper.find(Tab);
        expect(tabs.length).toEqual(5)
      });

      it('PaymentServiceConfiguration, reports and assets tabs should not be disabled', () => {
        expect(wrapper.find({ 'data-test': "paymentServiceConfiguration" }).props().disabled).toEqual(false);
        expect(wrapper.find({ 'data-test': "reports" }).props().disabled).toEqual(false);
        expect(wrapper.find({ 'data-test': "assets" }).props().disabled).toEqual(false);

        jest.clearAllMocks();
      });

      it('should return General component on first tab', () => {
        wrapper.find(Tabs).props().onChange({}, 0);
        expect(wrapper.find(General)).toHaveLength(1);
        expect(wrapper.find(Features)).toHaveLength(0);
        expect(wrapper.find(PaymentServiceConfiguration)).toHaveLength(0);
        expect(wrapper.find(AssetsResource)).toHaveLength(0);
      });

      it('should return Features component on second tab', () => {
        wrapper.find(Tabs).props().onChange({}, 1);
        expect(wrapper.find(General)).toHaveLength(0);
        expect(wrapper.find(Features)).toHaveLength(1);
        expect(wrapper.find(PaymentServiceConfiguration)).toHaveLength(0);
        expect(wrapper.find(AssetsResource)).toHaveLength(0);
      });
      it('should return PaymentServiceConfiguration component on third tab', () => {
        wrapper.find(Tabs).props().onChange({}, 2);
        expect(wrapper.find(General)).toHaveLength(0);
        expect(wrapper.find(Features)).toHaveLength(0);
        expect(wrapper.find(PaymentServiceConfiguration)).toHaveLength(1);
        expect(wrapper.find(AssetsResource)).toHaveLength(0);
      });
      it('should return AssetsResource component on fifth tab', () => {
        wrapper.find(Tabs).props().onChange({}, 4);
        expect(wrapper.find(General)).toHaveLength(0);
        expect(wrapper.find(Features)).toHaveLength(0);
        expect(wrapper.find(PaymentServiceConfiguration)).toHaveLength(0);
        expect(wrapper.find(AssetsResource)).toHaveLength(1);
      });
    })
    it('Button should disabled if assets has label duplicates', () => {
      useCustomerDetailData.mockImplementation(() => ({
        currentCustomer: { assets: [{ label: "label", url: "", key: 1 }, { label: "label", url: "", key: 2 }] },
        customerData: { id: '1' }
      })
      )
      wrapper = shallow(
        <CustomerDetailScreen />,
      );
      expect(wrapper.find(Button).props().disabled).toEqual(true);
      jest.clearAllMocks();

    });
    it('Button should not be disabled if has not label duplicates', () => {
      useCustomerDetailData.mockImplementation(() => ({
        currentCustomer: { assets: [{ label: "label_1", url: "", key: 1 }, { label: "label_2", url: "", key: 2 }] },
        customerData: { id: '1' }
      })
      )
      wrapper = shallow(
        <CustomerDetailScreen />,
      );
      expect(wrapper.find(Button).props().disabled).toEqual(false);
      jest.clearAllMocks();
    });
  });
});

