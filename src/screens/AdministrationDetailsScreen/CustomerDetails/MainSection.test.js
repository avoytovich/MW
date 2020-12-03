import React from 'react';
import { mount } from 'enzyme';
import { Select } from '@material-ui/core';

import MainSection from './MainSection';

let currentCustomer = {
  id: 'test_id',
  name: 'test_name',
  status: 'RUNNING',
  fulfillments: { avast: 'avast' },
  subscriptions: { CASTOR_ABO_1Y_30P: 'CASTOR_ABO_1Y_30P' },
};
const selectOptions = {
  subscriptions: null,
  fulfillments: null,
  availablePaymentTypes: null,
  blackPaymentTypes: null,
};

describe('AdministrationDetailsScreen <MainSection/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MainSection
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

  it('input should be populated with currentCustomer', () => {
    const { subscriptions, fulfillments, name, id } = currentCustomer;
    const fulfillmentsKeys = Object.keys(fulfillments);
    const subscriptionsKeys = Object.keys(subscriptions);
    expect(wrapper.find('h4[data-test="customerName"]').text()).toEqual(name);
    expect(wrapper.find('p[data-test="customerId"]').text()).toEqual(id);
    expect(
      wrapper.find({ name: 'fulfillments' }).first().props().value,
    ).toEqual(fulfillmentsKeys);
    expect(
      wrapper.find({ name: 'subscriptions' }).first().props().value,
    ).toEqual(subscriptionsKeys);
  });

  it('should change currentCustomer when some update is made', async () => {
    const newValue = [...Object.keys(currentCustomer.fulfillments), 'gnr'];
    const expectedValue = { ...currentCustomer.fulfillments, gnr: 'gnr' };
    wrapper
      .find(Select)
      .at(0)
      .props()
      .onChange({ target: { value: newValue } });
    expect(currentCustomer.fulfillments).toEqual(
      expect.objectContaining(expectedValue),
    );
  });
});
