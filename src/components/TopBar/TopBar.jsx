import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
} from '@material-ui/core';

import {
  Menu as MenuIcon,
  ExitToApp as LogoutIcon,
} from '@material-ui/icons';

import { logout } from '../../redux/actions/Account';
import { setTableScope } from '../../redux/actions/TableData';

const TopBar = ({ toggleDrawer, drawerOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const scope = location.pathname.split('/').pop();

  const doLogout = () => dispatch(logout());

  useEffect(() => {
    if (scope) {
      dispatch(setTableScope(scope));
    }
  }, [scope]);
  return (
    <AppBar position='static' className='top-bar' elevation={1}>
      <Toolbar>
        <Box display='flex' width={1} justifyContent='space-between'>
          { drawerOpen
            ? <Box />
            : (
              <IconButton edge='start' aria-label='menu' color='secondary' onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )
          }
          <IconButton edge='start' aria-label='logout' color='secondary' onClick={doLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  toggleDrawer: PropTypes.func,
  drawerOpen: PropTypes.bool,
};

export default TopBar;
