import { axiosInstance } from '../axios';
// import { KNOWN_REALMS } from '../services/constants';

const postApi = {
  signIn(data) {
    const realm = data?.realm || 'nexway';
    let url = '/iam/tokens';
    const grantType = data?.grantType || 'password';

    const reason = 'Nexway-Center';

    if (reason) {
      url += `?reason=${reason}`;
    }

    return axiosInstance({
      method: 'post',
      url,
      data: {
        ...data,
        realm,
        grantType,
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
  addNewMetaRole(data) {
    const url = '/iam/meta-roles?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addNewRole(data) {
    const url = '/iam/roles?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

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
  addNewProduct(data) {
    const url = '/products?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addNewPrice(data) {
    const url = '/prices?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addNewAsset(file) {
    const url = '/assets';
    const data = new FormData();
    data.append('file', file);

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addNewDiscount(data) {
    const url = '/discounts?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addNewRecommendation(data) {
    const url = '/product-recommendations?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  sendConfirmationMail(customerId, data) {
    const url = `/orders/${customerId}/email/send?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  sendConfirmationMailOnboarding(onboardingId, data) {
    const url = `/onboarding/${onboardingId}/email/send?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  sendConfirmationMailOnboardScreen(capchaToken, data) {
    const url = `/onboarding/public?capchaToken=${capchaToken}&reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  resyncPayments(customerId) {
    const url = `/payment-proxy/payments/${customerId}/resync?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'post',
      url,
    });
  },
  cancelOrder(customerId, dbVersion, reason) {
    const url = `/orders/${customerId}/fullcancel?dbVersion=${dbVersion}&cancellationReason=${reason}&reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'post',
      url,
    });
  },

  addNewIdentity(data) {
    const url = '/iam/identities?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addNewSecretKeyToIdentity(id) {
    const url = `/iam/identities/${id}/secret?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'post',
      url,
    });
  },
  addNewCampaign(data) {
    const url = '/marketing-campaign/campaigns';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addNewStore(data) {
    const url = '/stores?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addSubsidiary(data) {
    const url = '/subsidiary-manager/subsidiaries?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addCustomerById(data) {
    const url = '/customers?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addCurrency(data) {
    const url = '/referential-manager/currency';
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addLocale(data) {
    const url = '/referential-manager/locale';
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addCountry(data) {
    const url = '/referential-manager/country';
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addCatalogs(data) {
    const url = '/catalogs?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addNotification(data) {
    const url = '/customer-notifier/receivers?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addNotificationDefinition(data) {
    const url = '/customer-notifier/notification-definitions/?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addLicenseProviderDefinition(data) {
    const url = '/license-manager/license-provider-definitions?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addAbandonedCart(data) {
    const url = '/campaigns/abandonedcarts?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  sendByEmailByCartId(id) {
    const url = `/carts/public/${id}/sendByMail?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'post',
      url,
    });
  },

  retrySendingByNotificationId(id) {
    const url = `/customer-notifier/retryNotification/${id}?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'post',
      url,
    });
  },

  generateCodes(id, data) {
    const url = `/discounts/${id}/generate?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addCart(data) {
    const url = 'carts?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addEndUserGroup(data) {
    const url = '/endusers/groups?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  emailTestTemplating(data) {
    const url = '/email-builder/operations/testTemplating?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  cloneEmailTemplate(data) {
    const url = '/email-builder/template-definitions/clone?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addPriceFunction(data) {
    const url = '/products/price-functions?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addInvoiceTranslation(data) {
    const url = '/designs/legali18ns?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  repairOrder(id, dbVersion) {
    const url = `/orders/${id}/repair?dbVersion=${dbVersion}&reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'post',
      url,
    });
  },
  updateSubscriptions(id, newStatus) {
    const url = `/endusers/subscriptions/${id}/${newStatus}?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'post',
      url,
    });
  },
  addManualFulfillment(data) {
    const url = '/license-keys-provider/packages?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addBatchesToManualFulfillmentById(id, data) {
    const url = `/license-keys-provider/import/${id}`;
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
  addProductLocalsById(data) {
    const url = '/products/descriptions';
    return axiosInstance({
      method: 'post',
      url,
      data,
    });
  },
};

export default postApi;
