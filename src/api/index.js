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
  recoverPassword(data) {
    return axiosInstance({
      method: 'post',
      url: '/iam/identities/lostpassword/nexway',
      data,
    });
  },
  setNewPassword(token, data) {
    let url = `/iam/identities/resetpassword/nexway/${token}`;
    const reason = 'Nexway-Center';
    if (reason) {
      url += `?reason=${reason}`;
    }
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  getProducts() {
    return axiosInstance({
      method: 'get',
      url:
        '/products?format=short&sort=createDate%2Casc&parentId=null&size=50&page=0',
    });
  },
  getStores() {
    return axiosInstance({
      method: 'get',
      url: '/stores?format=short&sort=name%2Casc&size=50&page=0',
    });
  },
  getOrders() {
    return axiosInstance({
      method: 'get',
      url:
        '/orders?format=short&status=COMPLETED&sort=updateDate%2Cdesc&size=50&page=0',
    });
  },
};

export default api;
