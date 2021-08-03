import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Grid,
  Box,
  Checkbox,
  LinearProgress,
  Paper,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import setShowColumns from '../../redux/actions/ShowColumns';
import TableRowComponent from './TableRowComponent';
import TableItemsActions from './TableItemsActions';
import PaginationComponent from '../PaginationComponent';
import TableActionsBar from '../TableActionsBar';
import localization from '../../localization';

import './TableComponent.scss';

const TableComponent = ({
  tableData,
  updatePage,
  currentPage,
  isLoading,
  handleDeleteItem,
  noActions,
  noEditDeleteActions,
  setSortParams,
  sortParams,
  customPath,
  errorHighlight,
  defaultShowColumn,
  scope,
}) => {
  const [checked, setChecked] = useState([]);
  const dispatch = useDispatch();
  const showColumn = useSelector(({ showColumns }) => showColumns[scope]);
  if (!showColumn) {
    dispatch(setShowColumns({ [scope]: defaultShowColumn }));
  }
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

  if (isLoading || !showColumn) return <LinearProgress />;

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
      <Paper elevation={1}>
        <Grid
          spacing={1}
          container
          wrap="nowrap"
          justify="center"
          className="tableHeaderGrid"
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
                    className={`sortableHeader ${
                      sortParams?.value === header.sortParam
                      && (sortParams.type === 'desc'
                        ? 'sortActiveDesc'
                        : 'sortActiveAsc')
                    }`}
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
                    </Typography>
                  </Box>
                </Grid>
              ) : (
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
              )),
          )}
          <Grid item xs />
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
              noActions={noActions}
              noEditDeleteActions={noEditDeleteActions}
              customPath={customPath}
              errorHighlight={errorHighlight}
            />
          ))}
        </Box>
      </Paper>
      <Box pt={2}>
        <TableActionsBar positionBottom>
          <PaginationComponent
            location="flex-end"
            currentPage={currentPage}
            updatePage={updatePage}
            totalPages={tableData.meta?.totalPages}
          />
        </TableActionsBar>
      </Box>
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
  defaultShowColumn: PropTypes.object,
  noActions: PropTypes.bool,
  noEditDeleteActions: PropTypes.bool,
  setSortParams: PropTypes.func,
  sortParams: PropTypes.object,
  customPath: PropTypes.string,
  errorHighlight: PropTypes.string,
  scope: PropTypes.string,
};

export default TableComponent;
