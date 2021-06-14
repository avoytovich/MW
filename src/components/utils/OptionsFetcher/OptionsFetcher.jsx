import { useDispatch, useSelector } from 'react-redux';
import api from '../../../api';
import { countiesOptionsFormatting } from '../../../services/helpers/dataStructuring';
import setCountriesOptions from '../../../redux/actions/SessionData';

const getCountriesOptions = () => {
  const dispatch = useDispatch();
  const countriesOptions = useSelector(({ sessionData: { countries } }) => countries);

  if (countriesOptions.length === 0) {
    api.getCountryOptions().then(({ data: { items } }) => {
      const counties = countiesOptionsFormatting(items);
      dispatch(setCountriesOptions(counties));
    });
  }
  return countriesOptions;
};

const getLanguagesOptions = () => {
  const dispatch = useDispatch();
  const countriesOptions = useSelector(({ sessionData: { countries } }) => countries);

  if (countriesOptions.length === 0) {
    api.getCountryOptions().then(({ data: { items } }) => {
      const counties = countiesOptionsFormatting(items);
      dispatch(setCountriesOptions(counties));
    });
  }
  return countriesOptions;
};

export { getCountriesOptions, getLanguagesOptions };
