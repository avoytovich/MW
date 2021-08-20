import { axiosInstance } from '../axios';
import { KNOWN_REALMS } from '../services/constants';

const postApi = {
  signIn(data) {
    let realm = data?.realm;
    let url = '/iam/tokens';
    const grantType = data?.grantType || 'password';

    const reason = 'Nexway-Center';

    if (reason) {
      url += `?reason=${reason}`;
    }

    if (KNOWN_REALMS.indexOf(`/${realm}`) < 0) {
      realm = 'nexway';
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
  resyncPayments(customerId) {
    const url = `/payment-proxy/payments/${customerId}/resync?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified`;
    return axiosInstance({
      method: 'post',
      url,
    });
  },
  cancelOrder(customerId, reason) {
    const url = `/orders/${customerId}/fullcancel?dbVersion=27&cancellationReason=${reason}&reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified`;
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
  addCustomerById(data) {
    const url = '/customers?reason=Nexway-Center%20POST%20%3A%20reason%20not%20specified';

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

};

export default postApi;
