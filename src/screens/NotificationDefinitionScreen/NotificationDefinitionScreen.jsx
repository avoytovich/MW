import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/notificationsDefinition';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';
import { useTableData } from '../../services/useData';
import api from '../../api';
import TableComponent from '../../components/TableComponent';

const NotificationDefinitionScreen = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortParams, setSortParams] = useState(
    { value: 'name', type: 'asc' },
  );
  const [makeUpdate, setMakeUpdate] = useState(false);

  const dispatch = useDispatch();

  const handleSetSortParams = (params) => {
    setSortParams(params);
  };

  const updatePage = (page) => setCurrentPage(page);

  const requests = async (rowsPerPage, filtersUrl) => {
    const res = await api.getNotificationDefinition({
      page: currentPage - 1, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data);
  };

  const notificationDefinition = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    'notification-definition',
    requests,
    sortParams,
  );

  const handleDeleteNotificationDefinition = (id) => {
    const ids = id.split(',');
    ids.forEach((item) => api.deleteNotificationDefinitionById(item)
      .then(() => {
        setMakeUpdate(true);
        dispatch(
          showNotification(
            `${localization.t('general.notificationDefinition')} ${item} ${localization.t(
              'general.hasBeenSuccessfullyDeleted',
            )}`,
          ),
        );
      })
      .catch((e) => {
        dispatch(
          showNotification(
            `${localization.t('general.notificationDefinition')} ${item} ${localization.t(
              'general.error',
            )} ${e}`,
          ),
        );
      })
      .finally(() => setMakeUpdate(false)));
  };

  return (
    <TableComponent
      sortParams={sortParams}
      setSortParams={handleSetSortParams}
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={notificationDefinition}
      handleDeleteItem={handleDeleteNotificationDefinition}
      isLoading={loading}
    />
  );
};

export default NotificationDefinitionScreen;
