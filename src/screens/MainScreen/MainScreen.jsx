import React from 'react';
import Typography from '@material-ui/core/Typography';
import localization from '../../localization';

const MainScreen = () => (
  <Typography variant="h1">
    {localization.t('general.welcomeMessage')}
  </Typography>
);

export default MainScreen;
