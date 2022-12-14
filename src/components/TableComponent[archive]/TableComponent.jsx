import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Grid,
  Box,
  Checkbox,
  LinearProgress,
  Paper,
} from '@mui/material';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useSelector, useDispatch } from 'react-redux';
import { setCheckedItems } from '../../redux/actions/TableData';
import setShowColumns from '../../redux/actions/ShowColumns';
import TableRowComponent from './TableRowComponent';
import PaginationComponent from '../PaginationComponent';
import localization from '../../localization';

import './TableComponent.scss';

const TableComponent = ({
  allCheckedItems,
  tableData,
  updatePage,
  currentPage,
  isLoading,
  handleDeleteItem,
  noActions,
  noEditDeleteActions,
  noActionButtons,
  setSortParams,
  sortParams,
  customPath,
  errorHighlight,
  defaultShowColumn,
  withDeletePopup,
  scope,
  isOrders,
  orderData,
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

    if (allCheckedItems) {
      if (!tableCheckedItems.length || allCheckedItems[allCheckedItems.length - 1]) {
        newChecked = allCheckedItems[allCheckedItems.length - 1];
        const isTableDataIncludes = allCheckedItems[allCheckedItems.length - 1]
          .map((each) => each.id)
          .includes(tableData.values[0].id);
        if (isTableDataIncludes) {
          newChecked = allCheckedItems[allCheckedItems.length - 1]
            .filter((el) => !tableData.values.some((f) => f.id === el.id));
        } else {
          newChecked = [...allCheckedItems[allCheckedItems.length - 1], ...tableData?.values];
        }
      }
    } else if (!tableCheckedItems.length) {
      newChecked = tableData?.values;
    }

    dispatch(setCheckedItems(newChecked));
  };

  const isCheckedAll = () => tableData?.values
    ?.filter((el) => allCheckedItems?.[allCheckedItems.length - 1]
      .filter((item) => item.id === el.id).length === 1).length === tableData?.values.length;

  useEffect(() => {
    if (allCheckedItems) {
      setCheckedItems(allCheckedItems[allCheckedItems.length - 1]);
    }
  }, []);

  useEffect(() => {
    if (!allCheckedItems) {
      dispatch(setCheckedItems([]));
    }
  }, [currentPage]);

  if (isLoading || !showColumn) return <LinearProgress />;

  return tableData?.values?.length ? (
    <>
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
          container
          wrap="nowrap"
          justifyContent="center"
          className="tableHeaderGrid"
        >
          {!noActions && (
            <Grid>
              <Checkbox
                checked={allCheckedItems
                  ? isCheckedAll() : tableData?.values.length === tableCheckedItems.length}
                name="checkAll"
                color="primary"
                onChange={handleCheckAll}
                className='checkbox'
              />
            </Grid>
          )}
          {tableData.headers.map(
            (header) => showColumn[header.id]
              && (header.sortParam ? (
                <Grid xs={1} md={4} zeroMinWidth key={header.value} className='headers'>
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
                        {sortParams?.value === header.sortParam && (sortParams.type === 'desc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                      </div>
                    </Typography>
                  </Box>
                </Grid>
              ) : (
                <Grid xs={1} md={4} zeroMinWidth key={header.value} className='headers'>
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
          {!noActionButtons && <Grid xs={1} md={4} />}
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
              noActionButtons={noActionButtons}
              customPath={customPath}
              errorHighlight={errorHighlight}
              withDeletePopup={withDeletePopup}
              isOrders={isOrders}
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

TableComponent.propTypes = {
  allCheckedItems: PropTypes.array,
  withDeletePopup: PropTypes.bool,
  handleDeleteItem: PropTypes.func,
  tableData: PropTypes.object,
  updatePage: PropTypes.func,
  currentPage: PropTypes.number,
  isLoading: PropTypes.bool,
  defaultShowColumn: PropTypes.object,
  noActions: PropTypes.bool,
  noEditDeleteActions: PropTypes.bool,
  noActionButtons: PropTypes.bool,
  setSortParams: PropTypes.func,
  sortParams: PropTypes.object,
  customPath: PropTypes.string,
  errorHighlight: PropTypes.string,
  scope: PropTypes.string,
  isOrders: PropTypes.bool,
  orderData: PropTypes.array,
};

export default TableComponent;
