import {
  SET_TABLE_SHOW_COLUMNS,
} from '../constants/actionTypes';

const setShowColumns = (showColumns) => ({ type: SET_TABLE_SHOW_COLUMNS, payload: showColumns });

export default setShowColumns;
