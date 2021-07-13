import React, { useState } from 'react';

import TableComponent from '../../components/TableComponent';
import useTableData from '../../services/useData/useTableData';
import TableActionsBar from '../../components/TableActionsBar';
import api from '../../api';
import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/subscriptions';

const SubscriptionsScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);

  const requests = async (rowsPerPage, filtersUrl) => {
    const res = await api.getSubscriptions({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl,
    });

    return generateData(res.data);
  };

  const subscriptions = useTableData(
    currentPage - 1,
    setLoading,
    false,
    'subscriptions',
    requests,
  );

  const updatePage = (page) => setCurrentPage(page);

  return (
    <>
      <TableActionsBar />
      <TableComponent
        showColumn={defaultShow}
        currentPage={currentPage}
        updatePage={updatePage}
        tableData={subscriptions}
        isLoading={isLoading}
        noActions
      />
    </>
  );
};

export default SubscriptionsScreen;
