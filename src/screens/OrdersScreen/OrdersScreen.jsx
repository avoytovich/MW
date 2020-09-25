import React, { useState } from 'react';
import useOredersData from '../../services/useData/useOredersData';
import { defaultShow } from '../../services/useData/tableMarkups/orders';
import TableComponent from '../../components/TableComponent';

const OrdersScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [showColumn, setShowColumn] = useState(defaultShow);
  const [isLoading, setLoading] = useState(true);
  const oreders = useOredersData(currentPage - 1, setLoading);

  return (
    <TableComponent
      showColumn={showColumn}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      tableData={oreders}
      isLoading={isLoading}
    />
  );
};

export default OrdersScreen;
