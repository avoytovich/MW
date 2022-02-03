import {
  UPDATE_TEMP_STATE,
} from '../constants/actionTypes';

const setTempProductLocales = (newState) => (dispatch) => {
  dispatch({
    type: UPDATE_TEMP_STATE,
    payload: { i18nFields: { ...newState } },
  });
};

const setTempProductDescription = (newState) => (dispatch) => {
  dispatch({
    type: UPDATE_TEMP_STATE,
    payload: { description: { ...newState } },
  });
};

export { setTempProductLocales, setTempProductDescription };
