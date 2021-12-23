import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Grid,
  Box,
  LinearProgress,
  Paper,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import setShowColumns from '../../redux/actions/ShowColumns';
import TableRowComponent from './TableRowComponent';
import localization from '../../localization';

import './TableComponentFailed.scss';

const TableComponentFailed = ({
  tableData,
  isLoading,
  errorHighlight,
  defaultShowColumn,
  scope,
  orderData,
}) => {
  const dispatch = useDispatch();
  const showColumn = useSelector(({ showColumns }) => showColumns[scope]);
  if (!showColumn) {
    dispatch(setShowColumns({ [scope]: defaultShowColumn }));
  }

  if (isLoading || !showColumn) return <LinearProgress />;

  return tableData?.values?.length ? (
    <>
      <Paper className='paper' elevation={1} style={{ maxHeight: 'auto' }}>
        <Grid
          container
          wrap="nowrap"
          justifyContent="center"
          className="tableHeaderGrid"
        >
          {tableData.headers.map(
            (header) => showColumn[header.id]
              && (
                <Grid key={header.value} className='headers'>
                  <Box>
                    <Typography
                      variant="h6"
                      className="tableHeader"
                      noWrap
                      align="center"
                    >
                      {header.value}
                    </Typography>
                  </Box>
                </Grid>
              ),
          )}
        </Grid>
        <Box className="tableBodyGrid">
          {tableData.values.map((rowItem) => (
            <TableRowComponent
              rowItem={rowItem}
              showColumn={showColumn}
              errorHighlight={errorHighlight}
              markupSequence={tableData.headers}
              orderData={orderData}
            />
          ))}
        </Box>
      </Paper>
    </>
  ) : (
    <Typography data-test='noResultsNotification'>{localization.t('general.noResults')}</Typography>
  );
};

TableComponentFailed.propTypes = {
  tableData: PropTypes.object,
  isLoading: PropTypes.bool,
  defaultShowColumn: PropTypes.object,
  errorHighlight: PropTypes.string,
  scope: PropTypes.string,
  orderData: PropTypes.array,
};

export default TableComponentFailed;
