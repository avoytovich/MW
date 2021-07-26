import React from 'react';
import { mount } from 'enzyme';

import ProductFiles from './ProductFiles';

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
  resources: [
    {url: 'url1', labe: 'some label1'},
    {url: 'url2', labe: 'some label2'},
    {url: 'url3', labe: 'some label3'},
  ],
  relatedContents: [
    {file: 'url1', labe: 'some label1'},
    {file: 'url2', labe: 'some label2'},
    {file: 'url3', labe: 'some label3'},
  ],
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

describe('Product <ProductFiles/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ProductFiles
      currentProductData={defaultProduct}
      setProductData={setProductData}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  mockUseEffect();
  mockUseEffect();

  it('shold contain three content items', () => {
 const wrap = wrapper.find('div[data-test="productFileContentItem"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap).toHaveLength(3)
  });

  it('shold contain three resourse', () => {
    const wrap = wrapper.find('input[name="allowTrial"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap).toHaveLength(3);
  });
});
