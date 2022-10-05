import { useDispatch, useSelector } from 'react-redux';
import api from '../../../api';
import {
  countriesOptionsFormatting,
  languagesOptionsFormatting,
  legalEntitiesOptionsFormatting,
} from '../../../services/helpers/dataStructuring';
import {
  setCountriesOptions,
  setLanguagesOptions,
  setLegalEntityOptions,
} from '../../../redux/actions/SessionData';

const getCountriesOptions = () => {
  const dispatch = useDispatch();
  const countriesOptions = useSelector(({ sessionData: { countries } }) => countries);

  if (countriesOptions.length === 0) {
    api.getCountryOptions().then(({ data: { items } }) => {
      const counties = countriesOptionsFormatting(items);
      dispatch(setCountriesOptions(counties));
    });
  }
  return countriesOptions;
};

const getLanguagesOptions = () => {
  const dispatch = useDispatch();
  const languagesOptions = useSelector(({ sessionData: { languages } }) => languages);

  if (languagesOptions.length === 0) {
    api.getLocaleOptions().then(({ data: { items } }) => {
      const languages = languagesOptionsFormatting(items);
      dispatch(setLanguagesOptions(languages));
    });
  }
  return languagesOptions;
};

const getLegalEntitiesOptions = () => {
  const dispatch = useDispatch();
  const legalEntitiesOptions = useSelector(({ sessionData: { legalEntities } }) => legalEntities);

  if (legalEntitiesOptions.length === 0) {
    api.getLegalEntitiesOptions().then(({ data: { items } }) => {
      const legalEntities = legalEntitiesOptionsFormatting(items);
      dispatch(setLegalEntityOptions(legalEntities));
    });
  }
  return legalEntitiesOptions;
};

export { getCountriesOptions, getLanguagesOptions, getLegalEntitiesOptions };
