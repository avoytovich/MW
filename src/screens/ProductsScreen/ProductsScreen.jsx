import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableComponent from '../../components/TableComponent';
import getProducts from '../../redux/actions/Products';

const ProductsScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const fetchData = () => dispatch(getProducts(currentPage - 1));

  useEffect(() => {

    let isCancelled = false;
    fetchData()
      .then(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => { isCancelled = true; };
  }, []);

  return (
    <TableComponent
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      tableData={products}
      isLoading={isLoading}
      type="products"
    />
  );
};

export default ProductsScreen;
