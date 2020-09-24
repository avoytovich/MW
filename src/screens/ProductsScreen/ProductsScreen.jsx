import React, { useState, useEffect } from 'react';
import TableComponent from '../../components/TableComponent';
import api from '../../api';

const ProductsScreen = () => {
  const [products, setProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    api.getProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <TableComponent
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      tableData={products}
      type="products"
    />
  );
};

export default ProductsScreen;
