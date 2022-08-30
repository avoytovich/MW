/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import {
  Typography, Grid, IconButton,
} from '@mui/material';
import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  KeyboardDoubleArrowRight,
  KeyboardDoubleArrowLeft,
} from '@mui/icons-material';
import { setCurrentPage } from '../../redux/actions/TableData';
import './PaginationComponent.scss';

// ToDo[major]: refactor this component
const PaginationComponent = ({
  totalPages,
  location,
  propCurrentPage,
  propSetCurrentPage,
  meta,
}) => {
  const dispatch = useDispatch();
  const tableRowsPerPage = useSelector(({ tableData: { rowsPerPage } }) => rowsPerPage);
  const currentPagination = propCurrentPage
    || useSelector(({ tableData: { currentPage } }) => currentPage);
  const calculatePaginationNumbers = (condition = 0) => {
    let plus;
    const toLeft = currentPagination - 1;
    let min = condition;
    if (toLeft === 0) {
      min = min + currentPagination - 1;
      plus = 2;
    } else if (totalPages === currentPagination) {
      min = totalPages - 2;
      plus = 0;
    } else if (totalPages < currentPagination) {
      dispatch(setCurrentPage(1));
    } else {
      min = min + currentPagination - 1;
      plus = 1;
    }
    const toRoght = totalPages - (currentPagination + plus);
    const max = toRoght < 1 || toRoght === 0 ? totalPages : currentPagination + plus;
    const res = [];
    for (let i = min; i <= max; i++) {
      if (i > 0) {
        res.push(i);
      }
    }

    let exitConditin = max - currentPagination;
    if (totalPages === currentPagination) {
      exitConditin = max - currentPagination + plus;
    }
    if (totalPages < currentPagination) {
      exitConditin = max;
    }
    return exitConditin < 2 && min > 1 && res.length < 3
      ? calculatePaginationNumbers(exitConditin === 0 && min > 2 ? -2 : -1)
      : res;
  };
  const pageNumbers = calculatePaginationNumbers();
  const handleSetCurrentPage = (newValue) => {
    if (propCurrentPage) {
      propSetCurrentPage(newValue);
    } else {
      dispatch(setCurrentPage(newValue));
    }
  };
  const calculateShoving = () => {
    const from = (currentPagination - 1) * tableRowsPerPage + 1;
    const till = tableRowsPerPage * currentPagination;
    return `${from} to ${till > meta?.totalItems ? meta?.totalItems : till}`;
  };

  return (
    <Grid container justifyContent='space-between'>
      <Grid item>
        <Grid container justifyContent={location} direction="row">
          <Grid item>
            <IconButton
              style={{ padding: 0 }}
              color='secondary'
              disabled={currentPagination === 1}
              onClick={() => handleSetCurrentPage(1)}
            >
              <KeyboardDoubleArrowLeft />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              color='secondary'
              style={{ padding: 0 }}
              disabled={currentPagination === 1}
              onClick={() => handleSetCurrentPage(currentPagination - 1)}
            >
              <KeyboardArrowLeft />
            </IconButton>
          </Grid>
          <Grid item>
            <Grid container justifyContent="center" direction="row" className="paginationNumbers">
              {pageNumbers.map((item) => (
                <Grid item key={`page ${item}`}>
                  <Typography
                    color="secondary"
                    className={item === currentPagination ? 'currentPage' : 'paginationNumber'}
                    onClick={() => handleSetCurrentPage(item)}
                  >
                    {item}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <IconButton
              color='secondary'
              style={{ padding: 0 }}
              disabled={currentPagination === totalPages}
              onClick={() => handleSetCurrentPage(currentPagination + 1)}
            >
              <KeyboardArrowRight />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              style={{ padding: 0 }}
              color='secondary'
              disabled={currentPagination === totalPages}
              onClick={() => handleSetCurrentPage(totalPages)}
            >
              <KeyboardDoubleArrowRight />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography color='secondary'>{`Showing ${calculateShoving()} of ${meta?.totalItems}`}</Typography>
      </Grid>
    </Grid>
  );
};

PaginationComponent.propTypes = {
  location: PropTypes.string,
  totalPages: PropTypes.number,
  propCurrentPage: PropTypes.number,
  propSetCurrentPage: PropTypes.func,
  meta: PropTypes.object,
};

export default PaginationComponent;
