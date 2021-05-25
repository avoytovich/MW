import React from 'react';
import { mount } from 'enzyme';
import General from './General';
import { discountObj, selectOptions } from '../../../../__mocks__/fileMock';

let discountData = { ...discountObj };
const curAmountCurrency = { key: "AED", value: "1" };
let amountType = 'byPercentage'

const curDiscountCodes = [{
  key: "default",
  value: ""
}]
describe('DiscountDetailsScreen <General/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <General
        amountType={amountType}
        setAmountType={newAmountType => {
          amountType = newAmountType
          wrapper.setProps({ amountType });
        }}
        setCurDiscountCodes={jest.fn()}
        curDiscountLabels={[
          { key: "neutral", value: "neutral LocalizedLabel" },
          { key: 'fr-FR', value: "fr- FR LocalizedLabel" }
        ]}
        setCurDiscountLabels={jest.fn()}
        curAmountCurrency={[curAmountCurrency]}
        setCurAmountCurrency={jest.fn()}
        curDiscount={discountData}
        setCurDiscount={(newDiscountData) => {
          discountData = newDiscountData;
        }}
        selectOptions={selectOptions}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('inputs/paragraphs should be populated with discount details data', () => {
    const { enduserId, name, model, externalContext } = discountData;
    expect(wrapper.find('input[name="endUser"]').instance().value).toEqual(enduserId);
    expect(wrapper.find('input[name="discountRuleName"]').instance().value).toEqual(name);
    expect(wrapper.find('textarea[name="externalContext"]').instance().value).toEqual(externalContext);
    expect(wrapper.find('input[value="CAMPAIGN"]').instance().checked).toEqual(model === "CAMPAIGN");
    expect(wrapper.find('input[value="COUPON"]').instance().checked).toEqual(model === "COUPON");
    expect(wrapper.find('input[value="SINGLE_USE_CODE"]').instance().checked).toEqual(model === "SINGLE_USE_CODE");
  });

  it('On amountType equal byPercentage, should be percentsInput visible with correct data ', async () => {
    expect(
      wrapper.find('input[value="byPercentage"]').props().checked,
    ).toEqual(true);
    expect(
      wrapper.find('input[value="byCurrency"]').props().checked,
    ).toEqual(false);
    const amountWrapper = wrapper.find({ 'data-test': "percents" });
    expect(amountWrapper.find('input').instance().value).toEqual(discountData.discountRate);

    expect(wrapper.contains(wrapper.find({ 'data-test': "currency" }))).toBe(false)
    expect(wrapper.contains(wrapper.find({ 'data-test': "amount" }))).toBe(false)
  });

  it('On amountType change to  byCurrency, inputs currency and amount should be visible with correct data ', async () => {
    wrapper.find({ 'data-test': "amountRadioGroup" }).first().props().onChange({ target: { value: 'byCurrency' } });
    expect(wrapper.contains(wrapper.find({ 'data-test': "percents" }))).toBe(false)
    expect(
      wrapper.find('input[value="byPercentage"]').props().checked,
    ).toEqual(false);
    expect(
      wrapper.find('input[value="byCurrency"]').props().checked,
    ).toEqual(true);
    const currencyWrapper = wrapper.find({ 'data-test': "currency" });
    expect(currencyWrapper.find('input').instance().value).toEqual(curAmountCurrency.key);
    const amountWrapper = wrapper.find({ 'data-test': "amount" });
    expect(amountWrapper.find('input').instance().value).toEqual(curAmountCurrency.value);
  });

  it('should change discountData when some update is made', async () => {
    const newValue = 'newExternalContext';
    wrapper.find('textarea[name="externalContext"]').simulate('change', {
      target: { name: 'externalContext', value: newValue },
    });
    expect(discountData.externalContext).toEqual(newValue);
  });
});
