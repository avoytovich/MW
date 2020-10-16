// ToDo: refactor all useData to reuse common logic
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { generateData } from './tableMarkups/identities';
import { generateFilterUrl } from '../helpers/filters';
import api from '../../api';

const useIdentitiesData = (page, setLoading, makeUpdate) => {
  const [identitiesData, setIdentities] = useState();
  const tableScope = useSelector(({ tableData: { scope } }) => scope);
  const activeFilters = useSelector(({ tableData: { filters } }) => filters);
  const searchTerm = useSelector(({ tableData: { search } }) => search);
  const hasSearch = activeFilters.filter((v) => Object.values(v)[0].type === 'text').length ? searchTerm : null;

  useEffect(() => {
    let isCanceled = false;

    if (tableScope === 'identities') {
      const filtersUrl = activeFilters.length ? generateFilterUrl(activeFilters, searchTerm) : null;

      setLoading(true);

      api
        .getIdentities(page, filtersUrl)
        .then(({ data }) => {
          if (!isCanceled) {
            const identities = generateData(data);
            setIdentities(identities);
            setLoading(false);
          }
        })
        .catch(() => {
          if (!isCanceled) {
            setLoading(false);
          }
        });
    }

    return () => { isCanceled = true; };
  }, [page, makeUpdate, tableScope, activeFilters, hasSearch]);

  return identitiesData;
};

export default useIdentitiesData;
