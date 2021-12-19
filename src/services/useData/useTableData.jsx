import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import generateFilterUrl from '../helpers/filters';
import availableFilters from './tableMarkups/filters';

const useTableData = (
  setLoading,
  makeUpdate,
  dataScope,
  requests,
  sortParams,
  refresh = false,
) => {
  const reduxRowPerPage = useSelector(({ tableData: { rowsPerPage } }) => rowsPerPage);
  const reduxCurrentPage = useSelector(({ tableData: { currentPage } }) => currentPage);
  const [fetchedData, setFetchedData] = useState();
  const reduxWasUpdated = useSelector(({ tableData: { wasUpdated } }) => wasUpdated);
  const tableScope = useSelector(({ tableData: { scope } }) => scope);
  const activeFilters = useSelector(({ tableData: { filters } }) => filters);
  const customerScope = useSelector(({
    account: { nexwayState },
  }) => nexwayState?.selectedCustomer?.id);

  useEffect(() => {
    let isCancelled = false;
    if (tableScope === dataScope || dataScope === 'generateCodes') {
      let filtersUrl = activeFilters && activeFilters[dataScope]
        && Object.values(activeFilters[dataScope]).length ? generateFilterUrl(activeFilters[dataScope], availableFilters[dataScope]) : '';

      if (customerScope) {
        filtersUrl += dataScope !== 'manualFulfillments' ? `&customerId=${customerScope}` : `&publisherId=${customerScope}`;
      }

      setLoading(true);
      requests(reduxRowPerPage, reduxCurrentPage - 1, filtersUrl)
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
    makeUpdate,
    tableScope,
    activeFilters,
    customerScope,
    sortParams,
    reduxRowPerPage,
    reduxWasUpdated,
    reduxCurrentPage,
    refresh,
  ]);

  return fetchedData;
};

export default useTableData;
