import React from 'react';
import { mount } from 'enzyme';

import Variations from './Variations';

const defaultProduct = {
  status: 'DISABLED',
  type: '',
  genericName: '',
  catalogId: '',
  publisherRefId: '',
  lifeTime: 'PERMANENT',
  physical: false,
  sellingStores: [],
  blackListedCountries: [],
  trialAllowed: false,
  subscriptionTemplate: '',
  trialDuration: '',
  fulfillmentTemplate: '',
  businessSegment: '',
  externalContext: '',
  productFamily: '',
  priceFunction: '',
  nextGenerationOf: [],
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
};

const mockHistoryPush = jest.fn();
const setProductData = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useParams: jest.fn(() => ({})),
}));

const mockSetState = jest.fn();
const mockSetOpen = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');

useStateSpy.mockImplementation((init) => [init, mockSetState]);
useStateSpy.mockImplementation((init) => [init, mockSetOpen]);

describe('ProductVariations <Variations/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Empty table', () => {
    const wrapper = mount(
      <Variations
        selectOptions={selectOptions}
        setProductData={setProductData}
        currentProductData={defaultProduct}
        productVariations={{ bundledProducts: [], variations: {} }}
        setProductDetails={jest.fn()}
        productDetails={{}}
      />,
    );
    const table = wrapper.find('tbody');
    const row = table.at(1).find('tr');

    expect(table).toHaveLength(2);
    expect(row).toHaveLength(0);
  });

  it('Table with elements', () => {
    const wrapper = mount(
      <Variations
        selectOptions={selectOptions}
        setProductData={setProductData}
        currentProductData={defaultProduct}
        productVariations={{
          bundledProducts: [
            {
              id: 1,
            },
            {
              id: 2,
            },
            {
              id: 3,
            },
          ],
          variations: {},
        }}
        setProductDetails={jest.fn()}
        productDetails={{}}
      />,
    );
    const table = wrapper.find('tbody[data-test="productVariants"]');
    const row = table.find('tr');

    expect(table).toHaveLength(1);
    expect(row).toHaveLength(3);
  });

  it('increment the counter', () => {
    const wrapper = mount(
      <Variations
        selectOptions={selectOptions}
        setProductData={setProductData}
        currentProductData={defaultProduct}
        productVariations={{ bundledProducts: [], variations: {} }}
        setProductDetails={jest.fn()}
        productDetails={{}}
      />,
    );

    wrapper.find('button[data-test="incrementSubProduct"]').simulate('click');

    const counterWrapper = wrapper.find('button[data-test="subProductCount"]');
    expect(counterWrapper.text()).toBe('1');
  });

  it('decrements the counter', () => {
    const wrapper = mount(
      <Variations
        selectOptions={selectOptions}
        setProductData={setProductData}
        currentProductData={defaultProduct}
        productVariations={{ bundledProducts: [], variations: {} }}
        setProductDetails={jest.fn()}
        productDetails={{}}
      />,
    );

    wrapper.find('button[data-test="decrementSubProduct"]').simulate('click');

    const counterWrapper = wrapper.find('button[data-test="subProductCount"]');
    expect(counterWrapper.text()).toBe('1');
  });

  it('shold redirect', () => {
    const wrapper = mount(
      <Variations
        selectOptions={selectOptions}
        setProductData={jest.fn()}
        currentProductData={{
          availableVariables: [
            { field: 'field1', type: 'type1' },
            { field: 'field2', type: 'type2' },
          ],
        }}
        productVariations={{ bundledProducts: [], variations: {} }}
        setProductDetails={jest.fn()}
        productDetails={{}}
      />,
    );
    wrapper.find('button[data-test="addVariant"]').simulate('click');
    expect(mockHistoryPush).toHaveBeenCalledWith('/products/add');
  });
});
