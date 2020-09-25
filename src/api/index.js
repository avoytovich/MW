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
  getProducts(page) {
    const url = `/products?format=short&sort=createDate%2Casc&parentId=null&size=50&page=${page}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getStores(page) {
    const url = `/stores?format=short&sort=name%2Casc&size=50&page=${page}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getOrders(page) {
    const url = `/orders?format=short&status=COMPLETED&sort=updateDate%2Cdesc&size=50&page=${page}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getCustomersByIds(ids) {
    const url = `/customers/public?format=short/${ids}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
};

export default api;
