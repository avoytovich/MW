import api from '../../api';
import { generateData as generateLocales, defaultShow as defaultShowlocales, markUp as markUplocales } from '../../services/useData/tableMarkups/locals';
import { generateData as generateCurrencies, defaultShow as defaultShowCurrencies, markUp as markCurrencies } from '../../services/useData/tableMarkups/currencies';
import { generateData as generateCountries, defaultShow as defaultShowCountries, markUp as markUpCountries } from '../../services/useData/tableMarkups/countries';
import localization from '../../localization';
import parentPaths from '../../services/paths';

const tabsData = [
  {
    label: 'currencies',
    path: parentPaths.referentialManager.currenciesTab,
    request: api.getCurrency,
    sortKey: 'currencies',
    generateData: generateCurrencies,
    defaultShow: defaultShowCurrencies,
    scope: 'currencies',
    headers: markCurrencies.headers,
    button: `${localization.t('general.add')} ${localization.t(
      'labels.currency',
    )}`,
    deleteFunc: api.deleteCurrencyById,
  },
  {
    label: 'locales',
    path: parentPaths.referentialManager.localesTab,
    request: api.getLocales,
    generateData: generateLocales,
    defaultShow: defaultShowlocales,
    sortKey: 'locales',
    scope: 'locales',
    headers: markUplocales.headers,
    button: `${localization.t('general.add')} ${localization.t(
      'labels.local',
    )}`,
    deleteFunc: api.deleteLocaleById,
  },
  {
    label: 'countries',
    path: parentPaths.referentialManager.countriesTab,
    button: `${localization.t('general.add')} ${localization.t(
      'labels.country',
    )}`,
    request: api.getCountry,
    sortKey: 'countries',
    generateData: generateCountries,
    defaultShow: defaultShowCountries,
    scope: 'countries',
    deleteFunc: api.deleteCountryById,
    headers: markUpCountries.headers,
  },
];

export default tabsData;
