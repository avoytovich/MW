import React from 'react';
import { mount } from 'enzyme';
import Prices from './Prices';

let productData = {
  prices: {
    priceByCountryByCurrency: {
      EUR: { default: { value: '1' } },
    },
    defaultCurrency: 'EUR',
  },
};

describe('ProductDetails <Prices/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Prices
        setProductData={(newProductData) => {
          productData = newProductData;
        }}
        currentProductData={productData}
        productData={productData}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('inputs should be populated with product details data', () => {
    expect(wrapper.find('input[name="totalPrice"]').instance().value).toEqual(
      productData.prices.priceByCountryByCurrency[
        productData.prices.defaultCurrency
      ].default.value,
    );
    expect(wrapper.find('input[name="total"]').instance().value).toEqual(
      productData.prices.priceByCountryByCurrency[
        productData.prices.defaultCurrency
      ].default.value,
    );
  });

  it('should change productData when some update is made', async () => {
    wrapper.find({ 'data-test': 'editIcon' }).first().simulate('click');
    const newValue = 2;
    wrapper.find('input[name="totalPrice"]').simulate('change', {
      target: {
        name: [
          productData.prices.priceByCountryByCurrency[
            productData.prices.defaultCurrency
          ].default.value,
        ],
        value: newValue,
      },
    });
    expect(
      productData.prices.priceByCountryByCurrency[
        productData.prices.defaultCurrency
      ].default.value,
    ).toEqual(newValue);
  });
});
