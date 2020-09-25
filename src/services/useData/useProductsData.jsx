import { useState, useEffect } from 'react';
import api from '../../api';
import { generateData } from './tableMarkups/products';

const useProductsData = (page, setLoading) => {
  const [productsData, setProducts] = useState();

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    api
      .getProducts(page)
      .then(({ data }) => {
        const products = generateData(data);
        setProducts(products);
        if (!isCancelled) {
          setLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [page]);

  return productsData;
};

export default useProductsData;
