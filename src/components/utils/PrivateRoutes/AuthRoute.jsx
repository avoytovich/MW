import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, render, ...rest }) => {
  const account = useSelector(({ account: acc }) => acc);

  if (!account.user) {
    return <Redirect to='/login' />;
  }

  return render ? render({ ...rest }) : <Route {...rest}><Component /></Route>;
};

AuthRoute.propTypes = {
  component: PropTypes.elementType,
  render: PropTypes.func,
};

export default AuthRoute;
