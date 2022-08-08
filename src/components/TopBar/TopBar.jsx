import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

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
import { VALID_REFRESH_SCOPES, VALID_FILTER_SCOPES, VALID_SEARCH_SCOPES } from '../../services/constants';

import store from '../../redux/store';
import { logout } from '../../redux/actions/Account';
import { setHeaderCustomerName, setTableScope } from '../../redux/actions/TableData';
import CustomerStatusLabel from '../utils/CustomerStatusLabel';

const TopBar = ({ toggleDrawer, drawerOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const customerData = useSelector(({ tableData: { customerName } }) => customerName);

  const scope = location.pathname.split('/').pop();

  const doLogout = () => dispatch(logout());

  useEffect(() => {
    const { tableData } = store.getState();

    if (scope
        && tableData?.scope !== scope
        && (VALID_REFRESH_SCOPES.includes(scope)
          || VALID_FILTER_SCOPES.includes(scope)
          || VALID_SEARCH_SCOPES.includes(scope)
        )) {
      dispatch(setTableScope(scope));
    }
    dispatch(setHeaderCustomerName(''));
  }, [scope]);

  return (
    <AppBar position='static' className='top-bar' elevation={1} sx={{ zIndex: 9 }} style={{ height: '45px' }}>
      <Toolbar>
        {drawerOpen && (
        <Box width={1} pb={3}>
          <CustomerStatusLabel customer={customerData} />
        </Box>
        )}
        <Box display='flex' width={1} justifyContent='space-between' pb={3}>
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
