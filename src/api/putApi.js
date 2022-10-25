import { axiosInstance } from '../axios';

const putApi = {
  updateCustomerById(id, data) {
    const url = `/customers/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateMetaRoleById(id, data) {
    const url = `/iam/meta-roles/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateRoleById(id, data) {
    const url = `/iam/roles/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateSubsidiaryById(id, data) {
    const url = `/subsidiary-manager/subsidiaries/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateCurrencyById(id, data) {
    const url = `/referential-manager/currency/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateLocaleById(id, data) {
    const url = `/referential-manager/locale/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateCountryById(id, data) {
    const url = `/referential-manager/country/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
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
  updateProductLocalsById(id, data) {
    const url = `/products/descriptions/${id}`;
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
  updateCatalogsById(id, data) {
    const url = `/catalogs/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateOnboardingById(id, data) {
    const url = `/onboarding/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
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
  updatePriceById(id, data) {
    const url = `/prices/${id}`;
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
  updateNotificationById(id, data) {
    const url = `/customer-notifier/receivers/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateNotificationDefinitionById(id, data) {
    const url = `/customer-notifier/notification-definitions/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateLicenseProviderDefinition(id, data) {
    const url = `/license-manager/license-provider-definitions/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateAbandonedCart(id, data) {
    const url = `/campaigns/abandonedcarts/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateEndUser(id, data) {
    const url = `/endusers/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateEndUserGroup(id, data) {
    const url = `/endusers/groups/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateEmailTemplate(id, data) {
    const url = `/email-builder/template-definitions/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateEmailTemplateSample(id, data) {
    const url = `/email-builder/template-samples/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updatePriceFunction(id, data) {
    const url = `/products/price-functions/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateInvoiceTranslationById(id, data) {
    const url = `/designs/legali18ns/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateManualFulfillmentById(id, data) {
    const url = `/license-keys-provider/packages/${id}?reason=Nexway-Center%20PUT%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
  updateRealmsById(id, data) {
    const url = `/iam/realms/${id}`;
    return axiosInstance({
      method: 'put',
      url,
      data,
    });
  },
};

export default putApi;
