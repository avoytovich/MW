const status = [
  { id: 'ENABLED', value: 'ENABLED' },
  { id: 'DISABLED', value: 'DISABLED' },
];
const orderDetailStatus = [
  { id: 'COMPLETED', value: 'COMPLETED' },
  { id: 'CREATED', value: 'CREATED' },
  { id: 'PAYMENT_PENDING', value: 'PAYMENT_PENDING' },
  { id: 'PREBILLING_FAILED', value: 'PREBILLING_FAILED' },
  { id: 'WAITING_FOR_PAYMENT', value: 'WAITING_FOR_PAYMENT' },
  { id: 'INVOICE_PENDING', value: 'INVOICE_PENDING' },
  { id: 'ENDUSER_PENDING', value: 'ENDUSER_PENDING' },
  { id: 'SUBSCRIPTION_PENDING', value: 'SUBSCRIPTION_PENDING' },
  { id: 'FULFILLMENT_PENDING', value: 'FULFILLMENT_PENDING' },
  { id: 'EMAILCONFIRMATION_PENDING', value: 'EMAILCONFIRMATION_PENDING' },
  { id: 'COMPLETED_WITH_ERROR', value: 'COMPLETED_WITH_ERROR' },
  { id: 'CANCEL_PENDING', value: 'CANCEL_PENDING' },
  { id: 'CANCELED_WITH_ERROR', value: 'CANCELED_WITH_ERROR' },
  { id: 'CANCELED', value: 'CANCELED' },
  { id: 'FORCE_COMPLETED', value: 'FORCE_COMPLETED' },
  { id: 'FORCE_CANCELED', value: 'FORCE_CANCELED' },
  { id: 'FORCE_ABORTED', value: 'FORCE_ABORTED' },
];

const type = [
  { id: 'SOFTWARE', value: 'SOFTWARE' },
  { id: 'GAMES', value: 'GAMES' },
  { id: 'CASUAL', value: 'CASUAL' },
  { id: 'SERVICE', value: 'SERVICE' },
  { id: 'B2B', value: 'B2B' },
  { id: 'B2C', value: 'B2C' },
];

const lifeTime = [
  { id: 'PERMANENT', value: 'PERMANENT' },
  { id: '7DAY', value: 'Weekly renewal' },
  { id: 'MONTH', value: 'Month(s)' },
  { id: 'YEAR', value: 'Year(s)' },
];

const storeDetailsCardText = [
  { id: 'logoStore', value: 'Logo' },
  { id: 'bannerInvoice', value: 'Invoice banner' },
  { id: 'bannerOrderConfEmail', value: 'Confirmation email banner' },
  { id: 'logoFavicon', value: 'Favicon' },
];

const validityPeriod = [
  { id: 'between', value: 'between' },
  { id: 'before', value: 'before' },
];

const availableLocales = [
  { value: 'ar-AE: Arabic (United Arab Emirates)', id: 'ar-AE' },
  { value: 'ar-DZ: Arabic (Algeria)', id: 'ar-DZ' },
  { value: 'ar-MA: Arabic (Morocco)', id: 'ar-MA' },
  { value: 'cs-CZ: Czech (Czech Republic)', id: 'cs-CZ' },
  { value: 'da-DK: Danish (Denmark)', id: 'da-DK' },
  { value: 'de-CH: German (Switzerland)', id: 'de-CH' },
  { value: 'de-DE: German (Germany)', id: 'de-DE' },
  { value: 'el-GR: Greek (Greece)', id: 'el-GR' },
  { value: 'en-AU: English (Australia)', id: 'en-AU' },
  { value: 'en-IL: English (Israel)', id: 'en-IL' },
  { value: 'en-US: English (United States)', id: 'en-US' },
  { value: 'es-ES: Spanish (Spain)', id: 'es-ES' },
  { value: 'fi-FI: Finnish (Finland)', id: 'fi-FI' },
  { value: 'fr-FR: French (France)', id: 'fr-FR' },
  { value: 'it-IT: Italian (Italy)', id: 'it-IT' },
  { value: 'ru-RU: Russian (Russia)', id: 'ru-RU' },
  { value: 'uk-UA: Ukrainian (Ukraine)', id: 'uk-UA' },
  { value: 'zh-CN: Chinese (China)', id: 'zh-CN' },
];

const priceCurrency = [
  { value: 'AED (UAE Dirham)', id: 'AED' },
  { value: 'ARS (Argentine Peso)', id: 'ARS' },
  { value: 'AUD (Australian Dollar)', id: 'AUD' },
  { value: 'BRL (Brazilian Real)', id: 'BRL' },
  { value: 'CAD (Canadian Dollar)', id: 'CAD' },
  { value: 'CHF (Swiss Frank)', id: 'CHF' },
  { value: 'CLP (Chilean Peso)', id: 'CLP' },
  { value: 'CNY (Yuan Renminbi)', id: 'CNY' },
  { value: 'COP (Colombian Peso)', id: 'COP' },
  { value: 'DKK (Danish Krone)', id: 'DKK' },
];
const businessSegment = [
  { value: 'B2B', id: 'B2B' },
  { value: 'B2C', id: 'B2C' },
];

const countryOptions = [
  { value: 'AD (Andora)', id: 'AD (Andora)' },
  { value: 'AE (United Arab Emirates)', id: 'AE (United Arab Emirates)' },
  { value: 'AF (Afganistan)', id: 'AF (Afganistan)' },
  { value: 'AG (Antigua and Barbuda)', id: 'AG (Antigua and Barbuda)' },
  { value: 'AI (Anguilla)', id: 'AI (Anguilla)' },
  { value: 'AL (Albania)', id: 'AL (Albania)' },
  { value: 'AM (Armenia)', id: 'AM (Armenia)' },
  { value: 'AO (Angola)', id: 'AO (Angola)' },
  { value: 'AQ (Antarctica)', id: 'AQ (Antarctica)' },
  { value: 'AR (Argentina)', id: 'AR (Argentina)' },
];

const defaultCurrency = [
  { id: '-', value: '-' },
  { id: 'AED', value: 'AED' },
  { id: 'AUD', value: 'AUD' },
];

const installmentOptions = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
];
export {
  validityPeriod,
  status,
  lifeTime,
  type,
  storeDetailsCardText,
  orderDetailStatus,
  availableLocales,
  businessSegment,
  priceCurrency,
  countryOptions,
  defaultCurrency,
  installmentOptions,
};
