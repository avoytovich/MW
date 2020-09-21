import React, { Suspense } from 'react';

import SignedRoutes from './SignedRoutes';
import GuestRoutes from './GuestRoutes';
import { AuthRoute, GuestRoute } from '../PrivateRoutes';

import LoadingScreen from '../../../screens/LoadingScreen';

import MainLayout from '../../../layouts/MainLayout';
import AuthorizationLayout from '../../../layouts/AuthorizationLayout';

const Routes = () => (
  <Suspense fallback={<LoadingScreen />}>
    <GuestRoute
      path='/login'
      render={(props) => (
        <AuthorizationLayout {...props}>
          <Suspense fallback={<LoadingScreen />}>
            <GuestRoutes />
          </Suspense>
        </AuthorizationLayout>
      )}
    />

    <AuthRoute
      path='/'
      render={(props) => (
        <MainLayout {...props}>
          <Suspense fallback={<LoadingScreen />}>
            <SignedRoutes />
          </Suspense>
        </MainLayout>
      )}
    />
  </Suspense>
);

export default Routes;
