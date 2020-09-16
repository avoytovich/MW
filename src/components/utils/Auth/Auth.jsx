import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { setUserData, logout } from '../../../redux/actions/Account';
import auth from '../../../services/auth';

import LoadingScreen from '../../../screens/LoadingScreen';

function Auth({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      auth.setAxiosInterceptors({
        onLogout: () => dispatch(logout()),
      });

      auth.handleAuthentication();

      if (auth.isSignedIn()) {
        // eslint-disable-next-line camelcase
        const access_token = await auth.getAccessToken();
        await dispatch(setUserData({ access_token }));
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return children;
}

Auth.propTypes = {
  children: PropTypes.any,
};

export default Auth;
