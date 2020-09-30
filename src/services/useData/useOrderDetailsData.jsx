import { useState, useEffect } from 'react';
import api from '../../api';

const useOrderDetailsScreen = (id, setLoading) => {
  const [orederData, setOrederData] = useState();

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    api
      .getOrderById(id)
      .then(({ data }) => {
        if (!isCancelled) {
          setOrederData(data);
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

  return orederData;
};

export default useOrderDetailsScreen;
