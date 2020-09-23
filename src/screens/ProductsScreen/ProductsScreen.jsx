import React, { useState, useEffect } from 'react';
import TableComponent from '../../components/TableComponent';
import api from '../../api';

const ProductsScreen = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    api.getProducts().then((res) => setProducts(res.data));
  }, []);

  return <TableComponent tableData={products} type='products' />;
};

export default ProductsScreen;
