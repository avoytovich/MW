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
} from './utils';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';

const AuditsScreen = () => {
  const scope = 'audits';
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(getSortParams(sortKeys.audits));
  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.audits, params);
  };

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getAudits({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
    });

    return generateData(res.data);
  };

  const audits = useTableData(
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
        tableData={audits}
        isLoading={isLoading}
        noEditDeleteActions
        noActions
      />
    </>
  );
};

export default AuditsScreen;
