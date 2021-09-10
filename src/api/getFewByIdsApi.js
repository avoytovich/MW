import { axiosInstance } from '../axios';

const getFewByIdsApi = {
  getCustomersByIds(ids) {
    const url = `/customers/public?format=short&${ids}`;
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
  getProductsByStore(customerId, storeId) {
    const url = `/products?format=full&customerId=${customerId}&sellingStores=${storeId}&size=30&page=0`;
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
  getNotificationDefinitionByIds(ids) {
    const url = `/customer-notifier/notification-definitions?format=short&size=10&page=0&${ids}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getOrdersByCard({
    size = 10, page = 1, bin, l4, customer, currency, amount, date,
  }) {
    let url = `/payment-proxy/orders-by-card-digits?format=short&size=${size}&page=${page - 1}`;

    if (bin) {
      url += `&bin=${bin}`;
    }

    if (l4) {
      url += `&l4=${l4}`;
    }

    if (customer) {
      url += `&origin=${customer}`;
    }

    if (currency) {
      url += `&currency=${currency}`;
    }

    if (amount) {
      url += `&amount=${Math.round(amount * 100)}`;
    }

    if (date) {
      url += `&date=${date}`;
    }

    return axiosInstance({
      method: 'get',
      url,
    });
  },
};

export default getFewByIdsApi;
