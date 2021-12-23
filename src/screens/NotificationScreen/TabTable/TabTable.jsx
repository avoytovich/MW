import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import localization from '../../../localization';
import TableComponent from '../../../components/TableComponent';
import api from '../../../api';

import { useTableData } from '../../../services/useData';
import useAllTablesItems from '../../../services/customHooks/useAllTablesItems';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../../services/sorting';

const TabTable = ({ tabObject, noEditDeleteActions = false }) => {
  const { selectedCustomer } = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    sortKey, generateData, request, deleteFunc, label, scope, defaultShow,
  } = tabObject;
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys[sortKey]),
  );
  const [allCheckedItems, setAllCheckedItems] = useAllTablesItems();
  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys[sortKey], params);
  };

  const handleDelete = (id) => {
    if (deleteFunc) {
      deleteFunc(id).then(() => {
        const localizedLabel = `labels.${label}`;
        setMakeUpdate((v) => v + 1);
        toast(
          `${localization.t(localizedLabel)} ${id} ${localization.t(
            'general.hasBeenSuccessfullyDeleted',
          )}`,
        );
      });
    }
  };
  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const costumersIds = [];

    const customers = await api.getCustomersByIds(costumersIds.join('&'));

    const res = await request({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data, customers.data.items, selectedCustomer);
  };
  const data = useTableData(
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );
  return (
    <TableComponent
      allCheckedItems={allCheckedItems}
      scope={scope}
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      noEditDeleteActions={noEditDeleteActions}
      handleDeleteItem={handleDelete}
      defaultShowColumn={defaultShow}
      tableData={data}
      isLoading={isLoading}
    />
  );
};

TabTable.propTypes = {
  tabObject: PropTypes.object,
  noEditDeleteActions: PropTypes.bool,
};

export default TabTable;
