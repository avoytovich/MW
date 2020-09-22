import api from '../../api';
import { GET_PRODUCTS } from '../constants/actionTypes';
import { showNotification } from './HttpNotifications';

const getProducts = () => async (dispatch) => {
  const products = await api.getProducts();
  console.log('products', products);
  dispatch({
    type: SET_PRODUCTS,
    payload: {
      products,
    },
  });
};

export { getProducts };
