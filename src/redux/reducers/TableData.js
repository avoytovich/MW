import {
  REFRESH_TABLE,
  SET_TABLE_FILTERS,
  SET_TABLE_SCOPE,
  RESET_TABLE_FILTERS,
} from '../constants/actionTypes';

const initialState = {
  scope: null,
  filters: [],
};

const TableData = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TABLE_SCOPE:
    case REFRESH_TABLE:
    case SET_TABLE_FILTERS:
    case RESET_TABLE_FILTERS:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default TableData;
