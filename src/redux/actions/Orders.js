import api from '../../api';
import { GET_ORDERS } from '../constants/actionTypes';

const getOrders = (page) => async (dispatch) => {
  const orders = await api.getOrders(page);
  dispatch({
    type: GET_ORDERS,
    payload: {
      orders,
    },
  });
};

export default getOrders;
