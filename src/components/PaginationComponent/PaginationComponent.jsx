/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Grid } from '@material-ui/core';

import localization from '../../localization';
import './PaginationComponent.scss';

// ToDo[major]: refactor this component
const PaginationComponent = ({
  updatePage,
  totalPages,
  currentPage,
  location,
}) => {
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
    (totalPages > 1
    && (
    <Grid className="paginationBlock">
      <Grid spacing={5} container justify={location} direction="row">
        {currentPage !== 1 && (
        <Grid item>
          <Typography color="secondary" onClick={() => updatePage(1)} className="firstPaginationPage">
            {localization.t('general.first')}
          </Typography>
        </Grid>
        )}
        <Grid item>
          <Grid spacing={3} container justify="center" direction="row" className="paginationNumbers">
            {pageNumbers.map((item) => (
              <Grid item key={`page ${item}`}>
                <Typography
                  color="secondary"
                  className={item === currentPage ? 'currentPage' : ''}
                  onClick={() => updatePage(item)}
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
            onClick={() => updatePage(totalPages)}
            className="lastPaginationPage"
          >
            {localization.t('general.last')}
          </Typography>
        </Grid>
        )}
        {pageNumbers[pageNumbers.length - 1] !== currentPage && (
        <Grid item>
          <Typography onClick={() => updatePage(currentPage + 1)} className="nextPaginationPage">
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
  currentPage: PropTypes.number,
  updatePage: PropTypes.func,
};

export default PaginationComponent;
