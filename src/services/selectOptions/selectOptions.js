import currencies from 'currency-codes';
import localization from '../../localization';

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
  { id: 'SOFTWARE', value: 'Software' },
  { id: 'GAMES', value: 'Games' },
  { id: 'CASUAL', value: 'Casual' },
  { id: 'SERVICE', value: 'Service' },
  { id: 'B2B', value: 'B2B' },
  { id: 'B2C', value: 'B2C' },
];

const lifeTime = [
  { id: 'PERMANENT', value: 'Permanent' },
  { id: '7DAY', value: 'Weekly renewal' },
  { id: 'DAY', value: 'Day(s)' },
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

const codes = ['EUR', 'USD', 'GBP', 'AUD', 'CAD', 'BRL', 'CHF', 'JPY', 'NZD', 'NOK', 'DKK', 'SEK', 'INR', 'SGD', 'ARS', 'CLP', 'COP',
  'MXN', 'PEN', 'TRY', 'AED', 'SYP', 'QAR', 'EGP', 'ZAR', 'KES', 'NGN', 'NAD', 'THB', 'VND', 'ILS', 'DZD', 'XOF', 'TND', 'TWD', 'HKD',
  'SAR', 'KRW', 'PLN', 'MYR', 'PHP', 'IDR', 'CNY', 'RUB', 'RSD', 'RON', 'MDL', 'BGN', 'XAF', 'ISK', 'BYN', 'CZK', 'HUF', 'KZT', 'MAD', 'UAH'];

const getCurrency = () => codes.sort().map((code) => (
  {
    id: code,
    digits: currencies.code(code).digits,
    value: `${code} (${currencies.code(code).currency})`,
  }));

const businessSegment = [
  { value: 'B2B', id: 'B2B' },
  { value: 'B2C', id: 'B2C' },
  { value: 'STRICT B2B', id: 'STRICT_B2B' },
  { value: 'STRICT B2C', id: 'STRICT_B2C' },
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
];

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
const zipCodeStatusOptions = [
  { id: 'OPTIONAL', value: localization.t('labels.optional') },
  { id: 'MANDATORY', value: localization.t('labels.mandatory') },
  { id: 'VALID', value: localization.t('labels.valid') },
];
const paymentDefaults = [
  { id: 'bank_transfer', value: 'Bank Transfer' },
  { id: 'express_checkout', value: 'Express Сheckout' },
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

const paymentImages = {
  bank_transfer: '1VsLXXzQfUpHHAMGv774Y9QnIUDDh3lOq',
  cheque: '1k7ULP3GlkpV9KIZOCxMSRl-TZ-GktV_P',
  credit_card: '17wyp3j5qEhm9ELiNw1tmBPT2suUXMWN8',
  directebanking: '1fid0t5hghVbpzAs0lYBHn75YsiAjoqt3',
  mistercash: '1cc9BtGYBCg9-jIsV1s0ksvsjQokEkqr9',
  bacs: '1rg-dHgXWzHeFvNag-tMKAfoXU238Iaqc',
  boleto: '1NViBmvLxrPHlPKMTlVEvhf1MKiUr5d5T',
  giropay: '1FfIf8XNpxjNJnTBgvWRf5AHOOSvqibrq',
  payPal: '1MiJDC4ZEFIwGdlnQmhUcDjcP689XQSYt',
  sepa: '1XvlfrZ-ZjK2inoZw97M-vrMotm2Gx5A1',
  sofort: '1WEG1ncM1Q68x1x_QhIVKyjIqzIJ39AlF',
  trustly: '1eiROm7Sjb-SO3-Ce1Vuhc1dUP3_7wcbI',
};

const serviceConfigs = [
  { id: 'KL', value: 'kaspersky-led [No endpoint configured]' },
  { id: 'ED', value: 'eset-dexter', configName: 'dexter' },
  { id: 'PL', value: 'iap-pageview-logger [No endpoint configured]' },
  { id: 'KP', value: 'kaspersky-proxy', configName: 'kaspersky-proxy' },
  { id: 'TA', value: 'tandc [No endpoint configured]' },
  { id: 'OG', value: 'order-sg', configName: 'ordersgs' },
  { id: 'CS', value: 'customer service [No endpoint configured]' },
  { id: 'IO', value: 'iap-onboarding', configName: 'onboarding' },
  { id: 'AP', value: 'avast-proxy', configName: 'avast-proxy' },
  { id: 'KK', value: 'kaspersky-korm [No endpoint configured]' },
  { id: 'SE', value: 'cart-service [No endpoint configured]' },
  { id: 'PP', value: 'payment-proxy', configName: 'payment-proxy' },
  { id: 'IP', value: 'iap-price [No endpoint configured]' },
  { id: 'EB', value: 'email-builder-service', configName: 'email-builder' },
  { id: 'BD', value: 'bitdefender-proxy', configName: 'bitdefender' },
];

export {
  validityPeriod,
  status,
  lifeTime,
  type,
  storeDetailsCardText,
  orderDetailStatus,
  businessSegment,
  defaultCurrency,
  orderCancelAction,
  installmentOptions,
  paymentDefaults,
  paymentImages,
  serviceConfigs,
  getCurrency,
  zipCodeStatusOptions,
};
