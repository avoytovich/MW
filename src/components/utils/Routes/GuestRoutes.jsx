import React, { lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

const SignedRoutes = () => (
  <Switch>
    <Route
      path='/login'
      component={lazy(() => import('../../../screens/AuthScreen'))}
    />

    <Route
      path='/recoverPassword'
      component={lazy(() => import('../../../screens/RecoveryPasswordScreen'))}
    />

    <Route
      path='/updatePassword/:token'
      component={lazy(() => import('../../../screens/UpdatePasswordScreen'))}
    />

    <Redirect to='/404' />
  </Switch>
);

export default SignedRoutes;
