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

import { setCheckedItems } from '../../redux/actions/TableData';
import setShowColumns from '../../redux/actions/ShowColumns';

import { adjustColumnsData, parsePath } from '../../services/helpers/dataGridHelper';

import './TableComponent.scss';

const TableComponent = ({
  allCheckedItems,
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
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const reduxCurrentPage = useSelector(({ tableData: { currentPage } }) => currentPage);
  const showColumn = useSelector(({ showColumns }) => showColumns[scope]);
  const tableCheckedItems = useSelector(({ tableData: { checkedItems } }) => checkedItems);

  const [sortModel, setSortModel] = useState(sortParams ? [sortParams] : []);

  if (!showColumn) {
    dispatch(setShowColumns({ [scope]: defaultShowColumn }));
  }

  const handleCheck = (item) => {
    let newChecked = [];

    const [isChecked] = tableCheckedItems.filter((v) => v.id === item);

    if (isChecked) {
      newChecked = [...tableCheckedItems].filter((v) => v.id !== item);
    } else {
      const [newItem] = tableData?.values?.filter((v) => v.id === item);
      newChecked = [...tableCheckedItems, newItem];
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

  useEffect(() => {
    if (allCheckedItems) {
      setCheckedItems(allCheckedItems[allCheckedItems.length - 1]);
    }
  }, []);

  useEffect(() => {
    if (!allCheckedItems) {
      dispatch(setCheckedItems([]));
    }
  }, [reduxCurrentPage]);

  useEffect(() => {
    if (sortParams) {
      setSortModel([{ field: sortParams?.value, sort: sortParams?.type }]);
    }
  }, [sortParams]);

  const curListCheckedItems = tableCheckedItems.length
    ? tableCheckedItems
      .filter((v) => !!tableData?.values?.find(({ id }) => id === v.id))
      .map((v) => v?.id) : [];

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
        onSortModelChange={([col]) => {
          if (col?.field && col?.sort) {
            setSortParams({ value: col?.field, type: col?.sort });
          }
        }}
        disableSelectionOnClick
        checkboxSelection={!noActions}
        isRowSelectable={() => !noActions}
        onSelectionModelChange={(model) => {
          if (tableData?.values?.length
            && (!model.length || model.length === tableData?.values?.length)) {
            handleCheckAll();
          } else if (model.length < curListCheckedItems.length) {
            const [changedItem] = curListCheckedItems.filter((it) => model.indexOf(it) < 0);

            handleCheck(changedItem);
          } else {
            handleCheck(model.pop());
          }
        }}
        selectionModel={curListCheckedItems}
        onRowClick={({ row }) => customPath !== 'disabled' && !tableCellLinks
          && history.push(customPath ? parsePath(customPath, row) : `${history.location.pathname}/${row.id}`)}
      />
    </Box>
  ) : (
    <Typography data-test='noResultsNotification'>{localization.t('general.noResults')}</Typography>
  );
};

TableComponent.propTypes = {
  allCheckedItems: PropTypes.array,
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
};

export default TableComponent;
