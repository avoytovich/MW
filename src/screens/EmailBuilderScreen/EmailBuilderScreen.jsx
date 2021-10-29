import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import TableActionsBar from '../../components/TableActionsBar';
import api from '../../api';
import TableComponent from '../../components/TableComponent';

import {
  markUp,
  generateData,
  defaultShow,
} from './utils';
import { useTableData } from '../../services/useData';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const EmailBuilderScreen = () => {
  const scope = 'emailbuilder';

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.emailbuilder),
  );

  const requests = async (rowsPerPage, filtersUrl) => {
    const storeIds = [];
    let stores = [];
    const res = await api.getEmailBuilder({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    res.data.items.forEach((item) => {
      if (item.storeId) {
        const store = `id=${item.storeId}`;
        if (!storeIds.includes(store)) {
          storeIds.push(store);
        }
      }
    });
    if (storeIds.length > 0) {
      const storesData = await api.getStoresByIds(storeIds.join('&'));
      stores = storesData.data.items;
    }
    return generateData(res.data, stores);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.emailbuilder, params);
  };

  const emails = useTableData(
    currentPage - 1,
    setLoading,
    null,
    scope,
    requests,
    sortParams,
  );

  const updatePage = (page) => setCurrentPage(page);
  return (
    <Box display='flex' flexDirection='column'>
      <TableActionsBar
        scope={scope}
        deleteFunc={api.deleteDiscountById}
        headers={markUp.headers}
      />
      <Box mt={4} mb={2}>
        <TableComponent
          scope={scope}
          noActions
          sortParams={sortParams}
          setSortParams={handleSetSortParams}
          defaultShowColumn={defaultShow}
          currentPage={currentPage}
          updatePage={updatePage}
          tableData={emails}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default EmailBuilderScreen;
