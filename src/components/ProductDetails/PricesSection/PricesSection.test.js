import React from 'react';
import { mount } from 'enzyme';
import PricesSection from './PricesSection';

let productData = {
  prices: {
    priceByCountryByCurrency: {
      EUR: { default: { value: '1' } },
    },
    defaultCurrency: 'EUR',
  },
};

describe('ProductDetails <PricesSection/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <PricesSection
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
