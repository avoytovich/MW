import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import OrderDetailsScreen from './OrderDetailsScreen';
import OrderDetails from '../../components/OrderDetails';
import api from '../../api';

const productsId = 123;
const customerId = 123;
const expectedCurrentOrderData = {
  customer: { id: customerId },
  id: '',
  status: '',
  store: { name: '' },
  processingEvent: [{ metadata: { paymentId: '' } }],
  lineItems: [
    {
      fulfillmentProcessingStatus: '',
      subscriptionProcessingStatus: '',
      productId: productsId,
    },
  ],
  payment: { status: '', transactionId: '' },
  lastUpdateReason: '',
  endUser: {
    company: { companyName: '' },
    streetAddress: '',
    zipCode: '',
    country: '',
  },
  maxPaymentsParts: '',
  paymentDeadline: '',
};

jest.mock('../../api', () => ({
  getOrderById: jest.fn(),
  getProductsByIds: jest.fn(),
  getCustomerById: jest.fn(),
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

describe('OrderDetailsScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when component mounts', () => {
    it('should call api.getOrderById', () => {
      mount(<OrderDetailsScreen />);
      expect(api.getOrderById).toHaveBeenCalledTimes(1);
      expect(api.getOrderById).toHaveBeenCalledWith(12);
    });

    it('should call api.getProductsByIds', async () => {
      api.getOrderById.mockImplementation(() =>
        Promise.resolve({
          data: {
            lineItems: [{ productId: productsId }],
          },
        }),
      );
      mount(<OrderDetailsScreen />);
      await api.getOrderById();
      expect(api.getProductsByIds).toHaveBeenCalledTimes(1);
      expect(api.getProductsByIds).toHaveBeenCalledWith(`id=${productsId}`);
    });

    it('should call api.getCustomerById', async () => {
      api.getOrderById.mockImplementation(() =>
        Promise.resolve({
          data: expectedCurrentOrderData,
        }),
      );
      api.getProductsByIds.mockImplementation(() =>
        Promise.resolve({ data: 'data' }),
      );
      mount(<OrderDetailsScreen />);
      await api.getOrderById();
      await api.getProductsByIds();
      expect(api.getCustomerById).toHaveBeenCalledTimes(1);
      expect(api.getCustomerById).toHaveBeenCalledWith(customerId);
    });
  });

  it('should update productData prop', async () => {
    useStateSpy.mockRestore();
    api.getOrderById.mockImplementation(() =>
      Promise.resolve({
        data: expectedCurrentOrderData,
      }),
    );
    api.getProductsByIds.mockImplementation(() =>
      Promise.resolve({ data: { items: [] } }),
    );
    api.getCustomerById.mockImplementation(() =>
      Promise.resolve({ data: { name: '' } }),
    );
    const wrapper = mount(<OrderDetailsScreen />);
    await act(async () => {
      await api.getOrderById();
      await api.getProductsByIds();
      await api.getCustomerById();
      wrapper.update();
    });
    expect(wrapper.find(OrderDetails).props().currentOrderData).toEqual(
      expectedCurrentOrderData,
    );
  });
});
