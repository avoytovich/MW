import { axiosInstance } from '../axios';

const getAllApi = {
  getOrders(page, filters, sortParams) {
    let url = `/orders?format=short&size=50&page=${page}`;
    if (filters) {
      url += filters;
    }
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getStores(page, filters, sortParams) {
    let url = `/stores?format=short&size=50&page=${page}`;
    if (filters) {
      url += filters;
    }
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getSubscriptions(page, filters) {
    let url = `/subscription-manager/subscriptions?format=short&size=50&page=${page}`;
    if (filters) {
      url += filters;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },

  getProducts(page = 0, filters, sortParams) {
    let url = `/products?format=full&size=50&page=${page}`;
    if (filters) {
      url += filters;
    }
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },

  getIdentities(page, filters, sortParams) {
    let url = `/iam/identities?format=short&size=50&page=${page}`;
    if (filters) {
      url += filters;
    }
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getPrivileges(page = 0, filters, sortParams) {
    let url = `/iam/privileges?format=short&size=150&page=${page}`;
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    if (filters) {
      url += filters;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getRoles(page = 0, filters, sortParams) {
    let url = `iam/roles?format=short&size=150&page=${page}`;
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    if (filters) {
      url += filters;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getMetaRoles(page = 0, filters, sortParams) {
    let url = `iam/meta-roles?format=short&page=${page}`;
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    if (filters) {
      url += filters;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getCustomers(page = 0, filters, sortParams) {
    let url = `/customers?format=short&size=50&page=${page}`;
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    if (filters) {
      url += filters;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },

  getCampaigns(page, filters) {
    let url = `/marketing-campaign/campaigns?format=short&sort=updateDate,desc&size=50&page=${page}`;

    if (filters) {
      url += filters;
    }

    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getRecommendations(page, filters) {
    let url = `/product-recommendations?format=short&sort=name,asc&size=50&page=${page}`;

    if (filters) {
      url += filters;
    }

    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getDiscounts(page, filters) {
    let url = `/discounts?format=short&sort=name,asc&size=50&page=${page}`;

    if (filters) {
      url += filters;
    }

    return axiosInstance({
      method: 'get',
      url,
    });
  },

  getPaymentMethodsOptions() {
    const url = '/payment-proxy/available-payment-types';
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getPaymentConfigOptions() {
    const url = '/payment-proxy/service/config';
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getSellingStoreOptions(customerId) {
    const url = `/stores?format=short&customerId=${customerId}&size=30&page=0`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getFulfillmentsOptions() {
    const url = '/fulfillments/partners?size=30&page=0';
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getSubscriptionsOptions() {
    const url = '/subscriptions/models?format=short&size=30&page=0';
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getDesignsTranslations(page = 0, sortParams) {
    let url = `/designs/i18ns?format=short&size=50&page=${page}`;
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getDesignsFonts(page = 0, sortParams) {
    let url = `/designs/fonts?format=short&size=50&page=${page}`;
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getDesignsThemes(page = 0, sortParams) {
    let url = `/designs/themes?format=short&size=50&page=${page}`;
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getDesignsLayouts(page = 0, sortParams) {
    let url = `/designs/layouts?format=short&size=50&page=${page}`;
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getConditionsOfAvailability() {
    const url = '/iam/roles/availableAvailabilityConditions';
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getCountryOptions() {
    const url = '/referential-manager/country?size=400&sort=name,asc';
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getLocaleOptions() {
    const url = '/referential-manager/locale?size=400&sort=code,asc';
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getEventsOptions() {
    const url = '/customer-notifier/notification-definitions?format=short&size=30&page=0';
    return axiosInstance({
      method: 'get',
      url,
    });
  },
};

export default getAllApi;
