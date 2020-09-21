import React, { lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

const SignedRoutes = () => (
  <Switch>
    <Route
      exact
      path='/'
      component={lazy(() => import('../../../screens/MainScreen'))}
    />
    <Route
      exect
      path="/products"
      component={lazy(() => import('../../../screens/ProductsScreen'))}
    />

    <Redirect to='/' />
  </Switch>
);

export default SignedRoutes;
