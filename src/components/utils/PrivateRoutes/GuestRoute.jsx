import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const GuestRoute = ({ component: Component, render, ...rest }) => {
  const account = useSelector(({ account: acc }) => acc);

  if (account.user) {
    return <Redirect to="/" />;
  }

  return render ? render({ ...rest }) : <Route {...rest}><Component /></Route>;
};

GuestRoute.propTypes = {
  component: PropTypes.any,
  render: PropTypes.func,
};

export default GuestRoute;
