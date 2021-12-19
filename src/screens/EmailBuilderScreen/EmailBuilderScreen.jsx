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
  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.emailbuilder),
  );

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const storeIds = [];
    let stores = [];
    const res = await api.getEmailBuilder({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
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
    setLoading,
    null,
    scope,
    requests,
    sortParams,
  );

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
          tableData={emails}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default EmailBuilderScreen;
