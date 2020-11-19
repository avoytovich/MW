import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import TableComponent from '../../components/TableComponent';
import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/adminCustomers';
import { useTableData } from '../../services/useData';
import api from '../../api';
import localization from '../../localization';

import { showNotification } from '../../redux/actions/HttpNotifications';

const AdministrationScreen = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const requests = async () => {
    const res = await api.getCustomers(currentPage - 1);
    return generateData(res.data);
  };
  const adminCustomers = useTableData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    'administration',
    requests,
  );
  const handleDeleteIdentity = (id) => api.deleteIdentityById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    dispatch(
      showNotification(
        `${localization.t('general.identity')} ${id} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`,
      ),
    );
  });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      handleDeleteItem={handleDeleteIdentity}
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={adminCustomers}
      isLoading={isLoading}
    />
  );
};

export default AdministrationScreen;
