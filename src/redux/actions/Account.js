import { toast } from 'react-toastify';
import auth from '../../services/auth';
import {
  LOGIN_SUCCESS, SILENT_LOGIN, UPDATE_NEXWAY_STATE, LOGOUT,
} from '../constants/actionTypes';
import localization from '../../localization';

const login = (username, password, realm) => async (dispatch) => {
  const result = await auth.loginWithEmailAndPassword(username, password, realm);
  // eslint-disable-next-line camelcase
  const { access_token } = result;
  const user = { access_token, ...auth.decodeToken(access_token) };

  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      user,
    },
  });

  toast(
    `${localization.t('general.welcomeBack')} ${
      user.given_name ? `, ${user.given_name}` : ''
    }!`,
  );
};

const setUserData = (token) => (dispatch) => {
  const user = { access_token: token, ...auth.decodeToken(token) };

  dispatch({
    type: SILENT_LOGIN,
    payload: {
      user,
    },
  });
};

const setNexwayState = (newState) => (dispatch) => {
  localStorage.setItem('nexwayState', JSON.stringify(newState));

  dispatch({
    type: UPDATE_NEXWAY_STATE,
    payload: {
      nexwayState: { ...newState },
    },
  });
};

const logout = () => async (dispatch) => {
  auth.logout();

  dispatch({
    type: LOGOUT,
  });

  toast(localization.t('general.sessionEnded'));
};

export {
  login,
  logout,
  setUserData,
  setNexwayState,
};
