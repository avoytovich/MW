import { axiosInstance } from '../axios';

const api = {
  // AUTH
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

  // GET ALL
  getProducts(page, filters) {
    let url = `/products?format=short&sort=updateDate,desc&parentId=null&size=50&page=${page}`;

    if (filters) { url += filters; }

    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getStores(page, filters) {
    let url = `/stores?format=short&sort=name,asc&size=50&page=${page}`;

    if (filters) { url += filters; }

    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getOrders(page, filters) {
    let url = `/orders?format=short&sort=updateDate,desc&size=50&page=${page}`;

    if (filters) { url += filters; }

    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getIdentities(page, filters) {
    let url = `/iam/identities?format=short&sort=firstName,desc&size=50&page=${page}`;

    if (filters) { url += filters; }

    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getPrivileges() {
    const url = 'iam/privileges?format=short&size=150&page=0';

    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getRoles() {
    const url = 'iam/roles?format=short&size=150&page=0';

    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getMetaRoles() {
    const url = 'iam/meta-roles?format=short&size=150&page=0';

    return axiosInstance({
      method: 'get',
      url,
    });
  },

  // GET ALL BY ID
  getCustomersByIds(ids) {
    const url = `/customers/public?format=short/${ids}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getStoresByIds(id) {
    const url = `/stores/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },

  // GET ONE BY ID
  getProductById(id) {
    const url = `/products/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getStoreById(id) {
    const url = `/stores/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getOrderById(id) {
    const url = `/orders/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getCustomerById(id) {
    const url = `/customers/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getIdentityById(id) {
    const url = `/iam/identities/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },

  // PUT BY ID
  updateIdentityById(id, data) {
    const url = `/iam/identities/${id}`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },

  // DELETE BY ID
  deleteProductById(id) {
    const url = `/products/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
  deleteOrderById(id) {
    const url = `/orders/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
  deleteStoreById(id) {
    const url = `/stores/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
  deleteIdentityById(id) {
    const url = `/stores/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
};

export default api;
