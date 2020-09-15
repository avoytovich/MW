import React from 'react';

import { Typography, CssBaseline } from '@material-ui/core';
import HttpNotifications from '../utils/HttpNotifications';
import localization from '../../localization';

import '../../styles/main.scss';

const RootComponent = () => (
  <>
    <CssBaseline />
    <Typography variant='h1'>{localization.t('general.welcomeMessage')}</Typography>
    <HttpNotifications />
  </>
);

export default RootComponent;
