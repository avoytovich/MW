import React from 'react';
import { mount } from 'enzyme';

import ProductDetailsView from './ProductDetailsView';
import CheckoutMenu from './CheckoutMenu';

import { defaultProduct } from '../../services/helpers/dataStructuring';

const productId = 'productId';

const checkOutStores = [
  { hostname: 'hostname1', value: 1 },
  { hostname: 'hostname2', value: 2 },
  { hostname: 'hostname3', value: 3 },
];

const allTabs = [
  'general',
  'fulfillmentAndSubscription',
  'localizedContent',
  'prices',
  'productVariations',
  'productFiles',
];

const selectOptions = {
  sellingStores: [
    { id: 1, displayName: 'test_1' },
    { id: 2, displayName: 'test_2' },
  ],
  renewingProducts: ['test'],
  subscriptionModels: ['template'],
};

const mockSetState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init) => [init, mockSetState]);
const saveData = jest.fn();
describe('CreateProduct', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ProductDetailsView
        selectOptions={selectOptions}
        setProductData={() => jest.fn()}
        currentProductData={{ ...defaultProduct, id: productId }}
        productHasChanges={false}
        saveData={saveData}
        checkOutStores={checkOutStores}
        productData={defaultProduct}
        productId={productId}
        productHasLocalizationChanges={false}
        setProductLocalizationChanges={() => jest.fn()}
        productVariations={{}}
        setProductDetails={() => jest.fn()}
        productDetails={{}}
        variablesDescriptions={[]}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`shold have default tab ${allTabs[0]}`, () => {
    expect(wrapper.find(`div[data-test="${allTabs[0]}"]`)).toHaveLength(1);
  });

  it('shold contain Breadcrumbs', () => {
    expect(wrapper.find('div[data-test="breadcrumbs"]')).toHaveLength(1);
  });

  it(`shold contain three checkoutLinks`, () => {
    const realUseState = React.useState;
    const stubInitialState = wrapper.find('button[aria-controls="checkoutMenu"]');

    jest.spyOn(React, 'useState').mockImplementationOnce(() => realUseState(stubInitialState));

    const menu = mount(
      <CheckoutMenu
        checkOutStores={checkOutStores}
        currentProductData={{ ...defaultProduct, id: productId }}
      />,
    );
    const links = menu.find('a[data-test="checkoutLink"]');
    expect(links).toHaveLength(3);
  });

  it('shold have allTabs', () => {
    expect(wrapper.find('div[role="tablist"]').children()).toHaveLength(6);
  });

  it('save data shold not be called', () => {
    const saveButton = wrapper.find('button[id="save-detail-button"]');
    expect(saveButton).toHaveLength(1);
    saveButton.simulate('click');
    expect(saveData).toHaveBeenCalledTimes(0);
  });
});
