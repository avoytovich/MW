/* eslint-disable no-param-reassign */
import {
  UPDATE_SESSION_STATE,
} from '../constants/actionTypes';

const initialState = {
  languages: [],
  countries: [],
};

const SessionData = (state = initialState, {
  type, payload,
}) => {
  switch (type) {
    case UPDATE_SESSION_STATE:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default SessionData;
