import api from '../../api';
import { GET_ORDERS } from '../constants/actionTypes';

const getOrders = () => async (dispatch) => {
  const orders = await api.getOrders();
  console.log('orders', orders);
  dispatch({
    type: GET_ORDERS,
    payload: {
      orders,
    },
  });
};

export default getOrders;
