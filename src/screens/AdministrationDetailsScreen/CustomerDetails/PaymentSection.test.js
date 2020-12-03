import React from 'react';
import { mount } from 'enzyme';
import PaymentSection from './PaymentSection';

let currentCustomer = {
  paymentServiceConfiguration: {
    promoteOneClickPayment: false,
    blackListedPaymentTypes: ['amex'],
    availableAdditionalPaymentTypes: ['invoice'],
    maxPaymentsParts: 1,
    minPaymentAmountInPercent: 10,
    signedPartialAmountRequired: false,
  },
};
const selectOptions = {
  subscriptions: null,
  fulfillments: null,
  availablePaymentTypes: null,
  blackPaymentTypes: null,
};

describe('AdministrationDetailsScreen <PaymentSection/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <PaymentSection
        setCurrentCustomer={(newData) => {
          currentCustomer = newData;
        }}
        currentCustomer={currentCustomer}
        selectOptions={selectOptions}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('input should be populated with customer.paymentServiceConfiguration', () => {
    const {
      availableAdditionalPaymentTypes,
      blackListedPaymentTypes,
      maxPaymentsParts,
      promoteOneClickPayment,
    } = currentCustomer.paymentServiceConfiguration;

    expect(
      wrapper.find({ name: 'availableAdditionalPaymentTypes' }).first().props()
        .value,
    ).toEqual(availableAdditionalPaymentTypes);
    expect(
      wrapper.find({ name: 'blackListedPaymentTypes' }).first().props().value,
    ).toEqual(blackListedPaymentTypes);
    expect(
      wrapper.find({ name: 'maxPaymentsParts' }).first().props().value,
    ).toEqual(maxPaymentsParts);
    expect(
      wrapper.find(
        `Select[name="onboardingManagement"][checked="${promoteOneClickPayment}"]`,
      ).exists,
    ).toBeTruthy();
  });

  it('should change currentCustomer when some update is made', async () => {
    const newValue = 2;
    wrapper.find('input[name="maxPaymentsParts"]').simulate('change', {
      target: {
        name: 'currentCustomer.paymentServiceConfiguration.maxPaymentsParts',
        value: newValue,
      },
    });
    expect(
      currentCustomer.paymentServiceConfiguration.maxPaymentsParts,
    ).toEqual(newValue);
  });
});
