import React from 'react';
import PropTypes from 'prop-types';

import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
} from '@material-ui/core';

import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  NotificationsNone as NotificationsIcon,
} from '@material-ui/icons';

const TopBar = ({ toggleDrawer }) => (
  <AppBar position='static' className='top-bar' elevation={1}>
    <Toolbar>
      <IconButton edge='start' aria-label='menu' color='secondary' onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>

      <Box flexGrow={1}>
        <InputBase
          fullWidth
          placeholder='Search...'
          startAdornment={(
            <IconButton edge='start' aria-label='search' color='secondary'>
              <SearchIcon />
            </IconButton>
          )}
        />
      </Box>

      <IconButton edge='start' aria-label='refresh' color='secondary'>
        <RefreshIcon />
      </IconButton>

      <IconButton edge='start' aria-label='notifications' color='secondary'>
        <NotificationsIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

TopBar.propTypes = {
  toggleDrawer: PropTypes.func,
};

export default TopBar;
