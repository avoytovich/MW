import { useState, useEffect } from 'react';
import api from '../../api';
import generateData from './tableMarkups/orderDetails';

const useOrderDetailsScreen = (id, setLoading) => {
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    api
      .getOrderById(id)
      .then(({ data }) => {
        if (!isCancelled) {
          api.getCustomerById(data.customer.id).then((res) => {
            const order = generateData(data, res.data.name);
            setOrderData(order);
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

  return orderData;
};

export default useOrderDetailsScreen;
