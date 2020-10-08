import React, { useState } from 'react';

import useStoresData from '../../services/useData/useStoresData';
import { defaultShow } from '../../services/useData/tableMarkups/stores';

import api from '../../api';

import TableComponent from '../../components/TableComponent';

const StoresScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const stores = useStoresData(currentPage - 1, setLoading, makeUpdate);

  const handleDeleteStore = (id) => api
    .deleteStoreById(id)
    .then(() => setMakeUpdate((v) => (v + 1)));

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      handleDeleteItem={handleDeleteStore}
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={stores}
      isLoading={isLoading}
    />
  );
};

export default StoresScreen;
