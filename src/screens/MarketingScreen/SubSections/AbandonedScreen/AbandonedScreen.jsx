import React, { useState } from 'react';

import TableComponent from '../../../../components/TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../../services/useData/tableMarkups/abandoned';
import { useTableData } from '../../../../services/useData';
import api from '../../../../api';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../../../services/sorting';

const AbandonedScreen = () => {
  const scope = 'abandoned';

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.abandoned),
  );

  const requests = async (rowsPerPage, filtersUrl) => {
    const res = await api.getAbandoned({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.abandoned, params);
  };

  const abandoned = useTableData(
    currentPage - 1,
    setLoading,
    false,
    scope,
    requests,
    sortParams,
  );

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      scope={scope}
      defaultShowColumn={defaultShow}
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={abandoned}
      isLoading={isLoading}
      noActions
    />
  );
};

export default AbandonedScreen;
