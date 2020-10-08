import {
  SET_TABLE_SCOPE,
  REFRESH_TABLE,
  SET_TABLE_FILTERS,
  RESET_TABLE_FILTERS,
} from '../constants/actionTypes';

const setTableScope = (scope) => ({ type: SET_TABLE_SCOPE, payload: { scope, filters: [] } });

const refreshTable = (scope) => async (dispatch) => {
  await dispatch({ type: REFRESH_TABLE, payload: { scope: `${scope}_refreshing` } });
  dispatch({ type: REFRESH_TABLE, payload: { scope } });
};

const setFilters = (filters) => ({ type: SET_TABLE_FILTERS, payload: { filters } });

const resetFilters = () => ({ type: RESET_TABLE_FILTERS, payload: { filters: [] } });

export {
  setTableScope,
  refreshTable,
  setFilters,
  resetFilters,
};
