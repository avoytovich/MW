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

export default setCountriesOptions;
