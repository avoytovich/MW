import React, { lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

const SignedRoutes = () => (
  <Switch>
    <Route
      exact
      path="/"
      component={lazy(() => import('../../../screens/MainScreen'))}
    />
    <Route
      exect
      path="/products"
      component={lazy(() => import('../../../screens/ProductsScreen'))}
    />
    <Route
      exect
      path="/stores"
      component={lazy(() => import('../../../screens/StoresScreen'))}
    />
    <Route
      exect
      path="/orders"
      component={lazy(() => import('../../../screens/OrdersScreen'))}
    />
    <Redirect to="/" />
  </Switch>
);

export default SignedRoutes;
