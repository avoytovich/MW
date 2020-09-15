import {
  HTTP_SHOW_NOTIFICATION,
  HTTP_HIDE_NOTIFICATION,
} from '../constants/actionTypes';

export const showNotification = (message, error = false) => ({
  type: HTTP_SHOW_NOTIFICATION,
  showNotification: true,
  error,
  message,
});

export const hideNotification = (error = false) => ({
  type: HTTP_HIDE_NOTIFICATION,
  showNotification: false,
  error,
  message: '',
});
