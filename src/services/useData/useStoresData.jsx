import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { generateData } from './tableMarkups/stores';
import api from '../../api';

const useStoresData = (page, setLoading, makeUpdate) => {
  const [storesData, setStores] = useState();
  const tableScope = useSelector(({ tableData: { scope } }) => scope);
  const activeFilters = useSelector(({ tableData: { filters } }) => filters);

  useEffect(() => {
    let isCancelled = false;

    if (tableScope === 'stores') {
      setLoading(true);

      api
        .getStores(page)
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
  }, [page, makeUpdate, tableScope, activeFilters]);

  return storesData;
};

export default useStoresData;
