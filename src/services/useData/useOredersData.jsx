import { useState, useEffect } from 'react';
import api from '../../api';
import { generateData } from './tableMarkups/orders';

const useOredersData = (page, setLoading) => {
  const [ordersData, setOrders] = useState();

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    api
      .getOrders(page)
      .then(({ data }) => {
        const orders = generateData(data);
        setOrders(orders);
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

  return ordersData;
};

export default useOredersData;
