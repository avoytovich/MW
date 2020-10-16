import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Grid,
  Box,
  Checkbox,
  LinearProgress,
} from '@material-ui/core';

import TableRowComponent from './TableRowComponent';
import TableItemsActions from './TableItemsActions';
import PaginationComponent from '../PaginationComponent';

import localization from '../../localization';

import './TableComponent.scss';

const TableComponent = ({
  tableData,
  updatePage,
  currentPage,
  isLoading,
  showColumn,
  handleDeleteItem,
}) => {
  const [checked, setChecked] = useState([]);

  const handleCheck = (item) => {
    let newChecked = [];

    const [isChecked] = checked.filter((v) => v.id === item.id);

    if (isChecked) {
      newChecked = [...checked].filter((v) => v.id !== item.id);
    } else {
      newChecked = [...checked, item];
    }

    setChecked(newChecked);
  };

  const handleCheckAll = () => {
    let newChecked = [];

    if (!checked.length) {
      newChecked = tableData?.values;
    }

    setChecked(newChecked);
  };

  if (isLoading) return <LinearProgress />;

  return tableData?.values?.length ? (
    <>
      <TableItemsActions items={checked} headers={tableData.headers} onDelete={handleDeleteItem} />

      <Grid
        spacing={1}
        container
        wrap="nowrap"
        justify="center"
        className="tableHeaderGrid"
      >
        <Grid>
          <Checkbox
            checked={tableData?.values.length === checked.length}
            name="checkAll"
            onChange={handleCheckAll}
          />
        </Grid>
        {tableData.headers.map(
          (header) => showColumn[header.id] && (
            <Grid item xs zeroMinWidth key={header.value}>
              <Box my={1}>
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
            handleDeleteItem={handleDeleteItem}
            checked={checked.filter((v) => v.id === rowItem.id).length > 0}
            handleCheck={handleCheck}
            markupSequence={tableData.headers}
            showColumn={showColumn}
            key={rowItem.id}
            rowItem={rowItem}
          />
        ))}
      </Box>
      <PaginationComponent
        location="flex-end"
        currentPage={currentPage}
        updatePage={updatePage}
        totalPages={tableData.meta?.totalPages}
      />
    </>
  ) : (
    <Typography>{localization.t('general.noResults')}</Typography>
  );
};

TableComponent.propTypes = {
  handleDeleteItem: PropTypes.func,
  tableData: PropTypes.object,
  updatePage: PropTypes.func,
  currentPage: PropTypes.number,
  isLoading: PropTypes.bool,
  showColumn: PropTypes.object,
};

export default TableComponent;
