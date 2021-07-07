import React from 'react';
import { shallow } from 'enzyme';
import General from './General';

describe('NotificationDetailScreen <General/>', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all inputs', () => {
    wrapper = shallow(
      <General
        curNotification={{}}
        setCurNotification={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.find({ 'data-test': "name" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "events" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "targetedCustomers" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "receiverType" }).length).toEqual(1)
  });

  it('If curNotification.receiverType equal "email" emailInput should be on the page', () => {
    wrapper = shallow(
      <General
        curNotification={{receiverType:'email'}}
        setCurNotification={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.find({ 'data-test': "emailInput" }).length).toEqual(1)
  });

  it('If curNotification.receiverType not equal "email" emailInput should not be on the page', () => {
    wrapper = shallow(
      <General
        curNotification={{receiverType:''}}
        setCurNotification={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.find({ 'data-test': "emailInput" }).length).toEqual(0)
  });
});
