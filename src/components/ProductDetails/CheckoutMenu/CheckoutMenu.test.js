import React from 'react';
import { mount } from 'enzyme';
import { MenuItem, Button } from '@material-ui/core';

import CheckoutMenu from './CheckoutMenu';

const productData = {
  sellingStores: [1, 2],
};
const sellingStores = [
  {
    id: 1,
    name: 'test_name_1',
    hostnames: ['test_hostnames_1.1', 'test_hostnames_1.2'],
  },
  { id: 2, name: 'test_name_2', hostnames: ['test_hostnames_2'] },
];

describe('ProductDetails <CheckoutMenu/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <CheckoutMenu
        currentProductData={productData}
        sellingStores={sellingStores}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render two menuItems for CheckoutMenu', () => {
    const result = `Store '${sellingStores[0].name}' (${sellingStores[0].hostnames[0]})`;
    const checkoutButton = wrapper.find(Button);
    checkoutButton.simulate('click');
    expect(wrapper.find(MenuItem)).toHaveLength(3);
    expect(
      wrapper.find({ 'data-test': 'checkoutLink' }).first().text(),
    ).toEqual(result);
  });
});
