import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeStyles } from '@mui/styles';
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
  CreditCard as CreditCardIcon,
} from '@mui/icons-material';

import {
  IconButton,
  Typography,
  Box,
  TextField,
  MenuItem,
  Tooltip,
  Popover,
} from '@mui/material';

import {
  setRowsPerPage,
  setCheckedItems,
  refreshTable,
  setWasUpdated,
} from '../../redux/actions/TableData';

import localization from '../../localization';
import ShowColumnPopper from './ShowColumnPopper';
import { VALID_REFRESH_SCOPES, VALID_FILTER_SCOPES, VALID_SEARCH_SCOPES } from '../../services/constants';
import defPath from '../../services/helpers/routingHelper';
import { searchData } from './helper';

import DeletePopup from '../Popup/DeletePopup';
import TableFilters from '../utils/TableFilters';
import CustomBreadcrumbs from '../utils/CustomBreadcrumbs';
import FilterBlock from '../utils/TableFilters/FilterBlock';

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
  children,
  positionBottom,
  findByCC,
  scope,
  deleteFunc,
  headers,
  handleDeleteItem,
  withDeletePopup,
  extraComponent,
  noActions,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showFilters, setShowFilters] = useState(null);
  const [curVal, setCurVal] = useState('');
  const classes = useStyles();
  const csvLink = useRef();
  const dispatch = useDispatch();
  const doRefresh = () => dispatch(refreshTable(scope));
  const location = useLocation();
  const sections = location.pathname.split(`/${defPath}/`)[0].split('/').slice(1);
  const reduxRowPerPage = useSelector(({ tableData: { rowsPerPage } }) => rowsPerPage);
  const tableCheckedItems = useSelector(({ tableData: { checkedItems } }) => checkedItems);
  const tableSearch = useSelector(({ tableData: { search } }) => search[scope]);
  const csvHeaders = headers ? [...headers].map((header) => ({
    label: header.value,
    key: header.id,
  })) : [];

  useEffect(() => {
    setCurVal(tableSearch?.id || '');
  }, [tableSearch]);

  const handleDeleteItems = () => {
    let promiseArray = [];
    if (handleDeleteItem) {
      promiseArray = tableCheckedItems.map((item) => handleDeleteItem(item.id));
    } else {
      promiseArray = tableCheckedItems.map((item) => deleteFunc(item.id));
    }
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
      <CustomBreadcrumbs
        sections={sections}
      />
      {extraComponent}
      {
        !noActions && (
          <Box display="flex" alignItems='center' justifyContent='space-between'>
            <Box display='flex' alignItems='center' py={2} flexGrow={1}>
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
                  <Box display='flex' flexGrow={1} justifyContent='space-between'>
                    <Box>
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
                      <Tooltip disableInteractive arrow title="Export" placement="top">
                        <IconButton
                          onClick={() => csvLink.current.link.click()}
                          disabled={!headers || tableCheckedItems.length === 0}
                          className={classes.button}
                          edge='start'
                          color='secondary'
                          size='large'
                        >
                          <GetAppIcon />
                        </IconButton>
                      </Tooltip>
                      {!withDeletePopup
                        && (
                          <IconButton
                            disabled={!deleteFunc || tableCheckedItems.length === 0}
                            onClick={handleDeleteItems}
                            className={classes.button}
                            edge='start'
                            color='secondary'
                            size='large'
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      {withDeletePopup
                        && (
                          <IconButton
                            disabled={!deleteFunc || tableCheckedItems.length === 0}
                            className={classes.button}
                            edge='start'
                            color='secondary'
                            size='large'
                          >
                            <DeletePopup deleteFunc={handleDeleteItems} />
                          </IconButton>
                        )}
                      {findByCC
                        && (
                          <Tooltip disableInteractive arrow title="Find by CC" placement="top">
                            <IconButton
                              className={classes.button}
                              edge='start'
                              color='secondary'
                              onClick={findByCC}
                              size='large'
                            >
                              <CreditCardIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                    </Box>

                    {VALID_SEARCH_SCOPES.includes(scope) && (
                      <Box display='flex' alignItems='center'>
                        <FilterBlock
                          search
                          scope={scope}
                          myBox='0px'
                          size='small'
                          curData={curVal}
                          updateConfig={(data, val) => setCurVal(val)}
                          data={searchData(scope)}
                        />
                      </Box>
                    )}

                    <Box>
                      <Tooltip disableInteractive arrow title="Show Columns" placement="top">
                        <IconButton
                          className={classes.button}
                          onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
                          edge='start'
                          aria-label='refresh'
                          size='large'
                        >
                          <ViewColumnIcon color={anchorEl ? 'primary' : ''} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip disableInteractive arrow title="Filter" placement="top">
                        <IconButton
                          className={classes.button}
                          disabled={VALID_FILTER_SCOPES.indexOf(scope) < 0}
                          onClick={(e) => setShowFilters(e.currentTarget)}
                          edge='start'
                          aria-label='refresh'
                          size='large'
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

                      <Tooltip disableInteractive arrow title="Refresh" placement="top">
                        <IconButton
                          className={classes.button}
                          disabled={VALID_REFRESH_SCOPES.indexOf(scope) < 0}
                          edge='start'
                          color='secondary'
                          onClick={doRefresh}
                          size='large'
                        >
                          <RefreshIcon />
                        </IconButton>
                      </Tooltip>

                      <ShowColumnPopper
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        scope={scope}
                      />
                    </Box>
                  </Box>
                )}
            </Box>
            <Box>
              {children}
            </Box>
          </Box>
        )
      }
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
  extraComponent: PropTypes.node,
  noActions: PropTypes.bool,
};
