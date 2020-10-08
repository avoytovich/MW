import React, { useState } from 'react';

import useOrdersData from '../../services/useData/useOrdersData';
import { defaultShow } from '../../services/useData/tableMarkups/orders';

import api from '../../api';

import TableComponent from '../../components/TableComponent';

const OrdersScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const orders = useOrdersData(currentPage - 1, setLoading, makeUpdate);

  const handleDeleteOrder = (id) => api
    .deleteOrderById(id)
    .then(() => setMakeUpdate((v) => (v + 1)));

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      handleDeleteItem={handleDeleteOrder}
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={orders}
      isLoading={isLoading}
    />
  );
};

export default OrdersScreen;
