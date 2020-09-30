import { useState, useEffect } from 'react';
import api from '../../api';
import { generateData } from './tableMarkups/stores';

const useStoresData = (page, setLoading, makeUpdate, setMakeUpdate) => {
  const [storesData, setStores] = useState();

  useEffect(() => {
    let isCancelled;
    if (makeUpdate) {
      isCancelled = false;
      setLoading(true);
      api
        .getStores(page)
        .then(({ data }) => {
          if (!isCancelled) {
            const stores = generateData(data);
            setStores(stores);
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

  return storesData;
};

export default useStoresData;
