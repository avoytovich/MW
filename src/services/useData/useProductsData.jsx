import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { generateData } from './tableMarkups/products';
import { generateFilterUrl } from '../helpers/filters';
import api from '../../api';

const useProductsData = (page, setLoading, makeUpdate) => {
  const [productsData, setProducts] = useState();
  const tableScope = useSelector(({ tableData: { scope } }) => scope);
  const activeFilters = useSelector(({ tableData: { filters } }) => filters);
  const searchTerm = useSelector(({ tableData: { search } }) => search);
  const hasSearch = activeFilters.filter((v) => Object.values(v)[0].type === 'text').length ? searchTerm : null;

  useEffect(() => {
    let isCanceled = false;

    if (tableScope === 'products') {
      const filtersUrl = activeFilters.length ? generateFilterUrl(activeFilters, searchTerm) : null;

      setLoading(true);

      api
        .getProducts(page, filtersUrl)
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
  }, [page, makeUpdate, tableScope, activeFilters, hasSearch]);

  return productsData;
};

export default useProductsData;
