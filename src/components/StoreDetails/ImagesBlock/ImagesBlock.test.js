import React from 'react';
import { mount } from 'enzyme';
import ImagesBlock from './ImagesBlock';
import CardComponent from './CardComponent';

const storeData = {
  logoStore: 'test_src',
  bannerInvoice: 'test_src',
};

describe('StoreDetails  <ImagesBlock/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ImagesBlock
        currentStoreData={storeData}
        setCurrentStoreData={jest.fn()}
        storeData={storeData}
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
