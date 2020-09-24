/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import localization from '../../localization';

const PaginationComponent = ({ setCurrentPage, totalPages, currentPage }) => {
  const calculatePaginationNumbers = (condition = 0) => {
    let pluss;
    const toLeft = currentPage - 2;
    let min = condition;
    if (toLeft === -1) {
      min += currentPage;
      pluss = 4;
    } else if (toLeft === 0) {
      min = min + currentPage - 1;
      pluss = 3;
    } else {
      min = min + currentPage - 2;
      pluss = 2;
    }
    const toRoght = totalPages - (currentPage + pluss);
    const max = toRoght < 1 || toRoght === 0 ? totalPages : currentPage + pluss;
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
  const drawPagination = () => (
    <>
      {pageNumbers[0] !== 1 && (
        <Grid item>
          <Typography color="secondary">
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
        <>
          <Grid item>
            <Typography color="secondary">
              {localization.t('general.last')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>{localization.t('general.next')}</Typography>
          </Grid>
        </>
      )}
    </>
  );

  return (
    <Grid spacing={2} container justify="flex-end" direction="row">
      {drawPagination()}
    </Grid>
  );
};

PaginationComponent.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

export default PaginationComponent;
