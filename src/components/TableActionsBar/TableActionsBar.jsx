import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

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
  Popover,
} from '@material-ui/core';

import {
  setRowsPerPage,
  setCheckedItems,
  refreshTable,
  setWasUpdated,
} from '../../redux/actions/TableData';
import SectionHeader from '../SectionHeader';
import localization from '../../localization';
import ShowColumnPopper from './ShowColumnPopper';
import { VALID_REFRESH_SCOPES, VALID_FILTER_SCOPES } from '../../services/constants';

import DeletePopup from '../Popup/DeletePopup';
import TableFilters from '../utils/TableFilters';

const useStyles = makeStyles({
  button: {
    color: '#303030',
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
  children, positionBottom, findByCC, scope, deleteFunc, headers, handleDeleteItem, withDeletePopup,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showFilters, setShowFilters] = useState(null);
  const classes = useStyles();
  const csvLink = useRef();
  const dispatch = useDispatch();
  const doRefresh = () => dispatch(refreshTable(scope));
  const location = useLocation();
  const reduxRowPerPage = useSelector(({ tableData: { rowsPerPage } }) => rowsPerPage);
  const tableCheckedItems = useSelector(({ tableData: { checkedItems } }) => checkedItems);
  const csvHeaders = headers ? [...headers].map((header) => ({
    label: header.value,
    key: header.id,
  })) : [];

  const handleDeleteItems = () => {
    const promiseArray = tableCheckedItems.map((item) => handleDeleteItem(item.id));
    Promise.allSettled(promiseArray).then((res) => {
      if (res[0].status !== 'rejected') {
        toast(localization.t('general.updatesHaveBeenSaved'));
      }
      dispatch(setCheckedItems([]));
      dispatch(setWasUpdated());
    });
  };
  const formateData = (data) => {
    const res = data.map((item) => {
      const netItem = { ...item };
      if (netItem.createDate) {
        netItem.createDate = moment(netItem.createDate).format('D MMM YYYY');
      }
      if (netItem.updateDate) {
        netItem.updateDate = moment(netItem.updateDate).format('D MMM YYYY');
      }
      return netItem;
    });
    return res;
  };
  const filtersConfig = useSelector(({ tableData: { filters } }) => filters[scope]);
  const filtersCount = filtersConfig && Object.keys(filtersConfig).length;

  return (
    <>
      <SectionHeader pathname={location.pathname} />
      <Box display="flex" alignItems='center' justifyContent='space-between'>
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
                    <ViewColumnIcon color={anchorEl ? 'primary' : ''} />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow title="Filter" placement="top">
                  <IconButton
                    className={classes.button}
                    disabled={VALID_FILTER_SCOPES.indexOf(scope) < 0}
                    onClick={(e) => setShowFilters(e.currentTarget)}
                    edge='start'
                    aria-label='refresh'
                  >
                    <FilterListIcon color={showFilters ? 'primary' : ''} />
                    {filtersCount > 0 && (
                      <Box
                        position='absolute'
                        width='18px'
                        height='18px'
                        bgcolor='#4791db'
                        fontSize='12px'
                        color='#fff'
                        top='3px'
                        right='4px'
                        lineHeight='18px'
                        borderRadius='50%'
                      >
                        {filtersCount}
                      </Box>
                    )}
                  </IconButton>
                </Tooltip>
                <Popover
                  open={!!showFilters}
                  anchorEl={showFilters}
                  onClose={() => setShowFilters(null)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  style={{ marginLeft: '-15px' }}
                >
                  <TableFilters scope={scope} onClose={() => setShowFilters(null)} />
                </Popover>
                <CSVLink
                  onClick={(!headers || tableCheckedItems.length === 0)
                    ? (e) => e.preventDefault() : () => { }}
                  className="CSVLinkBlock"
                  data={formateData(tableCheckedItems)}
                  headers={csvHeaders}
                  ref={csvLink}
                  filename="table-export.csv"
                  target="_blank"
                />
                <Tooltip arrow title="Export" placement="top">
                  <IconButton onClick={() => csvLink.current.link.click()} disabled={!headers || tableCheckedItems.length === 0} className={classes.button} edge='start' color='secondary'><GetAppIcon /></IconButton>
                </Tooltip>
                {!withDeletePopup
                  && (
                  <IconButton disabled={!deleteFunc || tableCheckedItems.length === 0} onClick={handleDeleteItems} className={classes.button} edge='start' color='secondary'><DeleteIcon></DeleteIcon></IconButton>
                  )}
                {withDeletePopup
                  && (
                    <IconButton disabled={!deleteFunc || tableCheckedItems.length === 0} className={classes.button} edge='start' color='secondary'><DeletePopup  deleteFunc={handleDeleteItems}/></IconButton>
                  )}
                {findByCC
                  && (
                    <Tooltip arrow title="Find by CC" placement="top">
                      <IconButton className={classes.button} edge='start' color='secondary' onClick={findByCC}><FindIcon /></IconButton>
                    </Tooltip>
                  )}
                <Tooltip arrow title="Refresh" placement="top">
                  <IconButton className={classes.button} disabled={VALID_REFRESH_SCOPES.indexOf(scope) < 0} edge='start' color='secondary' onClick={doRefresh}><RefreshIcon /></IconButton>
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
    </>
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
  handleDeleteItem: PropTypes.func,
  withDeletePopup: PropTypes.bool,
};
