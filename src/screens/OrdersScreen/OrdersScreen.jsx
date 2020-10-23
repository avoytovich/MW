import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import TableComponent from '../../components/TableComponent';
import useTableData from '../../services/useData/useTableData';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';
import api from '../../api';
import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/orders';

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const requests = async (filtersUrl) => {
    const costumersIds = [];
    const storeIds = [];
    const res = await api.getOrders(currentPage - 1, filtersUrl);
    res.data.items.forEach((item) => {
      const costumer = `id=${item.customer.id}`;
      const store = `id=${item.endUser?.storeId}`;
      if (!costumersIds.includes(costumer)) {
        costumersIds.push(costumer);
      }
      if (!storeIds.includes(store)) {
        storeIds.push(store);
      }
    });
    const customers = await api.getCustomersByIds(costumersIds.join('&'));
    const stores = await api.getStoresByIds(storeIds.join('&'));
    return generateData(res.data, customers.data, stores.data);
  };

  const orders = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    'orders',
    requests,
  );
  const handleDeleteOrder = (id) => api.deleteOrderById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    dispatch(
      showNotification(
        `${localization.t('general.order')} ${id} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`,
      ),
    );
  });

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
