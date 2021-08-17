import React from 'react';
import { shallow } from 'enzyme';

import { List, Drawer } from '@material-ui/core';

import Sidebar from './SideBar';
import navConfig from './config';

import {
  ShoppingCart,
  Layers,
  Widgets,
  LocalOffer,
  BusinessCenter,
  Settings,
  Person,
  Help,
} from '@material-ui/icons';

describe('<Sidebar />', () => {
  let wrapper;
  const config = navConfig;
  const orders = config[1].items;
  const storeSetup = config[2].items;
  const products = config[3].items;
  const marketing = config[4].items;
  const customers = config[5].items;
  const settings = config[7].items;
  const clientManagement = config[8].items;
  const api = config[9].items;

  beforeEach(() => {
    wrapper = shallow(<Sidebar />);
  });
  it('should have a <Drawer />', () => {
    expect(wrapper.find(Drawer)).toHaveLength(1);
  });
  it('should have a <List />', () => {
    expect(wrapper.find(List)).toHaveLength(1);
  });
  it('should have subheaders Icons: "ShoppingCart", "Layers", "Widgets", "LocalOffer", "BusinessCenter", "Settings", "Person", "Help" ', () => {
    expect(config).toEqual(
      expect.arrayContaining([
        expect.objectContaining({subheaderIcon: ShoppingCart}),
        expect.objectContaining({subheaderIcon: Layers}),
        expect.objectContaining({subheaderIcon: Widgets}),
        expect.objectContaining({subheaderIcon: LocalOffer}),
        expect.objectContaining({subheaderIcon: BusinessCenter}),
        expect.objectContaining({subheaderIcon: Settings}),
        expect.objectContaining({subheaderIcon: Person}),
        expect.objectContaining({subheaderIcon: Help}),
      ]),
    );
  });
  it('should have Orders Items', () => {
    expect(orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({id: 'orders'}),
        expect.objectContaining({title: 'Orders'}),
        expect.objectContaining({href: '/overview/orders'}),
        expect.objectContaining({id: 'subscriptions'}),
        expect.objectContaining({title: 'Subscriptions'}),
        expect.objectContaining({href: '/overview/subscriptions'}),
        expect.objectContaining({id: 'invoices-credit-notes'}),
        expect.objectContaining({title: 'Invoices / Credit Notes'}),
        expect.objectContaining({href: '/overview/invoices-credit-notes'}),
        expect.objectContaining({id: 'licenses'}),
        expect.objectContaining({title: 'Licenses'}),
        expect.objectContaining({href: '/licenses'}),
        expect.objectContaining({id: 'carts'}),
        expect.objectContaining({title: 'Carts'}),
        expect.objectContaining({href: '/settings/carts'}),
        expect.objectContaining({id: 'archived-orders'}),
        expect.objectContaining({title: 'Archived Orders'}),
        expect.objectContaining({href: '/overview/archived-orders'}),
      ]),
    );
  });
  it('should have Store Setup Items', () => {
    expect(storeSetup).toEqual(
      expect.arrayContaining([
        expect.objectContaining({id: 'stores'}),
        expect.objectContaining({title: 'Stores'}),
        expect.objectContaining({href: '/overview/stores'}),
        expect.objectContaining({id: 'checkout-experience'}),
        expect.objectContaining({title: 'Checkout Page Builder'}),
        expect.objectContaining({href: '/checkout-experience'}),
        expect.objectContaining({id: 'localization'}),
        expect.objectContaining({title: 'Localization'}),
        expect.objectContaining({href: '/localization'}),
        expect.objectContaining({id: 'email-builder'}),
        expect.objectContaining({title: 'Email Builder'}),
        expect.objectContaining({href: '/email-builder'}),
      ]),
    );
  });
  it('should have Products Items', () => {
    expect(products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({id: 'products'}),
        expect.objectContaining({title: 'Products'}),
        expect.objectContaining({href: '/overview/products'}),
        expect.objectContaining({id: 'price-models'}),
        expect.objectContaining({title: 'Price Models'}),
        expect.objectContaining({id: 'cros-sell-up-sell-reco'}),
        expect.objectContaining({title: 'Crossell Upsell Recommendations'}),
        expect.objectContaining({id: 'fulfillment-packages'}),
        expect.objectContaining({title: 'Fulfillment packages'}),
        expect.objectContaining({href: '/overview/fulfillment-packages'}),
      ]),
    );
  });
  it('should have Marketing Items', () => {
    expect(marketing).toEqual(
      expect.arrayContaining([
        expect.objectContaining({id: 'discount-rules'}),
        expect.objectContaining({title: 'Discount rules'}),
        expect.objectContaining({href: '/overview/discount-rules'}),
        expect.objectContaining({id: 'marketing-campaigns'}),
        expect.objectContaining({title: 'Campaigns'}),
        expect.objectContaining({href: '/marketing'}),
      ]),
    );
  });
  it('should have Customers Items', () => {
    expect(customers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({id: 'customers'}),
        expect.objectContaining({title: 'Customers'}),
        expect.objectContaining({href: '/overview/customers'}),
        expect.objectContaining({id: 'customer-groups'}),
        expect.objectContaining({title: 'Customer Groups'}),
        expect.objectContaining({href: '/customer-groups'}),
        expect.objectContaining({id: 'resellers'}),
        expect.objectContaining({title: 'Resellers'}),
        expect.objectContaining({href: '/resellers'}),
      ]),
    );
  });
  it('should have Settings Items', () => {
    expect(settings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({id: 'users'}),
        expect.objectContaining({title: 'Users'}),
        expect.objectContaining({href: '/settings/identities'}),
        expect.objectContaining({id: 'user-privileges'}),
        expect.objectContaining({title: 'User Privileges'}),
        expect.objectContaining({href: '/settings/administration'}),
        expect.objectContaining({id: 'user-roles-profiles'}),
        expect.objectContaining({title: 'User Roles & Profiles'}),
        expect.objectContaining({id: 'event-notifications'}),
        expect.objectContaining({title: 'Event Notifications'}),
        expect.objectContaining({href: '/settings/notifications'}),
      ]),
    );
  });
  it('should have Client management Items', () => {
    expect(clientManagement).toEqual(
      expect.arrayContaining([
        expect.objectContaining({id: 'clients'}),
        expect.objectContaining({title: 'Clients'}),
        expect.objectContaining({href: '/overview/clients'}),
        expect.objectContaining({id: 'onboarding'}),
        expect.objectContaining({title: 'Onboarding'}),
        expect.objectContaining({href: '/overview/onboarding'}),
        expect.objectContaining({id: 'remittables'}),
        expect.objectContaining({title: 'Remittables'}),
        expect.objectContaining({href: '/overview/remittables'}),
        expect.objectContaining({id: 'audits'}),
        expect.objectContaining({title: 'Audits'}),
        expect.objectContaining({href: '/overview/audits'}),
      ]),
    );
  });
  it('should have API Items', () => {
    expect(api).toEqual(
      expect.arrayContaining([
        expect.objectContaining({id: 'api'}),
        expect.objectContaining({title: 'API Documentation'}),
        expect.objectContaining({href: 'https://api-doc.staging.nexway.build'}),
        expect.objectContaining({id: 'product-documentation'}),
        expect.objectContaining({title: 'Product Documentation'}),
      ]),
    );
  });
});
