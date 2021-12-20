import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';

import localization from '../../localization';
import api from '../../api';

const WithActionsNotificationHistory = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const tableCheckedItems = useSelector(({ tableData: { checkedItems } }) => checkedItems);

  const handleClose = () => setAnchorEl(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const retrySending = () => tableCheckedItems.forEach((each) => (
    api.retrySendingByNotificationId(each.id)
      .then((data) => {
        if ([200, 201, 204].includes(data.status)) return toast(localization.t('general.retrySendingNotificationSuccessed'));
        return toast.error(localization.t('general.retrySendingNotificationFailure'));
      })
      .catch((err) => toast.error(localization.t('general.retrySendingNotificationFailure')))
  ));

  return (
    <>
      <Box display='flex' alignItems='flex-end'>
        <Button
          aria-haspopup='true'
          variant='contained'
          color='primary'
          aria-controls='checkoutMenu'
          onClick={handleClick}
          size='large'
        >
          {localization.t('forms.buttons.actions')}
        </Button>
        <Menu
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={retrySending}>
            <Button color="inherit" disabled={!tableCheckedItems.length} fullWidth>{localization.t('forms.buttons.retrySending')}</Button>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

const withActions = (label) => {
  switch (label) {
    case 'notificationHistory':
      return <WithActionsNotificationHistory />;
    default:
      return <WithActionsNotificationHistory />;
  }
};

export default withActions;
