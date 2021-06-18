import React from 'react';
import { mount, shallow } from 'enzyme';
import SubProductVariations from './SubProductVariations';

const selectOptions = {
  sellingStores: [
    { id: 1, displayName: 'test_1' },
    { id: 2, displayName: 'test_2' },
  ],
};

const currentProductData = {
  status: {
    value: 'DISABLED',
    state: 'inherits',
    parentValue: 'DISABLED',
  },
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

const parentId = 'parentId';

const variablesDescriptions = [];

const mockHistoryPush = jest.fn();
const setProductData = jest.fn();
const setProductDetails = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useParams: jest.fn(() => ({})),
}));

const mockSetState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');

useStateSpy.mockImplementation((init) => [init, mockSetState]);

describe('ProductSubProductVariations <SubProductVariations/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Bundled products editing enable', () => {
    const wrapper = mount(
      <SubProductVariations
        setProductData={setProductData}
        currentProductData={{
          ...currentProductData,
          subProducts: {
            state: 'overrides',
            value: ['id1', 'id2'],
          },
        }}
        parentId={parentId}
        selectOptions={selectOptions}
        variablesDescriptions={variablesDescriptions}
      />,
    );

    expect(wrapper.find('div[data-test="bundledSectionDisabled"]')).toHaveLength(1);
  });

  it('increment the counter', () => {
    const wrapper = mount(
      <SubProductVariations
        setProductData={setProductData}
        setProductDetails={setProductDetails}
        currentProductData={{
          ...currentProductData,
          subProducts: {
            state: 'overrides',
            value: ['id1', 'id2'],
          },
        }}
        parentId={parentId}
        selectOptions={selectOptions}
        variablesDescriptions={variablesDescriptions}
      />,
    );

    wrapper.find('button[data-test="incrementSubProduct"]').at(1).simulate('click');

    const counterWrapper = wrapper.find('button[data-test="subProductCount"]').at(1);
    expect(counterWrapper.text()).toBe('1');
  });

  it('decrements the counter', () => {
    const wrapper = mount(
      <SubProductVariations
        setProductData={setProductData}
        setProductDetails={setProductDetails}
        currentProductData={{
          ...currentProductData,
          subProducts: {
            state: 'overrides',
            value: ['id1', 'id2'],
          },
        }}
        parentId={parentId}
        selectOptions={selectOptions}
        variablesDescriptions={variablesDescriptions}
      />,
    );

    wrapper.find('button[data-test="decrementSubProduct"]').at(1).simulate('click');

    const counterWrapper = wrapper.find('button[data-test="subProductCount"]').at(1);
    expect(counterWrapper.text()).toBe('1');
  });
});

describe('SubProductVariations <SubProductVariations/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('if parentId exist should apear ', () => {
    const wrapper = shallow(
      <SubProductVariations
        setProductData={jest.fn(() => {})}
        setProductDetails={jest.fn(() => {})}
        currentProductData={{
          ...currentProductData,
          subProducts: {
            state: 'overrides',
            value: ['id1', 'id2'],
          },
        }}
        parentId={parentId}
        selectOptions={selectOptions}
        variablesDescriptions={variablesDescriptions}
      />,
    );
    expect(wrapper).toHaveLength(1);
  });

  it('Variation parameters', () => {
    const wrapper = mount(
      <SubProductVariations
        setProductData={jest.fn(() => {})}
        setProductDetails={jest.fn(() => {})}
        currentProductData={{
          ...currentProductData,
          description1: {
            value: 'description1',
            state: 'inherits',
            parentValue: 'description1',
          },
          description2: {
            value: 'description2',
            state: 'overrides',
            parentValue: 'description3',
          },
        }}
        parentId={parentId}
        selectOptions={selectOptions}
        variablesDescriptions={[
          { label: 'label1', description: 'description1', variableValueDescriptions: [] },
          { label: 'label2', description: 'description2', variableValueDescriptions: [] },
        ]}
      />,
    );
    const parameters = wrapper.find('div[data-test="variationParameter"]');

    expect(parameters.at(0).prop('disabled')).toEqual(true);
    expect(parameters.at(1).prop('disabled')).toEqual(false);
  });
});
