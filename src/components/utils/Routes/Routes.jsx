import React, { lazy, Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import SignedRoutes from './SignedRoutes';
import { AuthRoute, GuestRoute } from '../PrivateRoutes';

import LoadingScreen from '../../../screens/LoadingScreen';
import MainLayout from '../../../layouts/MainLayout';

const Routes = () => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      <GuestRoute
        exact
        path='/login'
        component={lazy(() => import('../../../screens/AuthScreen'))}
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

      <Redirect to='/404' />
    </Switch>
  </Suspense>
);

export default Routes;
