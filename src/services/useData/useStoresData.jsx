import { useState, useEffect } from 'react';
import api from '../../api';
import { generateData } from './tableMarkups/stores';

const useStoresData = (page, setLoading) => {
  const [storesData, setStores] = useState();

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    api
      .getStores(page)
      .then(({ data }) => {
        if (!isCancelled) {
          const stores = generateData(data);
          setStores(stores);
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

  return storesData;
};

export default useStoresData;
