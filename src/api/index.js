import { axiosInstance } from '../axios';

const api = {
  signIn(data) {
    let url = '/iam/tokens';

    const reason = 'Nexway-Center';
    if (reason) {
      url += `?reason=${reason}`;
    }

    return axiosInstance({
      method: 'post',
      url,
      data: {
        ...data,
        realm: 'nexway',
      },
    });
  },
  getPrices() {
    return axiosInstance({
      method: 'get',
      url: '/prices',
    });
  },
  getProducts() {
    return axiosInstance({
      method: 'get',
      url: '/products?format=short&sort=createDate%2Casc&parentId=null&size=50&page=0',
    });
  },
};

export default api;
