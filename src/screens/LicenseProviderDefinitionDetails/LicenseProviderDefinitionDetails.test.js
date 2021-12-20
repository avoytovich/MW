import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { shallow } from 'enzyme';

import {
  LinearProgress,
  Tab,
} from '@mui/material';
import LicenseProviderDefinitionDetails from './LicenseProviderDefinitionDetails';
import General from './SubSections/General';
import HTTPConfiguration from './SubSections/HTTPConfiguration';
import TestModeHTTPConfiguration from './SubSections/TestModeHTTPConfiguration';
import OperationDetails from './SubSections/OperationDetails';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import SelectCustomerNotification from '../../components/utils/SelectCustomerNotification';
import useLicenseProviderDefinitionDetail from './useLicenseProviderDefinitionDetail';

jest.mock('./useLicenseProviderDefinitionDetail', () => jest.fn());
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({})),
  useHistory: jest.fn(() => ({})),
}));

describe('<LicenseProviderDefinitionDetails/> ', () => {
  let wrapper;
  it('should return LinearProgress if isLoading is true', () => {
    useSelector.mockImplementation(() => ({ selectedCustomer: { id: 1 } }))
    useParams.mockImplementation(() => ({ id: 1 }))
    useLicenseProviderDefinitionDetail.mockImplementation(() => ({
      isLoading: true,
    })
    )
    wrapper = shallow(
      <LicenseProviderDefinitionDetails />,
    );
    expect(wrapper.contains(<LinearProgress />)).toBe(true)
    jest.clearAllMocks();
  });
  it('Should return SelectCustomerNotification if nxState.selectedCustomer.id not exist and id equal to  "add"', () => {
    useSelector.mockImplementation(() => ({ selectedCustomer: {} }))
    useParams.mockImplementation(() => ({ id: 'add' }))
    useLicenseProviderDefinitionDetail.mockImplementation(() => ({
      curLicenseProvider: null,
    })
    )
    wrapper = shallow(
      <LicenseProviderDefinitionDetails />,
    );
    expect(wrapper.find(SelectCustomerNotification)).toHaveLength(1);
    jest.clearAllMocks();

  });
  it('Should not return CustomBreadcrumbs if  id  equal to  add', () => {
    useSelector.mockImplementation(() => ({ selectedCustomer: {} }))
    useParams.mockImplementation(() => ({ id: 'add' }))
    useLicenseProviderDefinitionDetail.mockImplementation(() => ({
      curLicenseProvider: null,
    })
    )
    wrapper = shallow(
      <LicenseProviderDefinitionDetails />,
    );
    expect(wrapper.find(CustomBreadcrumbs)).toHaveLength(0);

  });

  it('testModeHTTPConfiguration should not be disabled if status is equal TestMode', () => {
    useSelector.mockImplementation(() => ({ selectedCustomer: { id: 1 } }))
    useParams.mockImplementation(() => ({ id: 1 }))
    useLicenseProviderDefinitionDetail.mockImplementation(() => ({
      curLicenseProvider: { status: 'TestMode' },
      licenseProvider: {},
    })
    )
    wrapper = shallow(
      <LicenseProviderDefinitionDetails />,
    );
    expect(wrapper.find({ label: "Test mode HTTP configuration" }).props().disabled).toEqual(false);
  });

  describe('LicenseProviderDefinitionDetails with data ', () => {

    beforeEach(() => {
      useSelector.mockImplementation(() => ({ selectedCustomer: { id: 1 } }))
      useParams.mockImplementation(() => ({ id: 1 }))
      useLicenseProviderDefinitionDetail.mockImplementation(() => ({
        curLicenseProvider: {},
        licenseProvider: {},
      })
      )
      wrapper = shallow(
        <LicenseProviderDefinitionDetails />,
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return CustomBreadcrumbs if  id not equal to  add', () => {
      expect(wrapper.find(CustomBreadcrumbs)).toHaveLength(1);
    });

    it('should contains 4 tabs', () => {
      const tabs = wrapper.find(Tab);
      expect(tabs.length).toEqual(4)
    });

    it('testModeHTTPConfiguration should be disabled if status not equal  TestMode', () => {
      expect(wrapper.find({ label: "Test mode HTTP configuration" }).props().disabled).toEqual(true);
    });

    it('should return General component on first tab', () => {
      wrapper.find({ 'data-test': "tabs" }).props().onChange({}, 0);
      expect(wrapper.find(General)).toHaveLength(1);
      expect(wrapper.find(OperationDetails)).toHaveLength(0);
      expect(wrapper.find(HTTPConfiguration)).toHaveLength(0);
      expect(wrapper.find(TestModeHTTPConfiguration)).toHaveLength(0);
    });

    it('should return OperationDetails component on second tab', () => {
      wrapper.find({ 'data-test': "tabs" }).props().onChange({}, 1);
      expect(wrapper.find(General)).toHaveLength(0);
      expect(wrapper.find(OperationDetails)).toHaveLength(1);
      expect(wrapper.find(HTTPConfiguration)).toHaveLength(0);
      expect(wrapper.find(TestModeHTTPConfiguration)).toHaveLength(0);
    });

    it('should return HTTPConfiguration component on third tab', () => {
      wrapper.find({ 'data-test': "tabs" }).props().onChange({}, 2);
      expect(wrapper.find(General)).toHaveLength(0);
      expect(wrapper.find(OperationDetails)).toHaveLength(0);
      expect(wrapper.find(HTTPConfiguration)).toHaveLength(1);
      expect(wrapper.find(TestModeHTTPConfiguration)).toHaveLength(0);
    });

    it('should return TestModeHTTPConfiguration component on fourth tab', () => {
      wrapper.find({ 'data-test': "tabs" }).props().onChange({}, 3);
      expect(wrapper.find(General)).toHaveLength(0);
      expect(wrapper.find(OperationDetails)).toHaveLength(0);
      expect(wrapper.find(HTTPConfiguration)).toHaveLength(0);
      expect(wrapper.find(TestModeHTTPConfiguration)).toHaveLength(1);
    });
  })
});

