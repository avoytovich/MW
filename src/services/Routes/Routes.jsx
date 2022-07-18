import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';

import moment from 'moment';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import SignedRoutes from './SignedRoutes';
import GuestRoutes from './GuestRoutes';

import LoadingScreen from '../../screens/LoadingScreen';
import { getLanguagesOptions } from '../../components/utils/OptionsFetcher/OptionsFetcher';

import MainLayout from '../../layouts/MainLayout';
import AuthorizationLayout from '../../layouts/AuthorizationLayout';

const Routes = () => {
  const account = useSelector(({ account: acc }) => acc);
  getLanguagesOptions();

  return (
    <Suspense fallback={<LoadingScreen />}>
      {process?.env?.BUILT_AT && (
        <Box
          display='flex'
          justifyContent='center'
          color='#fff'
          className={`env-bar bar-style-${process?.env?.ENV_MODE}`}
          height={25}
        >
          <Typography variant='h6'>Environment:&nbsp;</Typography>
          <Typography variant='h6' style={{ textTransform: 'capitalize' }}>
            {process?.env?.ENV_MODE}
          </Typography>
          <Typography variant='h6'>&nbsp;||&nbsp;</Typography>
          <Typography variant='h6'>Built at:&nbsp;</Typography>
          <Typography variant='h6'>{moment(process.env.BUILT_AT).format('lll')}</Typography>
        </Box>
      )}

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
