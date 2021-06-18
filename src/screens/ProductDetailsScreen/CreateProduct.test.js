import React from 'react';
import { mount } from 'enzyme';
import * as reactRedux from 'react-redux';

import api from '../../api';

import CreateProduct from './CreateProduct';
import ProductDetailsView from './ProductDetailsView';

import { defaultProduct } from '../../services/helpers/dataStructuring';

const customerId = 123;
const parentId = 'parentId';

const mockHistoryPush = jest.fn();

jest.mock('../../api', () => ({
  getProductById: jest.fn().mockImplementation(() => Promise.resolve({})),
  getSellingStoreOptions: jest.fn(),
  getRenewingProductsByCustomerId: jest.fn(),
  getSubscriptionModelsByCustomerId: jest.fn(),
  getFulfillmentTemplateByCustomerId: jest.fn(),
  getCatalogsByCustomerId: jest.fn(),
  getPriceFunctionsCustomerByIds: jest.fn(),
  getCustomerById: jest.fn().mockImplementation(() => Promise.resolve()),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ id: 12 })),
  useHistory: () => ({
    push: mockHistoryPush,
    state: {
      parentId: 'parentId',
    },
  }),
}));

const mockSetState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init) => [init, mockSetState]);

describe('CreateProduct', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when component mounts', () => {
    it('if "parenId" should call api.getProductById', () => {
      mount(<CreateProduct />);

      expect(api.getProductById).toHaveBeenCalledTimes(1);
      expect(api.getProductById).toHaveBeenCalledWith(parentId);
    });

    it('should call api.getSellingStoreOptions', async () => {
      api.getProductById.mockImplementation(() =>
        Promise.resolve({ data: { customerId: customerId } }),
      );
      mount(<CreateProduct />);
      await api.getProductById();
      expect(api.getSellingStoreOptions).toHaveBeenCalledTimes(1);
      expect(api.getSellingStoreOptions).toHaveBeenCalledWith(customerId);
    });

    it('should call api.getRenewingProductsByCustomerId', async () => {
      api.getProductById.mockImplementation(() =>
        Promise.resolve({ data: { customerId: customerId } }),
      );
      api.getSellingStoreOptions.mockImplementation(() => Promise.resolve({ data: {} }));
      mount(<CreateProduct />);
      await api.getProductById();
      await api.getSellingStoreOptions();
      expect(api.getRenewingProductsByCustomerId).toHaveBeenCalledTimes(1);
      expect(api.getRenewingProductsByCustomerId).toHaveBeenCalledWith(customerId);
    });

    it('should call api.getSubscriptionModelsByCustomerId', async () => {
      const _customerId = 222;
      api.getProductById.mockImplementation(() =>
        Promise.resolve({ data: { customerId: _customerId } }),
      );
      api.getSellingStoreOptions.mockImplementation(() => Promise.resolve({ data: {} }));
      api.getRenewingProductsByCustomerId.mockImplementation(() =>
        Promise.resolve({ data: {} }),
      );
      mount(<CreateProduct />);
      await api.getProductById();
      await api.getSellingStoreOptions();
      await api.getRenewingProductsByCustomerId();
      expect(
        api.getSubscriptionModelsByCustomerId.mockImplementation(() =>
          Promise.resolve({ data: { curCustomer: { usingSubscriptionV1: true } } }),
        ),
      ).toHaveBeenCalledTimes(0);
    });

    it('should call api.getFulfillmentTemplateByCustomerId', async () => {
      api.getProductById.mockImplementation(() =>
        Promise.resolve({ data: { customerId: customerId } }),
      );
      api.getSellingStoreOptions.mockImplementation(() => Promise.resolve({ data: {} }));
      api.getRenewingProductsByCustomerId.mockImplementation(() =>
        Promise.resolve({ data: {} }),
      );
      api.getSubscriptionModelsByCustomerId.mockImplementation(() =>
        Promise.resolve({ data: {} }),
      );
      mount(<CreateProduct />);
      await api.getProductById();
      await api.getSellingStoreOptions();
      await api.getRenewingProductsByCustomerId();
      await api.getSubscriptionModelsByCustomerId();
      expect(api.getFulfillmentTemplateByCustomerId).toHaveBeenCalledTimes(1);
      expect(api.getFulfillmentTemplateByCustomerId).toHaveBeenCalledWith(customerId);
    });
  });

  describe('when component mounted', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

    beforeEach(() => {
      useSelectorMock.mockClear();
    });

    it('should update productData prop', async () => {
      useSelectorMock.mockReturnValue({});
      api.getProductById.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            customerId: '',
            resources: [],
            prices: {
              priceByCountryByCurrency: {
                EUR: { default: { value: '' } },
              },
              defaultCurrency: 'EUR',
            },
          },
        }),
      );
      api.getCustomerById.mockImplementationOnce(() =>
        Promise.resolve({
          data: { subscriptions: { id: 1, id: 2 }, usingSubscriptionV1: true },
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

      const wrapper = mount(<CreateProduct />);

      await api.getProductById();
      await api.getCustomerById();
      await api.getSellingStoreOptions();
      await api.getRenewingProductsByCustomerId();
      await api.getSubscriptionModelsByCustomerId();
      await api.getFulfillmentTemplateByCustomerId();

      wrapper.update();

      expect(wrapper.find(ProductDetailsView).props().currentProductData).toEqual(
        defaultProduct,
      );
    });

    it('should return string', async () => {
      useSelectorMock.mockReturnValue();
      const wrapper = mount(<CreateProduct />);
      wrapper.update();
      expect(wrapper.find('div[data-test="emptyProductDetailsView"]').text()).toBe(
        'Select customer',
      );
    });
  });
});
