/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import localization from '../../localization';

const PaginationComponent = ({ setCurrentPage, totalPages, currentPage }) => {
  const calculatePaginationNumbers = (condition = 0) => {
    let plus;
    const toLeft = currentPage - 2;
    let min = condition;
    if (toLeft === -1) {
      min += currentPage;
      plus = 4;
    } else if (toLeft === 0) {
      min = min + currentPage - 1;
      plus = 3;
    } else {
      min = min + currentPage - 2;
      plus = 2;
    }
    const toRoght = totalPages - (currentPage + plus);
    const max = toRoght < 1 || toRoght === 0 ? totalPages : currentPage + plus;
    const res = [];
    for (let i = min; i <= max; i++) {
      res.push(i);
    }
    const exitConditin = max - currentPage;
    return exitConditin < 2 && min > 1 && res.length < 5
      ? calculatePaginationNumbers(exitConditin === 0 && min > 2 ? -2 : -1)
      : res;
  };

  const pageNumbers = calculatePaginationNumbers();
  return (
    <Grid spacing={2} container justify="flex-end" direction="row">
      {pageNumbers[0] !== 1 && (
        <Grid item>
          <Typography color="secondary" onClick={() => setCurrentPage(1)}>
            {localization.t('general.first')}
          </Typography>
        </Grid>
      )}
      <Grid item>
        <Grid spacing={1} container justify="center" direction="row">
          {pageNumbers.map((item) => (
            <Grid item key={`page ${item}`}>
              <Typography
                color="secondary"
                className={item === currentPage ? 'currentPage' : ''}
                onClick={() => setCurrentPage(item)}
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
            color="secondary"
            onClick={() => setCurrentPage(totalPages)}
          >
            {localization.t('general.last')}
          </Typography>
        </Grid>
      )}
      {pageNumbers[pageNumbers.length - 1] !== currentPage && (
        <Grid item>
          <Typography onClick={() => setCurrentPage(currentPage + 1)}>
            {localization.t('general.next')}
          </Typography>
        </Grid>
      )}{' '}
    </Grid>
  );
};

PaginationComponent.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

export default PaginationComponent;
