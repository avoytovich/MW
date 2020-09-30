import { useState, useEffect } from 'react';
import api from '../../api';
import generateData from './tableMarkups/productDetails';

const useProductDetailsData = (id, setLoading) => {
  const [productData, setProductData] = useState();

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    api
      .getProductById(id)
      .then(({ data }) => {
        if (!isCancelled) {
          const product = generateData(data);
          setProductData(product);
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
  }, []);

  return productData;
};

export default useProductDetailsData;
