import { useState, useEffect } from 'react';
import api from '../../api';
import { generateData } from './tableMarkups/products';

const useProductsData = (page, setLoading, makeUpdate, setMakeUpdate) => {
  const [productsData, setProducts] = useState();

  useEffect(() => {
    let isCancelled;
    if (makeUpdate) {
      isCancelled = false;
      setLoading(true);
      api
        .getProducts(page)
        .then(({ data }) => {
          if (!isCancelled) {
            const products = generateData(data);
            setProducts(products);
            setMakeUpdate(false);
            setLoading(false);
          }
        })
        .catch(() => {
          if (!isCancelled) {
            setLoading(false);
          }
        });
    }
    return () => {
      isCancelled = true;
    };
  }, [page, makeUpdate]);

  return productsData;
};

export default useProductsData;
