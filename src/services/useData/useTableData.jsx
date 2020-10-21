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
            const promiseArray = [];
            const costumersIds = [];
            const storeIds = [];

            data.items.forEach((item) => {
              const costumer = dataScope === 'orders'
                ? `id=${item.customer.id}`
                : `id=${item.customerId}`;
              if (!costumersIds.includes(costumer)) {
                costumersIds.push(costumer);
              }
              if (dataScope === 'orders') {
                storeIds.push(`id=${item.endUser?.storeId}`);
              }
            });
            promiseArray.push(api.getCustomersByIds(costumersIds.join('&')));
            if (dataScope === 'orders') {
              promiseArray.push(api.getStoresByIds(storeIds.join('&')));
            }
            Promise.all(promiseArray).then((values) => {
              if (!isCancelled) {
                const payload = tableMarkup[dataScope](data, values[0].data, values[1]?.data);
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
