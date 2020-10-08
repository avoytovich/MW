import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { generateData } from './tableMarkups/products';
import api from '../../api';

const useProductsData = (page, setLoading, makeUpdate) => {
  const [productsData, setProducts] = useState();
  const tableScope = useSelector(({ tableData: { scope } }) => scope);
  const activeFilters = useSelector(({ tableData: { filters } }) => filters);

  useEffect(() => {
    let isCanceled = false;

    if (tableScope === 'products') {
      setLoading(true);

      api
        .getProducts(page, activeFilters)
        .then(({ data }) => {
          if (!isCanceled) {
            const products = generateData(data);
            setProducts(products);
            setLoading(false);
          }
        })
        .catch(() => {
          if (!isCanceled) {
            setLoading(false);
          }
        });
    }

    return () => { isCanceled = true; };
  }, [page, makeUpdate, tableScope, activeFilters]);

  return productsData;
};

export default useProductsData;
