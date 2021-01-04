import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import StoreDetailsScreen from './StoreDetailsScreen';
import StoreDetails from '../../components/StoreDetails';
import api from '../../api';

const customerId = 123;
const expectedCurrentStoreData = {
  customerId,
  status: '',
  routes: [{ hostname: '' }],
  defaultLocale: '',
  saleLocales: [],
  designs: {
    endUserPortal: {
      themeRef: { customerId: '', name: '' },
    },
    checkout: {
      themeRef: { customerId: '', name: '' },
      fontRef: {
        customerId: '',
        name: '',
      },
      i18nRef: {
        customerId: '',
      },
      layoutRef: {
        customerId: '',
        name: '',
      },
    },
    paymentComponent: {
      rankedPaymentTabsByCountriesList: [{ rankedPaymentTabs: [] }],
    },
  },
};

jest.mock('../../api', () => ({
  getStoreById: jest.fn(),
  getCustomerById: jest.fn(),
  getDesignsThemes: jest.fn(),
  getDesignsFonts: jest.fn(),
  getDesignsLayouts: jest.fn(),
  getDesignsTranslations: jest.fn(),
  getCustomersByIds: jest.fn(),
  getPaymentMethodsOptions: jest.fn(),
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

describe('StoreDetailsScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when component mounts', () => {
    it('should call api.getStoreById', () => {
      mount(<StoreDetailsScreen />);
      expect(api.getStoreById).toHaveBeenCalledTimes(1);
      expect(api.getStoreById).toHaveBeenCalledWith(12);
    });

    it('should call api.getCustomerById', async () => {
      api.getStoreById.mockImplementation(() =>
        Promise.resolve({ data: { customerId: customerId } }),
      );
      mount(<StoreDetailsScreen />);
      await api.getStoreById();
      expect(api.getCustomerById).toHaveBeenCalledTimes(1);
      expect(api.getCustomerById).toHaveBeenCalledWith(customerId);
    });

    it('should call api.getDesignsThemes', async () => {
      api.getStoreById.mockImplementation(() =>
        Promise.resolve({ data: { customerId: customerId } }),
      );
      api.getCustomerById.mockImplementation(() =>
        Promise.resolve({ data: 'data' }),
      );
      mount(<StoreDetailsScreen />);
      await api.getStoreById();
      await api.getCustomerById();

      expect(api.getDesignsThemes).toHaveBeenCalledTimes(1);
    });

    it('should call api.getPaymentMethodsOptions', async () => {
      api.getStoreById.mockImplementation(() =>
        Promise.resolve({ data: { customerId: customerId } }),
      );
      api.getCustomerById.mockImplementation(() =>
        Promise.resolve({ data: 'data' }),
      );
      api.getDesignsThemes.mockImplementation(() =>
        Promise.resolve({ data: { items: [] } }),
      );
      api.getDesignsFonts.mockImplementation(() =>
        Promise.resolve({ data: { items: [] } }),
      );
      api.getDesignsLayouts.mockImplementation(() =>
        Promise.resolve({ data: { items: [] } }),
      );
      api.getDesignsTranslations.mockImplementation(() =>
        Promise.resolve({ data: { items: [] } }),
      );
      api.getCustomersByIds.mockImplementation(() =>
        Promise.resolve({ data: { items: [] } }),
      );
      mount(<StoreDetailsScreen />);
      await api.getStoreById();
      await api.getCustomerById();
      await api.getDesignsThemes();
      await api.getDesignsFonts();
      await api.getDesignsLayouts();
      await api.getDesignsTranslations();
      await api.getCustomersByIds();

      expect(api.getPaymentMethodsOptions).toHaveBeenCalledTimes(1);
    });
  });

  it('should update storeData prop', async () => {
    useStateSpy.mockRestore();
    api.getStoreById.mockImplementation(() =>
      Promise.resolve({ data: { customerId: customerId } }),
    );
    api.getCustomerById.mockImplementation(() => Promise.resolve({ data: {} }));
    api.getDesignsThemes.mockImplementation(() =>
      Promise.resolve({ data: { items: [] } }),
    );
    api.getDesignsFonts.mockImplementation(() =>
      Promise.resolve({ data: { items: [] } }),
    );
    api.getDesignsLayouts.mockImplementation(() =>
      Promise.resolve({ data: { items: [] } }),
    );
    api.getDesignsTranslations.mockImplementation(() =>
      Promise.resolve({ data: { items: [] } }),
    );
    api.getCustomersByIds.mockImplementation(() =>
      Promise.resolve({ data: { items: [] } }),
    );
    api.getPaymentMethodsOptions.mockImplementation(() =>
      Promise.resolve({ data: { items: [] } }),
    );
    const wrapper = mount(<StoreDetailsScreen />);
    await act(async () => {
      await api.getStoreById();
      await api.getCustomerById();
      await api.getDesignsThemes();
      await api.getDesignsFonts();
      await api.getDesignsLayouts();
      await api.getDesignsTranslations();
      await api.getCustomersByIds();

      await api.getPaymentMethodsOptions();
      wrapper.update();
    });
    expect(wrapper.find(StoreDetails).props().currentStoreData).toEqual(
      expectedCurrentStoreData,
    );
  });
});
