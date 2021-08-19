import { axiosInstance } from '../axios';

const getOneByIdApi = {
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
  getSubProductsById(parentId) {
    const url = `/products?format=full&parentId=${parentId}&size=500`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
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
  getCartById(id) {
    const url = `/carts/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getPaymentById(id) {
    const url = `/payment-proxy/payments/${id}`;
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
  getPriceById(id) {
    const url = `/prices/${id}`;
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
  getSubscriptionById(id) {
    const url = `/subscription-manager/subscriptions/${id}`;
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
  getPricesByProductId(id) {
    const url = `/prices?format=short&productId=${id}`;
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
  getEndUsersByCustomerId(id) {
    const url = `/endusers?customerId=${id}&size=200`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getEndUsersGroupsByCustomerId(id) {
    const url = `/endusers/groups?customerId=${id}&size=30&page=0`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getCatalogsByCustomerId(id) {
    const url = `/catalogs?format=short&customerId=${id}&size=30&page=0`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getProductDescriptionById(id) {
    const url = `/products/descriptions/${id}`;

    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getTermsAndConditions(id, date) {
    const url = `/tandcs/public/tandcs/IAP/${id}/en-US/pdf?date=${date}`;
    return axiosInstance({
      headers: {
        'Content-Type': 'application/pdf',
        accept: 'application/pdf',
      },
      responseType: 'blob',
      method: 'get',
      url,
    });
  },
  getMetaRoleById(id) {
    const url = `/iam/meta-roles/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getRoleById(id) {
    const url = `/iam/roles/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getPrivilegeById(id) {
    const url = `/iam/privileges/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getCreditNote(id) {
    const url = `/invoices/credits/${id}/pdf`;
    return axiosInstance({
      headers: {
        'Content-Type': 'application/pdf',
        accept: 'application/pdf',
      },
      responseType: 'blob',
      method: 'get',
      url,
    });
  },
  getInvoices(id) {
    const url = `/invoices/invoices/${id}/pdf`;
    return axiosInstance({
      headers: {
        'Content-Type': 'application/pdf',
        accept: 'application/pdf',
      },
      responseType: 'blob',
      method: 'get',
      url,
    });
  },
  getNotificationById(id) {
    const url = `/customer-notifier/receivers/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getNotificationDefinitionById(id) {
    const url = `/customer-notifier/notification-definitions/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getNotificationHistoryById(id) {
    const url = `/customer-notifier/notifications/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getInvoicePdfById(id) {
    const url = `/invoices/invoices/${id}/pdf`;
    return axiosInstance({
      headers: {
        'Content-Type': 'application/pdf',
        accept: 'application/pdf',
      },
      responseType: 'blob',
      method: 'get',
      url,
    });
  },
  getLicenseProviderDefinitionById(id) {
    const url = `/license-manager/license-provider-definitions/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getLicenseById(id) {
    const url = `/license-manager/licenses/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
};
export default getOneByIdApi;
