import {
  UPDATE_SESSION_STATE,
} from '../constants/actionTypes';

const setCountriesOptions = (newState) => (dispatch) => {
  dispatch({
    type: UPDATE_SESSION_STATE,
    payload: {
      countries: [...newState],
    },
  });
};
const setLanguagesOptions = (newState) => (dispatch) => {
  dispatch({
    type: UPDATE_SESSION_STATE,
    payload: {
      languages: [...newState],
    },
  });
};

export { setCountriesOptions, setLanguagesOptions };
