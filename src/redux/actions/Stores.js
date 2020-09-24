import api from '../../api';
import { GET_STORES } from '../constants/actionTypes';

const getStores = () => async (dispatch) => {
  const stores = await api.getStores();
  dispatch({
    type: GET_STORES,
    payload: {
      stores,
    },
  });
};

export default getStores;
