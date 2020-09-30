import React, { useState } from 'react';
import useOredersData from '../../services/useData/useOredersData';
import { defaultShow } from '../../services/useData/tableMarkups/orders';
import TableComponent from '../../components/TableComponent';
import api from '../../api';

const OrdersScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [showColumn, setShowColumn] = useState(defaultShow);
  const [isLoading, setLoading] = useState(true);
  const oreders = useOredersData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    setMakeUpdate,
  );
  const handleDeleteOrder = (id) => {
    api.deleteOrderById(id).then(() => setMakeUpdate(true));
  };
  const updatePage = (page) => {
    setCurrentPage(page);
    setMakeUpdate(true);
  };
  return (
    <TableComponent
      handleDeleteItem={handleDeleteOrder}
      showColumn={showColumn}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={oreders}
      isLoading={isLoading}
    />
  );
};

export default OrdersScreen;
