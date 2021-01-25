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
      fontRef: { customerId: 'test_customerId', name: 'test_name' },
      layoutRef: { customerId: 'test_customerId', name: 'test_name' },
      i18nRef: { customerId: 'test_customerId' },
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
  customers: [{ id: 2, customerId: 'test_customerId', name: 'test_name' }],
  font: [{ id: 3, customerId: 'test_customerId', name: 'test_name' }],
  layout: [{ id: 4, customerId: 'test_customerId', name: 'test_name' }],
  translation: [{ id: 5, customerId: 'test_customerId' }],
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
      wrapper.find({ 'data-test': 'checkoutTheme' }).props().value,
    ).toEqual(checkoutTheme);
    const checkoutFont = `${designs.checkout.fontRef.customerId}: ${designs.checkout.fontRef.name}`;
    expect(wrapper.find({ 'data-test': 'checkoutFont' }).props().value).toEqual(
      checkoutFont,
    );
    const checkoutLayout = `${designs.checkout.layoutRef.customerId}: ${designs.checkout.layoutRef.name}`;
    expect(
      wrapper.find({ 'data-test': 'checkoutLayout' }).props().value,
    ).toEqual(checkoutLayout);

    expect(
      wrapper.find({ 'data-test': 'checkoutTranslation' }).props().value,
    ).toEqual(designs.checkout.i18nRef.customerId);
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
      wrapper.find({ 'data-test': 'checkoutTheme' }).props().value,
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
