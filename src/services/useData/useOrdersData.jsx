import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { generateData } from './tableMarkups/orders';
import api from '../../api';

const useOrdersData = (page, setLoading, makeUpdate) => {
  const [ordersData, setOrders] = useState();
  const tableScope = useSelector(({ tableData: { scope } }) => scope);
  const activeFilters = useSelector(({ tableData: { filters } }) => filters);

  useEffect(() => {
    let isCancelled = false;

    if (tableScope === 'orders') {
      setLoading(true);

      api
        .getOrders(page)
        .then(({ data }) => {
          if (!isCancelled) {
            const costumersId = data.items.map((item) => `id=${item.customer.id}`);

            api.getCustomersByIds(costumersId.join('&')).then((customers) => {
              const orders = generateData(data, customers.data);
              setOrders(orders);
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

    return () => { isCancelled = true; };
  }, [page, makeUpdate, tableScope, activeFilters]);

  return ordersData;
};

export default useOrdersData;
