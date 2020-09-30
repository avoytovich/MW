import React, { lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

const SignedRoutes = () => (
  <Switch>
    <Route
      exact
      path="/overview/products"
      component={lazy(() => import('../../../screens/ProductsScreen'))}
    />
    <Route
      path="/overview/products/:id"
      component={lazy(() => import('../../../screens/ProductDetailsScreen'))}
    />
    <Route
      exact
      path="/overview/stores"
      component={lazy(() => import('../../../screens/StoresScreen'))}
    />
    <Route
      exact
      path="/overview/stores/:id"
      component={lazy(() => import('../../../screens/StoreDetailsScreen'))}
    />
    <Route
      exact
      path="/overview/orders"
      component={lazy(() => import('../../../screens/OrdersScreen'))}
    />
    <Route
      exact
      path="/overview/orders/:id"
      component={lazy(() => import('../../../screens/OrderDetailsScreen'))}
    />
    <Redirect to="/overview/products" />
  </Switch>
);

export default SignedRoutes;
