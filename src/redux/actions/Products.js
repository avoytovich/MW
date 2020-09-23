import api from '../../api';
import { GET_PRODUCTS } from '../constants/actionTypes';
import { showNotification } from './HttpNotifications';

const getProducts = () => async (dispatch) => {
  const products = await api.getProducts();
  dispatch({
    type: GET_PRODUCTS,
    payload: {
      products,
    },
  });
};

export default getProducts;
