import React from 'react';
import { shallow } from 'enzyme';
import General from './General';
import { discountObj } from '../../../../__mocks__/fileMock';

let amountType = 'byPercentage'

jest.mock('../../../components/utils/OptionsFetcher/OptionsFetcher',
  () => ({
    getLanguagesOptions: jest.fn(() => ([])),
  })
);

describe('DiscountDetailsScreen <General/>', () => {
  let wrapper;

  beforeEach(() => {

    wrapper = shallow(
      <General
        curDiscount={discountObj}
        updateDiscount={jest.fn()}
        setCurDiscount={jest.fn()}
        selectOptions={{}}
        amountType={amountType}
        setAmountType={(newAmountType) => {
          amountType = newAmountType;
          wrapper.setProps({ amountType: amountType });
        }}
      />,
    );

  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('draw all input components on the page', () => {
    expect(wrapper.find({ 'data-test': "status" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "amountRadioGroup" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "model" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "externalContext" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "discountRuleName" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "localizedLabels" }).length).toEqual(1)
  });

  it('On amountType equal byPercentage, percentsInput should be percentsInput visible', () => {
    expect(wrapper.find({ 'data-test': "percents" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "amountByCurrency" }).length).toEqual(0)
  });

  it('On amountType change to  byCurrency, inputs currency and amount should be visible', () => {
    wrapper.find({ 'data-test': "amountRadioGroup" }).props().onChange({ target: { value: 'byCurrency' } });
    wrapper.update()
    expect(wrapper.find({ 'data-test': "percents" }).length).toEqual(0)
    expect(wrapper.find({ 'data-test': "amountByCurrency" }).length).toEqual(1)
  });
});
