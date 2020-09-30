import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TableComponent from '../../components/TableComponent';
import useProductsData from '../../services/useData/useProductsData';
import { defaultShow } from '../../services/useData/tableMarkups/products';
import api from '../../api';

const ProductsScreen = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [showColumn, setShowColumn] = useState(defaultShow);
  const [isLoading, setLoading] = useState(true);
  const products = useProductsData(
    currentPage - 1,
    setLoading,
    makeUpdate,
    setMakeUpdate,
  );
  const handleDeleteProduct = (id) => {
    api.deleteProductById(id).then(() => setMakeUpdate(true));
  };
  const updatePage = (page) => {
    setCurrentPage(page);
    setMakeUpdate(true);
  };
  return (
    <TableComponent
      handleDeleteItem={handleDeleteProduct}
      history={history}
      showColumn={showColumn}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={products}
      isLoading={isLoading}
    />
  );
};

export default ProductsScreen;
