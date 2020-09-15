import {
  HTTP_SHOW_NOTIFICATION,
  HTTP_HIDE_NOTIFICATION,
} from '../constants/actionTypes';

const initialState = {
  showNotification: false,
  error: false,
  message: '',
};

const HttpNotifications = (state = initialState, {
  type, ...payload
}) => {
  switch (type) {
    case HTTP_SHOW_NOTIFICATION:
    case HTTP_HIDE_NOTIFICATION:
      return payload;
    default:
      return state;
  }
};

export default HttpNotifications;
