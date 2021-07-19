import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../redux/actions/HttpNotifications';
import localization from '../../../localization';
import TableComponent from '../../../components/TableComponent';
import api from '../../../api';

import { useTableData } from '../../../services/useData';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../../services/sorting';

const TabTable = ({ tabObject }) => {
  const dispatch = useDispatch();

  const {
    sortKey, generateData, request, deleteFunc, label, scope,
  } = tabObject;
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys[sortKey]),
  );
  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys[sortKey], params);
  };

  const handleDelete = (id) => {
    if (deleteFunc) {
      deleteFunc(id).then(() => {
        const localizedLabel = `labels.${label}`;
        setMakeUpdate((v) => v + 1);
        dispatch(
          showNotification(
            `${localization.t(localizedLabel)} ${id} ${localization.t(
              'general.hasBeenSuccessfullyDeleted',
            )}`,
          ),
        );
      });
    }
  };
  const requests = async (rowsPerPage, filtersUrl) => {
    const costumersIds = [];

    const customers = await api.getCustomersByIds(costumersIds.join('&'));

    const res = await request({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data, customers.data.items);
  };
  const data = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );
  const updatePage = (page) => setCurrentPage(page);
  return (
    <TableComponent
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      handleDeleteItem={handleDelete}
      showColumn={data?.defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={data}
      isLoading={isLoading}
    />
  );
};

TabTable.propTypes = {
  tabObject: PropTypes.object,
};

export default TabTable;
