import React from 'react';
import { mount } from 'enzyme';
import { MenuItem, Button } from '@material-ui/core';

import CheckoutMenu from './CheckoutMenu';

const productData = {
  sellingStores: [1, 2],
};
const checkOutStores = [
  { name: 'test_name_1', hostname: 'test_hostnames_1.1' },
  {
    name: 'test_name_2',
    hostname: 'test_hostnames_2',
  },
];

describe('ProductDetails <CheckoutMenu/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <CheckoutMenu
        currentProductData={productData}
        checkOutStores={checkOutStores}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render two menuItems for CheckoutMenu', () => {
    const result = `Store '${checkOutStores[0].name}' (${checkOutStores[0].hostname})`;
    const checkoutButton = wrapper.find(Button);
    checkoutButton.simulate('click');
    expect(wrapper.find(MenuItem)).toHaveLength(2);
    expect(
      wrapper.find({ 'data-test': 'checkoutLink' }).first().text(),
    ).toEqual(result);
  });
});
