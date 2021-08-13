import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv';

import {
  ViewColumn as ViewColumnIcon,
  FilterList as FilterListIcon,
  GetApp as GetAppIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  FindInPage as FindIcon,
} from '@material-ui/icons';
import {
  IconButton,
  Typography,
  Box,
  TextField,
  MenuItem,
  Tooltip,
  Dialog,
} from '@material-ui/core';
import localization from '../../localization';
import {
  setRowsPerPage,
  setCheckedItems,
  refreshTable,
  setWasUpdated,
} from '../../redux/actions/TableData';
import ShowColumnPopper from './ShowColumnPopper';
import { VALID_REFRESH_SCOPES, VALID_FILTER_SCOPES } from '../../services/constants';

import Filters from '../utils/Modals/Filters';

const useStyles = makeStyles({
  button: {
    color: '#b9b1b1',
    '&:hover': {
      color: '#4791db',
    },
    '&:active': {
      color: '#4791db',
    },
  },
});

const selectOptions = ['20', '50', '100', '200'];

const TableActionsBar = ({
  children, positionBottom, findByCC, scope, deleteFunc, headers,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();
  const doRefresh = () => dispatch(refreshTable(scope));

  const reduxRowPerPage = useSelector(({ tableData: { rowsPerPage } }) => rowsPerPage);
  const tableCheckedItems = useSelector(({ tableData: { checkedItems } }) => checkedItems);
  const csvHeaders = headers ? [...headers].map((header) => ({
    label: header.value,
    key: header.id,
  })) : [];
  const handleDeleteItems = () => {
    const promiseArray = tableCheckedItems.map((item) => deleteFunc(item.id));
    Promise.allSettled(promiseArray).then((res) => {
      if (res[0].status !== 'rejected') {
        toast(localization.t('general.updatesHaveBeenSaved'));
      }
      dispatch(setCheckedItems([]));
      dispatch(setWasUpdated());
    });
  };

  return (
    <Box display="flex" className='test' alignItems='center' justifyContent='space-between' pb={3}>
      <Box display='flex' alignItems='center' py={2}>
        <Typography data-test='rowsPerPageLabel' variant="subtitle2">{localization.t('general.rowsPerPage')}</Typography>
        <Box px={2}>
          <TextField
            select
            value={reduxRowPerPage}
            onChange={(e) => {
              dispatch(setRowsPerPage(e.target.value));
            }}
          >
            {selectOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {!positionBottom
          && (
            <>
              <Tooltip arrow title="Show Columns" placement="top">
                <IconButton className={classes.button} onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)} edge='start' aria-label='refresh'>
                  <ViewColumnIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Filter" placement="top">
                <span>
                  <IconButton className={classes.button} disabled={VALID_FILTER_SCOPES.indexOf(scope) < 0} onClick={() => setShowFilters(true)} edge='start' aria-label='refresh' color='secondary'>
                    <FilterListIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Dialog
                open={showFilters}
                onClose={() => setShowFilters(false)}
                aria-labelledby='filters-dialog-title'
                fullWidth
                maxWidth='sm'
              >
                <Filters scope={scope} hide={() => setShowFilters(false)} />
              </Dialog>
              <Tooltip arrow title="Export" placement="top">
                <span>
                  <CSVLink
                    onClick={(!headers || tableCheckedItems.length === 0)
                      ? (e) => e.preventDefault() : () => { }}
                    className="CSVLinkBlock"
                    data={tableCheckedItems}
                    headers={csvHeaders}
                    filename="table-export.csv"
                    target="_blank"
                  >
                    <IconButton disabled={!headers || tableCheckedItems.length === 0} className={classes.button} edge='start' color='secondary'><GetAppIcon /></IconButton>
                  </CSVLink>
                </span>
              </Tooltip>
              <Tooltip arrow title="Delete" placement="top">
                <span>
                  <IconButton disabled={!deleteFunc || tableCheckedItems.length === 0} onClick={handleDeleteItems} className={classes.button} edge='start' color='secondary'><DeleteIcon /></IconButton>
                </span>
              </Tooltip>
              {findByCC
                && (
                  <Tooltip arrow title="Find by CC" placement="top">
                    <IconButton className={classes.button} edge='start' color='secondary' onClick={findByCC}><FindIcon /></IconButton>
                  </Tooltip>
                )}
              <Tooltip arrow title="Refresh" placement="top">
                <span>
                  <IconButton className={classes.button} disabled={VALID_REFRESH_SCOPES.indexOf(scope) < 0} edge='start' color='secondary' onClick={doRefresh}><RefreshIcon /></IconButton>
                </span>
              </Tooltip>
              <ShowColumnPopper
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                scope={scope}
              />
            </>
          )}
      </Box>
      <Box>
        {children}
      </Box>
    </Box>

  );
};

export default TableActionsBar;

TableActionsBar.propTypes = {
  children: PropTypes.node,
  positionBottom: PropTypes.bool,
  scope: PropTypes.string,
  findByCC: PropTypes.func,
  deleteFunc: PropTypes.func,
  headers: PropTypes.array,
};
