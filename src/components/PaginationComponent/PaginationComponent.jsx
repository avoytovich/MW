/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Typography, Grid } from '@mui/material';

import localization from '../../localization';
import { setCurrentPage } from '../../redux/actions/TableData';
import './PaginationComponent.scss';

// ToDo[major]: refactor this component
const PaginationComponent = ({
  totalPages,
  location,
  propCurrentPage,
  propSetCurrentPage,
}) => {
  const dispatch = useDispatch();
  const currentPagination = propCurrentPage
    || useSelector(({ tableData: { currentPage } }) => currentPage);
  const calculatePaginationNumbers = (condition = 0) => {
    let plus;
    const toLeft = currentPagination - 2;
    let min = condition;
    if (toLeft === -1) {
      min += currentPagination;
      plus = 4;
    } else if (toLeft === 0) {
      min = min + currentPagination - 1;
      plus = 3;
    } else {
      min = min + currentPagination - 2;
      plus = 2;
    }
    const toRoght = totalPages - (currentPagination + plus);
    const max = toRoght < 1 || toRoght === 0 ? totalPages : currentPagination + plus;
    const res = [];
    for (let i = min; i <= max; i++) {
      res.push(i);
    }
    const exitConditin = max - currentPagination;
    return exitConditin < 2 && min > 1 && res.length < 5
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

  return (
    (totalPages > 1
      && (
        <Grid className="paginationBlock">
          <Grid spacing={5} container justifyContent={location} direction="row">
            {pageNumbers?.[0] !== 1
              && (
                <Grid item>
                  <Typography
                    onClick={() => handleSetCurrentPage(1)}
                    className="lastPaginationPage"
                  >
                    {localization.t('general.first')}
                  </Typography>
                </Grid>
              )}
            <Grid item>
              <Grid spacing={3} container justifyContent="center" direction="row" className="paginationNumbers">
                {pageNumbers.map((item) => (
                  <Grid item key={`page ${item}`}>
                    <Typography
                      color="secondary"
                      className={item === currentPagination ? 'currentPage' : ''}
                      onClick={() => handleSetCurrentPage(item)}
                    >
                      {item}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {pageNumbers[pageNumbers.length - 1] !== totalPages && (
              <Grid item>
                <Typography
                  onClick={() => handleSetCurrentPage(totalPages)}
                  className="lastPaginationPage"
                >
                  {localization.t('general.last')}
                </Typography>
              </Grid>
            )}
            {pageNumbers[pageNumbers.length - 1] !== currentPagination && (
              <Grid item>
                <Typography onClick={() => handleSetCurrentPage(currentPagination + 1)} className="nextPaginationPage">
                  {localization.t('general.next')}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      )
    )
  );
};

PaginationComponent.propTypes = {
  location: PropTypes.string,
  totalPages: PropTypes.number,
  propCurrentPage: PropTypes.number,
  propSetCurrentPage: PropTypes.func,
};

export default PaginationComponent;
