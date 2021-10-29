// ToDo: consider making a common layout for such type of settings screens
import React from 'react';

import { Box, Typography } from '@material-ui/core';

import localization from '../../../localization';

const LoadingErrorNotification = () => (
  <Box textAlign='center'>
    <Typography gutterBottom variant='h4'>
      {localization.t('errorNotifications.loadingError')}
    </Typography>

    <Typography gutterBottom variant='h5'>
      {localization.t('errorNotifications.couldNotLoadNeededResources')}
    </Typography>
  </Box>
);

export default LoadingErrorNotification;
