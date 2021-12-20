import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TableComponent from '../../components/TableComponent';
import TableActionsBar from '../../components/TableActionsBar';
import useTableData from '../../services/useData/useTableData';

import api from '../../api';
import {
  generateData,
  defaultShow,
  markUp,
} from '../../services/useData/tableMarkups/endUsers';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const EndUsersScreen = () => {
  const scope = 'enduserlist';
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(getSortParams(sortKeys.endusers));
  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.endusers, params);
  };

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getEndUsers({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
    });

    return generateData(res.data);
  };

  const endusers = useTableData(
    setLoading,
    makeUpdate,
    scope,
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
        tableData={endusers}
        isLoading={isLoading}
        noEditDeleteActions
        noActions
      />
    </>
  );
};

export default EndUsersScreen;
