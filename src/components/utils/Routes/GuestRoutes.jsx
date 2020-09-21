import React, { lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

const SignedRoutes = () => (
  <Switch>
    <Route
      exact
      path='/login'
      component={lazy(() => import('../../../screens/AuthScreen'))}
    />

    <Route
      exact
      path='/recoverPassword'
      component={lazy(() => import('../../../screens/RecoveryPasswordScreen'))}
    />

    <Route
      exact
      path='/updatePassword/:token'
      component={lazy(() => import('../../../screens/UpdatePasswordScreen'))}
    />

    <Redirect to='/login' />
  </Switch>
);

export default SignedRoutes;
