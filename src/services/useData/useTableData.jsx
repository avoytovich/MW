import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { generateFilterUrl } from '../helpers/filters';

const useTableData = (
  page,
  setLoading,
  makeUpdate,
  dataScope,
  requests,
  sortParams,
) => {
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

      requests(filtersUrl)
        .then((payload) => {
          if (!isCancelled) {
            setFetchedData(payload);
            setLoading(false);
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
  }, [page, makeUpdate, tableScope, activeFilters, hasSearch, sortParams]);

  return fetchedData;
};

export default useTableData;
