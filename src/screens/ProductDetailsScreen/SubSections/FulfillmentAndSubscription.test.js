import React from 'react';
import { mount } from 'enzyme';

import FulfillmentAndSubscription from './FulfillmentAndSubscription';

const defaultProduct = {
  status: 'DISABLED',
  type: 'GAMES',
  genericName: 'name',
  catalogId: 'catalogId',
  publisherRefId: 'publisherRefId',
  lifeTime: 'PERMANENT',
  physical: false,
  sellingStores: [1, 2],
  blackListedCountries: [],
  trialAllowed: true,
  subscriptionTemplate: ['template'],
  trialDuration: '1',
  fulfillmentTemplate: '',
  businessSegment: 'businessSegment',
  externalContext: '',
  productFamily: '',
  priceFunction: '',
  nextGenerationOf: ['test'],
  subProducts: ['id1'],
  prices: {
    defaultCurrency: 'AED',
    priceByCountryByCurrency: {
      AED: {
        default: {
          value: 1,
          msrp: null,
          upSell: null,
          crossSell: null,
          vatIncluded: false,
        },
      },
    },
  },
};

const selectOptions = {
  sellingStores: [
    { id: 1, displayName: 'test_1' },
    { id: 2, displayName: 'test_2' },
  ],
  renewingProducts: ['test'],
  subscriptionModels: ['template'],
};

const mockHistoryPush = jest.fn();
const setProductData = () => jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useParams: jest.fn(() => ({})),
}));

const mockSetState = () => jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');

useStateSpy.mockImplementation((state) => [state, mockSetState]);

const mockUseEffect = () => {
  useEffect.mockImplementationOnce((f) => f());
};

const useEffect = jest.spyOn(React, 'useEffect');

describe('Product <FulfillmentAndSubscription/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <FulfillmentAndSubscription
        selectOptions={selectOptions}
        setProductData={setProductData}
        currentProductData={{ ...defaultProduct, lifeTime: '1MONTH' }}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  mockUseEffect();

  it('input[subscriptionModel] should be populated with product details data', () => {
    const { subscriptionTemplate } = defaultProduct;
    const wrap = wrapper.find('div[data-test="subscriptionModel"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.find('input[name="subscriptionModel"]').instance().value).toEqual(
      subscriptionTemplate[0],
    );
  });

  it('input[allowTrial] should be populated with product details data', () => {
    const { trialAllowed } = defaultProduct;
    const input = wrapper.find('input[name="allowTrial"]');
    expect(input.exists()).toBeTruthy();
    expect(input.instance().checked).toEqual(trialAllowed);
  });

  it('input[trialDuration] should be populated with product details data', () => {
    const { trialDuration } = defaultProduct;
    const wrap = wrapper.find('div[data-test="trialDuration"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrapper.find('input[name="trialDuration"]').instance().value).toEqual(
      trialDuration,
    );
  });

  it('input[fulfillmentTemplate] should be populated with product details data', () => {
    const { fulfillmentTemplate } = defaultProduct;
    const wrap = wrapper.find('div[data-test="fulfillmentTemplate"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.find('input').instance().value).toEqual(fulfillmentTemplate);
  });

  it('input[renewingProducts] should be populated with product details data', () => {
    const { nextGenerationOf } = defaultProduct;
    const wrap = wrapper.find('div[data-test="renewingProducts"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.find('input').instance().value).toEqual(nextGenerationOf[0]);
  });
});
