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
  fulfillmentTemplate: '',
  subscriptionTemplate: '',
  trialAllowed: false,
  trialDuration: '',
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
  getRenewingProductsByCustomerId: jest.fn(),
  getSubscriptionModelsByCustomerId: jest.fn(),
  getFulfillmentTemplateByCustomerId: jest.fn(),
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
      expect(api.getSellingStoreOptions).toHaveBeenCalledWith(customerId);
    });

    it('should call api.getRenewingProductsByCustomerId', async () => {
      api.getProductById.mockImplementation(() =>
        Promise.resolve({ data: { customerId: customerId } }),
      );
      api.getSellingStoreOptions.mockImplementation(() =>
        Promise.resolve({ data: {} }),
      );
      mount(<ProductDetailsScreen />);
      await api.getProductById();
      await api.getSellingStoreOptions();
      expect(api.getRenewingProductsByCustomerId).toHaveBeenCalledTimes(1);
      expect(api.getRenewingProductsByCustomerId).toHaveBeenCalledWith(
        customerId,
      );
    });

    it('should call api.getSubscriptionModelsByCustomerId', async () => {
      api.getProductById.mockImplementation(() =>
        Promise.resolve({ data: { customerId: customerId } }),
      );
      api.getSellingStoreOptions.mockImplementation(() =>
        Promise.resolve({ data: {} }),
      );
      api.getRenewingProductsByCustomerId.mockImplementation(() =>
        Promise.resolve({ data: {} }),
      );
      mount(<ProductDetailsScreen />);
      await api.getProductById();
      await api.getSellingStoreOptions();
      await api.getRenewingProductsByCustomerId();
      expect(api.getSubscriptionModelsByCustomerId).toHaveBeenCalledTimes(1);
      expect(api.getSubscriptionModelsByCustomerId).toHaveBeenCalledWith(
        customerId,
      );
    });

    it('should call api.getFulfillmentTemplateByCustomerId', async () => {
      api.getProductById.mockImplementation(() =>
        Promise.resolve({ data: { customerId: customerId } }),
      );
      api.getSellingStoreOptions.mockImplementation(() =>
        Promise.resolve({ data: {} }),
      );
      api.getRenewingProductsByCustomerId.mockImplementation(() =>
        Promise.resolve({ data: {} }),
      );
      api.getSubscriptionModelsByCustomerId.mockImplementation(() =>
        Promise.resolve({ data: {} }),
      );
      mount(<ProductDetailsScreen />);
      await api.getProductById();
      await api.getSellingStoreOptions();
      await api.getRenewingProductsByCustomerId();
      await api.getSubscriptionModelsByCustomerId();
      expect(api.getFulfillmentTemplateByCustomerId).toHaveBeenCalledTimes(1);
      expect(api.getFulfillmentTemplateByCustomerId).toHaveBeenCalledWith(
        customerId,
      );
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
      Promise.resolve({ data: { items: [{ id: 1 }, { id: 2 }] } }),
    );
    api.getRenewingProductsByCustomerId.mockImplementation(() =>
      Promise.resolve({ data: { items: [{ id: 1 }, { id: 2 }] } }),
    );
    api.getSubscriptionModelsByCustomerId.mockImplementation(() =>
      Promise.resolve({ data: { items: [{ id: 1 }, { id: 2 }] } }),
    );
    api.getFulfillmentTemplateByCustomerId.mockImplementation(() =>
      Promise.resolve({ data: { items: [{ id: 1 }, { id: 2 }] } }),
    );
    const wrapper = mount(<ProductDetailsScreen />);
    await act(async () => {
      await api.getProductById();
      await api.getSellingStoreOptions();
      await api.getRenewingProductsByCustomerId();
      await api.getSubscriptionModelsByCustomerId();
      await api.getFulfillmentTemplateByCustomerId();
      wrapper.update();
    });
    expect(wrapper.find(ProductDetails).props().currentProductData).toEqual(
      expectedCurrentProductData,
    );
  });
});
