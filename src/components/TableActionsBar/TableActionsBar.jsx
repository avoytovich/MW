import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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
} from '@material-ui/core';
import localization from '../../localization';
import { setRowsPerPage } from '../../redux/actions/TableData';
import ShowColumnPopper from './ShowColumnPopper';

const selectOptions = ['20', '50', '100', '200'];

const TableActionsBar = ({
  children, positionBottom, findByCC, scope,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const reduxRowPerPage = useSelector(({ tableData: { rowsPerPage } }) => rowsPerPage);

  return (
    <Box display="flex" className='test' alignItems='center' justifyContent='space-between' pb={3}>
      <Box display='flex' alignItems='center' py={2}>
        <Typography variant="subtitle2">{localization.t('general.rowsPerPage')}</Typography>
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
              <IconButton onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)} edge='start' aria-label='refresh' color='secondary'>
                <ViewColumnIcon />
              </IconButton>
              <IconButton edge='start' aria-label='refresh' color='secondary'><FilterListIcon /></IconButton>
              <IconButton edge='start' aria-label='refresh' color='secondary'><GetAppIcon /></IconButton>
              <IconButton edge='start' aria-label='refresh' color='secondary'><DeleteIcon /></IconButton>
              {findByCC && <IconButton edge='start' aria-label='refresh' color='secondary' onClick={findByCC}><FindIcon /></IconButton>}
              <IconButton edge='start' aria-label='refresh' color='secondary'><RefreshIcon /></IconButton>
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
};
