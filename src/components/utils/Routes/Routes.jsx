import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';

import SignedRoutes from './SignedRoutes';
import GuestRoutes from './GuestRoutes';

import LoadingScreen from '../../../screens/LoadingScreen';

import MainLayout from '../../../layouts/MainLayout';
import AuthorizationLayout from '../../../layouts/AuthorizationLayout';

const Routes = () => {
  const account = useSelector(({ account: acc }) => acc);

  return (
    <Suspense fallback={<LoadingScreen />}>
      {account && account.user ? (
        <MainLayout>
          <Suspense fallback={<LoadingScreen />}>
            <SignedRoutes />
          </Suspense>
        </MainLayout>
      ) : (
        <AuthorizationLayout>
          <Suspense fallback={<LoadingScreen />}>
            <GuestRoutes />
          </Suspense>
        </AuthorizationLayout>
      )}
    </Suspense>
  );
};

export default Routes;
