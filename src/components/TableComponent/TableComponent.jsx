import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Grid,
  Box,
  Checkbox,
  LinearProgress,
  Paper,
} from '@material-ui/core';

import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import { useSelector, useDispatch } from 'react-redux';
import { setCheckedItems } from '../../redux/actions/TableData';
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
  noTableActionsBar,
  noEditDeleteActions,
  setSortParams,
  sortParams,
  customPath,
  errorHighlight,
  defaultShowColumn,
  scope,

}) => {
  const dispatch = useDispatch();
  const showColumn = useSelector(({ showColumns }) => showColumns[scope]);
  const tableCheckedItems = useSelector(({ tableData: { checkedItems } }) => checkedItems);
  if (!showColumn) {
    dispatch(setShowColumns({ [scope]: defaultShowColumn }));
  }
  const handleCheck = (item) => {
    let newChecked = [];

    const [isChecked] = tableCheckedItems.filter((v) => v.id === item.id);

    if (isChecked) {
      newChecked = [...tableCheckedItems].filter((v) => v.id !== item.id);
    } else {
      newChecked = [...tableCheckedItems, item];
    }
    dispatch(setCheckedItems(newChecked));
  };

  const handleCheckAll = () => {
    let newChecked = [];

    if (!tableCheckedItems.length) {
      newChecked = tableData?.values;
    }

    dispatch(setCheckedItems(newChecked));
  };

  if (isLoading || !showColumn) return <LinearProgress />;

  return tableData?.values?.length ? (
    <>
      {/* {!noActions && (
        <TableItemsActions
          items={checkedItems}
          setItems={setChecked}
          headers={tableData.headers}
          onDelete={handleDeleteItem}
          noEditDeleteActions={noEditDeleteActions}
        />
      )} */}
      <Box display="flex" mb={3}>
        <PaginationComponent
          location="flex-end"
          currentPage={currentPage}
          updatePage={updatePage}
          totalPages={tableData.meta?.totalPages}
        />
      </Box>
      <Paper className='paper' elevation={1} style={{ maxHeight: 'auto' }}>
        <Grid
          spacing={2}
          container
          wrap="nowrap"
          justify="center"
          className="tableHeaderGrid"
        >
          {!noActions && (
            <Grid>
              <Checkbox
                checked={tableData?.values.length === tableCheckedItems.length}
                name="checkAll"
                color="primary"
                onChange={handleCheckAll}
              />
            </Grid>
          )}
          {tableData.headers.map(
            (header) => showColumn[header.id]
              && (header.sortParam ? (
                <Grid item xs zeroMinWidth key={header.value} className='headers'>
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
                      <div className='header-value'>
                        {header.value}
                      </div>
                      <div className='sort-icon-container'>
                        {sortParams?.value === header.sortParam && (sortParams.type === 'desc' ? <VerticalAlignTopIcon /> : <VerticalAlignBottomIcon />)}
                      </div>
                    </Typography>
                  </Box>
                </Grid>
              ) : (
                <Grid item xs zeroMinWidth key={header.value} className='headers'>
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
              checked={tableCheckedItems.filter((v) => v.id === rowItem.id).length > 0}
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
      {/* {!noTableActionsBar && (
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
      )} */}
    </>
  ) : (
    <Typography data-test='noResultsNotification'>{localization.t('general.noResults')}</Typography>
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
  noTableActionsBar: PropTypes.bool,
  noEditDeleteActions: PropTypes.bool,
  setSortParams: PropTypes.func,
  sortParams: PropTypes.object,
  customPath: PropTypes.string,
  errorHighlight: PropTypes.string,
  scope: PropTypes.string,
};

export default TableComponent;
