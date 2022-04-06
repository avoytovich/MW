import React, { useState } from 'react';

import api from '../../api';

import {
  generateData,
  defaultShow,
  markUp,
} from '../../services/useData/tableMarkups/realms';
import useTableData from '../../services/useData/useTableData';
import TableComponent from '../../components/TableComponent';
import TableActionsBar from '../../components/TableActionsBar';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const AuthenticationRealmsScreen = () => {
  const scope = 'realms';
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.realms),
  );

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getRealms({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.realms, params);
  };

  const realms = useTableData(
    setLoading,
    makeUpdate,
    'realms',
    requests,
    sortParams,
  );

  return (
    <>
      <TableActionsBar
        scope={scope}
        headers={markUp.headers}
      />
      <TableComponent
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        defaultShowColumn={defaultShow}
        scope={scope}
        tableData={realms}
        isLoading={isLoading}
        noEditDeleteActions
      />
    </>
  );
};

export default AuthenticationRealmsScreen;
