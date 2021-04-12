import React, { useState } from 'react';

import TableComponent from '../../../components/TableComponent';

import { useTableData } from '../../../services/useData';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../../services/sorting';

const TabTable = ({ sortKey, generateData, request, scope }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys[sortKey]),
  );

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys[sortKey], params);
  };

  const requests = async (filtersUrl) => {
    const res = await request(currentPage - 1, filtersUrl, sortParams);
    return generateData(res.data);
  };
  const data = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );
  const handleDelete = () => {};
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

export default TabTable;
