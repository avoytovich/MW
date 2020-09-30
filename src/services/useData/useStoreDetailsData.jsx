import { useState, useEffect } from 'react';
import api from '../../api';

const useStoreDetailsData = (id, setLoading) => {
  const [storeData, setStoreData] = useState();

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    api
      .getStoreById(id)
      .then(({ data }) => {
        if (!isCancelled) {
          setStoreData(data);
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

  return storeData;
};

export default useStoreDetailsData;
