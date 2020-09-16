import React, { lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

const SignedRoutes = () => (
  <Switch>
    <Route
      path='/'
      component={lazy(() => import('../../../screens/MainScreen'))}
    />

    <Redirect to='/404' />
  </Switch>
);

export default SignedRoutes;
