import React, { useState } from 'react';

import useProductsData from '../../services/useData/useProductsData';
import { defaultShow } from '../../services/useData/tableMarkups/products';

import api from '../../api';

import TableComponent from '../../components/TableComponent';

const ProductsScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const products = useProductsData(currentPage - 1, setLoading, makeUpdate);

  const handleDeleteProduct = (id) => api
    .deleteProductById(id)
    .then(() => setMakeUpdate((v) => (v + 1)));

  const updatePage = (page) => setCurrentPage(page);

  return (
    <TableComponent
      handleDeleteItem={handleDeleteProduct}
      showColumn={defaultShow}
      currentPage={currentPage}
      updatePage={updatePage}
      tableData={products}
      isLoading={isLoading}
    />
  );
};

export default ProductsScreen;
