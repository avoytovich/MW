import {
  REFRESH_TABLE,
  SET_TABLE_FILTERS,
  SET_TABLE_SCOPE,
  RESET_TABLE_FILTERS,
  RESET_TABLE_SEARCH,
  SET_TABLE_ROWS_PER_PAGE,
  SET_TABLE_CHECKED_ITEMS,
  SET_WAS_UPDATED,
  SET_TABLE_FILTER_VIEWS,
} from '../constants/actionTypes';

const rowsPerPage = JSON.parse(localStorage.getItem('rowsPerPage')) || '50';

const initialState = {
  scope: null,
  filters: {},
  filterViews: {},
  search: '',
  rowsPerPage,
  checkedItems: [],
  wasUpdated: false,
};

const TableData = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TABLE_SCOPE:
    case REFRESH_TABLE:
    case RESET_TABLE_FILTERS:
    case RESET_TABLE_SEARCH:
    case SET_TABLE_CHECKED_ITEMS:
    case SET_TABLE_ROWS_PER_PAGE:
    case SET_TABLE_FILTERS:
    case SET_TABLE_FILTER_VIEWS:
      return { ...state, ...payload };
    case SET_WAS_UPDATED:
      return { ...state, wasUpdated: !state.wasUpdated };
    default:
      return state;
  }
};

export default TableData;
