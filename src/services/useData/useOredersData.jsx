import { useState, useEffect } from 'react';
import api from '../../api';
import { generateData } from './tableMarkups/orders';

const useOredersData = (page, setLoading, makeUpdate, setMakeUpdate) => {
  const [ordersData, setOrders] = useState();

  useEffect(() => {
    let isCancelled;
    if (makeUpdate) {
      isCancelled = false;

      setLoading(true);
      api
        .getOrders(page)
        .then(({ data }) => {
          if (!isCancelled) {
            const costumersId = data.items.map(
              (item) => `id=${item.customer.id}`,
            );
            api.getCustomersByIds(costumersId.join('&')).then((customers) => {
              const orders = generateData(data, customers.data);
              setOrders(orders);
              setMakeUpdate(false);
              setLoading(false);
            });
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

  return ordersData;
};

export default useOredersData;
