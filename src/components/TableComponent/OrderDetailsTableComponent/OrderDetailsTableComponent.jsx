import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Grid,
  Box,
  Checkbox,
  LinearProgress,
} from '@material-ui/core';

import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';

import OrderDetailsTableRowComponent from './OrderDetailsTableRowComponent';
import TableItemsActions from '../TableItemsActions';
import PaginationComponent from '../../PaginationComponent';

import localization from '../../../localization';

import './OrderDetailsTableComponent.scss';

const TableComponent = ({
  tableData,
  updatePage,
  currentPage,
  isLoading,
  showColumn,
  handleDeleteItem,
  noActions,
  setSortParams,
  sortParams,
  customPath,
  errorHighlight,
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
      {!noActions && (
        <TableItemsActions
          items={checked}
          setItems={setChecked}
          headers={tableData.headers}
          onDelete={handleDeleteItem}
        />
      )}

      <Grid
        container
        wrap="nowrap"
        justify="center"
        className="OrderDetailsTableHeaderGrid"
      >
        {!noActions && (
          <Grid>
            <Checkbox
              checked={tableData?.values.length === checked.length}
              name="checkAll"
              onChange={handleCheckAll}
            />
          </Grid>
        )}
        {tableData.headers.map(
          (header) => showColumn[header.id]
            && (header.sortParam ? (
              <Grid item xs zeroMinWidth key={header.value}>
                <Box
                  className='sortableHeader'
                  my={1}
                  onClick={() => {
                    let type;
                    if (sortParams) {
                      type = sortParams.type === 'desc' ? 'asc' : 'desc';
                    } else {
                      type = 'desc';
                    }
                    setSortParams({ value: header.sortParam, type });
                  }}
                >
                  <Typography
                    variant="h6"
                    className="tableHeader"
                    noWrap
                    align="center"
                  >
                    {header.value}
                    {sortParams?.value === header.sortParam && (sortParams.type === 'desc' ? <VerticalAlignTopIcon /> : <VerticalAlignBottomIcon />)}
                  </Typography>
                </Box>
              </Grid>
            ) : (
              <Grid item xs zeroMinWidth key={header.value}>
                <Box
                  display='flex'
                  height={1}
                >
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
            )),
        )}
      </Grid>

      <Box className="tableBodyGrid">
        {tableData.values.map((rowItem) => (
          <OrderDetailsTableRowComponent
            handleDeleteItem={handleDeleteItem}
            checked={checked.filter((v) => v.id === rowItem.id).length > 0}
            handleCheck={handleCheck}
            markupSequence={tableData.headers}
            showColumn={showColumn}
            key={rowItem.id}
            rowItem={rowItem}
            noActions={noActions}
            customPath={customPath}
            errorHighlight={errorHighlight}
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
  noActions: PropTypes.bool,
  setSortParams: PropTypes.func,
  sortParams: PropTypes.object,
  customPath: PropTypes.string,
  errorHighlight: PropTypes.string,
};

export default TableComponent;
