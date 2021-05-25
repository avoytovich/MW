import React from 'react';
import { mount } from 'enzyme';
import Eligibility from './Eligibility';
import { discountObj, selectOptions } from '../../../../__mocks__/fileMock';

const curMinCartAmount = { key: "CAD", value: "1" }

describe('DiscountDetailsScreen <Eligibility/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Eligibility
        curDiscount={discountObj}
        updateDiscount={jest.fn()}
        setCurDiscount={jest.fn()}
        selectOptions={selectOptions}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('inputs/paragraphs should be populated with discount details data', () => {
    const { countries, storeIds, parentProductIds, publisherRefIds, endUserGroupIds } = discountObj;
    expect(wrapper.find({ 'data-test': "countries" }).find('input').instance().value).toEqual(countries.join(','));
    expect(wrapper.find({ 'data-test': "products" }).find('input').instance().value).toEqual(storeIds.join(','));
    expect(wrapper.find({ 'data-test': "productsByParent" }).find('input').instance().value).toEqual(parentProductIds.join(','));
    expect(wrapper.find({ 'data-test': "productsByReference" }).find('input').instance().value).toEqual(publisherRefIds.join(','));
    expect(wrapper.find({ 'data-test': "endUserGroups" }).find('input').instance().value).toEqual(endUserGroupIds.join(','));
    expect(wrapper.find('input[name="MANUAL_RENEWAL"]').instance().checked).toEqual(true);
    expect(wrapper.find('input[name="PURCHASE"]').instance().checked).toEqual(false);
    expect(wrapper.find('input[name="BUYER"]').instance().checked).toEqual(true);
    expect(wrapper.find('input[name="RESELLER"]').instance().checked).toEqual(true);
  });
});
