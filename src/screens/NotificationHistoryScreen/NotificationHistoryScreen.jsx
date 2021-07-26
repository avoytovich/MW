import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { generateData, defaultShow } from '../../services/useData/tableMarkups/notificationHistory';
import { useTableData } from '../../services/useData';
import api from '../../api';
import TableComponent from '../../components/TableComponent';

const NotificationHistoryScreen = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortParams, setSortParams] = useState({ value: 'processingDate', type: 'desc' });
  const [makeUpdate, setMakeUpdate] = useState(false);
  const [error, SetError] = useState(null);

  const { selectedCustomer } = useSelector(({ account: { nexwayState } }) => nexwayState);

  const handleSetSortParams = (params) => setSortParams(params);

  const updatePage = (page) => setCurrentPage(page);

  const requests = async (rowsPerPage, filtersUrl) => {
    if (selectedCustomer.name) {
      try {
        const resNotificationHistory = await api.getNotificationHistory(
          currentPage - 1,
          filtersUrl,
          sortParams,
        );
        const arrNotificationHistoryDefinitionIds = resNotificationHistory.data.items.map(
          (item) => (item.notificationDefinitionId),
        );
        const strNotificationHistoryDefinitionIds = arrNotificationHistoryDefinitionIds.map((item) => `id=${item}`).join('&');
        const resNotificationDefinitionByIds = await api.getNotificationDefinitionByIds(
          strNotificationHistoryDefinitionIds,
        );
        resNotificationHistory.data.items.map(
          (item) => resNotificationDefinitionByIds.data.items.map(
            (each) => {
              if (each.id === item.notificationDefinitionId) {
                Object.assign(item, { customerName: selectedCustomer.name, eventName: each.name });
              }
            },
          ),
        );
        return generateData(Object.assign(resNotificationHistory.data));
      } catch (err) {
        SetError(err);
      }
    } else {
      try {
        const resNotificationHistory = await api.getNotificationHistory(
          currentPage - 1,
          filtersUrl,
          sortParams,
        );
        const arrNotificationHistoryDefinitionIds = resNotificationHistory.data.items.map(
          (item) => (item.notificationDefinitionId),
        );
        const strNotificationHistoryDefinitionIds = arrNotificationHistoryDefinitionIds.map((item) => `id=${item}`).join('&');
        const resNotificationDefinitionByIds = await api.getNotificationDefinitionByIds(
          strNotificationHistoryDefinitionIds,
        );
        resNotificationHistory.data.items.map(
          (item) => resNotificationDefinitionByIds.data.items.map(
            (each) => {
              if (each.id === item.notificationDefinitionId) {
                Object.assign(item, { eventName: each.name });
              }
            },
          ),
        );
        const arrNotificationHistoryСustomerIds = resNotificationHistory.data.items.map(
          (item) => (item.customerId),
        );
        const strNotificationHistoryСustomerIds = arrNotificationHistoryСustomerIds.map((item) => `id=${item}`).join('&');
        const resCustomersByIds = await api.getCustomersByIds(strNotificationHistoryСustomerIds);
        resNotificationHistory.data.items.map((item) => resCustomersByIds.data.items.map((each) => {
          if (each.id === item.customerId) {
            Object.assign(item, { customerName: each.name });
          }
        }));
        return generateData(Object.assign(resNotificationHistory.data));
      } catch (err) {
        SetError(err);
      }
    }
  };

  const notificationHistory = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    'notification-history',
    requests,
    sortParams,
  );

  return (
    <TableComponent
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      defaultShowColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={notificationHistory}
      isLoading={loading}
    />
  );
};

export default NotificationHistoryScreen;
