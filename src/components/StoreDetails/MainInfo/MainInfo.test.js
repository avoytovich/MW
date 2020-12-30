import React from 'react';
import { mount } from 'enzyme';
import MainInfo from './MainInfo';

const inputErrors = { defaultLocale: null };
let storeData = {
  customerId: 'test_customerId',
  name: 'test_name',
  defaultLocale: 'en-US',
  saleLocales: ['test_saleLocales'],
  hostnames: ['test_hostnames'],
  routes: [
    {
      hostname: 'test_hostnames',
      url: 'test_url',
      fullUrl: 'test_fullUrl',
    },
  ],
  status: 'DISABLED',
  designs: {
    checkout: {
      themeRef: { customerId: 'test_customerId', name: 'test_name' },
      theme: 'test_theme',
    },
    endUserPortal: {
      themeRef: { customerId: 'test_customerId', name: 'test_name' },
      theme: 'test_theme',
    },
    paymentComponent: {
      rankedPaymentTabsByCountriesList: [{ rankedPaymentTabs: [] }],
    },
  },
};

const customerData = { name: 'test_CustomerName' };
const selectOptions = {
  theme: [{ id: 1, customerId: 'test_customerId', name: 'test_name' }],
};
describe('StoreDetails <MainInfo/>', () => {
  let wrapper;
  let mainSection;

  beforeEach(() => {
    wrapper = mount(
      <MainInfo
        currentStoreData={storeData}
        customerData={customerData}
        setCurrentStoreData={(newStoreData) => {
          storeData = newStoreData;
          wrapper.setProps({ currentStoreData: storeData });
        }}
        selectOptions={selectOptions}
        storeDat={storeData}
        inputErrors={inputErrors}
        setInputErrors={jest.fn()}
      />,
    );
    mainSection = wrapper.find({ 'data-test': 'mainSection' }).first();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('inputs/paragraphs should be populated with store details data', () => {
    const {
      status,
      routes,
      saleLocales,
      designs,
      defaultLocale,
      name,
    } = storeData;
    expect(wrapper.find('h1[data-test="storeName"]').text()).toEqual(name);
    expect(wrapper.find('h1[data-test="customerName"]').text()).toEqual(
      customerData.name,
    );
    expect(wrapper.find('input[name="status"]').instance().value).toEqual(
      status,
    );
    expect(wrapper.find('input[name="hostname"]').instance().value).toEqual(
      routes[0].hostname,
    );
    expect(
      wrapper.find('input[name="defaultLocale"]').instance().value,
    ).toEqual(defaultLocale);
    expect(wrapper.find('p[data-test="saleLocales"]').text()).toEqual(
      saleLocales.join(', '),
    );
    const enduserPortalTheme = `${designs.endUserPortal.themeRef.customerId}: ${designs.endUserPortal.themeRef.name}`;
    expect(
      wrapper.find('input[name="enduserPortalTheme"]').instance().value,
    ).toEqual(enduserPortalTheme);
    const checkoutTheme = `${designs.checkout.themeRef.customerId}: ${designs.checkout.themeRef.name}`;
    expect(
      wrapper.find('input[name="checkoutTheme"]').instance().value,
    ).toEqual(checkoutTheme);
  });

  it('on hover edit icon should appear', () => {
    mainSection.simulate('mouseover');
    expect(mainSection.find({ 'data-test': 'editIcon' }).exists).toBeTruthy();
  });

  it('on delete all inputs should be empty', async () => {
    mainSection.simulate('mouseover');
    wrapper.find({ 'data-test': 'editIcon' }).first().simulate('click');
    const deleteIcon = mainSection.find({ 'data-test': 'deleteIcon' }).first();
    expect(deleteIcon.exists).toBeTruthy();
    deleteIcon.simulate('click');
    expect(wrapper.find('input[name="status"]').instance().value).toEqual('');
    expect(
      wrapper.find('input[name="defaultLocale"]').instance().value,
    ).toEqual('');
    expect(wrapper.find('input[name="saleLocales"]').instance().value).toEqual(
      '',
    );
    expect(
      wrapper.find('input[name="enduserPortalTheme"]').instance().value,
    ).toEqual(': ');
    expect(
      wrapper.find('input[name="checkoutTheme"]').instance().value,
    ).toEqual(': ');
  });

  it('should change storeData when some update is made', async () => {
    wrapper.find({ 'data-test': 'editIcon' }).first().simulate('click');
    const newValue = 'ENABLED';
    wrapper.find('input[name="status"]').simulate('change', {
      target: { name: 'status', value: newValue },
    });
    expect(storeData.status).toEqual(newValue);
  });
});
