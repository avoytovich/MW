import {
  REFRESH_TABLE,
  SET_TABLE_FILTERS,
  SET_TABLE_SCOPE,
  RESET_TABLE_FILTERS,
  SET_TABLE_SEARCH,
  RESET_TABLE_SEARCH,
  SET_TABLE_ROWS_PER_PAGE,
} from '../constants/actionTypes';

const initialState = {
  scope: null,
  filters: [],
  search: '',
  rowsPerPage: '30',
};

const TableData = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TABLE_SCOPE:
    case REFRESH_TABLE:
    case SET_TABLE_FILTERS:
    case RESET_TABLE_FILTERS:
    case SET_TABLE_SEARCH:
    case RESET_TABLE_SEARCH:
    case SET_TABLE_ROWS_PER_PAGE:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default TableData;
