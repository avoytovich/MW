import auth from '../../services/auth';
import {
  LOGIN_SUCCESS,
  SILENT_LOGIN,
  LOGOUT,
} from '../constants/actionTypes';
import { showNotification } from './HttpNotifications';

const login = (username, password) => async (dispatch) => {
  const user = await auth.loginWithEmailAndPassword(username, password);

  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      user,
    },
  });

  dispatch(showNotification('Signed In!'));
};

const setUserData = (user) => (dispatch) => {
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
};

export {
  login,
  logout,
  setUserData,
};
