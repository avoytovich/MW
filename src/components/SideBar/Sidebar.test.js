import React from 'react';
import { shallow } from 'enzyme';

import { List, Drawer, ListSubheader } from '@material-ui/core';
import NavItem from './NavItem';

import Sidebar from './SideBar';
import navConfig from './config';

import {
  FolderOpen,
  Visibility,
  EmojiObjects,
  Toll,
  Link,
  FormatQuote,
  Settings,
  Build,
  SwapHorizontalCircle,
  PeopleOutline,
} from '@material-ui/icons';

describe('<Sidebar />', () => {
  let wrapper;
  let wrapper2;
  const config = navConfig;
  const overviewItems = config[0].items;
  const toBeDefinedItems = config[1].items;
  const settingsItems = config[2].items;

  beforeEach(() => {
    wrapper = shallow(<Sidebar />);
    wrapper2 = shallow(<List />);
  });

  it('should have a <Drawer />', () => {
    expect(wrapper.find(Drawer)).toHaveLength(1);
  });

  it('should have a <List />', () => {
    expect(wrapper.find(List)).toHaveLength(3);
  });

  it('should have a <NavItem />', () => {
    expect(wrapper.find(NavItem)).toHaveLength(14);
  });

  it('should have subheaders "Overview", "To be defined", "Settings"', () => {
    expect(config).toEqual(
      expect.arrayContaining([
        expect.objectContaining({subheader: 'Overview'}),
        expect.objectContaining({subheader: 'To be defined'}),
        expect.objectContaining({subheader: 'Settings'}),
      ]),
    );
  });

  it('should have overview Items', () => {
    expect(overviewItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({id: 'products'}),
        expect.objectContaining({title: 'Products'}),
        expect.objectContaining({href: '/overview/products'}),
        expect.objectContaining({icon: FolderOpen}),
        expect.objectContaining({id: 'stores'}),
        expect.objectContaining({title: 'Stores'}),
        expect.objectContaining({href: '/overview/stores'}),
        expect.objectContaining({icon: FolderOpen}),
        expect.objectContaining({id: 'orders'}),
        expect.objectContaining({title: 'Orders'}),
        expect.objectContaining({href: '/overview/orders'}),
        expect.objectContaining({icon: FolderOpen}),
        expect.objectContaining({id: 'invoices-credit-notes'}),
        expect.objectContaining({title: 'Invoices / Credit Notes'}),
        expect.objectContaining({href: '/overview/invoices-credit-notes'}),
        expect.objectContaining({icon: FolderOpen}),
        expect.objectContaining({id: 'subscriptions'}),
        expect.objectContaining({title: 'Subscriptions'}),
        expect.objectContaining({href: '/overview/subscriptions'}),
        expect.objectContaining({icon: FolderOpen}),
      ]),
    );
  });

  it('should have toBeDefined Items', () => {
    expect(toBeDefinedItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({id: 'sales-customers'}),
        expect.objectContaining({title: 'Sales & customers'}),
        expect.objectContaining({href: '/tobedefined/sales-customers'}),
        expect.objectContaining({icon: Visibility}),
        expect.objectContaining({id: 'marketing'}),
        expect.objectContaining({title: 'Marketing'}),
        expect.objectContaining({href: '/marketing'}),
        expect.objectContaining({icon: EmojiObjects}),
        expect.objectContaining({id: 'checkout-experience'}),
        expect.objectContaining({title: 'Checkout Experience'}),
        expect.objectContaining({href: '/checkout-experience'}),
        expect.objectContaining({icon: Toll}),
        expect.objectContaining({id: 'reports'}),
        expect.objectContaining({title: 'Reports'}),
        expect.objectContaining({href: '/tobedefined/reports'}),
        expect.objectContaining({icon: Link}),
        expect.objectContaining({id: 'myaccount'}),
        expect.objectContaining({title: 'My Account'}),
        expect.objectContaining({href: '/my-account'}),
        expect.objectContaining({icon: FormatQuote}),
      ]),
    );
  });

  it('should have Settings Items', () => {
    expect(settingsItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({id: 'api'}),
        expect.objectContaining({title: 'API'}),
        expect.objectContaining({href: '/settings/api'}),
        expect.objectContaining({icon: SwapHorizontalCircle}),
        expect.objectContaining({id: 'services-configuration'}),
        expect.objectContaining({title: 'Services Configuration'}),
        expect.objectContaining({href: '/settings/services-configuration'}),
        expect.objectContaining({icon: Build}),
        expect.objectContaining({id: 'administration'}),
        expect.objectContaining({title: 'Administration'}),
        expect.objectContaining({href: '/settings/administration'}),
        expect.objectContaining({icon: Settings}),
        expect.objectContaining({id: 'identities'}),
        expect.objectContaining({title: 'Identities'}),
        expect.objectContaining({href: '/settings/identities'}),
        expect.objectContaining({icon: PeopleOutline}),
      ]),
    );
  });

});
