import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import TableComponent from '../../components/TableComponent';
import useTableData from '../../services/useData/useTableData';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';

import api from '../../api';

const StoresScreen = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const stores = useTableData(currentPage - 1, setLoading, makeUpdate, 'stores');

  const handleDeleteStore = (id) => api
    .deleteStoreById(id)
    .then(() => {
      setMakeUpdate((v) => (v + 1));
      dispatch(showNotification(`${localization.t('general.store')} ${id} ${localization.t('general.hasBeenSuccessfullyDeleted')}`));
    });

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      handleDeleteItem={handleDeleteStore}
      showColumn={stores?.defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={stores}
      isLoading={isLoading}
    />
  );
};

export default StoresScreen;
