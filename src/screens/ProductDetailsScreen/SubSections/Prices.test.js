import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Prices from './Prices';

const currentProductData = {
  blackListedCountries: [],
  businessSegment: "",
  catalogId: "646cbc68-4eae-46cb-bfff-5e6ed3ee399e",
  createDate: 1627936114267,
  customerId: "b5386d13-a0fd-4a77-9566-4c8db9306f98",
  dbVersion: 0,
  descriptionId: "564255a2-ad64-4ede-82e1-f66246f9be7c",
  externalContext: "",
  fulfillmentTemplate: "",
  genericName: "My first onboarded product",
  id: "0c7af31b-4ea9-4269-b1df-ec7bc48dfc5e",
  lastUpdateReason: "resource creation thru REST Api",
  lifeTime: "PERMANENT",
  nextGenerationOf: [],
  physical: false,
  priceFunction: "",
  prices: {defaultCurrency: "USD", priceByCountryByCurrency: {}},
  productFamily: "",
  publisherRefId: "SKU01",
  resources: [],
  salesMode: "STANDARD",
  sellingStores: ["f4ea214f-a559-45e3-81fd-404abaf92ff1"],
  status: "ENABLED",
  subscriptionTemplate: "",
  trialAllowed: false,
  trialDuration: "",
  type: "SOFTWARE",
  updateDate: 1627936114267,
};
const countries = [];
const setSaveDisabled = () => {};

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => countries),
}));
jest.mock('../../../api', () => ({
  getPricesByProductId: jest.fn().mockImplementation(() => Promise.resolve()),
  getCountryOptions: jest.fn().mockImplementation(() => Promise.resolve()),
}));

describe('<Prices />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = mount(<Prices currentProductData={currentProductData} setSaveDisabled={setSaveDisabled}/>);
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
