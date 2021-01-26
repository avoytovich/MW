import React from 'react';
import { mount } from 'enzyme';
import MainSection from './MainSection';

let productData = {
  customerId: 'testId',
  genericName: 'genericName_test',
  status: 'ENABLED',
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

describe('ProductDetails <MainSection/>', () => {
  let wrapper;
  let mainSection;

  beforeEach(() => {
    wrapper = mount(
      <MainSection
        setProductData={(newProductData) => {
          productData = newProductData;
          wrapper.setProps({ currentProductData: productData });
        }}
        currentProductData={productData}
      />,
    );
    mainSection = wrapper.find({ 'data-test': 'mainSection' }).first();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('paragraphs should be populated with product details data', () => {
    const { genericName, status } = productData;
    expect(wrapper.find('h3[data-test="productName"]').text()).toEqual(
      genericName,
    );
    expect(
      wrapper.find('button[data-test="statusEnabledBtn"]').instance().disabled,
    ).toEqual(true);
    expect(
      wrapper.find('button[data-test="statusDisabledBtn"]').instance().disabled,
    ).toEqual(false);
  });

  it('should change productData status on clicking button', async () => {
    wrapper.find('button[data-test="statusDisabledBtn"]').simulate('click');
    expect(
      wrapper.find('button[data-test="statusDisabledBtn"]').instance().disabled,
    ).toEqual(true);
    expect(productData.status).toEqual('DISABLED');
  });
});
