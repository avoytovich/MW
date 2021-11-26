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
  getCampaigns({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/marketing-campaign/campaigns?format=short&desc&size=${size}&page=${page}`;
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
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/discounts?format=short&asc&size=${size}&page=${page}`;
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
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/designs/i18ns?format=short&size=${size}&page=${page}`;

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
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/designs/layouts?format=short&size=${size}&page=${page}`;

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
  getMarketingPrices({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/prices?format=short&size=${size}&page=${page}`;

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
  getPriceFunctions({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/products/price-functions?format=short&size=${size}&page=${page}`;

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
  getNotificationHistory(page = 0, filters, sortParams) {
    let url = `/customer-notifier/notifications?format=short&size=10&page=${page}`;

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
  getNotifications({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/customer-notifier/receivers?format=short&size=${size}&page=${page}`;

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

  getNotificationsHistory({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/customer-notifier/notifications?format=short&size=${size}&page=${page}`;

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

  getLicenses({
    page = defaultRequestedPage, size = defaultRequestedSize, filters,
  } = defaultRequestedObject) {
    let url = `/license-manager/licenses?format=short&size=${size}&page=${page}`;

    if (filters) {
      const adjustFilters = filters.replace(',', '&status=');
      url += adjustFilters;
    }
    return axiosInstance({
      method: 'get',
      url,
    });
  },

  getCarts({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/carts?format=short&size=${size}&page=${page}`;

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

  getEndUsersGroups({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/endusers/groups?format=short&size=${size}&page=${page}`;

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

  getOnboardingList({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/onboarding?format=short&size=${size}&page=${page}`;

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

  getAutoFulfillments({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/fulfillments/partners?size=${size}&page=${page}`;
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
  getManualFulfillments({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/license-keys-provider/packages?size=${size}&page=${page}`;
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
  getLicenseProviderDefinitions({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/license-manager/license-provider-definitions?size=${size}&page=${page}`;
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
  getEndUsers({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/endusers?format=short&size=${size}&page=${page}`;
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
  getDiscountsUsages({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/discounts/usages?format=short&page=${page}&size=${size}`;
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
  getGroupsOptionsByCustomerId(customerId) {
    const url = `/endusers/groups?customerId=${customerId}&size=30&page=0`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getResellers(
    {
      page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams, type,
    },
  ) {
    let url = `/endusers?format=short&type=${type}&size=${size}&page=${page}`;
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
  getAbandoned({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `campaigns/abandonedcarts?format=short&size=${size}&page=${page}`;
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
  getEmailBuilder({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/email-builder/template-definitions?format=short&size=${size}&page=${page}`;
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
  getAudits({
    page = defaultRequestedPage, size = defaultRequestedSize, filters, sortParams,
  } = defaultRequestedObject) {
    let url = `/audits/auditItems?format=short&size=${size}&page=${page}`;
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
};
export default getAllApi;
