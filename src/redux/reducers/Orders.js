/* eslint-disable no-param-reassign */
import { GET_ORDERS } from '../constants/actionTypes';

const initialState = {
  orders: {},
};

const Orders = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ORDERS:
      return { ...payload.orders.data };
    default:
      return state;
  }
};

export default Orders;
