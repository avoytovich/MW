import { axiosInstance } from '../axios';

const defaultRequestedSize = 30;
const defaultRequestedPage = 0;
const defaultRequestedObject = { page: defaultRequestedPage, size: defaultRequestedSize };
const getAllApi = {
  getOrders({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/orders?format=short&size=${size}&page=${page}`;
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
  getStores({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/stores?format=short&size=${size}&page=${page}`;
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
  getSubscriptions({
    page = defaultRequestedPage, size = defaultRequestedSize, filters,
  } = defaultRequestedObject) {
    let url = `/subscription-manager/subscriptions?format=short&size=${size}&page=${page}`;
    if (filters) {
      url += filters;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },

  getProducts({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/products?format=full&size=${size}&page=${page}`;
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

  getIdentities({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/iam/identities?format=short&size=${size}&page=${page}`;
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
  getPrivileges({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/iam/privileges?format=short&size=${size}&page=${page}`;
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
  getRoles({
    page = defaultRequestedPage, filters, size = defaultRequestedSize, sortParams,
  } = defaultRequestedObject) {
    let url = `iam/roles?format=short&size=${size}&page=${page}`;
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
  getMetaRoles({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `iam/meta-roles?format=short&size=${size}&page=${page}`;
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
  getCustomers({
    page = 0, filters, size = defaultRequestedSize, sortParams,
  } = defaultRequestedObject) {
    let url = `/customers?format=short&size=${size}&page=${page}`;
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

  getNotifications(page = defaultRequestedPage, filters, sortParams) {
    let url = `/customer-notifier/receivers?format=short&status=Active&sort=status%2Casc&size=500&page=${page}`;
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

  getCampaigns({
    page = defaultRequestedPage, size = defaultRequestedSize, filters,
  } = defaultRequestedObject) {
    let url = `/marketing-campaign/campaigns?format=short&sort=updateDate,desc&size=${size}&page=${page}`;

    if (filters) {
      url += filters;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getRecommendations({
    page = defaultRequestedPage, size = defaultRequestedSize, filters,
  } = defaultRequestedObject) {
    let url = `/product-recommendations?format=short&sort=name,asc&size=${size}&page=${page}`;

    if (filters) {
      url += filters;
    }

    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getDiscounts({
    page = defaultRequestedPage, size = defaultRequestedSize, filters,
  } = defaultRequestedObject) {
    let url = `/discounts?format=short&sort=name,asc&size=${size}&page=${page}`;

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
  getDesignsTranslations({
    page = defaultRequestedPage, size = defaultRequestedSize, sortParams,
  } = defaultRequestedObject) {
    let url = `/designs/i18ns?format=short&size=${size}&page=${page}`;
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getDesignsFonts({
    page = defaultRequestedPage, size = defaultRequestedSize, sortParams,
  } = defaultRequestedObject) {
    let url = `/designs/fonts?format=short&size=${size}&page=${page}`;
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getDesignsThemes({
    page = defaultRequestedPage, size = defaultRequestedSize, sortParams,
  } = defaultRequestedObject) {
    let url = `/designs/themes?format=short&size=${size}&page=${page}`;
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getDesignsLayouts({
    page = defaultRequestedPage, size = defaultRequestedSize, sortParams,
  } = defaultRequestedObject) {
    let url = `/designs/layouts?format=short&size=${size}&page=${page}`;
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
  getNotificationDefinition({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/customer-notifier/notification-definitions?format=short&size=${size}&page=${page}`;

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

  getEventsOptions() {
    const url = '/customer-notifier/notification-definitions?format=short&size=30&page=0';
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getMarketingPrices({
    page = defaultRequestedPage, size = defaultRequestedSize, filters,
  } = defaultRequestedObject) {
    let url = `/prices?format=short&size=${size}&page=${page}`;
    if (filters) {
      url += filters;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },
};

export default getAllApi;
