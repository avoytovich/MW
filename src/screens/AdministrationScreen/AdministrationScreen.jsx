import React, { useState } from 'react';
import TableComponent from '../../components/TableComponent';
import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/adminCustomers';
import { useTableData } from '../../services/useData';
import api from '../../api';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const AdministrationScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.customerAdmin),
  );

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.customerAdmin, params);
  };

  const requests = async () => {
    const res = await api.getCustomers(currentPage - 1, sortParams);
    return generateData(res.data);
  };
  const adminCustomers = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    'administration',
    requests,
    sortParams,
  );
  const handleDeleteCustomer = () => {};

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      handleDeleteItem={handleDeleteCustomer}
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={adminCustomers}
      isLoading={isLoading}
    />
  );
};

export default AdministrationScreen;
