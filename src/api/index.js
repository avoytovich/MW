import { axiosInstance } from '../axios';

const api = {
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
  setNewPassword(data){
    return axiosInstance({
      method: 'post',
      url: '',
      data,
    });
  }
};

export default api;
