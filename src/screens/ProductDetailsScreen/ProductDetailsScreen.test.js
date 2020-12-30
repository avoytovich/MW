import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import ProductDetailsScreen from './ProductDetailsScreen';
import ProductDetails from '../../components/ProductDetails';
import api from '../../api';

const customerId = 123;
const expectedCurrentProductData = {
  customerId,
  type: '',
  sellingStores: [],
  lifeTime: '',
  trialAllowed: '',
  prices: {
    priceByCountryByCurrency: {
      EUR: { default: { value: '' } },
    },
    defaultCurrency: 'EUR',
  },
};
jest.mock('../../api', () => ({
  getProductById: jest.fn(),
  getSellingStoreOptions: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ id: 12 })),
}));

const mockSetState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init) => [init, mockSetState]);

describe('ProductDetailsScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when component mounts', () => {
    it('should call api.getProductById', () => {
      mount(<ProductDetailsScreen />);
      expect(api.getProductById).toHaveBeenCalledTimes(1);
      expect(api.getProductById).toHaveBeenCalledWith(12);
    });

    it('should call api.getSellingStoreOptions', async () => {
      api.getProductById.mockImplementation(() =>
        Promise.resolve({ data: { customerId: customerId } }),
      );
      mount(<ProductDetailsScreen />);
      await api.getProductById();
      expect(api.getSellingStoreOptions).toHaveBeenCalledTimes(1);
    });
  });

  it('should update productData prop', async () => {
    useStateSpy.mockRestore();
    api.getProductById.mockImplementation(() =>
      Promise.resolve({
        data: {
          customerId,
          prices: {
            priceByCountryByCurrency: {
              EUR: { default: { value: '' } },
            },
            defaultCurrency: 'EUR',
          },
        },
      }),
    );
    api.getSellingStoreOptions.mockImplementation(() =>
      Promise.resolve({ data: { items: [1, 2, 3] } }),
    );
    const wrapper = mount(<ProductDetailsScreen />);
    await act(async () => {
      await api.getProductById();
      await api.getSellingStoreOptions();
      wrapper.update();
    });
    expect(wrapper.find(ProductDetails).props().currentProductData).toEqual(
      expectedCurrentProductData,
    );
  });
});
