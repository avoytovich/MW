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
  const scope = 'subscriptions';
  const [isLoading, setLoading] = useState(true);

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getSubscriptions({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl,
    });

    return generateData(res.data);
  };

  const subscriptions = useTableData(
    setLoading,
    false,
    scope,
    requests,
  );

  return (
    <>
      <TableActionsBar
        scope={scope}
      />
      <TableComponent
        scope={scope}
        defaultShowColumn={defaultShow}
        tableData={subscriptions}
        isLoading={isLoading}
        noActions
      />
    </>
  );
};

export default SubscriptionsScreen;
