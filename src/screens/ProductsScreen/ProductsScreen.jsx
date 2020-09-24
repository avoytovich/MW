import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableComponent from '../../components/TableComponent';
import getProducts from '../../redux/actions/Products';

const ProductsScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const products = useSelector((state) => state.products);
  console.log(products);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProducts());
    };
    fetchData();
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
