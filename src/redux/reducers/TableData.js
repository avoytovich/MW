import {
  REFRESH_TABLE,
  SET_TABLE_FILTERS,
  SET_TABLE_SEARCH,
  SET_TABLE_SCOPE,
  RESET_TABLE_FILTERS,
  RESET_TABLE_SEARCH,
  SET_TABLE_ROWS_PER_PAGE,
  SET_TABLE_CHECKED_ITEMS_DATA,
  SET_WAS_UPDATED,
  SET_TABLE_FILTER_VIEWS,
  SET_TABLE_CURRENT_PAGE,
  SET_TABLE_CUR_CHECKED_ITEMS_DATA,
} from '../constants/actionTypes';

const rowsPerPage = JSON.parse(localStorage.getItem('rowsPerPage')) || '50';

const initialState = {
  scope: null,
  filters: {},
  filterViews: {},
  search: {},
  rowsPerPage,
  currentPage: 1,
  checkedItemsData: [],
  curCheckedItemsData: [],
  wasUpdated: false,
};

const TableData = (state = initialState, { type, payload }) => {
  let newFilters = {};
  switch (type) {
    case SET_TABLE_SCOPE:
    case REFRESH_TABLE:
    case RESET_TABLE_SEARCH:
    case SET_TABLE_CHECKED_ITEMS_DATA:
    case SET_TABLE_CUR_CHECKED_ITEMS_DATA:
    case SET_TABLE_ROWS_PER_PAGE:
    case SET_TABLE_CURRENT_PAGE:
    case SET_TABLE_FILTER_VIEWS:
      return { ...state, ...payload };
    case SET_TABLE_FILTERS:
      localStorage.setItem('filters', JSON.stringify({ ...state.filters, ...payload }));
      return { ...state, filters: { ...state.filters, ...payload } };
    case RESET_TABLE_FILTERS:
      if (payload) {
        newFilters = { ...state.filters };
        delete newFilters[payload];
      }
      localStorage.setItem('filters', JSON.stringify(newFilters));
      return { ...state, filters: newFilters };
    case SET_TABLE_SEARCH:
      return { ...state, search: { ...payload } };
    case SET_WAS_UPDATED:
      return { ...state, wasUpdated: !state.wasUpdated };
    default:
      return state;
  }
};

export default TableData;
