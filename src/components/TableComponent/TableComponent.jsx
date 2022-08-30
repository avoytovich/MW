import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import {
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';

import { DataGridPro } from '@mui/x-data-grid-pro';

import PaginationComponent from '../PaginationComponent';
import localization from '../../localization';

import { setCheckedItemsData, setCurrentPage, setCurCheckedItemsData } from '../../redux/actions/TableData';
import setShowColumns from '../../redux/actions/ShowColumns';

import { adjustColumnsData, parsePath } from '../../services/helpers/dataGridHelper';

import './TableComponent.scss';

const TableComponent = ({
  tableData,
  isLoading,
  handleDeleteItem,
  noActions,
  noEditDeleteActions,
  setSortParams,
  sortParams,
  customPath,
  errorHighlight,
  defaultShowColumn,
  withDeletePopup,
  scope,
  isOrders,
  orderData,
  wrapperStyles,
  tableCellLinks,
  isAutoHeight,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const reduxCurrentPage = useSelector(({ tableData: { currentPage } }) => currentPage);
  const showColumn = useSelector(({ showColumns }) => showColumns[scope]);
  const [curChecked, setCurChecked] = useState([]);
  const [allChecked, setAllChecked] = useState([]);

  const tableCheckedItemsData = useSelector((
    { tableData: { checkedItemsData } },
  ) => checkedItemsData);
  const tableCurCheckedItemsData = useSelector((
    { tableData: { curCheckedItemsData } },
  ) => curCheckedItemsData);
  const tableRowsPerPage = useSelector(({ tableData: { rowsPerPage } }) => rowsPerPage);
  const activeSearch = useSelector(({ tableData: { search } }) => search);
  const activeFilters = useSelector(({ tableData: { filters } }) => filters[[scope]]) || {};
  const [sortModel, setSortModel] = useState(sortParams ? [sortParams] : []);
  const handleCheck = (newSelectionModel) => {
    const newCurCheckedData = tableData.values?.filter((it) => newSelectionModel.includes(it.id));
    setCurChecked(newSelectionModel);
    dispatch(setCurCheckedItemsData(newCurCheckedData));
  };

  if (!showColumn) {
    dispatch(setShowColumns({ [scope]: defaultShowColumn }));
  }

  if ((!tableData?.values?.length && Object.keys(activeSearch).length)
    || (!tableData?.values?.length && Object.keys(activeFilters).length)) {
    dispatch(setCurrentPage(1));
  }
  useEffect(() => {
    if (tableCheckedItemsData.length === 0) {
      setCurChecked([]);
    }
  }, [tableCheckedItemsData]);

  useEffect(() => {
    const prevCheckedItems = [];
    const prevCheckedItemsData = [];

    tableData?.values.forEach((item) => {
      if (allChecked.includes(item.id)) {
        prevCheckedItems.push(item.id);
        prevCheckedItemsData.push(item);
      }
    });
    if (prevCheckedItems.length) {
      const newAll = allChecked.filter((it) => !prevCheckedItems.includes(it));
      const newCheckedData = tableCheckedItemsData.filter((
        (item) => newAll.includes(item.id)));
      setCurChecked([...prevCheckedItems]);
      dispatch(setCurCheckedItemsData([...prevCheckedItemsData]));
      setAllChecked([...newAll]);
      dispatch(setCheckedItemsData([...newCheckedData]));
    }
  }, [tableData?.values]);

  useEffect(() => {
    const res = allChecked.concat(curChecked);
    const resData = [...tableCheckedItemsData];
    tableCurCheckedItemsData.forEach((element) => {
      const sameItem = resData.find((it) => it.id === element.id);

      if (!sameItem) {
        resData.push(element);
      }
    });

    setAllChecked(res);
    dispatch(setCheckedItemsData(resData));
    setCurChecked([]);
    dispatch(setCurCheckedItemsData([]));
  }, [reduxCurrentPage, tableRowsPerPage]);

  useEffect(() => {
    setAllChecked([]);
    dispatch(setCheckedItemsData([]));
  }, [scope]);

  useEffect(() => {
    if (sortParams) {
      setSortModel([{ field: sortParams?.value, sort: sortParams?.type }]);
    }
  }, [sortParams]);

  if (isLoading || !showColumn) return <LinearProgress />;
  return tableData?.values?.length ? (
    <Box display='flex' flexDirection='column' flexGrow='1' pb={4} height={1} sx={wrapperStyles}>
      {tableData.meta?.totalPages > 1 && (
        <Box display='flex' mb={3}>
          <PaginationComponent
            location='flex-end'
            totalPages={tableData.meta?.totalPages}
          />
        </Box>
      )}

      <DataGridPro
        onSelectionModelChange={(newSelectionModel) => handleCheck(newSelectionModel)}
        selectionModel={curChecked}
        autoHeight={isAutoHeight}
        rows={tableData?.values}
        columns={adjustColumnsData(
          tableData?.headers,
          showColumn,
          noEditDeleteActions,
          handleDeleteItem,
          withDeletePopup,
          orderData,
          isOrders,
          errorHighlight,
          tableCellLinks,
        )}
        componentsProps={{ row: { style: { cursor: 'context-menu' } } }}
        hideFooter
        disableColumnMenu
        disableColumnFilter
        sortingOrder={['asc', 'desc']}
        sortModel={sortModel}
        sortingMode='server'
        onSortModelChange={([col]) => {
          if (col?.field && col?.sort) {
            setSortParams({ value: col?.field, type: col?.sort });
          }
        }}
        disableSelectionOnClick
        checkboxSelection={!noActions}
        isRowSelectable={() => !noActions}
        onRowClick={({ row }) => customPath !== 'disabled' && !tableCellLinks
          && history.push(customPath ? parsePath(customPath, row) : `${history.location.pathname}/${row.id}`)}
      />
    </Box>
  ) : (
    <Typography data-test='noResultsNotification'>{localization.t('general.noResults')}</Typography>
  );
};

TableComponent.propTypes = {
  withDeletePopup: PropTypes.bool,
  handleDeleteItem: PropTypes.func,
  tableData: PropTypes.object,
  isLoading: PropTypes.bool,
  defaultShowColumn: PropTypes.object,
  noActions: PropTypes.bool,
  noEditDeleteActions: PropTypes.bool,
  setSortParams: PropTypes.func,
  sortParams: PropTypes.object,
  customPath: PropTypes.string,
  errorHighlight: PropTypes.string,
  scope: PropTypes.string,
  isOrders: PropTypes.bool,
  orderData: PropTypes.array,
  wrapperStyles: PropTypes.any,
  tableCellLinks: PropTypes.array,
  isAutoHeight: PropTypes.bool,
};

export default TableComponent;
