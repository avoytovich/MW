import React, { lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

const SignedRoutes = () => (
  <Switch>
    <Route
      exect
      path='/overview/products'
      component={lazy(() => import('../../../screens/ProductsScreen'))}
    />

    <Redirect to='/overview/products' />
  </Switch>
);

export default SignedRoutes;
