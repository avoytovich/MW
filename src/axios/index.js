import axios from 'axios';

import store from '../redux/store';
import { showNotification } from '../redux/actions/HttpNotifications';

import { getToken } from '../services/auth';

const { dispatch } = store;

const errorHandler = (error) => {
  const { message } = error;
  dispatch(showNotification(message, true));

  return Promise.reject(error);
};

export const SERVER = process.env.API_SERVER || 'https://api.staging.nexway.build';

export const axiosInstance = axios.create({
  baseURL: `${SERVER}`,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const headers = { ...config.headers };
    const token = getToken();

    if (token) {
      const Authorization = `Bearer ${token}`;
      headers.Authorization = Authorization;
    }

    return { ...config, headers };
  },

  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error),
);
