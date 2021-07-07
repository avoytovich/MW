import {
  SET_TABLE_SCOPE,
  REFRESH_TABLE,
  SET_TABLE_FILTERS,
  RESET_TABLE_FILTERS,
  SET_TABLE_SEARCH,
  RESET_TABLE_SEARCH,
  SET_TABLE_ROWS_PER_PAGE,
} from '../constants/actionTypes';

const setTableScope = (scope) => ({
  type: SET_TABLE_SCOPE,
  payload: { scope, filters: [], search: '', rowsPerPage: 20 },
});

const refreshTable = (scope) => async (dispatch) => {
  await dispatch({ type: REFRESH_TABLE, payload: { scope: `${scope}_refreshing` } });
  dispatch({ type: REFRESH_TABLE, payload: { scope } });
};

const setFilters = (filters) => ({ type: SET_TABLE_FILTERS, payload: { filters } });

const resetFilters = () => ({ type: RESET_TABLE_FILTERS, payload: { filters: [] } });

const setSearch = (search) => ({ type: SET_TABLE_SEARCH, payload: { search } });

const resetSearch = () => ({ type: RESET_TABLE_SEARCH, payload: { search: '' } });

const setRowsPerPage = (rowsPerPage) => (
  { type: SET_TABLE_ROWS_PER_PAGE, payload: { rowsPerPage } }
);

export {
  setTableScope,
  refreshTable,
  setFilters,
  resetFilters,
  setSearch,
  resetSearch,
  setRowsPerPage,
};
