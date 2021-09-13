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
  refresh = false,
) => {
  const reduxRowPerPage = useSelector(({ tableData: { rowsPerPage } }) => rowsPerPage);
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
        && Object.values(activeFilters[dataScope]).length ? generateFilterUrl(activeFilters[dataScope]) : '';

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
    sortParams,
    reduxRowPerPage,
    reduxWasUpdated,
    refresh,
  ]);

  return fetchedData;
};

export default useTableData;
