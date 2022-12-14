import axios from 'axios';
import { toast } from 'react-toastify';
import localization from '../localization';

const errorHandler = (error, customToast) => {
  const { response } = error;
  const { errorDetails } = JSON.parse(localStorage.getItem('nexwayState')) || {};

  let message = '';

  if (errorDetails) {
    message = response?.data?.message || error?.message;
  } else {
    switch (response?.status) {
      case 400: message = localization.t('errorNotifications.badRequest'); break;
      case 401: message = localization.t('errorNotifications.unauthorized'); break;
      case 403: message = localization.t('errorNotifications.forbidden'); break;
      case 404: message = localization.t('errorNotifications.notFound'); break;
      case 409: message = localization.t('errorNotifications.conflict'); break;
      case 412: message = localization.t('errorNotifications.preconditionFailed'); break;
      case 500: message = localization.t('errorNotifications.internalServerError'); break;
      case 504: message = localization.t('errorNotifications.timeout'); break;
      case 598:
      case 599:
        message = localization.t('errorNotifications.network'); break;

      default: message = error.message || localization.t('errorNotifications.otherError');
    }
  }

  if (customToast) {
    return Promise.reject(message);
  }

  toast.error(message, { toastId: 'request-error-message' });

  return Promise.reject(error);
};

export const SERVER = process.env.API_SERVER || 'https://api.staging.nexway.build';

export const axiosInstance = axios.create({
  baseURL: SERVER,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isStoreDelete = error?.response?.config?.method === 'delete'
      && error?.response?.config?.url?.indexOf('/store') >= 0;

    const customToast = isStoreDelete;

    return errorHandler(error, customToast);
  },
);
