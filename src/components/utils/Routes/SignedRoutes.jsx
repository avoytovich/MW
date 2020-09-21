import React, { lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

const SignedRoutes = () => (
  <Switch>
    <Route
      exact
      path='/'
      component={lazy(() => import('../../../screens/MainScreen'))}
    />

    <Redirect to='/' />
  </Switch>
);

export default SignedRoutes;
