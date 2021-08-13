import {
  SET_TABLE_SCOPE,
  REFRESH_TABLE,
  SET_TABLE_FILTERS,
  RESET_TABLE_FILTERS,
  SET_TABLE_SEARCH,
  RESET_TABLE_SEARCH,
  SET_TABLE_ROWS_PER_PAGE,
  SET_TABLE_CHECKED_ITEMS,
  SET_WAS_UPDATED,
} from '../constants/actionTypes';

const setTableScope = (scope) => ({
  type: SET_TABLE_SCOPE,
  payload: {
    scope,
    filters: [],
    search: '',
    checkedItems: [],
  },
});

const refreshTable = (scope) => async (dispatch) => {
  await dispatch({ type: REFRESH_TABLE, payload: { scope: `${scope}_refreshing` } });
  dispatch({ type: REFRESH_TABLE, payload: { scope } });
};

const setFilters = (filters) => ({ type: SET_TABLE_FILTERS, payload: { filters } })

const resetFilters = () => ({ type: RESET_TABLE_FILTERS, payload: { filters: [] } });

const setSearch = (search) => ({ type: SET_TABLE_SEARCH, payload: { search } });

const resetSearch = () => ({ type: RESET_TABLE_SEARCH, payload: { search: '' } });

const setCheckedItems = (checkedItems) => (
  { type: SET_TABLE_CHECKED_ITEMS, payload: { checkedItems } }
);

const setRowsPerPage = (rowsPerPage) => {
  localStorage.setItem('rowsPerPage', JSON.stringify(rowsPerPage));
  return ({ type: SET_TABLE_ROWS_PER_PAGE, payload: { rowsPerPage } }
  );
};

const setWasUpdated = () => ({ type: SET_WAS_UPDATED });

export {
  setTableScope,
  refreshTable,
  setFilters,
  resetFilters,
  setSearch,
  resetSearch,
  setRowsPerPage,
  setCheckedItems,
  setWasUpdated,
};
