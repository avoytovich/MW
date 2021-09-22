import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import OrderDetailsTableComponent from './OrderDetailsTableComponent';

const testData = {
  headers: [
    { value: 'Publisher Ref ID', id: 'publisherRefId' },
    { value: 'Quantity', id: 'quantity' },
    { value: 'Price function', id: 'priceFunction' },
    { value: 'Name', id: 'name' },
    { value: 'Activation Code/Key', id: 'activationCode' },
    { value: 'Receiver URL (webhook)', id: 'receiverUrl', sortParam: 'url' },
    { value: 'Discount', id: 'discount' },
    { value: 'Net', id: '"netPrice"' },
    { value: 'Gross', id: 'grossPrice' },
    { value: 'VAT', id: 'vatAmount' },
  ],
  meta: {
    totalPages: 1,
  },
  values: [
    {
      activationCode: "-",
      discount: "-",
      discountedGross: "-",
      discountedNet: "-",
      discountedVat: "-",
      grossPrice: "100.04 EUR",
      id: "1e99ec01-668d-44cc-82f0-819f19ca1727",
      name: "ESET Internet Security - 1YEAR",
      netPrice: "82 EUR",
      priceFunction: "-",
      processingError: false,
      productId: "29ad6511-cff3-4000-8825-32b00c7d0815_140--140-1",
      publisherRefId: "140",
      quantity: 1,
      subscription: undefined,
      vatAmount: "18.04 EUR",
    }
  ],
};

const showColumn = {
  activationCode: true,
  discount: true,
  grossPrice: true,
  id: false,
  name: true,
  netPrice: true,
  priceFunction: true,
  publisherRefId: true,
  quantity: true,
  vatAmount: true,
}

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => ({})),
}));

describe('<OrderDetailsTableComponent />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = mount(<OrderDetailsTableComponent tableData={testData} showColumn={showColumn}/>);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(wrapper)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
