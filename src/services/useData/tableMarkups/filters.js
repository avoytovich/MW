import localization from '../../../localization';

const filters = {
  products: [
    {
      id: 'creationDate',
      label: localization.t('labels.creationDate'),
      type: 'date',
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.lastUpdate'),
      type: 'date',
    },
    { id: 'genericName', label: localization.t('labels.name'), type: 'text' },
    {
      id: 'publisherRefId',
      label: localization.t('labels.publisherRefId'),
      type: 'text',
    },
    {
      id: 'type',
      label: localization.t('labels.type'),
      type: 'select',
      values: [
        { label: localization.t('labels.software'), value: 'SOFTWARE' },
        { label: localization.t('labels.games'), value: 'GAMES' },
        { label: localization.t('labels.casual'), value: 'CASUAL' },
        { label: localization.t('labels.service'), value: 'SERVICE' },
        { label: localization.t('labels.b2B'), value: 'B2B' },
        { label: localization.t('labels.b2C'), value: 'B2C' },
      ],
    },
    {
      id: 'status',
      label: localization.t('labels.status'),
      type: 'select',
      values: [
        { label: localization.t('labels.enabled'), value: 'ENABLED' },
        { label: localization.t('labels.disabled'), value: 'DISABLED' },
      ],
    },
  ],
  orders: [
    {
      id: 'email',
      label: localization.t('labels.email'),
      type: 'text',
    },
    {
      id: 'status',
      label: localization.t('labels.status'),
      type: 'select',
      values: [
        { label: localization.t('labels.orderStatusCompleted'), value: 'COMPLETED' },
        { label: localization.t('labels.orderStatusPaymentPending'), value: 'PAYMENT_PENDING' },
        { label: localization.t('labels.orderStatusPaymentRefused'), value: 'PAYMENT_REFUSED' },
        { label: localization.t('labels.orderStatusFraudPending'), value: 'FRAUD_PENDING' },
        { label: localization.t('labels.orderStatusPending'), value: 'PENDING' },
        { label: localization.t('labels.orderStatusPendingError'), value: 'PENDING_ERROR' },
        { label: localization.t('labels.orderStatusCreated'), value: 'CREATED' },
        { label: localization.t('labels.orderStatusCancelPending'), value: 'CANCEL_PENDING' },
        { label: localization.t('labels.orderStatusPartialCompleted'), value: 'PARTIAL_COMPLETED' },
        { label: localization.t('labels.orderStatusCanceled'), value: 'CANCELED' },
        { label: localization.t('labels.orderStatusCanceledError'), value: 'CANCELED_ERROR' },
        { label: localization.t('labels.orderStatusPartialCanceled'), value: 'PARTIAL_CANCELED' },
        { label: localization.t('labels.orderStatusForceCompleted'), value: 'FORCE_COMPLETED' },
        { label: localization.t('labels.orderStatusForceCancelled'), value: 'FORCE_CANCELLED' },
        { label: localization.t('labels.orderStatusAborted'), value: 'ABORTED' },
      ],
    },
    {
      id: 'invoiceId',
      label: localization.t('labels.invoiceId'),
      type: 'text',
    },
    {
      id: 'payment.paymentTypeId',
      label: localization.t('labels.paymentType'),
      type: 'text',
    },
    {
      id: 'paymentStatus',
      label: localization.t('labels.paymentStatus'),
      type: 'select',
      values: [
        { label: localization.t('labels.orderPaymentStatusCompleted'), value: 'COMPLETED' },
        { label: localization.t('labels.orderPaymentStatusPending'), value: 'PENDING' },
      ],
    },
  ],
  stores: [
    { id: 'name', label: localization.t('labels.name'), type: 'text' },
    { id: 'id', label: localization.t('labels.storeId'), type: 'text' },
    {
      id: 'creationDate',
      label: localization.t('labels.creationDate'),
      type: 'date',
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.lastUpdate'),
      type: 'date',
    },
    {
      id: 'status',
      label: localization.t('labels.status'),
      type: 'select',
      values: [
        { label: localization.t('labels.enabled'), value: 'ENABLED' },
        { label: localization.t('labels.disabled'), value: 'DISABLED' },
      ],
    },
  ],
  'notification-definition': [
    { id: 'id', label: localization.t('labels.id'), type: 'text' },
    { id: 'name', label: localization.t('labels.name'), type: 'text' },
    {
      id: 'updateDate',
      label: localization.t('labels.lastUpdate'),
      type: 'date',
    },
    {
      id: 'eventMatcher.subject',
      label: localization.t('labels.subject'),
      type: 'text',
    },
    {
      id: 'eventMatcher.fact',
      label: localization.t('labels.fact'),
      type: 'text',
    },
  ],
  notifications: [
    {
      id: 'notificationsId',
      label: 'notificationsId',
      type: 'text',
    },
    {
      id: 'customer',
      label: 'customer',
      type: 'text',
    },
    {
      id: 'date',
      label: localization.t('labels.notificationName'),
      type: 'text',
    },
    {
      id: 'url',
      label: localization.t('labels.notificationUrl'),
      type: 'text',
    },
    {
      id: 'emails',
      label: localization.t('labels.notificationEmails'),
      type: 'text',
    },
    {
      id: 'events',
      label: localization.t('labels.notificationEvents'),
      type: 'text',
    },
    {
      id: 'status',
      label: localization.t('labels.notificationStatus'),
      type: 'select',
      values: [
        { label: localization.t('labels.enabled'), value: 'ENABLED' },
        { label: localization.t('labels.disabled'), value: 'DISABLED' },
      ],
    },
  ],

  licenses: [
    {
      id: 'id',
      label: localization.t('labels.licenseId'),
      type: 'text',
    },
    {
      id: 'status',
      label: localization.t('labels.status'),
      type: 'select',
      values: [
        { label: localization.t('labels.creationInProgress'), value: 'CREATIONINPROGRESS' },
        { label: localization.t('labels.creationFailed'), value: 'CREATIONFAILED' },
        { label: localization.t('labels.running'), value: 'RUNNING' },
        { label: localization.t('labels.canceled'), value: 'CANCELED' },
        { label: localization.t('labels.paused'), value: 'PAUSED' },
        { label: localization.t('labels.expired'), value: 'EXPIRED' },
      ],
    },
    {
      id: 'orderId',
      label: localization.t('labels.orderId'),
      type: 'date',
    },
    {
      id: 'firstName',
      label: localization.t('labels.firstName'),
      type: 'text',
    },
    {
      id: 'lastName',
      label: localization.t('labels.lastName'),
      type: 'text',
    },
    {
      id: 'email',
      label: localization.t('labels.email'),
      type: 'text',
    },
    {
      id: 'city',
      label: localization.t('labels.city'),
      type: 'text',
    },
    {
      id: 'productId',
      label: localization.t('labels.productId'),
      type: 'text',
    },
    {
      id: 'licenseProviderDefinition',
      label: localization.t('labels.licenseProviderDefinition'),
      type: 'text',
    },
    {
      id: 'publisherProductId',
      label: localization.t('labels.publisherProductId'),
      type: 'text',
    },
    {
      id: 'productName',
      label: localization.t('labels.productName'),
      type: 'text',
    },
  ],

  carts: [
    {
      id: 'cartId',
      label: localization.t('labels.cartId'),
      type: 'text',
    },
    {
      id: 'creationDate',
      label: localization.t('labels.creationDate'),
      type: 'date',
    },
    {
      id: 'updateDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
    {
      id: 'source',
      label: localization.t('labels.source'),
      type: 'select',
      values: [
        { label: localization.t('labels.acquisition'), value: 'ENABLED' },
        { label: localization.t('labels.manualRenewal'), value: 'DISABLED' },
      ],
    },
    {
      id: 'emailAddress',
      label: localization.t('labels.emailAddress'),
      type: 'text',
    },
    {
      id: 'firstName',
      label: localization.t('labels.firstName'),
      type: 'text',
    },
    {
      id: 'lastName',
      label: localization.t('labels.lastName'),
      type: 'text',
    },

  ],
};

export default filters;
