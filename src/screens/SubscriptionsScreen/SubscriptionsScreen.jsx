import React, { useState } from 'react';

import TableComponent from '../../components/TableComponent';
import useTableData from '../../services/useData/useTableData';

import api from '../../api';
import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/subscriptions';

const SubscriptionsScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);

  const requests = async (filtersUrl) => {
    const res = await api.getSubscriptions(currentPage - 1, filtersUrl);

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
    <TableComponent
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={subscriptions}
      isLoading={isLoading}
      noActions
    />
  );
};

export default SubscriptionsScreen;
