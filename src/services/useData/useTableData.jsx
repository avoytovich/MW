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
  const reduxRowPerPage = useSelector(({ tableData: { rowsPerPage } }) => rowsPerPage);
  const [fetchedData, setFetchedData] = useState();
  const reduxWasUpdated = useSelector(({ tableData: { wasUpdated } }) => wasUpdated);
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
        filtersUrl += dataScope !== 'manualFulfillments' ? `&customerId=${customerScope}` : `&publisherId=${customerScope}`;
      }
      setLoading(true);
      requests(reduxRowPerPage, filtersUrl)
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
  }, [
    page,
    makeUpdate,
    tableScope,
    activeFilters,
    customerScope,
    hasSearch,
    sortParams,
    reduxRowPerPage,
    reduxWasUpdated,
  ]);

  return fetchedData;
};

export default useTableData;
