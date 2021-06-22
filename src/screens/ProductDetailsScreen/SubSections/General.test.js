import React from 'react';
import { mount } from 'enzyme';

import General from './General';

const defaultProduct = {
  status: 'DISABLED',
  type: 'GAMES',
  genericName: 'name',
  catalogId: 'catalogId',
  publisherRefId: 'publisherRefId',
  lifeTime: 'PERMANENT',
  physical: false,
  sellingStores: [1, 2],
  blackListedCountries: ['country1', 'country2'],
  trialAllowed: false,
  subscriptionTemplate: '',
  trialDuration: '',
  fulfillmentTemplate: '',
  businessSegment: 'businessSegment',
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
  catalogs: [],
  priceFunctions: []
};

const parentId = 'parentId';

const mockHistoryPush = jest.fn();
const setProductData = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useParams: jest.fn(() => ({})),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector:() => jest.fn().mockImplementation(({ sessionData: { countries } }) => countries),
  useDispatch: () => jest.fn().mockImplementation(() => {})
}));


const mockSetState = () => jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');

useStateSpy.mockImplementation((state) => [state, mockSetState]);

const mockUseEffect = () => {
  useEffect.mockImplementationOnce((f) => f());
};

const useEffect = jest.spyOn(React, 'useEffect');

describe('Product <General/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <General
        selectOptions={selectOptions}
        setProductData={setProductData}
        currentProductData={{ ...defaultProduct, lifeTime: '1MONTH' }}
        parentId={parentId}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  mockUseEffect();

  it('input[catalogId] should be populated with product details data', () => {
    const { catalogId } = defaultProduct;
    const wrap = wrapper.find('div[data-test="catalog"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.find('input').instance().value).toEqual(catalogId);
  });

  it('input[genericName] should be populated with product details data', () => {
    const { genericName } = defaultProduct;
    const wrap = wrapper.find('div[data-test="name"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.find('input').instance().value).toEqual(genericName);
  });

  it('input[type] should be populated with product details data', () => {
    const { type } = defaultProduct;
    const wrap = wrapper.find('div[data-test="type"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.find('input').instance().value).toEqual(type);
  });

  it('input[publisherRefID] should be populated with product details data', () => {
    const { publisherRefID } = defaultProduct;
    const wrap = wrapper.find('div[data-test="publisherRefID"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.find('input').instance().value).toEqual(publisherRefID);
  });

  it('input[businessSegment] should be populated with product details data', () => {
    const { businessSegment } = defaultProduct;
    const wrap = wrapper.find('div[data-test="businessSegment"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.find('input').instance().value).toEqual(businessSegment);
  });

  it('input[lifeTime] should be populated with product details data', () => {
    const { lifeTime } = defaultProduct;
    const wrap = wrapper.find('div[data-test="lifeTime"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.find('input').instance().value).toEqual(lifeTime);
  });

  it('input[externalContext] should be populated with product details data', () => {
    const { externalContext } = defaultProduct;
    const wrap = wrapper.find('div[data-test="externalContext"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.find('input').instance().value).toEqual(externalContext);
  });

  it('input[sellingStores] should be populated with product details data', () => {
    const { sellingStores } = defaultProduct;
    const wrap = wrapper.find('div[data-test="sellingStores"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.find('input').instance().value).toEqual(sellingStores);
  });

  it('input[productFamily] should be populated with product details data', () => {
    const { productFamily } = defaultProduct;
    const wrap = wrapper.find('div[data-test="family"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.find('input').instance().value).toEqual(productFamily);
  });

  it('input[blockedCountries] should be populated with product details data', () => {
    const { blackListedCountries } = defaultProduct;
    const wrap = wrapper.find('div[data-test="blockedCountries"]');
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.find('input').instance().value).toEqual(blackListedCountries);
  });

  it('Life time count input shold exist', () => {
    const wrapper = mount(
      <General
        selectOptions={selectOptions}
        setProductData={setProductData}
        currentProductData={{ ...defaultProduct, lifeTime: '1MONTH' }}
        parentId={parentId}
      />,
    );

    expect(wrapper.find('div[data-test="maxPaymentsPart"]').exists()).toBeTruthy();
  });
});
