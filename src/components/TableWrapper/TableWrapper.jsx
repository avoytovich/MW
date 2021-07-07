import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Typography,
  Grid,
  Box,
  LinearProgress,
} from '@material-ui/core';
import { SelectCustom } from '../Inputs';
import { setRowsPerPage } from '../../redux/actions/TableData';

import PaginationComponent from '../PaginationComponent';

const TableWrapper = ({
  children,
  currentPage,
  updatePage,
  totalPages,
}) => {
  const dispatch = useDispatch();


  return (
    <Box>
      <Box>
        <Typography>Rows per page </Typography>
        <SelectCustom
          value={5}
          selectOptions={[{ value: 10, id: 10 }, { value: 20, id: 20 }]}
          onChangeSelect={(e) => {
            dispatch(setRowsPerPage(e.target.value));
          }}
        />
      </Box>
      {children}
      <Box>
        <PaginationComponent
          location="flex-end"
          currentPage={currentPage}
          updatePage={updatePage}
          totalPages={totalPages}
        />
      </Box>
    </Box>
  );
};

TableWrapper.propTypes = {
  children: PropTypes.node,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  updatePage: PropTypes.func,
};

export default TableWrapper;
