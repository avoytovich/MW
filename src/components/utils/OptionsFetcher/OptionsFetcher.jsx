import { useDispatch, useSelector } from 'react-redux';
import api from '../../../api';
import { countriesOptionsFormatting, languagesOptionsFormatting } from '../../../services/helpers/dataStructuring';
import { setCountriesOptions, setLanguagesOptions } from '../../../redux/actions/SessionData';

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

export { getCountriesOptions, getLanguagesOptions };
