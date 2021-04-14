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

    if (!accessToken) {
      return;
    }

    if (this.isValidToken(accessToken)) {
      this.setSession(accessToken);
    } else {
      this.setSession(null);
    }
  }

  loginWithEmailAndPassword(username, password) {
    return api
      .signIn({ username, password })
      .then(({ data }) => {
        if (data.access_token) {
          this.setSession(data.access_token);
          this.setAxiosInterceptors();
          return data;
        }

        return data.error;
      });
  }

  logout() { this.setSession(null); }

  setSession(accessToken) {
    if (accessToken) {
      return localStorage.setItem('accessToken', accessToken);
    }

    return localStorage.removeItem('accessToken');
  }

  getAccessToken() { return localStorage.getItem('accessToken'); }

  decodeToken(accessToken) { return jwtDecode(accessToken); }

  isValidToken(accessToken) {
    if (!accessToken) {
      return false;
    }

    const decoded = this.decodeToken(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  }

  isSignedIn() { return !!this.getAccessToken(); }
}

const auth = new Auth();

export default auth;
