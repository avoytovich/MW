import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(getSortParams(sortKeys.endusers));
  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.endusers, params);
  };

  const requests = async (rowsPerPage, filtersUrl) => {
    const res = await api.getEndUsers({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl, sortParams,
    });

    return generateData(res.data);
  };

  const endusers = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );

  const updatePage = (page) => setCurrentPage(page);

  return (
    <Box pb={3}>
      <TableActionsBar
        scope={scope}
        headers={markUp.headers}
      />
      <TableComponent
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        defaultShowColumn={defaultShow}
        currentPage={currentPage}
        updatePage={updatePage}
        scope={scope}
        tableData={endusers}
        isLoading={isLoading}
        noEditDeleteActions
        noActions
      />
    </Box>
  );
};

export default EndUsersScreen;
