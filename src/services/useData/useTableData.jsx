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
  const [fetchedData, setFetchedData] = useState(null);
  const reduxWasUpdated = useSelector(({ tableData: { wasUpdated } }) => wasUpdated);
  const tableScope = useSelector(({ tableData: { scope } }) => scope);
  const activeFilters = useSelector(({ tableData: { filters } }) => filters);
  const activeSearch = useSelector(({ tableData: { search } }) => search);

  const customerScope = useSelector(({
    account: { nexwayState },
  }) => nexwayState?.selectedCustomer?.id);
  useEffect(() => {
    let isCancelled = false;
    if (tableScope === dataScope || dataScope === 'generateCodes') {
      let searchRequest = '';
      if (Object.keys(activeSearch).length && activeSearch[dataScope] && Object.values(activeSearch[dataScope]).indexOf('') === -1) {
        const [key, val] = Object.entries(activeSearch[dataScope])[0];
        let searchVal = encodeURIComponent(val);
        searchVal = searchVal.replace(new RegExp("'", 'g'), "''");
        searchRequest = `&${key}=${searchVal}`;
      }
      let filtersUrl = activeFilters && activeFilters[dataScope]
        && Object.values(activeFilters[dataScope]).length ? generateFilterUrl(activeFilters[dataScope], availableFilters[dataScope]) : '';

      if (customerScope) {
        filtersUrl += dataScope !== 'manualFulfillments' ? `&customerId=${customerScope}` : `&publisherId=${customerScope}`;
        searchRequest += dataScope !== 'manualFulfillments' ? '' : `&publisherId=${customerScope}`;
      }

      setLoading(true);
      requests(
        reduxRowPerPage,
        reduxCurrentPage - 1,
        `${searchRequest}${filtersUrl}`,
      )
        .then((payload) => {
          if (!isCancelled) {
            if (searchRequest && !payload.values.length) {
              const [key, val] = Object.entries(activeSearch[dataScope])[1];
              let searchVal = encodeURIComponent(val);
              searchVal = searchVal.replace(new RegExp("'", 'g'), "''");
              searchRequest = `&${key}=*${searchVal}*`;
              if (customerScope) {
                searchRequest += dataScope !== 'manualFulfillments' ? `&customerId=${customerScope}` : `&publisherId=${customerScope}`;
              }
              return requests(
                reduxRowPerPage,
                reduxCurrentPage - 1,
                `${searchRequest}${filtersUrl}`,
              )
                .then((data) => {
                  if (!isCancelled) {
                    if (searchRequest.search('productGenericName') !== -1 && activeSearch[dataScope].genericName !== '') {
                      const searchPayload = {
                        headers: data.headers,
                        meta: {
                          totalPages: Math.ceil(
                            data.values.filter(
                              (each) => each.genericName === searchRequest.slice(searchRequest.indexOf('*') + 1, searchRequest.lastIndexOf('*')),
                            ).length / reduxRowPerPage,
                          ),
                        },
                        values: data.values.filter((each) => each.genericName.includes(searchRequest.slice(searchRequest.indexOf('*') + 1, searchRequest.lastIndexOf('*')))),
                      };
                      setFetchedData(searchPayload);
                    } else {
                      setFetchedData(data);
                    }
                  }
                  setLoading(false);
                })
                .catch(() => {
                  if (!isCancelled) {
                    setLoading(false);
                  }
                });
            }
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
    activeSearch,
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
