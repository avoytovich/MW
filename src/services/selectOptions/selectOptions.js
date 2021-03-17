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
  { value: 'DZD (Algerian Dinar)', id: 'DZD' },
  { value: 'EGP (Egyptian Pound)', id: 'EGP' },
  { value: 'EUR (Euro)', id: 'EUR' },
  { value: 'GBP (Pound Sterling)', id: 'GBP' },
  { value: 'HKD (Hong Kong Dollar)', id: 'HKD' },
  { value: 'IDR (Rupiah)', id: 'IDR' },
  { value: 'ILS (New Israeli Sheqel)', id: 'ILS' },
  { value: 'INR (Indian Rupee)', id: 'INR' },
  { value: 'JPY (Yen)', id: 'JPY' },
  { value: 'KES (Kenyan Shilling)', id: 'KES' },
  { value: 'KRW (Won)', id: 'KRW' },
  { value: 'MXN (Mexican Peso)', id: 'MXN' },
  { value: 'MYR(Malaysian Ringgit)', id: 'MYR' },
  { value: 'NAD (Namibia Dollar)', id: 'NAD' },
  { value: 'NGN (Naira)', id: 'NGN' },
  { value: 'NOK (Norwegian Krone)', id: 'NOK' },
  { value: 'NZD (New Zealand Dollar)', id: 'NZD' },
  { value: 'PEN (Sol)', id: 'PEN' },
  { value: 'PHP (Philippine Peso)', id: 'PHP' },
  { value: 'PLN (Zloty)', id: 'PLN' },
  { value: 'QAR (Qatari Rial)', id: 'QAR' },
  { value: 'USD (US Dollar)', id: 'USD' },
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

const orderCancelAction = [
  { id: 'CBA', value: 'CBA (Chargeback alert)' },
  { id: 'CHB', value: 'CHB (Chargeback)' },

  { id: 'DBL', value: 'DBL (Double order)' },
  { id: 'DIP', value: 'DIP (Disappointing product)' },
  { id: 'DIS', value: 'DIS (Disappointing service)' },
  { id: 'FRD', value: 'FRD (Fraud suspicion)' },
  { id: 'OCL', value: 'OCL (Order cancellation)' },
  { id: 'OOS', value: 'OOS (Out of stock)' },
  { id: 'PCR', value: "PCR (Partner's cancellation request)" },
  { id: 'PSE', value: 'PSE (Price subscription evolution)' },
  { id: 'PTI', value: 'PTI (Product technical issue)' },
  { id: 'SUB', value: 'SUB (Subscription Flexibility)' },
  { id: 'TCH', value: 'TCH (Technical issue)' },
  { id: 'TST', value: 'TST (Test)' },
  { id: 'UNT', value: 'UNT (Unsettled transactions)' },
  { id: 'UNW', value: 'UNT (Unwilling subscription)' },
  { id: 'VAT', value: 'VAT (VAT issue)' },
  { id: 'MRG', value: 'MRG (Wrong product choice)' },
]
const installmentOptions = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
  { id: 6, value: 6 },
  { id: 7, value: 7 },
  { id: 8, value: 8 },
  { id: 9, value: 9 },

];

const paymentDefaults = [
  { id: 'bank_transfer', value: 'Bank Transfer' },
  { id: 'cheque', value: 'Cheque' },
  { id: 'credit_card', value: 'Credit Card' },
  { id: 'directebanking', value: 'Directebanking' },
  { id: 'mistercash', value: 'Mistercash' },
  { id: 'bacs', value: 'Bacs' },
  { id: 'boleto', value: 'Boleto' },
  { id: 'giropay', value: 'Giropay' },
  { id: 'payPal', value: 'Pay Pal' },
  { id: 'sepa', value: 'Sepa' },
  { id: 'sofort', value: 'Sofort' },
  { id: 'trustly', value: 'Trustly' },
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
<<<<<<< HEAD
  orderCancelAction,
=======
  installmentOptions,
  paymentDefaults,
>>>>>>> master
};
