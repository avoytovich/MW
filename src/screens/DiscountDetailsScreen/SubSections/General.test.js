import React from 'react';
import { mount } from 'enzyme';
import General from './General';

let discountData = {
  publisherRefIds: [],
  name: '',
  maxUsages: '',
  maxUsePerStore: '',
  maxUsePerEndUser: '',
  countries: [],
  parentProductIds: [],
  productIds: [],
  enduserId: '',
  storeIds: [],
  codes: {},
  endUserGroupIds: [],
  endUserEmails: [],
  level: 'PRODUCT',
  model: 'CAMPAIGN',
  status: 'ENABLED',
  discountRate: 1,
  endDate: Date.now() + 6.048e8,
  endUserTypes: ['BUYER', 'RESELLER'],
  localizedLabels: {
    neutral: "neutral LocalizedLabel",
    'fr-FR': "fr- FR LocalizedLabel"
  }

};
let amountType = 'byPercentage'
const selectOptions = {
  refProducts: [],
  endUserGroups: [],
  countries: [],
  endUsers: [],
  stores: [],
  parentProducts: [],
  discountProducts: [],
};
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
        setAmountType={jest.fn()}
        curDiscountCodes={curDiscountCodes}
        setCurDiscountCodes={jest.fn()}
        curDiscountLabels={[
          { key: "neutral", value: "neutral LocalizedLabel" },
          { key: 'fr-FR', value: "fr- FR LocalizedLabel" }
        ]}
        setCurDiscountLabels={jest.fn()}
        curAmountCurrency={[{ key: "CHF", value: 2 }]}
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
    const { enduserId, name, discountRate, model } = discountData;
    // console.log(wrapper.debug())
    expect(wrapper.find('input[name="endUser"]').instance().value).toEqual(enduserId);
    expect(wrapper.find('input[name="discountRuleName"]').instance().value).toEqual(name);
    expect(wrapper.find('input[value="CAMPAIGN"]').instance().checked).toEqual(model === "CAMPAIGN");
    expect(wrapper.find('input[value="COUPON"]').instance().checked).toEqual(model === "COUPON");
    expect(wrapper.find('input[value="SINGLE_USE_CODE"]').instance().checked).toEqual(model === "SINGLE_USE_CODE");


  });

  // it('should change productData when some update is made', async () => {
  //   const newValue = 'SOFTWARE';
  //   wrapper.find('input[name="type"]').simulate('change', {
  //     target: { name: 'type', value: newValue },
  //   });
  //   expect(productData.type).toEqual(newValue);
  // });

  it('On amountType equal byPercentage, should be percentsInput visible and ', async () => {
    const { discountRate } = discountData;
    expect(wrapper.find('input[name="percents"]').instance().value).toEqual(`${discountRate}`);
  });
});
