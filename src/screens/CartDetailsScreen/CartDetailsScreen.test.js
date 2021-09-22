import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import CartDetailsScreen from './CartDetailsScreen';

const mockCartByIdData = {
  data: {
    availableCurrencies: ["EUR", "GBP", "USD"],
    blockDiscounts: false,
    cartIp: "",
    checkoutUrl: "",
    country: "",
    createDate: 1628771205051,
    currency: "EUR",
    customerId: "50987be4-174a-4042-9de5-f2ce7f9b5e95",
    dbVersion: 0,
    discounts: [],
    endUser: {country: "FR", taxExemptionEligible: false},
    hideCrossSell: false,
    hideUpSell: false,
    id: "12af3c64-f361-4ba1-8567-aeb6a3538def",
    lastUpdateReason: "iap-front[SSR - createCart]",
    locale: "en-US",
    manualUpdateDate: 1628771204734,
    price: {currency: "EUR", netPrice: 8.32, grossPrice: 9.99, vatAmount: 1.67},
    products: [
      {
        catalogId: "3d6be6b9-e0cf-4ac6-be7f-0aaedff0a8ca",
        customerId: "50987be4-174a-4042-9de5-f2ce7f9b5e95",
        defaultCurrency: "USD",
        descriptionId: "05720229-0166-4d13-8f12-e33253958cc3",
        fullPrice: {currency: "EUR", netPrice: 8.32, grossPrice: 9.99, vatIncluded: true, vatRate: 0.2, vatAmount: 1.67},
        id: "d1d01ea4-9384-4934-b063-5fe706cf6ed4",
        lifeTime: "PERMANENT",
        longDesc: "<p>Long Description of my test product</p>",
        name: "My test product",
        physical: false,
        price: {currency: "EUR", netPrice: 8.32, grossPrice: 9.99, vatIncluded: true, vatRate: 0.2, vatAmount: 1.67},
        publisherRefId: "SKU01",
        quantity: 1,
        resources: [
          {
            label: "product_boxshot",
            url: "",
          }
        ],
        salesMode: "STANDARD",
        shortDesc: "<p>Description of my test product</p>",
        storeId: "df95a547-86cf-42e2-9a7f-7400efd88e05",
        trial: false,
        type: "SOFTWARE",
        unitPrice: {currency: "EUR", netPrice: 8.32, grossPrice: 9.99, vatIncluded: true, vatRate: 0.2, vatAmount: 1.67},
        variableValues: {},
      }
    ],
    promoteOneClickPayment: false,
    scheduledSuppressionDate: 1629030404734,
    source: "PURCHASE",
    storeHostname: "cypress-store-1.staging.nexway.build",
    storeId: "df95a547-86cf-42e2-9a7f-7400efd88e05",
    subsidiaryId: "1",
    taxAuthority: "NX_VATENGINE",
    totalAmount: 9.99,
    updateDate: 1628771205051,
    userAgent: "",
  },
};

const mockCustomerByIdData = {
  data: {
    createDate: 1593757175607,
    createInvoice: true,
    dbVersion: 2,
    email: "",
    features: {
      connectManagement: false,
      createInvoice: true,
      onboardingManagement: false,
      productManagement: true,
      remittanceManagement: false,
      resellerManagement: false,
      sellOnBehalf: true,
      seller: true,
      sendOrderConfirmationEmail: true,
      sgOrdersManagement: false,
      subscriptionUpgradeAuthorized: false,
      usingBillingPlan: false,
      usingFulfillmentV1: true,
      usingSubscriptionV1: true,
    },
    fulfillments: {},
    iamClient: {
      realmName: "e2eqatestcustomer",
      realmPublicKey: "",
    },
    id: "50987be4-174a-4042-9de5-f2ce7f9b5e95",
    lastUpdateReason: "",
    localizedZendeskGuideUrls: {['fr-FR']: "", neutral: ""},
    name: "E2E QA TEST CUSTOMER ",
    onboardingManager: false,
    paymentServiceConfiguration: {
      maxPaymentsParts: 1,
      minPaymentAmountInPercent: 10,
      promoteOneClickPayment: false,
      ignedPartialAmountRequired: false,
    },
    platforms: ["IAP"],
    promoteOneClickPayment: false,
    sendOrderConfirmationEmail: true,
    status: "RUNNING",
    subscriptionUpgradeAuthorized: false,
    subscriptions: {},
    type: "PUBLISHER",
    updateDate: 1593775071368,
    usingSubscriptionV1: true,
  },
};

const mockProductsData = {
  headers: [
    {value: "Publisher Ref ID", id: "publisherRefId"},
    {value: "Quantity", id: "quantity"},
    {value: "Name", id: "name"},
    {value: "Discount", id: "discount"},
    {value: "Net", id: "netPrice"},
    {value: "Gross", id: "grossPrice"},
    {value: "VAT", id: "vatAmount"},
    {value: "Net price discounted", id: "discountedNetPrice"},
    {value: "Gross price discounted", id: "discountedGrossPrice"},
    {value: "Vat amount discounted", id: "vatDiscountAmount"},
  ],
  meta: {totalPages: 1},
  values: [
    {
      discount: "-",
      discountedGross: "-",
      discountedNet: "-",
      discountedVat: "-",
      grossPrice: "86.4 EUR",
      id: "566b8e0a-978c-44a8-afe6-76db50ea2b54",
      name: "Blizz Core - Yearly subscription",
      netPrice: "72 EUR",
      publisherRefId: "test",
      quantity: 1,
      vatAmount: "14.4 EUR",
    }
  ],
};

jest.mock('../../api', () => ({
  getCartById: () => Promise.resolve(mockCartByIdData),
  getCustomerById: () => Promise.resolve(mockCustomerByIdData),
}));
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ id: '12af3c64-f361-4ba1-8567-aeb6a3538def' })),
  useHistory: jest.fn(() => ({})),
}));

describe('<CartDetailsScreen />', () => {
  let wrapper;
  let [curTab, isLoading, customer, error, cartData, anchorEl, products, emails] =
    [0, false, mockCustomerByIdData, null, mockCartByIdData, null, mockProductsData, null];
  let stateArr = [curTab, isLoading, customer, error, cartData, anchorEl, products, emails];
  let index = 0;
  const setState = jest.fn((newState) => newState);
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => {
    index += 1;
    return [stateArr[index-1], setState];
  });

  beforeEach(() => {
    wrapper = mount(<CartDetailsScreen />);
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
