import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import TableComponent from '../../components/TableComponent';
import useTableData from '../../services/useData/useTableData';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';

import api from '../../api';

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const orders = useTableData(currentPage - 1, setLoading, makeUpdate, 'orders');
  const handleDeleteOrder = (id) => api
    .deleteOrderById(id)
    .then(() => {
      setMakeUpdate((v) => (v + 1));
      dispatch(showNotification(`${localization.t('general.order')} ${id} ${localization.t('general.hasBeenSuccessfullyDeleted')}`));
    });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      handleDeleteItem={handleDeleteOrder}
      showColumn={orders?.defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={orders}
      isLoading={isLoading}
    />
  );
};

export default OrdersScreen;
