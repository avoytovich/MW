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
      id: 'customerStatus',
      label: localization.t('labels.customerStatus'),
      type: 'select',
      values: [
        { label: localization.t('labels.test'), value: 'TRIAL' },
        { label: localization.t('labels.live'), value: 'RUNNING' },
      ],
    },
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
      id: 'source',
      label: localization.t('labels.source'),
      type: 'select',
      values: [
        { label: localization.t('labels.acquisition'), value: 'ACQUISITION' },
        { label: localization.t('labels.subscription'), value: 'SUBSCRIPTION' },
        { label: localization.t('labels.manualRenewal'), value: 'MANUAL_RENEWAL' },
        { label: localization.t('labels.billingPlan'), value: 'BILLING_PLAN' },
      ],
    },
    {
      id: 'id',
      label: localization.t('labels.orderId'),
      type: 'text',
    },
    {
      id: 'invoiceId',
      label: localization.t('labels.invoiceId'),
      type: 'text',
    },
    {
      id: 'endUser.email',
      label: localization.t('labels.email'),
      type: 'text',
    },
    {
      id: 'endUser.phone',
      label: localization.t('labels.phone'),
      type: 'text',
    },
    {
      id: 'endUser.company.companyName',
      label: localization.t('labels.companyName'),
      type: 'text',
    },
    {
      id: 'lineItems.activationCode',
      label: localization.t('labels.activationCodeKey'),
      type: 'text',
    },
    {
      id: 'lineItems.publisherRefId',
      label: localization.t('labels.publisherRefId'),
      type: 'text',
    },
    {
      id: 'payment.transactionId',
      label: localization.t('labels.transactionId'),
      type: 'text',
    },
    {
      id: 'payment.paymentTypeId',
      label: localization.t('labels.paymentType'),
      type: 'text',
    },
    {
      id: 'creationDate',
      label: localization.t('labels.invoiceId'),
      type: 'date',
    },
    {
      id: 'endUser.lastName',
      label: localization.t('labels.lastName'),
      type: 'text',
    },
    {
      id: 'endUser.firstName',
      label: localization.t('labels.firstName'),
      type: 'text',
    },
    {
      id: 'payment.informativeDPStatus',
      label: localization.t('labels.estimatedPaymentStatus'),
      type: 'select',
      values: [
        { label: localization.t('labels.init'), value: 'INIT' },
        { label: localization.t('labels.pendingReview'), value: 'PENDING-REVIEW' },
        { label: localization.t('labels.pending'), value: 'PENDING' },
        { label: localization.t('labels.pendingCapture'), value: 'PENDING-CAPTURE' },
        { label: localization.t('labels.pendingRefund'), value: 'PENDING-REFUND' },
        { label: localization.t('labels.accepted'), value: 'ACCEPTED' },
        { label: localization.t('labels.captured'), value: 'CAPTURED' },
        { label: localization.t('labels.error'), value: 'ERROR' },
        { label: localization.t('labels.failed'), value: 'FAILED' },
        { label: localization.t('labels.cancelled'), value: 'CANCELLED' },
        { label: localization.t('labels.refunded'), value: 'REFUNDED' },
        { label: localization.t('labels.partialRefunded'), value: 'PARTIAL-REFUNDED' },
        { label: localization.t('labels.chargeback'), value: 'CHARGEBACK' },
        { label: localization.t('labels.chargebackReversed'), value: 'CHARGEBACK-REVERSED' },
        { label: localization.t('labels.refused'), value: 'REFUSED' },
        { label: localization.t('labels.success'), value: 'SUCCESS' },
        { label: localization.t('labels.failure'), value: 'FAILURE' },
      ],
    },
    {
      id: 'subscriptionStatus',
      label: localization.t('labels.subscriptionStatus'),
      type: 'select',
      values: [
        { label: localization.t('labels.none'), value: 'NONE' },
        { label: localization.t('labels.initialized'), value: 'INITIALIZED' },
        { label: localization.t('labels.creationPending'), value: 'CREATION_PENDING' },
        { label: localization.t('labels.creationFailure'), value: 'CREATION_FAILURE' },
        { label: localization.t('labels.creationAccepted'), value: 'CREATION_ACCEPTED' },
        { label: localization.t('labels.cancelPending'), value: 'CANCEL_PENDING' },
        { label: localization.t('labels.cancelFailure'), value: 'CANCEL_FAILURE' },
        { label: localization.t('labels.cancelAccepted'), value: 'CANCEL_ACCEPTED' },
      ],
    },
    {
      id: 'creditNotes.id',
      label: localization.t('labels.creditNoteId'),
      type: 'text',
    },
    {
      id: 'creditNotes.cancellationReason',
      label: localization.t('labels.cancelationReasons'),
      type: 'select',
      values: [
        { label: localization.t('labels.chargebackAlert'), value: 'CBA' },
        { label: localization.t('labels.chargeBack'), value: 'CHB' },
        { label: localization.t('labels.doubleOrder'), value: 'DBL' },
        { label: localization.t('labels.disappointingProduct'), value: 'DIP' },
        { label: localization.t('labels.disappointingService'), value: 'DIS' },
        { label: localization.t('labels.fraudSuspicion'), value: 'FRD' },
        { label: localization.t('labels.orderCancellation'), value: 'OCL' },
        { label: localization.t('labels.outOfStock'), value: 'OOS' },
        { label: localization.t('labels.partnersCancellationRequest'), value: 'PCR' },
        { label: localization.t('labels.priceSubscriptionEvolution'), value: 'PSE' },
        { label: localization.t('labels.productTechnicalIssue'), value: 'PTI' },
        { label: localization.t('labels.subscriptionFlexibility'), value: 'SUB' },
        { label: localization.t('labels.technicalIssue'), value: 'TCH' },
        { label: localization.t('labels.test'), value: 'TST' },
        { label: localization.t('labels.unsettledTransactions'), value: 'UNT' },
        { label: localization.t('labels.unwillingSubscription'), value: 'UNW' },
        { label: localization.t('labels.vatIssue'), value: 'VAT' },
        { label: localization.t('labels.wrongProductChoice'), value: 'WRG' },
      ],
    },
    {
      id: 'preorder',
      label: localization.t('labels.preorder'),
      type: 'select',
      values: [
        { label: localization.t('labels.yes'), value: 'true' },
        { label: localization.t('labels.no'), value: 'false' },
      ],
    },
    {
      id: 'lineItems.subscriptionId',
      label: localization.t('labels.subscriptionId'),
      type: 'text',
    },
    {
      id: 'salesFlag',
      label: localization.t('labels.salesFlags'),
      type: 'text',
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
  autoFulfillments: [
    {
      id: 'name',
      label: localization.t('labels.name'),
      type: 'text',
    },
  ],
  manualFulfillments: [
    {
      id: 'id',
      label: localization.t('labels.packageId'),
      type: 'text',
    },
    {
      id: 'name',
      label: localization.t('labels.name'),
      type: 'text',
    },
  ],
  licenseProviderDefinitions: [
    {
      id: 'id',
      label: localization.t('labels.providerDefinitionId'),
      type: 'text',
    },
    {
      id: 'name',
      label: localization.t('labels.definitionName'),
      type: 'text',
    },
  ],
};

export default filters;
