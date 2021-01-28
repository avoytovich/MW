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
  // POST
  addNewTheme(data) {
    let url = 'designs/themes';
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
  addNewFont(data) {
    let url = 'designs/fonts';
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
  addNewTranslation(data) {
    const url = '/designs/i18ns';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addNewLayout(data) {
    const url = '/designs/layouts';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  // GET ALL
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

  getProducts(page, filters, sortParams) {
    let url = `/products?format=short&parentId=null&size=50&page=${page}`;
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
  getCustomers(page = 0, sortParams) {
    let url = `https://api.staging.nexway.build/customers?format=short&size=50&page=${page}`;
    if (sortParams) {
      url += `&sort=${sortParams.value},${sortParams.type}`;
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
  // GET FEW BY IDs
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
  getRenewingProductsByCustomerId(id) {
    const url = `/products?format=full&customerId=${id}&hasSubscription=true&status=ENABLED&size=30&page=0`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getSubscriptionModelsByCustomerId(id) {
    const url = `/subscription-manager/models?format=short&customerId=${id}&size=30&page=0`;
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
  getDiscountById(id) {
    const url = `/discounts/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getRecoById(id) {
    const url = `/product-recommendations/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getCampaignById(id) {
    const url = `/marketing-campaign/campaigns/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getFontById(id) {
    const url = `/designs/fonts/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getTranslationById(id) {
    const url = `/designs/i18ns/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getThemeById(id) {
    const url = `/designs/themes/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getLayoutById(id) {
    const url = `/designs/layouts/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getPricesByCampaignId(id) {
    const url = `/prices?format=short&marketingCampaignId=${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getSubscriptionModelById(id) {
    const url = `/subscription-manager/models?format=short&id=${id}&size=30&page=0`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getFulfillmentTemplateByCustomerId(id) {
    const url = `/license-manager/license-provider-definitions?format=short&customerId=${id}&size=30&page=0`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  // PUT BY ID
  updateCustomerById(id, data) {
    const url = `/customers/${id}`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateIdentityById(id, data) {
    const url = `/iam/identities/${id}`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateStoreById(id, data) {
    const url = `/stores/${id}`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateOrderById(id, data) {
    const url = `/orders/${id}`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateProductById(id, data) {
    const url = `/products/${id}`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateDiscountById(id, data) {
    const url = `/discounts/${id}`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateRecoById(id, data) {
    const url = `/product-recommendations/${id}`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateThemeById(id, data) {
    const url = `/designs/themes/${id}`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateFontById(id, data) {
    const url = `/designs/fonts/${id}`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateTranslationById(id, data) {
    const url = `/designs/i18ns/${id}`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateLayoutById(id, data) {
    const url = `/designs/layouts/${id}`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateCampaignById(id, data) {
    const url = `/marketing-campaign/campaigns/${id}`;
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
  deleteRecommendationById(id) {
    const url = `/product-recommendations/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
  deleteDiscountById(id) {
    const url = `/discounts/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
  deleteTranslationById(id) {
    const url = `/designs/i18ns/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
  deleteThemeById(id) {
    const url = `/designs/themes/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
  deleteFontById(id) {
    const url = `/designs/fonts/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
  deleteLayoutById(id) {
    const url = `/designs/layouts/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
};

export default api;
