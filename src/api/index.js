import { axiosInstance } from '../axios';

const api = {
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
  getPrices() {
    return axiosInstance({
      method: 'get',
      url: '/prices',
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
};

export default api;
