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
  const customerScope = useSelector(({
    account: { nexwayState },
  }) => nexwayState?.selectedCustomer?.id);

  const hasSearch = activeFilters.filter(
    (v) => Object.values(v)[0].type === 'text',
  ).length
    ? searchTerm
    : null;

  useEffect(() => {
    let isCancelled = false;

    if (tableScope === dataScope) {
      let filtersUrl = activeFilters.length
        ? generateFilterUrl(activeFilters, searchTerm)
        : '';

      if (customerScope) {
        filtersUrl += `&customerId=${customerScope}`;
      }

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
  }, [page, makeUpdate, tableScope, activeFilters, customerScope, hasSearch, sortParams]);

  return fetchedData;
};

export default useTableData;
