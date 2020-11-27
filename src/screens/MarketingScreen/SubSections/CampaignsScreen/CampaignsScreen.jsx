import React, { useState } from 'react';

import TableComponent from '../../../../components/TableComponent';

import {
  generateData,
  defaultShow,
} from '../../../../services/useData/tableMarkups/campaigns';
import { useTableData } from '../../../../services/useData';
import api from '../../../../api';

const CampaignsScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const requests = async (filtersUrl) => {
    const res = await api.getCampaigns(currentPage - 1, filtersUrl);
    return generateData(res.data);
  };

  const campaigns = useTableData(
    currentPage - 1,
    setLoading,
    false,
    'campaigns',
    requests,
  );

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={campaigns}
      isLoading={isLoading}
      noActions
    />
  );
};

export default CampaignsScreen;
