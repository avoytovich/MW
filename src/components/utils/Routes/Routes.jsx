import React, { Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import SignedRoutes from './SignedRoutes';
import { AuthRoute, GuestRoute } from '../PrivateRoutes';
import UpdatePasswordScreen from '../../../screens/UpdatePasswordScreen';
import RecoveryPasswordScreen from '../../../screens/RecoveryPasswordScreen';
import LoadingScreen from '../../../screens/LoadingScreen';
import MainLayout from '../../../layouts/MainLayout';
import AuthorizationLayout from '../../../layouts/AuthorizationLayout';
import AuthScreen from '../../../screens/AuthScreen';

const Routes = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <GuestRoute
        exact
        path="/login"
        render={(props) => (
          <AuthorizationLayout {...props}>
            <AuthScreen />
          </AuthorizationLayout>
        )}
      />
      <GuestRoute
        exact
        path="/recoverPassword"
        render={(props) => (
          <AuthorizationLayout {...props}>
            <RecoveryPasswordScreen />
          </AuthorizationLayout>
        )}
      />
      <GuestRoute
        exact
        path="/updatePassword/:token"
        render={(props) => (
          <AuthorizationLayout {...props}>
            <UpdatePasswordScreen />
          </AuthorizationLayout>
        )}
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
