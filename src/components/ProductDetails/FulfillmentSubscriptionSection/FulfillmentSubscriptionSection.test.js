import React from 'react';
import { mount } from 'enzyme';
import FulfillmentSubscriptionSection from './FulfillmentSubscriptionSection';

let productData = {
  nextGenerationOf: [1, 2],
  subscriptionTemplate: '1',
  trialDuration: '1',
  customerId: 'testId',
  type: 'GAMES',
  sellingStores: [1, 2],
  lifeTime: 'PERMANENT',
  trialAllowed: true,
  fulfillmentTemplate: '2',
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
  subscriptionModels: [
    { id: '1', name: 'test_name_1' },
    { id: '2', name: ' test_name_2' },
  ],
  fulfillmentTemplates: [
    { id: '1', name: 'test_name_1' },
    { id: '2', name: ' test_name_2' },
  ],
  renewingProducts: [
    { id: 1, genericName: 'test_1' },
    { id: 2, genericName: 'test_2' },
  ],
};

describe('ProductDetails <FulfillmentSubscriptionSection/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <FulfillmentSubscriptionSection
        setProductData={(newProductData) => {
          productData = newProductData;
        }}
        currentProductData={productData}
        selectOptions={selectOptions}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('inputs/paragraphs should be populated with product details data', () => {
    const {
      subscriptionTemplate,
      trialAllowed,
      trialDuration,
      fulfillmentTemplate,
      nextGenerationOf,
    } = productData;
    expect(
      wrapper.find('input[name="subscriptionModel"]').instance().value,
    ).toEqual(subscriptionTemplate);
    expect(wrapper.find('input[name="allowTrial"]').instance().checked).toEqual(
      trialAllowed,
    );
    expect(
      wrapper.find('input[name="trialDuration"]').instance().value,
    ).toEqual(trialDuration);
    expect(
      wrapper.find('input[name="fulfillmentTemplate"]').instance().value,
    ).toEqual(fulfillmentTemplate);
    expect(
      wrapper.find('input[name="renewingProducts"]').instance().value,
    ).toEqual(nextGenerationOf.join(','));
  });

  it('should change productData when some update is made', async () => {
    const newValue = '1';
    wrapper.find('input[name="fulfillmentTemplate"]').simulate('change', {
      target: { name: 'fulfillmentTemplate', value: newValue },
    });
    expect(productData.fulfillmentTemplate).toEqual(newValue);
  });
});
