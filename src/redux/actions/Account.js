import auth from '../../services/auth';
import {
  LOGIN_SUCCESS,
  SILENT_LOGIN,
  LOGOUT,
} from '../constants/actionTypes';
import { showNotification } from './HttpNotifications';
import localization from '../../localization';

const login = (username, password) => async (dispatch) => {
  const result = await auth.loginWithEmailAndPassword(username, password);
  // eslint-disable-next-line camelcase
  const { access_token } = result;
  const user = { access_token, ...auth.decodeToken(access_token) };

  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      user,
    },
  });

  dispatch(
    showNotification(`localization.t('general.welcomeBack')${user.given_name ? `, ${user.given_name}` : ''}!`),
  );
};

const setUserData = (access_token) => (dispatch) => {
  const user = { access_token, ...auth.decodeToken(access_token) };
  
  dispatch({
    type: SILENT_LOGIN,
    payload: {
      user,
    },
  });
};

const logout = () => async (dispatch) => {
  auth.logout();

  dispatch({
    type: LOGOUT,
  });

  dispatch(showNotification(localization.t('general.sessionEnded')));
};

export {
  login,
  logout,
  setUserData,
};
