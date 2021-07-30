/* eslint-disable class-methods-use-this */

import jwtDecode from 'jwt-decode';
import api from '../api';
import { axiosInstance } from '../axios';

class Auth {
  setAxiosInterceptors() {
    const token = this.getAccessToken();

    axiosInstance.interceptors.request.use(
      (config) => {
        const headers = { ...config.headers };

        if (token) {
          const Authorization = `Bearer ${token}`;
          headers.Authorization = Authorization;
        }

        return { ...config, headers };
      },

      (error) => Promise.reject(error),
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (token && error.response && error.response.status === 401) {
          // this.logout();
          // window.location.reload();
        }

        return Promise.reject(error);
      },
    );
  }

  handleAuthentication() {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken) {
      return;
    }

    if (this.isValidToken(accessToken)) {
      this.setSession(accessToken, refreshToken);
    } else {
      this.setSession(null);
    }
  }

  loginWithEmailAndPassword(username, password, realm = 'nexway') {
    localStorage.setItem('realm', realm);

    return api
      .signIn({ username, password, realm })
      .then(({ data }) => {
        if (data.access_token) {
          this.setSession(data.access_token, data.refresh_token);
          this.setAxiosInterceptors();
          return data;
        }

        return data.error;
      });
  }

  refreshToken() {
    const refresh = this.getRefreshToken();
    const realm = this.getRealm();

    console.log('TOKEN REFRESHED');

    return api.signIn({
      refresh_token: refresh,
      grantType: 'refresh_token',
      realm,
    }).then(({ data }) => {
      if (data.access_token) {
        this.setSession(data.access_token, data.refresh_token);
        this.setAxiosInterceptors();
        return window.location.reload();
      }

      this.logout();
      return window.location.reload();
    }).catch(() => {
      this.logout();
      return window.location.reload();
    });
  }

  logout() { this.setSession(null); }

  setSession(accessToken, refreshToken) {
    if (accessToken) {
      localStorage.setItem('refreshToken', refreshToken);
      return localStorage.setItem('accessToken', accessToken);
    }

    localStorage.removeItem('refreshToken');
    return localStorage.removeItem('accessToken');
  }

  getAccessToken() { return localStorage.getItem('accessToken'); }

  getRefreshToken() { return localStorage.getItem('refreshToken'); }

  getRealm() { return localStorage.getItem('realm'); }

  decodeToken(accessToken) { return jwtDecode(accessToken); }

  isValidToken(accessToken) {
    if (!accessToken) {
      return false;
    }

    const decoded = this.decodeToken(accessToken);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      return this.refreshToken();
    }

    return decoded.exp > currentTime;
  }

  isSignedIn() { return !!this.getAccessToken(); }
}

const auth = new Auth();

export default auth;
