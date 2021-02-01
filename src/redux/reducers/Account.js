/* eslint-disable no-param-reassign */
import {
  LOGIN_SUCCESS,
  SILENT_LOGIN,
  LOGOUT,
  UPDATE_NEXWAY_STATE,
} from '../constants/actionTypes';

const initialState = {
  user: null,
  nexwayState: null,
};

const Account = (state = initialState, {
  type, payload,
}) => {
  switch (type) {
    case LOGOUT:
      return { user: null, nexwayState: null };

    case SILENT_LOGIN:
    case LOGIN_SUCCESS:
    case UPDATE_NEXWAY_STATE:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default Account;
