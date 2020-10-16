// ToDo: refactor all useData to reuse common logic
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { generateData } from './tableMarkups/stores';
import { generateFilterUrl } from '../helpers/filters';
import api from '../../api';

const useStoresData = (page, setLoading, makeUpdate) => {
  const [storesData, setStores] = useState();
  const tableScope = useSelector(({ tableData: { scope } }) => scope);
  const activeFilters = useSelector(({ tableData: { filters } }) => filters);
  const searchTerm = useSelector(({ tableData: { search } }) => search);
  const hasSearch = activeFilters.filter((v) => Object.values(v)[0].type === 'text').length ? searchTerm : null;

  useEffect(() => {
    let isCancelled = false;

    if (tableScope === 'stores') {
      const filtersUrl = activeFilters.length ? generateFilterUrl(activeFilters, searchTerm) : null;

      setLoading(true);

      api
        .getStores(page, filtersUrl)
        .then(({ data }) => {
          if (!isCancelled) {
            const stores = generateData(data);
            setStores(stores);
            setLoading(false);
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

  return storesData;
};

export default useStoresData;
