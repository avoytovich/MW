/* eslint-disable no-param-reassign */
import { GET_STORES } from '../constants/actionTypes';

const initialState = {
  stores: {},
};

const Stores = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_STORES:
      return { ...payload.stores.data };
    default:
      return state;
  }
};

export default Stores;
