// ToDo: refactor all useData to reuse common logic
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { generateData } from './tableMarkups/orders';
import { generateFilterUrl } from '../helpers/filters';
import api from '../../api';

const useOrdersData = (page, setLoading, makeUpdate) => {
  const [ordersData, setOrders] = useState();
  const tableScope = useSelector(({ tableData: { scope } }) => scope);
  const activeFilters = useSelector(({ tableData: { filters } }) => filters);
  const searchTerm = useSelector(({ tableData: { search } }) => search);
  const hasSearch = activeFilters.filter((v) => Object.values(v)[0].type === 'text').length ? searchTerm : null;

  useEffect(() => {
    let isCancelled = false;

    if (tableScope === 'orders') {
      const filtersUrl = activeFilters.length ? generateFilterUrl(activeFilters, searchTerm) : null;

      setLoading(true);

      api
        .getOrders(page, filtersUrl)
        .then(({ data }) => {
          if (!isCancelled) {
            const costumersId = data.items.map((item) => `id=${item.customer.id}`);

            api
              .getCustomersByIds(costumersId.join('&'))
              .then((customers) => {
                if (!isCancelled) {
                  const orders = generateData(data, customers.data);
                  setOrders(orders);
                  setLoading(false);
                }
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
  }, [page, makeUpdate, tableScope, activeFilters, hasSearch]);

  return ordersData;
};

export default useOrdersData;
