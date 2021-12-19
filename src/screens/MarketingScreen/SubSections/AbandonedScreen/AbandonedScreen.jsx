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
  const scope = 'marketingAbandoned';

  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.abandoned),
  );

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getAbandoned({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.abandoned, params);
  };

  const abandoned = useTableData(
    setLoading,
    false,
    scope,
    requests,
    sortParams,
  );

  return (
    <TableComponent
      scope={scope}
      defaultShowColumn={defaultShow}
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      tableData={abandoned}
      isLoading={isLoading}
      noActions
    />
  );
};

export default AbandonedScreen;
