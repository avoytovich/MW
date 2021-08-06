import React from 'react';
import { shallow } from 'enzyme';
import localization from '../../localization';
import { Tab, Button } from '@material-ui/core';
import { Route } from 'react-router-dom';
import FulfillmentPackagesScreen from './FulfillmentPackagesScreen';


const tabsData = [
  {
    label: 'autoFulfillments',
    path: '/overview/fulfillment-packages/autoFulfillments',
  },
  {
    label: 'manualFulfillments',
    path: '/overview/fulfillment-packages/manualFulfillments',
  },
  {
    label: 'licenseProviderDefinitions',
    path: '/overview/fulfillment-packages/licenseProviderDefinitions',
    button: `${localization.t('general.add')} ${localization.t(
      'labels.licenseProviderDefinition',
    )}`,
  },
];
jest.mock('react-redux', () => ({ useDispatch: jest.fn() }));
jest.mock('../../services/useData');

describe('<FulfillmentPackagesScreen/>', () => {
  let wrapper;

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Should draw correct number of Tabs with appropriate label', () => {
    wrapper = shallow(<FulfillmentPackagesScreen
      location={{ pathname: '/overview/fulfillment-packages/autoFulfillments' }} />);
    const tabs = wrapper.find(Tab)
    expect(tabs.length).toEqual(tabsData.length)
    tabs.forEach((tab, index) => {
      const value = tabsData[index].label
      expect(tab.props().label).toEqual(localization.t(`labels.${value}`))
    })

  });
  it('Should draw correct number of Routes with appropriate path', () => {
    wrapper = shallow(<FulfillmentPackagesScreen
      location={{ pathname: '/overview/fulfillment-packages/autoFulfillments' }} />);
    const tabs = wrapper.find(Route)
    expect(tabs.length).toEqual(tabsData.length)
    tabs.forEach((tab, index) => {
      const routePath = tabsData[index].path
      expect(tab.props().path).toEqual(routePath)
    })
  });

  it('Should draw Button on licenseProviderDefinitions path', () => {
    wrapper = shallow(<FulfillmentPackagesScreen
      location={{ pathname: '/overview/fulfillment-packages/licenseProviderDefinitions' }} />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('Should not draw Button on autoFulfillments path', () => {
    wrapper = shallow(<FulfillmentPackagesScreen
      location={{ pathname: '/overview/fulfillment-packages/autoFulfillments' }} />);
    expect(wrapper.find(Button)).toHaveLength(0);
  });
});
