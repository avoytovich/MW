import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableComponent from '../../components/TableComponent';
import getProducts from '../../redux/actions/Products';

const ProductsScreen = () => {
  const products = useSelector((state) => state.products);
  console.log(products)
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProducts());
    };
    fetchData();
  }, []);

  return <TableComponent tableData={products} />;
};

export default ProductsScreen;
