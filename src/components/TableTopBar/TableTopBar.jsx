import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ViewColumn as ViewColumnIcon,
  FilterList as FilterListIcon,
  GetApp as GetAppIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from '@material-ui/icons';
import {
  IconButton,
  Typography,
  Box,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { setRowsPerPage } from '../../redux/actions/TableData';

const selectOptions = ['30', '40', '50', '100'];

const TableTopBar = ({ children }) => {
  const dispatch = useDispatch();
  const reduxRowPerPage = useSelector(({ tableData: { rowsPerPage } }) => rowsPerPage);
  return (
    <Box display="flex" justifyContent="space-between" alignItems='center' pb={3}>
      <Box display='flex' alignItems='center' py={2}>
        <Typography>Rows per page </Typography>
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
        <IconButton edge='start' aria-label='refresh' color='secondary'>
          <ViewColumnIcon />
        </IconButton>
        <IconButton edge='start' aria-label='refresh' color='secondary'><FilterListIcon /></IconButton>
        <IconButton edge='start' aria-label='refresh' color='secondary'><GetAppIcon /></IconButton>
        <IconButton edge='start' aria-label='refresh' color='secondary'><DeleteIcon /></IconButton>
        <IconButton edge='start' aria-label='refresh' color='secondary'><RefreshIcon /></IconButton>
      </Box>
      {children}
    </Box>

  );
};

export default TableTopBar;

TableTopBar.propTypes = {
  children: PropTypes.node,
};
