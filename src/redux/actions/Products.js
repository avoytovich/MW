import api from '../../api';
import { GET_PRODUCTS } from '../constants/actionTypes';
import { showNotification } from './HttpNotifications';

const getProducts = (page) => async (dispatch) => {
  const products = await api.getProducts(page);
  dispatch({
    type: GET_PRODUCTS,
    payload: {
      products,
    },
  });
};

export default getProducts;
