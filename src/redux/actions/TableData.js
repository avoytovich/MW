import {
  SET_TABLE_SCOPE,
  REFRESH_TABLE,
  SET_TABLE_FILTERS,
  RESET_TABLE_FILTERS,
  SET_TABLE_FILTER_VIEWS,
  RESET_TABLE_SEARCH,
  SET_TABLE_ROWS_PER_PAGE,
  SET_TABLE_CHECKED_ITEMS,
  SET_WAS_UPDATED,
} from '../constants/actionTypes';

const setTableScope = (scope) => {
  const storageFilters = localStorage.getItem('filters');
  const storageFilterViews = localStorage.getItem('filter-views');

  return ({
    type: SET_TABLE_SCOPE,
    payload: {
      scope,
      filters: storageFilters ? JSON.parse(storageFilters) : {},
      filterViews: storageFilterViews ? JSON.parse(storageFilterViews) : {},
      search: '',
      checkedItems: [],
    },
  });
};

const refreshTable = (scope) => async (dispatch) => {
  await dispatch({ type: REFRESH_TABLE, payload: { scope: `${scope}_refreshing` } });
  dispatch({ type: REFRESH_TABLE, payload: { scope } });
};

const setFilters = (filters) => {
  localStorage.setItem('filters', JSON.stringify(filters));

  return ({ type: SET_TABLE_FILTERS, payload: { filters } });
};

const setFilterViews = (views) => {
  localStorage.setItem('filter-views', JSON.stringify(views));

  return ({ type: SET_TABLE_FILTER_VIEWS, payload: { filterViews: views } });
};

const resetFilters = () => ({ type: RESET_TABLE_FILTERS, payload: { filters: {} } });

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
  setFilterViews,
  resetFilters,
  resetSearch,
  setRowsPerPage,
  setCheckedItems,
  setWasUpdated,
};
