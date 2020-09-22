/* eslint-disable no-param-reassign */
import {
  LOGIN_SUCCESS,
  SILENT_LOGIN,
  LOGOUT,
} from '../constants/actionTypes';

const initialState = {
  user: null,
};

const Account = (state = initialState, {
  type, payload,
}) => {
  switch (type) {
    case LOGOUT:
      return { user: null };

    case SILENT_LOGIN:
    case LOGIN_SUCCESS:
      return { ...payload };

    default:
      return state;
  }
};

export default Account;
