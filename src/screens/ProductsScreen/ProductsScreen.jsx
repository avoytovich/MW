import React, { useState } from 'react';
import TableComponent from '../../components/TableComponent';
import useProductsData from '../../services/useData/useProductsData';
import { defaultShow } from '../../services/useData/tableMarkups/products';

const ProductsScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [showColumn, setShowColumn] = useState(defaultShow);
  const [isLoading, setLoading] = useState(true);
  const products = useProductsData(currentPage - 1, setLoading);

  return (
    <TableComponent
      showColumn={showColumn}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      tableData={products}
      isLoading={isLoading}
    />
  );
};

export default ProductsScreen;
