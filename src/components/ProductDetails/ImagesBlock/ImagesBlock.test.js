import React from 'react';
import { mount } from 'enzyme';
import ImagesBlock from './ImagesBlock';
import CardComponent from './CardComponent';

const productData = {
  resources: [
    { label: 'label_1', url: 'url_1', index: 1 },
    { label: 'label_2', url: 'url_2', index: 2 },
  ],
};

describe('ProductDetails <ImagesBlock/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ImagesBlock
        currentProductData={productData}
        productData={productData}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should draw two cardComponent', () => {
    expect(wrapper.find(CardComponent)).toHaveLength(2);
  });
});
