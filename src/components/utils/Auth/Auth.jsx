import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../../../screens/LoadingScreen';
import auth from '../../../services/auth';
import { setUserData } from '../../../redux/actions/Account';

function Auth({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      auth.handleAuthentication();

      if (auth.isSignedIn()) {
        // eslint-disable-next-line camelcase
        const access_token = auth.getAccessToken();
        dispatch(setUserData({ access_token }));
        auth.setAxiosInterceptors();
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
