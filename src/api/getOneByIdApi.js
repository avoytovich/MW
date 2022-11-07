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
    const url = `/products?format=short&parentId=${parentId}&size=500`;
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
  getNextGenerationByProductId(id) {
    const url = `/products/${id}/nextgeneration`;
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
  getFulfillmentsPartnerById(id) {
    const url = `/fulfillments/partners/${id}`;
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
    if (!id) return Promise.reject();

    const url = `/customers/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;

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
  getCatalogsById(id) {
    const url = `/catalogs/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getOnboardingById(id) {
    const url = `/onboarding/${id}`;
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
  getEndUsersGroupsById(id) {
    const url = `/endusers/groups/${id}`;
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
  getTermsAndConditions(id, language, date) {
    const url = `/tandcs/public/tandcs/IAP/${id}/${language}/pdf?date=${date}`;
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
  getRealmDataByName(name) {
    const url = `/customers/public/${name}`;
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
  getAbandonedCartById(id) {
    const url = `/campaigns/abandonedcarts/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getDiscountsUsagesById(id) {
    const url = `/discounts/usages?format=short&discountId=${id}&page=0&size=500`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getEnduserById(id) {
    const url = `endusers/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  vatNumberCheck(number, countryCode) {
    const url = `/vatcheck/${number}?countryCode=${countryCode}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getConsents({ storeId, email }) {
    const url = `/consent-manager/consents?format=short&storeIds=${storeId}&userEmail=${email}&page=0&size=500`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getEmailTemplate(id) {
    const url = `/email-builder/template-definitions/${id}?includeNexwayTemplate=true`;

    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getTemplateSamples({ customerId, name }) {
    const url = `/email-builder/template-samples?format=full&version=0&customerId=${customerId}&name=${name}&size=1&page=0`;

    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getAuditById(id) {
    const url = `/audits/auditItems/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getSubsidiaryById(id) {
    const url = `/subsidiary-manager/subsidiaries/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getCurrencyById(id) {
    const url = `/referential-manager/currency/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getLocaleById(id) {
    const url = `/referential-manager/locale/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getCountryById(id) {
    const url = `/referential-manager/country/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getProductsPriceFunctionById(id) {
    const url = `/products/price-functions/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getInvoiceTranslationById(id) {
    const url = `/designs/legali18ns/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getManualFulfillmentById(id) {
    const url = `/license-keys-provider/packages/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
  getRealmById(id) {
    const url = `/iam/realms/${id}`;
    return axiosInstance({
      method: 'get',
      url,
    });
  },
};
export default getOneByIdApi;
