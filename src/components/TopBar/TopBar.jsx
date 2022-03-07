import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import parentPaths from '../../services/paths';
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
    <AppBar position='static' className='top-bar' elevation={1} sx={{ zIndex: 9 }}>
      <Toolbar>
        <Box display='flex' width={1} justifyContent='space-between'>
          {drawerOpen
            ? <Box />
            : (
              <IconButton
                edge='start'
                aria-label='menu'
                color='secondary'
                onClick={toggleDrawer}
                size='large'
              >
                <MenuIcon />
              </IconButton>
            )}
          <Box>
            <IconButton
              component={NavLink}
              edge='start'
              aria-label='myAccount'
              color={scope !== 'myaccount' ? 'secondary' : 'primary'}
              to={parentPaths.myaccount}
              size='large'
            >
              <AccountCircleIcon />
            </IconButton>
            <IconButton
              edge='start'
              aria-label='logout'
              color='secondary'
              onClick={doLogout}
              size='large'
            >
              <LogoutIcon />
            </IconButton>

          </Box>

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
