import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Dialog,
} from '@material-ui/core';

import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ExitToApp as LogoutIcon,
  // NotificationsNone as NotificationsIcon,
  FilterList as FilterListIcon,
} from '@material-ui/icons';

import { logout } from '../../redux/actions/Account';
import { setTableScope, setSearch } from '../../redux/actions/TableData';

import Filters from '../utils/Modals/Filters';
import FiltersChips from '../utils/FiltersChips';

import { VALID_FILTER_SCOPES } from '../../services/constants';

const TopBar = ({ toggleDrawer }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const scope = location.pathname.split('/').pop();

  const doLogout = () => dispatch(logout());

  const doSearch = () => dispatch(setSearch(searchVal));

  const activeFilters = useSelector(({ tableData: { filters } }) => filters);

  useEffect(() => {
    dispatch(setTableScope(scope));
    setSearchVal('');
  }, [scope]);

  return (
    <AppBar position='static' className='top-bar' elevation={1}>
      <Toolbar>
        <IconButton edge='start' aria-label='menu' color='secondary' onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>

        <Box flexGrow={1}>
          {
            VALID_FILTER_SCOPES.indexOf(scope) >= 0 && (
              <Box display='flex' flexGrow={1}>
                <Box flexGrow={1}>
                  <InputBase
                    fullWidth
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder='Search...'
                    onKeyDown={(e) => { if (e.key === 'Enter') doSearch(); }}
                    startAdornment={(
                      <IconButton edge='start' aria-label='search' color='secondary' onClick={doSearch}>
                        <SearchIcon />
                      </IconButton>
                    )}
                  />
                </Box>

                <IconButton edge='start' aria-label='filter-list' color='secondary' onClick={() => setShowFilters(true)}>
                  <FilterListIcon />
                </IconButton>

                <Dialog
                  open={showFilters}
                  onClose={() => setShowFilters(false)}
                  aria-labelledby='filters-dialog-title'
                  fullWidth
                  maxWidth='sm'
                >
                  <Filters scope={scope} hide={() => setShowFilters(false)} />
                </Dialog>
              </Box>
            )
          }
        </Box>

        {/* <IconButton edge='start' aria-label='notifications' color='secondary'>
          <NotificationsIcon />
        </IconButton> */}

        <IconButton edge='start' aria-label='logout' color='secondary' onClick={doLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>

      {!!activeFilters.length && <FiltersChips filters={activeFilters} />}
    </AppBar>
  );
};

TopBar.propTypes = {
  toggleDrawer: PropTypes.func,
};

export default TopBar;
