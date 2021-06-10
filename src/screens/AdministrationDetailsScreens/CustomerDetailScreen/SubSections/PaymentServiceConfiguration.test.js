import React from 'react';
import { shallow } from 'enzyme';
import PaymentServiceConfiguration from './PaymentServiceConfiguration';


describe('CustomerDetailScreen <PaymentServiceConfiguration/>', () => {

  it('Should return all inputs', () => {
    const wrapper = shallow(
      <PaymentServiceConfiguration
        currentCustomer={{ paymentServiceConfiguration: {} }}
        setCurrentCustomer={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.find({ 'data-test': "promoteOneClickPayment" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "paymentVendor" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "maxPaymentsParts" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "minPaymentAmountInPercent" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "signedPartialAmountRequired" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "availableAdditionalPaymentTypes" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "blackListedPaymentTypes" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "forcedPaymentMethods" }).length).toEqual(1)
    jest.clearAllMocks();
  });
});
