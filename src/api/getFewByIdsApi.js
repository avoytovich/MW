import { axiosInstance } from '../axios';

const getFewByIdsApi = {
  getCustomersByIds(ids) {
    const url = `/customers/public?format=short/${ids}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getStoresByIds(id) {
    const url = `/stores/?id=${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getProductsByIds(id) {
    const url = `/products/?${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },

  getDiscountProductsByIds(customerId) {
    const url = `/products?format=full&customerId=${customerId}&status=ENABLED&size=30&page=0`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getParentProductsByIds(customerId, parentIds) {
    const url = `/products?format=full&customerId=${customerId}&parentId=${parentIds}&size=30&page=0`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getPriceFunctionsCustomerByIds(customerId) {
    const url = `/products/price-functions?format=short&customerId=${customerId}&size=30&page=0`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
};

export default getFewByIdsApi;
