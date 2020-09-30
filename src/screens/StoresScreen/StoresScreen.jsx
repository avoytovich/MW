import React, { useState } from 'react';
import useStoresData from '../../services/useData/useStoresData';
import TableComponent from '../../components/TableComponent';
import { defaultShow } from '../../services/useData/tableMarkups/stores';
import api from '../../api';

const StoresScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [showColumn, setShowColumn] = useState(defaultShow);

  const [isLoading, setLoading] = useState(true);
  const stores = useStoresData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    setMakeUpdate,
  );
  const handleDeleteStore = (id) => {
    api.deleteStoreById(id).then(() => setMakeUpdate(true));
  };
  const updatePage = (page) => {
    setCurrentPage(page);
    setMakeUpdate(true);
  };
  return (
    <TableComponent
      handleDeleteItem={handleDeleteStore}
      showColumn={showColumn}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={stores}
      isLoading={isLoading}
    />
  );
};

export default StoresScreen;
