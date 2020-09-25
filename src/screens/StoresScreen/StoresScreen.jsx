import React, { useState } from 'react';
import useStoresData from '../../services/useData/useStoresData';
import TableComponent from '../../components/TableComponent';
import { defaultShow } from '../../services/useData/tableMarkups/stores';

const StoresScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [showColumn, setShowColumn] = useState(defaultShow);

  const [isLoading, setLoading] = useState(true);
  const stores = useStoresData(currentPage - 1, setLoading);
  return (
    <TableComponent
      showColumn={showColumn}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      tableData={stores}
      isLoading={isLoading}
    />
  );
};

export default StoresScreen;
