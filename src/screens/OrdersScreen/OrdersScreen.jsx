import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import FindByCC from './FindByCC';
import TableComponent from '../../components/TableComponent';
import useTableData from '../../services/useData/useTableData';
import localization from '../../localization';
import api from '../../api';
import useAllTablesItems from '../../services/customHooks/useAllTablesItems';
import {
  generateData,
  defaultShow,
  markUp,
} from '../../services/useData/tableMarkups/orders';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';
import TableActionsBar from '../../components/TableActionsBar';

const OrdersScreen = () => {
  const scope = 'orderlist';
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [findCCOpen, setFindCC] = useState(false);
  const [sortParams, setSortParams] = useState(getSortParams(sortKeys.orders));
  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.orders, params);
  };
  const [allCheckedItems, setAllCheckedItems] = useAllTablesItems();

  const requests = async (rowPerPage, reduxCurrentPage, filtersUrl) => {
    const costumersIds = [];
    const storeIds = [];
    const res = await api.getOrders({
      page: reduxCurrentPage,
      size: rowPerPage,
      filters: filtersUrl,
      sortParams,
    });
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
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
    defaultShow,
  );
  const handleDeleteOrder = (id) => api.deleteOrderById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.order')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  return (
    <>
      <TableActionsBar
        scope={scope}
        findByCC={() => setFindCC(true)}
        headers={markUp.headers}
      />

      <TableComponent
        allCheckedItems={allCheckedItems}
        scope={scope}
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        handleDeleteItem={handleDeleteOrder}
        defaultShowColumn={defaultShow}
        tableData={orders}
        isLoading={isLoading}
        noEditDeleteActions
        isOrders
      />

      <FindByCC onClose={() => setFindCC(false)} open={findCCOpen} />
    </>
  );
};

export default OrdersScreen;
