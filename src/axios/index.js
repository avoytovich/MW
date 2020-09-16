import axios from 'axios';

import store from '../redux/store';
import { showNotification } from '../redux/actions/HttpNotifications';

const cors = 'https://cors-anywhere.herokuapp.com/';

const { dispatch } = store;

const errorHandler = (error) => {
  const { response: { data: { message } } } = error;
  dispatch(showNotification(message, true));

  return Promise.reject(error);
};

export const SERVER = process.env.API_SERVER || 'https://cors-anywhere.herokuapp.com/https://api.staging.nexway.build';

export const axiosInstance = axios.create({
  baseURL: `${cors}${SERVER}`,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error),
);
