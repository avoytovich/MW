import localization from '../../../localization';

const filters = {
  productlist: [
    {
      id: 'id',
      label: localization.t('labels.productId'),
      type: 'text',
      exactSearch: true,
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
    {
      id: 'productFamily',
      label: localization.t('labels.family'),
      type: 'text',
    },
  ],
  orderlist: [
    {
      id: 'customer.status',
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
      label: localization.t('labels.invoiceDate'),
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
      label: localization.t('labels.informativeDPStatus'),
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
      id: 'id',
      label: localization.t('labels.notificationsId'),
      type: 'text',
    },
    {
      id: 'name',
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
      id: 'status',
      label: localization.t('labels.notificationStatus'),
      type: 'select',
      values: [
        { label: localization.t('labels.enabled'), value: 'Active' },
        { label: localization.t('labels.disabled'), value: 'Inactive' },
      ],
    },
  ],
  'notification-history': [
    {
      id: 'processingDate',
      label: localization.t('labels.processingDate'),
      type: 'date',
    },

    {
      id: 'status',
      label: localization.t('labels.notificationStatus'),
      type: 'select',
      values: [
        { label: localization.t('labels.done'), value: 'Done' },
        { label: localization.t('labels.error'), value: 'Error' },
        { label: localization.t('labels.inProgress'), value: 'InProgress' },
      ],
    },
    {
      id: 'emails',
      label: localization.t('labels.receiverEmail'),
      type: 'text',
    },
    {
      id: 'url',
      label: localization.t('labels.webHook'),
      type: 'text',
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
        { label: localization.t('labels.creationInProgress'), value: 'CreationInProgress' },
        { label: localization.t('labels.creationFailed'), value: 'CreationFailed' },
        { label: localization.t('labels.running'), value: 'Running' },
        { label: localization.t('labels.canceled'), value: 'Canceled' },
        { label: localization.t('labels.paused'), value: 'Paused' },
        { label: localization.t('labels.expired'), value: 'Expired' },
      ],
    },
    {
      id: 'checkout.orderId',
      label: localization.t('labels.orderId'),
      type: 'text',
    },
    {
      id: 'user.firstName',
      label: localization.t('labels.firstName'),
      type: 'text',
    },
    {
      id: 'user.lastName',
      label: localization.t('labels.lastName'),
      type: 'text',
    },
    {
      id: 'user.email',
      label: localization.t('labels.email'),
      type: 'text',
    },
    {
      id: 'user.city',
      label: localization.t('labels.city'),
      type: 'text',
    },
    {
      id: 'product.id',
      label: localization.t('labels.productId'),
      type: 'text',
    },
    {
      id: 'product.licenseProviderDefinitionId',
      label: localization.t('labels.licenseProviderDefinition'),
      type: 'text',
    },
    {
      id: 'product.publisherProductId',
      label: localization.t('labels.publisherProductId'),
      type: 'text',
    },
    {
      id: 'product.name',
      label: localization.t('labels.productName'),
      type: 'text',
    },
  ],

  carts: [
    {
      id: 'id',
      label: localization.t('labels.cartId'),
      type: 'text',
    },
    {
      id: 'creationDate',
      label: localization.t('labels.creationDate'),
      type: 'date',
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
    {
      id: 'source',
      label: localization.t('labels.source'),
      type: 'select',
      values: [
        { label: localization.t('labels.acquisition'), value: 'PURCHASE' },
        { label: localization.t('labels.manualRenewal'), value: 'MANUAL_RENEWAL' },
      ],
    },
    {
      id: 'endUser.email',
      label: localization.t('labels.emailAddress'),
      type: 'text',
    },
    {
      id: 'endUser.firstName',
      label: localization.t('labels.firstName'),
      type: 'text',
    },
    {
      id: 'endUser.lastName',
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
  subscriptions: [
    {
      id: 'id',
      label: localization.t('labels.subscriptionId'),
      type: 'text',
    },
    {
      id: 'lifecycle.id',
      label: localization.t('labels.lifecycleId'),
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
      id: 'name',
      label: localization.t('labels.subscriptionName'),
      type: 'text',
    },
    {
      id: 'storeId',
      label: localization.t('labels.storeId'),
      type: 'text',
    },
  ],
  themes: [
    {
      id: 'id',
      label: localization.t('labels.id'),
      type: 'text',
    },
    {
      id: 'name',
      label: localization.t('labels.name'),
      type: 'text',
    },
    {
      id: 'creationDate',
      label: localization.t('labels.creationDate'),
      type: 'date',
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
  ],
  layouts: [
    {
      id: 'id',
      label: localization.t('labels.id'),
      type: 'text',
    },
    {
      id: 'name',
      label: localization.t('labels.name'),
      type: 'text',
    },
    {
      id: 'creationDate',
      label: localization.t('labels.creationDate'),
      type: 'date',
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
  ],
  fonts: [
    {
      id: 'id',
      label: localization.t('labels.id'),
      type: 'text',
    },
    {
      id: 'name',
      label: localization.t('labels.name'),
      type: 'text',
    },
    {
      id: 'creationDate',
      label: localization.t('labels.creationDate'),
      type: 'date',
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
  ],
  translations: [
    {
      id: 'id',
      label: localization.t('labels.id'),
      type: 'text',
    },
    {
      id: 'name',
      label: localization.t('labels.name'),
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
  ],
  prices: [
    {
      id: 'startingDate',
      label: localization.t('labels.startDate'),
      type: 'date',
    },
    {
      id: 'endingDate',
      label: localization.t('labels.endDate'),
      type: 'date',
    },
    {
      id: 'productId',
      label: localization.t('labels.productId'),
      type: 'text',
    },
    {
      id: 'marketingCampaignId',
      label: localization.t('labels.marketingId'),
      type: 'text',
    },
    {
      id: 'country',
      label: localization.t('labels.country'),
      type: 'text',
    },
    {
      id: 'currency',
      label: localization.t('labels.currency'),
      type: 'text',
    },
    {
      id: 'value',
      label: localization.t('labels.value'),
      type: 'text',
    },
    {
      id: 'msrp',
      label: localization.t('labels.msrp'),
      type: 'text',
    },
    {
      id: 'upSell',
      label: localization.t('labels.upSell'),
      type: 'text',
    },
    {
      id: 'crossSell',
      label: localization.t('labels.crossSell'),
      type: 'text',
    },
    {
      id: 'vatIncluded',
      label: localization.t('labels.vatIncluded'),
      type: 'select',
      values: [
        { label: localization.t('labels.yes'), value: 'YES' },
        { label: localization.t('labels.no'), value: 'NO' },
      ],
    },
  ],
  'price-functions': [
    {
      id: 'id',
      label: localization.t('labels.priceFunctionId'),
      type: 'text',
    },
    {
      id: 'creationDate',
      label: localization.t('labels.creationDate'),
      type: 'date',
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
    {
      id: 'name',
      label: localization.t('labels.priceFunctionName'),
      type: 'text',
    },
  ],
  recommendations: [
    {
      id: 'id',
      label: localization.t('labels.roleId'),
      type: 'text',
    },
    {
      id: 'creationDate',
      label: localization.t('labels.creationDate'),
      type: 'date',
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
    {
      id: 'name',
      label: localization.t('labels.ruleName'),
      type: 'text',
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
    {
      id: 'type',
      label: localization.t('labels.type'),
      type: 'select',
      values: [
        { label: localization.t('labels.crossSell'), value: 'CROSS_SELL' },
        { label: localization.t('labels.upSell'), value: 'UP_SELL' },
        { label: localization.t('labels.upgrade'), value: 'UPGRADE' },
      ],
    },
    {
      id: 'levels',
      label: localization.t('labels.levels'),
      type: 'select',
      values: [
        { label: localization.t('labels.cart'), value: 'CART' },
        { label: localization.t('labels.product'), value: 'PRODUCT' },
        { label: localization.t('labels.interstitial'), value: 'INTERSTITIAL' },
        { label: localization.t('labels.purchase'), value: 'PURCHASE' },
      ],
    },
    {
      id: 'sources',
      label: localization.t('labels.sources'),
      type: 'select',
      values: [
        { label: localization.t('labels.purchase'), value: 'PURCHASE' },
        { label: localization.t('labels.manualRenewal'), value: 'MANUAL_RENEWAL' },
      ],
    },
  ],
  marketingCampaigns: [
    {
      id: 'id',
      label: localization.t('labels.campaignId'),
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
      id: 'status',
      label: localization.t('labels.status'),
      type: 'select',
      values: [
        { label: localization.t('labels.enabled'), value: 'ENABLED' },
        { label: localization.t('labels.disabled'), value: 'DISABLED' },
      ],
    },
  ],
  discounts: [
    {
      id: 'name',
      label: localization.t('labels.discountRuleName'),
      type: 'text',
    },
    {
      id: 'id',
      label: localization.t('labels.discountRuleId'),
      type: 'text',
    },
    {
      id: 'model',
      label: localization.t('labels.model'),
      type: 'select',
      values: [
        { label: localization.t('labels.coupon'), value: 'COUPON' },
        { label: localization.t('labels.campaign'), value: 'CAMPAIGN' },
        { label: localization.t('labels.singleUseCode'), value: 'SINGLE_USE_CODE' },
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
    {
      id: 'creationDate',
      label: localization.t('labels.creationDate'),
      type: 'date',
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
    {
      id: 'source',
      label: localization.t('labels.sources'),
      type: 'select',
      values: [
        { label: localization.t('labels.purchase'), value: 'PURCHASE' },
        { label: localization.t('labels.manualRenewal'), value: 'MANUAL_RENEWAL' },
        { label: localization.t('labels.subscription'), value: 'SUBSCRIPTION' },
        { label: localization.t('labels.billingPlan'), value: 'BILLING_PLAN' },
      ],
    },
  ],
  marketingAbandoned: [
    {
      id: 'id',
      label: localization.t('labels.campaignId'),
      type: 'text',
      exactSearch: true,
    },
    {
      id: 'creationDate',
      label: localization.t('labels.creationDate'),
      type: 'date',
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
    {
      id: 'status',
      label: localization.t('labels.status'),
      type: 'select',
      values: [
        { label: localization.t('labels.enabled'), value: 'Active' },
        { label: localization.t('labels.disabled'), value: 'Inactive' },
      ],
    },
  ],
  enduserlist: [
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
      id: 'companyName',
      label: localization.t('labels.companyName'),
      type: 'text',
    },
    {
      id: 'email',
      label: localization.t('labels.emailAddress'),
      type: 'text',
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
    {
      id: 'city',
      label: localization.t('labels.city'),
      type: 'text',
    },
    {
      id: 'streetAddress',
      label: localization.t('labels.streetAddress'),
      type: 'text',
    },
  ],
  resellers: [
    {
      id: 'id',
      label: localization.t('labels.endUserId'),
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
    {
      id: 'company.companyName',
      label: localization.t('labels.companyName'),
      type: 'text',
    },
    {
      id: 'email',
      label: localization.t('labels.emailAddress'),
      type: 'text',
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
    {
      id: 'city',
      label: localization.t('labels.city'),
      type: 'text',
    },
    {
      id: 'streetAddress',
      label: localization.t('labels.streetAddress'),
      type: 'text',
    },
  ],
  customerslist: [
    {
      id: 'id',
      label: localization.t('labels.id'),
      type: 'text',
    },
    {
      id: 'name',
      label: localization.t('labels.name'),
      type: 'text',
    },
    {
      id: 'email',
      label: localization.t('labels.email'),
      type: 'text',
    },
    {
      id: 'creationDate',
      label: localization.t('labels.createDate'),
      type: 'date',
    },
    {
      id: 'features',
      label: localization.t('labels.features'),
      type: 'selectWithChip',
      values: [
        { id: 'features.sgOrdersManagement', value: localization.t('labels.sgOrdersManagement') },
        { id: 'features.resellerManagement', value: localization.t('labels.resellerManagement') },
        { id: 'features.onboardingManagement', value: localization.t('labels.onboardingManagement') },
        { id: 'features.remittanceManagement', value: localization.t('labels.remittanceManagement') },
        { id: 'features.productManagement', value: localization.t('labels.productManagement') },
        { id: 'features.seller', value: localization.t('labels.seller') },
        { id: 'features.sellOnBehalf', value: localization.t('labels.sellOnBehalf') },
        { id: 'features.createInvoice', value: localization.t('labels.createInvoice') },
        { id: 'features.sendOrderConfirmationEmail', value: localization.t('labels.sendOrderConfirmationEmail') },
        { id: 'features.subscriptionUpgradeAuthorized', value: localization.t('labels.subscriptionUpgradeAuthorized') },
        { id: 'features.usingSubscriptionV1', value: localization.t('labels.usingSubscriptionV1') },
        { id: 'features.usingFulfillmentV1', value: localization.t('labels.usingFulfillmentV1') }],
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
    {
      id: 'status',
      label: localization.t('labels.status'),
      type: 'selectWithChip',
      values: [
        { id: 'TRIAL', value: localization.t('labels.test') },
        { id: 'RUNNING', value: localization.t('labels.live') },
      ],
    },
  ],
  emailbuilder: [
    {
      id: 'id',
      label: localization.t('labels.templateId'),
      type: 'text',
      exactSearch: true,
    },
    {
      id: 'name',
      label: localization.t('labels.name'),
      type: 'text',
    },
    {
      id: 'version',
      label: localization.t('labels.version'),
      type: 'text',
      exactSearch: true,
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
    {
      id: 'firstMailingDate',
      label: localization.t('labels.firstMailingDate'),
      type: 'date',
    },
    {
      id: 'tag',
      label: localization.t('labels.tags'),
      type: 'text',
      exactSearch: true,
    },
  ],
  roles: [
    {
      id: 'id',
      label: localization.t('labels.id'),
      type: 'text',
      exactSearch: true,
    },
    {
      id: 'name',
      label: localization.t('labels.name'),
      type: 'text',
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
    {
      id: 'creationDate',
      label: localization.t('labels.createDate'),
      type: 'date',
    },
  ],
  metaRoles: [
    {
      id: 'id',
      label: localization.t('labels.id'),
      type: 'text',
      exactSearch: true,
    },
    {
      id: 'name',
      label: localization.t('labels.name'),
      type: 'text',
    },
    {
      id: 'description',
      label: localization.t('labels.description'),
      type: 'text',
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
    {
      id: 'creationDate',
      label: localization.t('labels.createDate'),
      type: 'date',
    },
  ],
  privileges: [
    {
      id: 'id',
      label: localization.t('labels.id'),
      type: 'text',
      exactSearch: true,
    },
    {
      id: 'serviceName',
      label: localization.t('labels.serviceName'),
      type: 'text',
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
    {
      id: 'creationDate',
      label: localization.t('labels.createDate'),
      type: 'date',
    },
  ],
  audits: [
    {
      id: 'who.userName',
      label: localization.t('labels.userName'),
      type: 'text',
    },
    {
      id: 'who.id',
      label: localization.t('labels.userId'),
      type: 'text',
      exactSearch: true,
    },
    {
      id: 'who.type',
      label: localization.t('labels.userType'),
      type: 'selectWithChip',
      values: [
        { id: 'BEARER', value: localization.t('labels.jwtBearer') },
        { id: 'INTERNAL', value: localization.t('labels.internalCall') },
        { id: 'ANONYMOUS', value: localization.t('labels.anonymous') },
        { id: 'ENDUSER', value: localization.t('labels.endUser') },
        { id: 'CUSTOMER', value: localization.t('labels.сustomer') },
        { id: 'NEXWAY', value: 'Nexway' },
      ],
    },
    {
      id: 'what.fact',
      label: localization.t('labels.operation'),
      type: 'text',
    },
    {
      id: 'who.ip',
      label: localization.t('labels.userIp'),
      type: 'text',
      exactSearch: true,
    },
    {
      id: 'what.type',
      label: localization.t('labels.subjectType'),
      type: 'text',
    },
    {
      id: 'what.id',
      label: localization.t('labels.subjectId'),
      type: 'text',
      exactSearch: true,
    },
    {
      id: 'what.customerId',
      label: localization.t('labels.subjectCustomer'),
      type: 'text',
      exactSearch: true,
    },
    {
      id: 'where.serviceName',
      label: localization.t('labels.service'),
      type: 'text',
    },
    {
      id: 'why.reason',
      label: localization.t('labels.reasonOfOperation'),
      type: 'text',
    }],
  discountrules: [
    {
      id: 'id',
      label: localization.t('labels.discountRuleId'),
      type: 'text',
      exactSearch: true,
    }, {
      id: 'name',
      label: localization.t('labels.discountRuleName'),
      type: 'text',
    },
    {
      id: 'model',
      label: localization.t('labels.model'),
      type: 'selectWithChip',
      values: [
        { id: 'CAMPAIGN', value: localization.t('labels.campaign') },
        { id: 'COUPON', value: localization.t('labels.coupon') },
        { id: 'SINGLE_USE_CODE', value: localization.t('labels.singleUseCode') },
      ],
    },
    {
      id: 'source',
      label: localization.t('labels.sources'),
      type: 'selectWithChip',
      values: [
        { id: 'PURCHASE', value: localization.t('labels.purchase') },
        { id: 'MANUAL_RENEWAL', value: localization.t('labels.manualRenewal') },
        { id: 'SUBSCRIPTION', value: localization.t('labels.subscription') },
        { id: 'BILLING_PLAN', value: localization.t('labels.billingPlan') },
      ],
    },
  ],
  remittables: [
    {
      id: 'id',
      label: localization.t('labels.remittableId'),
      type: 'text',
      exactSearch: true,
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
    {
      id: 'name',
      label: localization.t('labels.name'),
      type: 'text',
    },
    {
      id: 'updatingDate',
      label: localization.t('labels.updateDate'),
      type: 'date',
    },
    {
      id: 'creationDate',
      label: localization.t('labels.createDate'),
      type: 'date',
    },
  ],
  onboarding: [
    {
      id: 'id',
      label: localization.t('labels.id'),
      type: 'text',
      exactSearch: true,
    },
    {
      id: 'status',
      label: localization.t('labels.status'),
      type: 'selectWithChip',
      values: [
        { id: 'APPROVED', value: localization.t('labels.approved') },
        { id: 'APPROVED_IN_ERROR', value: localization.t('labels.approvedInError') },
        { id: 'DECLINED', value: localization.t('labels.declined') },
        { id: 'WAITING_FOR_EMAIL_VARIFICATION', value: localization.t('labels.waitingEmailValidation') },
        { id: 'APPROVING', value: localization.t('labels.approving') },
      ],
    },
    {
      id: 'customer',
      label: localization.t('labels.customer'),
      type: 'text',
    },
    {
      id: 'creationDate',
      label: localization.t('labels.creationDate'),
      type: 'date',
    },
    {
      id: 'lastUpdate',
      label: localization.t('labels.lastUpdate'),
      type: 'date',
    },
    {
      id: 'companyName',
      label: localization.t('labels.companyName'),
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
    {
      id: 'email',
      label: localization.t('labels.email'),
      type: 'text',
      exactSearch: true,
    },
  ],
  invoicetranslations: [
    {
      id: 'id',
      label: localization.t('labels.id'),
      type: 'text',
    },
    {
      id: 'name',
      label: localization.t('labels.name'),
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
  ],
};

export default filters;
