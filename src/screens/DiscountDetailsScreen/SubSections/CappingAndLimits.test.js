import React from 'react';
import { shallow } from 'enzyme';
import CappingAndLimits from './CappingAndLimits';
import { discountObj } from '../../../../__mocks__/fileMock';
import DateRangePicker from '../../../components/utils/Modals/DateRangePicker';

describe('DiscountDetailsScreen <CappingAndLimits/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CappingAndLimits
        curDiscount={discountObj}
        setCurDiscount={jest.fn()}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('draw all input components on the page', () => {
    expect(wrapper.find({ 'data-test': "maximumUsesPerEndUser" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "maximumUsesPerStore" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "maximumUses" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "periodOfValidity" }).length).toEqual(1)
  });

  it('should show DateRangePicker if periodOfValidity is "between"', () => {
    wrapper.find({ 'data-test': "periodOfValidity" }).props().onChangeSelect({ target: { value: 'between' } });
    expect(wrapper.find(DateRangePicker).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "endDate" }).length).toEqual(0)
  });

  it('should show endDate input if periodOfValidity is "before"', () => {
    wrapper.find({ 'data-test': "periodOfValidity" }).props().onChangeSelect({ target: { value: 'before' } });
    expect(wrapper.find({ 'data-test': "endDate" }).length).toEqual(1)
    expect(wrapper.find(DateRangePicker).length).toEqual(0)


  });
});
