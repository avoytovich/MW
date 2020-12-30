import React from 'react';
import { mount } from 'enzyme';
import RelatedProducts from './RelatedProducts';
import CardComponent from './CardComponent';

const orderData = {
  lineItems: [
    { productId: 'test_productId_1', shortDesc: 'test_shortDesc_1' },
    { productId: 'test_productId_2', shortDesc: 'test_shortDesc_2' },
  ],
};
const productData = {
  items: [{ id: 'test_productId_1' }, { id: 'test_productId_2' }],
};
describe('OrderDetails <RelatedProducts/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <RelatedProducts
        currentOrderData={orderData}
        productsData={productData}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render two cardComponent', () => {
    expect(wrapper.find(CardComponent)).toHaveLength(2);
  });
});
