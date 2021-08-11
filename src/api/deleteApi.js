import { axiosInstance } from '../axios';

const deleteApi = {
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
  deleteStoreById(id, force) {
    let url = `/stores/${id}`;

    if (force) {
      url += '?force=true';
    }

    return axiosInstance({
      method: 'delete',
      url,
    });
  },
  deleteIdentityById(id) {
    const url = `/iam/identities/${id}`;
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
  deletePriceById(id) {
    const url = `/prices/${id}`;
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
  deleteRoleById(id) {
    const url = `/iam/roles/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
  deleteMetaRoleById(id) {
    const url = `/iam/meta-roles/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
  deleteIdentitySecretKeyById(identityId, secret) {
    const url = `/iam/identities/${identityId}/secret/${secret}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
  deleteNotificationDefinitionById(id) {
    const url = `/customer-notifier/notification-definitions/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
  deleteCartById(id) {
    const url = `/carts/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
  deleteLicenseProviderDefinitionById(id) {
    const url = `/license-manager/license-provider-definitions/${id}`;
    return axiosInstance({
      method: 'delete',
      url,
    });
  },
};

export default deleteApi;
