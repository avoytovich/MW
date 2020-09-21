import React, { lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

const SignedRoutes = () => (
  <Switch>
    <Route
      path='/'
      component={lazy(() => import('../../../screens/MainScreen'))}
    />
    <Route
      exect
      path="/products"
      component={lazy(() => import('../../../screens/ProductsScreen'))}
    />

<Redirect to='/404' />
  </Switch>
);

export default SignedRoutes;
