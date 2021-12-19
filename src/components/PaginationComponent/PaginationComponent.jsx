/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Typography, Grid } from '@material-ui/core';

import localization from '../../localization';
import { setCurrentPage } from '../../redux/actions/TableData';
import './PaginationComponent.scss';

// ToDo[major]: refactor this component
const PaginationComponent = ({
  totalPages,
  location,
}) => {
  const dispatch = useDispatch();

  const reduxCurrentPage = useSelector(({ tableData: { currentPage } }) => currentPage);
  const calculatePaginationNumbers = (condition = 0) => {
    let plus;
    const toLeft = reduxCurrentPage - 2;
    let min = condition;
    if (toLeft === -1) {
      min += reduxCurrentPage;
      plus = 4;
    } else if (toLeft === 0) {
      min = min + reduxCurrentPage - 1;
      plus = 3;
    } else {
      min = min + reduxCurrentPage - 2;
      plus = 2;
    }
    const toRoght = totalPages - (reduxCurrentPage + plus);
    const max = toRoght < 1 || toRoght === 0 ? totalPages : reduxCurrentPage + plus;
    const res = [];
    for (let i = min; i <= max; i++) {
      res.push(i);
    }
    const exitConditin = max - reduxCurrentPage;
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
            {pageNumbers?.[0] !== 1
              && (
                <Grid item>
                  <Typography
                    onClick={() => dispatch(setCurrentPage(1))}
                    className="lastPaginationPage"
                  >
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
                      className={item === reduxCurrentPage ? 'currentPage' : ''}
                      onClick={() => dispatch(setCurrentPage(item))}
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
                  onClick={() => dispatch(setCurrentPage(totalPages))}
                  className="lastPaginationPage"
                >
                  {localization.t('general.last')}
                </Typography>
              </Grid>
            )}
            {pageNumbers[pageNumbers.length - 1] !== reduxCurrentPage && (
              <Grid item>
                <Typography onClick={() => dispatch(setCurrentPage(reduxCurrentPage + 1))} className="nextPaginationPage">
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
};

export default PaginationComponent;
