// ToDo: consider making a common layout for such type of settings screens
import React from 'react';

import { Box, Typography } from '@material-ui/core';

import localization from '../../../localization';

const SelectCustomerNotification = () => (
  <Box textAlign='center'>
    <Typography gutterBottom variant='h4'>
      {localization.t('general.noCustomer')}
    </Typography>

    <Typography gutterBottom variant='h5'>
      {localization.t('general.selectCustomer')}
    </Typography>
  </Box>
);

export default SelectCustomerNotification;
