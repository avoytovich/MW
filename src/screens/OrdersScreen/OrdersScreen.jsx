import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { toast } from 'react-toastify';
import FindByCC from './FindByCC';
import TableComponent from '../../components/TableComponent';
import useTableData from '../../services/useData/useTableData';
import localization from '../../localization';
import api from '../../api';
import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/orders';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';
import TableActionsBar from '../../components/TableActionsBar';

const OrdersScreen = () => {
  const scope = 'orders';
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [findCCOpen, setFindCC] = useState(false);
  const [sortParams, setSortParams] = useState(getSortParams(sortKeys.orders));
  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.orders, params);
  };

  const requests = async (rowPerPage, filtersUrl) => {
    const costumersIds = [];
    const storeIds = [];
    const res = await api.getOrders({
      page: currentPage - 1,
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
    currentPage - 1,
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

  const updatePage = (page) => setCurrentPage(page);

  return (
    <Box pb={3}>
      <TableActionsBar
        scope={scope}
        findByCC={() => setFindCC(true)}
      />
      <TableComponent
        scope={scope}
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        handleDeleteItem={handleDeleteOrder}
        defaultShowColumn={defaultShow}
        currentPage={currentPage}
        updatePage={updatePage}
        tableData={orders}
        isLoading={isLoading}
      />

      <FindByCC onClose={() => setFindCC(false)} open={findCCOpen} />
    </Box>
  );
};

export default OrdersScreen;
