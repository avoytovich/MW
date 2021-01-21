import React from 'react';
import { mount } from 'enzyme';
import MainInfo from './MainInfo';

let productData = {
  customerId: 'testId',
  type: 'GAMES',
  sellingStores: [1],
  lifeTime: 'PERMANENT',
  trialAllowed: 'true',
  prices: {
    priceByCountryByCurrency: {
      EUR: { default: { value: '' } },
    },
    defaultCurrency: 'EUR',
  },
};
const selectOptions = { sellingStores: [{ id: 1, name: 'test_1' }] };

describe('ProductDetails <MainInfo/>', () => {
  let wrapper;
  let mainSection;

  beforeEach(() => {
    wrapper = mount(
      <MainInfo
        setProductData={(newProductData) => {
          productData = newProductData;
          wrapper.setProps({ currentProductData: productData });
        }}
        setInputErrors={jest.fn()}
        productData={productData}
        currentProductData={productData}
        selectOptions={selectOptions}
      />,
    );
    mainSection = wrapper.find({ 'data-test': 'mainSection' }).first();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('inputs/paragraphs should be populated with product details data', () => {
    const { type, lifeTime, trialAllowed } = productData;
    expect(wrapper.find('input[name="type"]').instance().value).toEqual(type);
    expect(wrapper.find('p[data-test="lifeTime"]').text()).toEqual(lifeTime);
    expect(wrapper.find('input[name="trialAllowed"]').instance().value).toEqual(
      trialAllowed,
    );
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
    expect(wrapper.find('input[name="type"]').instance().value).toEqual('');
    expect(wrapper.find('input[name="lifeTime"]').instance().value).toEqual('');
    expect(wrapper.find('input[name="trialAllowed"]').instance().value).toEqual(
      '',
    );
  });

  it('should change productData when some update is made', async () => {
    wrapper.find({ 'data-test': 'editIcon' }).first().simulate('click');
    const newValue = 'SOFTWARE';
    wrapper.find('input[name="type"]').simulate('change', {
      target: { name: 'type', value: newValue },
    });
    expect(productData.type).toEqual(newValue);
  });
});
