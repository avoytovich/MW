// ToDo: refactor all useData to reuse common logic
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as tableMarkup from './tableMarkups';
import { generateFilterUrl } from '../helpers/filters';
import api from '../../api';

const useTableData = (page, setLoading, makeUpdate, dataScope) => {
  const [fetchedData, setFetchedData] = useState();
  const tableScope = useSelector(({ tableData: { scope } }) => scope);
  const activeFilters = useSelector(({ tableData: { filters } }) => filters);
  const searchTerm = useSelector(({ tableData: { search } }) => search);
  const hasSearch = activeFilters.filter(
    (v) => Object.values(v)[0].type === 'text',
  ).length
    ? searchTerm
    : null;

  useEffect(() => {
    let isCancelled = false;

    if (tableScope === dataScope) {
      const filtersUrl = activeFilters.length
        ? generateFilterUrl(activeFilters, searchTerm)
        : null;
      setLoading(true);

      api.get[dataScope](page, filtersUrl)
        .then(({ data }) => {
          if (!isCancelled) {
            const costumersId = [];
            data.items.forEach((item) => {
              const res = dataScope === 'orders'
                ? `id=${item.customer.id}`
                : `id=${item.customerId}`;
              if (!costumersId.includes(res)) {
                costumersId.push(res);
              }
            });
            api.getCustomersByIds(costumersId.join('&')).then((customers) => {
              if (!isCancelled) {
                const payload = tableMarkup[dataScope](data, customers.data);
                setFetchedData(payload);
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

    return () => {
      isCancelled = true;
    };
  }, [page, makeUpdate, tableScope, activeFilters, hasSearch]);

  return fetchedData;
};

export default useTableData;
