import React, { Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import SignedRoutes from './SignedRoutes';
import { AuthRoute, GuestRoute } from '../PrivateRoutes';
import UpdatePasswordScreen from '../../../screens/UpdatePasswordScreen';
import RecoveryPasswordScreen from '../../../screens/RecoveryPasswordScreen';
import LoadingScreen from '../../../screens/LoadingScreen';
import MainLayout from '../../../layouts/MainLayout';
import AuthScreen from '../../../screens/AuthScreen';

const Routes = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <GuestRoute exact path="/login" component={AuthScreen} />
      <GuestRoute
        exact
        path="/recoverPassword"
        component={RecoveryPasswordScreen}
      />
      <GuestRoute
        exact
        path="/updatePassword/:token"
        component={UpdatePasswordScreen}
      />

      <AuthRoute
        path="/"
        render={(props) => (
          <MainLayout {...props}>
            <Suspense fallback={<LoadingScreen />}>
              <SignedRoutes />
            </Suspense>
          </MainLayout>
        )}
      />

      <Redirect to="/404" />
    </Switch>
  </Suspense>
);

export default Routes;
