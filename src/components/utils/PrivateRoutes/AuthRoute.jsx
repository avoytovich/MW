import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, render, ...rest }) => {
  const account = useSelector(({ account: acc }) => acc);

  if (!account.user) {
    return <Redirect to='/login' />;
  }

  return render ? render({ ...rest }) : <Component {...rest} />;
};

AuthRoute.propTypes = {
  component: PropTypes.elementType,
  render: PropTypes.func,
};

export default AuthRoute;
