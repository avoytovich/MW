import {
  SET_TABLE_SHOW_COLUMNS,
} from '../constants/actionTypes';

const savedShowColumns = JSON.parse(localStorage.getItem('showColumns')) || {};
const initialState = {
  ...savedShowColumns,
};

const ShowColumns = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TABLE_SHOW_COLUMNS:
      localStorage.setItem('showColumns', JSON.stringify({
        ...state,
        ...payload,
      }));
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default ShowColumns;
