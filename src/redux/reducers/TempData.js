/* eslint-disable no-param-reassign */
import {
  UPDATE_TEMP_STATE,
} from '../constants/actionTypes';

const initialState = {
  i18nFields: {},
  description: {},
  i18nFieldsReco: null,
  descriptionReco: null,
};

const TempData = (state = initialState, {
  type, payload,
}) => {
  switch (type) {
    case UPDATE_TEMP_STATE:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default TempData;
