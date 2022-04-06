import {
  SET_TABLE_SCOPE,
  REFRESH_TABLE,
  SET_TABLE_FILTERS,
  SET_TABLE_SEARCH,
  RESET_TABLE_FILTERS,
  SET_TABLE_FILTER_VIEWS,
  RESET_TABLE_SEARCH,
  SET_TABLE_ROWS_PER_PAGE,
  SET_TABLE_CHECKED_ITEMS_DATA,
  SET_WAS_UPDATED,
  SET_TABLE_CURRENT_PAGE,
  SET_TABLE_CUR_CHECKED_ITEMS_DATA,
} from '../constants/actionTypes';

const setTableScope = (scope) => {
  const storageFilters = localStorage.getItem('filters');
  const storageFilterViews = localStorage.getItem('filter-views');
  const storageSearch = localStorage.getItem('search');

  return ({
    type: SET_TABLE_SCOPE,
    payload: {
      scope,
      filters: storageFilters ? JSON.parse(storageFilters) : {},
      filterViews: storageFilterViews ? JSON.parse(storageFilterViews) : {},
      search: storageSearch ? JSON.parse(storageSearch) : {},
      checkedItems: [],
      currentPage: 1,
    },
  });
};

const refreshTable = (scope) => async (dispatch) => {
  await dispatch({ type: REFRESH_TABLE, payload: { scope: `${scope}_refreshing` } });
  dispatch({ type: REFRESH_TABLE, payload: { scope } });
};

const setFilters = (filters) => ({ type: SET_TABLE_FILTERS, payload: filters });

const setSearch = (search) => {
  localStorage.setItem('search', JSON.stringify(search));

  return ({ type: SET_TABLE_SEARCH, payload: search });
};

const setFilterViews = (views) => {
  localStorage.setItem('filter-views', JSON.stringify(views));

  return ({ type: SET_TABLE_FILTER_VIEWS, payload: { filterViews: views } });
};

const resetFilters = (scope) => {
  localStorage.setItem('filters', JSON.stringify({}));
  return ({ type: RESET_TABLE_FILTERS, payload: scope });
};

const resetSearch = () => {
  localStorage.setItem('search', JSON.stringify({}));
  return ({ type: RESET_TABLE_SEARCH, payload: { search: {} } });
};

const setCheckedItemsData = (checkedItemsData) => (
  { type: SET_TABLE_CHECKED_ITEMS_DATA, payload: { checkedItemsData } }
);

const setCurCheckedItemsData = (curCheckedItemsData) => (
  { type: SET_TABLE_CUR_CHECKED_ITEMS_DATA, payload: { curCheckedItemsData } }
);

const setRowsPerPage = (rowsPerPage) => {
  localStorage.setItem('rowsPerPage', JSON.stringify(rowsPerPage));
  return ({ type: SET_TABLE_ROWS_PER_PAGE, payload: { rowsPerPage, currentPage: 1 } }
  );
};

const setCurrentPage = (currentPage) => (
  { type: SET_TABLE_CURRENT_PAGE, payload: { currentPage } });

const setWasUpdated = () => ({ type: SET_WAS_UPDATED });

export {
  setTableScope,
  refreshTable,
  setFilters,
  setSearch,
  setFilterViews,
  resetFilters,
  resetSearch,
  setRowsPerPage,
  setCheckedItemsData,
  setWasUpdated,
  setCurrentPage,
  setCurCheckedItemsData,
};
