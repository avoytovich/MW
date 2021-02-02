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

export {
  validityPeriod,
  status,
  lifeTime,
  type,
  storeDetailsCardText,
  orderDetailStatus,
};
