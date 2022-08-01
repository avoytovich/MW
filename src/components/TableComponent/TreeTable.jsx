import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import {
  Typography,
  Box,
  LinearProgress,
  Button,
} from '@mui/material';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import {
  DataGridPro,
  useGridApiContext,
  useGridSelector,
  GridEvents,
  gridFilteredDescendantCountLookupSelector,
} from '@mui/x-data-grid-pro';

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
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const reduxCurrentPage = useSelector(({ tableData: { currentPage } }) => currentPage);
  const showColumn = useSelector(({ showColumns }) => showColumns[scope]);
  const [curChecked, setCurChecked] = useState([]);
  const [allChecked, setAllChecked] = useState([]);
  const [collapse, setCollapse] = useState({});

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

  const CustomGridTreeDataGroupingCell = (props) => {
    const isNavigationKey = (key) => key === 'Home'
      || key === 'End'
      || key.indexOf('Arrow') === 0
      || key.indexOf('Page') === 0
      || key === ' ';

    const { id, field, rowNode } = props;
    const apiRef = useGridApiContext();
    const filteredDescendantCountLookup = useGridSelector(
      apiRef,
      gridFilteredDescendantCountLookupSelector,
    );

    const filteredDescendantCount = filteredDescendantCountLookup[rowNode.id] ?? 0;

    const handleKeyDown = (event) => {
      if (event.key === ' ') {
        event.stopPropagation();
      }
      if (isNavigationKey(event.key) && !event.shiftKey) {
        apiRef.current.publishEvent(GridEvents.cellNavigationKeyDown, props, event);
      }
    };

    const handleClick = (event) => {
      setCollapse({
        ...collapse,
        [id]: !rowNode.childrenExpanded,
      });
      apiRef.current.setCellFocus(id, field);
      event.stopPropagation();
    };

    useEffect(() => {
      apiRef.current.setRowChildrenExpansion(id, collapse[id]);
    }, [collapse]);

    return (
      <div>
        {filteredDescendantCount > 0 ? (
          <Button
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            size="small"
          >
            {!rowNode.childrenExpanded ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
            {filteredDescendantCount}
            {' '}
            {localization.t('labels.subProducts')}
            {filteredDescendantCount > 1 ? 's' : ''}
          </Button>
        ) : (
          <span />
        )}
      </div>
    );
  };

  CustomGridTreeDataGroupingCell.propTypes = {
    field: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    rowNode: PropTypes.any,
  };

  /* const curListCheckedItems = tableCheckedItems.length
    ? tableCheckedItems
      .filter((v) => !!tableData?.values?.find(({ id }) => id === v.id))
      .map((v) => v?.id) : []; */

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
        // defaultGroupingExpansionDepth={-1} - expand group items
        groupingColDef={{
          headerName: '',
          field: 'hierarchy',
          renderCell: (params) => <CustomGridTreeDataGroupingCell {...params} />,
          hide: !showColumn.hierarchy,
        }}
        treeData
        getTreeDataPath={(row) => row.hierarchy}
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
          const colField = col?.field;

          if (colField && col?.sort) {
            setSortParams({ value: colField, type: col?.sort });
          }
        }}
        disableSelectionOnClick
        checkboxSelection={!noActions}
        isRowSelectable={({ row }) => !noActions && row?.hierarchy?.length <= 1}
        onSelectionModelChange={(newSelectionModel) => handleCheck(newSelectionModel)}
        selectionModel={curChecked}
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
};

export default TableComponent;
