import { axiosInstance } from '../axios';

const putApi = {
  updateCustomerById(id, data) {
    const url = `/customers/${id}`;
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
};

export default putApi;
