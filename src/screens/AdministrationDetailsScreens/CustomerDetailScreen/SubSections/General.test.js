import React from 'react';
import { shallow } from 'enzyme';
import General from './General';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('CustomerDetailScreen <General/>', () => {
  let wrapper;

  describe('General with existed id', () => {
    beforeEach(() => {
      wrapper = shallow(
        <General
          currentCustomer={{ id: '1', iamClient: {} }}
          setCurrentCustomer={jest.fn()}
          selectOptions={{}}
        />,
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should return all inputs', () => {
      expect(wrapper.find({ 'data-test': "status" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "customerName" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "customerId" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "realmName" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "email" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "fulfillmentTemplates" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "subscriptionsModels" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "cancelPeriod" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "createEndUserWithoutSubscription" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "remittableId" }).length).toEqual(1)
    });

    it('CustomerName, realmName and email inputs should be disabled', () => {
      expect(wrapper.find({ 'data-test': "customerName" }).props().idDisabled).toEqual(true);
      expect(wrapper.find({ 'data-test': "realmName" }).props().idDisabled).toEqual(true);
      expect(wrapper.find({ 'data-test': "email" }).props().idDisabled).toEqual(true);
    });
  });

  describe('General where id is not exist', () => {

    beforeEach(() => {
      wrapper = shallow(
        <General
          currentCustomer={{ iamClient: {} }}
          setCurrentCustomer={jest.fn()}
          selectOptions={{}}
        />,
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should not draw some inputs if id is not exists', () => {
      expect(wrapper.find({ 'data-test': "status" }).length).toEqual(0)
      expect(wrapper.find({ 'data-test': "customerName" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "customerId" }).length).toEqual(0)
      expect(wrapper.find({ 'data-test': "realmName" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "email" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "fulfillmentTemplates" }).length).toEqual(0)
      expect(wrapper.find({ 'data-test': "subscriptionsModels" }).length).toEqual(0)
      expect(wrapper.find({ 'data-test': "cancelPeriod" }).length).toEqual(0)
      expect(wrapper.find({ 'data-test': "createEndUserWithoutSubscription" }).length).toEqual(0)
      expect(wrapper.find({ 'data-test': "remittableId" }).length).toEqual(0)
    });

    it('CustomerName, realmName and email inputs should not be disabled', () => {
      expect(wrapper.find({ 'data-test': "customerName" }).props().idDisabled).toEqual(false);
      expect(wrapper.find({ 'data-test': "realmName" }).props().idDisabled).toEqual(false);
      expect(wrapper.find({ 'data-test': "email" }).props().idDisabled).toEqual(false);
    });

  });
});
