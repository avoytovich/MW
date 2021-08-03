/* eslint-disable global-require */
import i18n from 'i18n-js';
import getBrowserLocale from 'browser-locale';
import { en } from './localizations';

const DEFAULT_LOCALE = {
  name: 'en',
  messages: en,
};

const LOCALES = {
  en: {
    name: 'EN',
    key: 'en-US',
    isAvailable: true,
    messages: en,
  },
};

i18n.fallbacks = true;
i18n.defaultLocale = DEFAULT_LOCALE.name;
i18n.translations = { [DEFAULT_LOCALE.name]: DEFAULT_LOCALE.messages }; // default fallback messages

const getCurrentLocale = async () => {
  const localization = { locale: getBrowserLocale() };
  const prevLocalizationString = localStorage.getItem('USER_SELECTED_LOCALIZATION');
  const prevLocalization = prevLocalizationString ? JSON.parse(prevLocalizationString) : {};

  let selectedLocalization;

  if (Object.keys(prevLocalization).length) {
    selectedLocalization = prevLocalization;
  } else {
    selectedLocalization = localization;
  }

  return selectedLocalization.locale;
};

const getLocaleName = (localeKey) => {
  try {
    const localeItem = Object.values(LOCALES).find((item) => item.key === localeKey);
    return localeItem.name;
  } catch (ex) {
    return LOCALES[DEFAULT_LOCALE.name].name;
  }
};

const loadLocalization = async () => {
  /* Object.values(LOCALES).forEach((item) => {
    if (item.isAvailable) {
      i18n.translations[item.key] = item.messages;
    }
  });

  i18n.locale = await getCurrentLocale(); */
};

export default {
  t(...args) {
    return i18n.t(...args);
  },
  loadLocalization,
  getCurrentLocale,
  getDefaultLocale() {
    return DEFAULT_LOCALE;
  },
  getLocaleName,
  async changeLocale(nextLocale) {
    localStorage.setItem('USER_SELECTED_LOCALIZATION', JSON.stringify({
      locale: nextLocale,
    }));
    window.location.reload();
  },
  getAvailableLocales() {
    return Object.values(LOCALES).filter((item) => item.isAvailable);
  },
};
