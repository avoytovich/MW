import React from 'react';
import { mount } from 'enzyme';
import GeneralSection from './GeneralSection';

let productData = {
  customerId: 'testId',
  type: 'GAMES',
  sellingStores: [1, 2],
  lifeTime: 'PERMANENT',
  trialAllowed: 'true',
  prices: {
    priceByCountryByCurrency: {
      EUR: { default: { value: '' } },
    },
    defaultCurrency: 'EUR',
  },
};
const selectOptions = {
  sellingStores: [
    { id: 1, displayName: 'test_1' },
    { id: 2, displayName: 'test_2' },
  ],
};

describe('ProductDetails <GeneralSection/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <GeneralSection
        setProductData={(newProductData) => {
          productData = newProductData;
        }}
        setInputErrors={jest.fn()}
        productData={productData}
        currentProductData={productData}
        selectOptions={selectOptions}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('inputs/paragraphs should be populated with product details data', () => {
    const { type, sellingStores, lifeTime } = productData;
    expect(wrapper.find('input[name="type"]').instance().value).toEqual(type);
    expect(
      wrapper.find('input[name="sellingStores"]').instance().value,
    ).toEqual(sellingStores.join(','));
    expect(wrapper.find('input[name="lifeTime"]').instance().value).toEqual(
      lifeTime,
    );
  });

  it('should change productData when some update is made', async () => {
    const newValue = 'SOFTWARE';
    wrapper.find('input[name="type"]').simulate('change', {
      target: { name: 'type', value: newValue },
    });
    expect(productData.type).toEqual(newValue);
  });
});
