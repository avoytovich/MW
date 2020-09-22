/* eslint-disable no-param-reassign */
import { GET_PRODUCTS } from '../constants/actionTypes';

const initialState = {
  products: [],
};

const Products = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return { ...payload };

    default:
      return state;
  }
};

export default Products;
