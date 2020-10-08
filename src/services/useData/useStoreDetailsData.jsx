import { useState, useEffect } from 'react';
import api from '../../api';
import generateData from './tableMarkups/storeDetails';

const useStoreDetailsData = (id, setLoading) => {
  const [storeData, setStoreData] = useState();

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    api
      .getStoreById(id)
      .then(({ data }) => {
        if (!isCancelled) {
          api.getCustomerById(data.customerId).then((res) => {
            const store = generateData(data, res.data.name);
            setStoreData(store);
            setLoading(false);
          });
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
