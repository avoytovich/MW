import api from '../../api';
import { GET_STORES } from '../constants/actionTypes';

const getStores = (page) => async (dispatch) => {
  const stores = await api.getStores(page);
  dispatch({
    type: GET_STORES,
    payload: {
      stores,
    },
  });
};

export default getStores;
