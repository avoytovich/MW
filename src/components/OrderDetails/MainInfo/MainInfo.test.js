import React from 'react';
import { mount } from 'enzyme';
import MainInfo from './MainInfo';
import formatDate from '../../../services/dateFormatting';

const date = 1606732200058;
const formattedDate = formatDate(date);
let orderData = {
  customer: { id: 'test_id' },
  id: 'test_id',
  status: 'CREATED',
  store: { name: 'test_name' },
  processingEvent: [{ metadata: { paymentId: 'test_paymentId' } }],
  lineItems: [
    {
      amount: 'test_amount',
      fulfillmentProcessingStatus: 'test_fulfillmentProcessingStatus',
      subscriptionProcessingStatus: 'test_subscriptionProcessingStatus',
      productId: 'test_productsId',
    },
  ],
  payment: { status: 'test_status', transactionId: 'test_transactionId' },
  lastUpdateReason: 'lastUpdateReason',
  createDate: date,
  updateDate: date,
  endUser: {
    company: { companyName: 'test_companyName' },
    streetAddress: 'test_streetAddress',
    zipCode: '1',
    country: 'country',
  },
  maxPaymentsParts: '1',
  paymentDeadline: 'test_paymentDeadline',
  emails: [{ createDate: date }],
  invoice: { date },
};
const customerName = 'test_customerName';

describe('OrderDetails <MainInfo/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MainInfo
        currentOrderData={orderData}
        customer={customerName}
        setCurrentOrderData={(newData) => {
          orderData = newData;
        }}
        orderData={orderData}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('inputs/paragraphs should be populated with order details data', () => {
    const {
      id,
      status,
      lineItems,
      store,
      processingEvent,
      payment,
      lastUpdateReason,
      endUser,
      maxPaymentsParts,
      paymentDeadline,
    } = orderData;
    expect(wrapper.find('h1[data-test="orderId"]').text()).toEqual(id);

    expect(wrapper.find('h1[data-test="customer"]').text()).toEqual(
      customerName,
    );

    expect(wrapper.find('input[name="status"]').instance().value).toEqual(
      status,
    );

    expect(wrapper.find('p[data-test="amount"]').text()).toEqual(
      lineItems[0]?.amount,
    );
    expect(wrapper.find('p[data-test="storeName"]').text()).toEqual(store.name);

    expect(wrapper.find('p[data-test="paymentId"]').text()).toEqual(
      processingEvent[0]?.metadata?.paymentId,
    );

    expect(wrapper.find('p[data-test="fulfillment"]').text()).toEqual(
      lineItems[0]?.fulfillmentProcessingStatus,
    );

    expect(wrapper.find('p[data-test="paymentStatus"]').text()).toEqual(
      payment.status,
    );

    expect(
      wrapper.find('p[data-test="subscriptionProcessingStatus"]').text(),
    ).toEqual(lineItems[0]?.subscriptionProcessingStatus);

    expect(wrapper.find('p[data-test="createDate"]').text()).toEqual(
      formattedDate,
    );

    expect(wrapper.find('p[data-test="updateDate"]').text()).toEqual(
      formattedDate,
    );

    expect(wrapper.find('p[data-test="lastUpdateReason"]').text()).toEqual(
      lastUpdateReason,
    );

    expect(wrapper.find('p[data-test="emailsCreateDate"]').text()).toEqual(
      formattedDate,
    );

    expect(wrapper.find('p[data-test="invoiceCreateDate"]').text()).toEqual(
      formattedDate,
    );

    expect(wrapper.find('p[data-test="companyName"]').text()).toEqual(
      endUser.company.companyName,
    );
    expect(wrapper.find('p[data-test="streetAddress"]').text()).toEqual(
      endUser.streetAddress,
    );

    expect(wrapper.find('p[data-test="zipCode"]').text()).toEqual(
      endUser.zipCode,
    );

    expect(wrapper.find('p[data-test="country"]').text()).toEqual(
      endUser.country,
    );

    expect(wrapper.find('p[data-test="transactionId"]').text()).toEqual(
      payment.transactionId,
    );

    expect(wrapper.find('p[data-test="maxPaymentsParts"]').text()).toEqual(
      maxPaymentsParts,
    );
    expect(wrapper.find('p[data-test="paymentDeadline"]').text()).toEqual(
      paymentDeadline,
    );
  });

  it('on hover edit icon should appear', () => {
    wrapper.simulate('mouseover');
    expect(wrapper.find({ 'data-test': 'editIcon' }).exists).toBeTruthy();
  });

  it('should change orderData when some update is made', async () => {
    wrapper.find({ 'data-test': 'editIcon' }).first().simulate('click');
    const newValue = 'COMPLETED';
    wrapper.find('input[name="status"]').simulate('change', {
      target: { name: 'status', value: newValue },
    });
    expect(orderData.status).toEqual(newValue);
  });
});
