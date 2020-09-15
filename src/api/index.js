import { axiosInstance } from '../axios';

const api = {
  getPrices() {
    return axiosInstance({
      method: 'get',
      url: '/prices',
    });
  },
};

export default api;
