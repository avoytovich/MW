import React, { useState } from 'react';

import TableComponent from '../../../../components/TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../../services/useData/tableMarkups/campaigns';
import { useTableData } from '../../../../services/useData';
import api from '../../../../api';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../../../services/sorting';

const CampaignsScreen = () => {
  const scope = 'marketingCampaigns';
  const [isLoading, setLoading] = useState(false);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.campaigns),
  );

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getCampaigns({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.campaigns, params);
  };

  const campaigns = useTableData(
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
      tableData={campaigns}
      isLoading={isLoading}
      noActions
    />
  );
};

export default CampaignsScreen;
