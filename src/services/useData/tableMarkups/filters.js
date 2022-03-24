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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.software'), id: 'SOFTWARE' },
        { value: localization.t('labels.games'), id: 'GAMES' },
        { value: localization.t('labels.casual'), id: 'CASUAL' },
        { value: localization.t('labels.service'), id: 'SERVICE' },
        { value: localization.t('labels.b2B'), id: 'B2B' },
        { value: localization.t('labels.b2C'), id: 'B2C' },
      ],
    },
    {
      id: 'status',
      label: localization.t('labels.status'),
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.enabled'), id: 'ENABLED' },
        { value: localization.t('labels.disabled'), id: 'DISABLED' },
      ],
    },
    {
      id: 'productFamily',
      label: localization.t('labels.family'),
      type: 'text',
    },
    {
      id: 'priceFunction',
      label: localization.t('labels.priceFunction'),
      type: 'text',
      exactSearch: true,
    },
  ],
  orderlist: [
    {
      id: 'customer.status',
      label: localization.t('labels.customerStatus'),
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.test'), id: 'TRIAL' },
        { value: localization.t('labels.live'), id: 'RUNNING' },
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.orderStatusCompleted'), id: 'COMPLETED' },
        { value: localization.t('labels.orderStatusPaymentPending'), id: 'PAYMENT_PENDING' },
        { value: localization.t('labels.orderStatusPaymentRefused'), id: 'PAYMENT_REFUSED' },
        { value: localization.t('labels.orderStatusFraudPending'), id: 'FRAUD_PENDING' },
        { value: localization.t('labels.orderStatusPending'), id: 'PENDING' },
        { value: localization.t('labels.orderStatusPendingError'), id: 'PENDING_ERROR' },
        { value: localization.t('labels.orderStatusCreated'), id: 'CREATED' },
        { value: localization.t('labels.orderStatusCancelPending'), id: 'CANCEL_PENDING' },
        { value: localization.t('labels.orderStatusPartialCompleted'), id: 'PARTIAL_COMPLETED' },
        { value: localization.t('labels.orderStatusCanceled'), id: 'CANCELED' },
        { value: localization.t('labels.orderStatusCanceledError'), id: 'CANCELED_ERROR' },
        { value: localization.t('labels.orderStatusPartialCanceled'), id: 'PARTIAL_CANCELED' },
        { value: localization.t('labels.orderStatusForceCompleted'), id: 'FORCE_COMPLETED' },
        { value: localization.t('labels.orderStatusForceCancelled'), id: 'FORCE_CANCELLED' },
        { value: localization.t('labels.orderStatusAborted'), id: 'ABORTED' },
      ],
    },
    {
      id: 'source',
      label: localization.t('labels.source'),
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.acquisition'), id: 'ACQUISITION' },
        { value: localization.t('labels.subscription'), id: 'SUBSCRIPTION' },
        { value: localization.t('labels.manualRenewal'), id: 'MANUAL_RENEWAL' },
        { value: localization.t('labels.billingPlan'), id: 'BILLING_PLAN' },
      ],
    },
    {
      id: 'id',
      label: localization.t('labels.orderId'),
      type: 'text',
      exactSearch: true,
    },
    {
      id: 'invoice.id',
      label: localization.t('labels.invoiceId'),
      type: 'text',
      exactSearch: true,
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
      id: 'payments.transactionId',
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.init'), id: 'INIT' },
        { value: localization.t('labels.pendingReview'), id: 'PENDING-REVIEW' },
        { value: localization.t('labels.pending'), id: 'PENDING' },
        { value: localization.t('labels.pendingCapture'), id: 'PENDING-CAPTURE' },
        { value: localization.t('labels.pendingRefund'), id: 'PENDING-REFUND' },
        { value: localization.t('labels.accepted'), id: 'ACCEPTED' },
        { value: localization.t('labels.captured'), id: 'CAPTURED' },
        { value: localization.t('labels.error'), id: 'ERROR' },
        { value: localization.t('labels.failed'), id: 'FAILED' },
        { value: localization.t('labels.cancelled'), id: 'CANCELLED' },
        { value: localization.t('labels.refunded'), id: 'REFUNDED' },
        { value: localization.t('labels.partialRefunded'), id: 'PARTIAL-REFUNDED' },
        { value: localization.t('labels.chargeback'), id: 'CHARGEBACK' },
        { value: localization.t('labels.chargebackReversed'), id: 'CHARGEBACK-REVERSED' },
        { value: localization.t('labels.refused'), id: 'REFUSED' },
        { value: localization.t('labels.success'), id: 'SUCCESS' },
        { value: localization.t('labels.failure'), id: 'FAILURE' },
      ],
    },
    {
      id: 'subscriptionStatus',
      label: localization.t('labels.subscriptionStatus'),
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.none'), id: 'NONE' },
        { value: localization.t('labels.initialized'), id: 'INITIALIZED' },
        { value: localization.t('labels.creationPending'), id: 'CREATION_PENDING' },
        { value: localization.t('labels.creationFailure'), id: 'CREATION_FAILURE' },
        { value: localization.t('labels.creationAccepted'), id: 'CREATION_ACCEPTED' },
        { value: localization.t('labels.cancelPending'), id: 'CANCEL_PENDING' },
        { value: localization.t('labels.cancelFailure'), id: 'CANCEL_FAILURE' },
        { value: localization.t('labels.cancelAccepted'), id: 'CANCEL_ACCEPTED' },
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.chargebackAlert'), id: 'CBA' },
        { value: localization.t('labels.chargeBack'), id: 'CHB' },
        { value: localization.t('labels.doubleOrder'), id: 'DBL' },
        { value: localization.t('labels.disappointingProduct'), id: 'DIP' },
        { value: localization.t('labels.disappointingService'), id: 'DIS' },
        { value: localization.t('labels.fraudSuspicion'), id: 'FRD' },
        { value: localization.t('labels.orderCancellation'), id: 'OCL' },
        { value: localization.t('labels.outOfStock'), id: 'OOS' },
        { value: localization.t('labels.partnersCancellationRequest'), id: 'PCR' },
        { value: localization.t('labels.priceSubscriptionEvolution'), id: 'PSE' },
        { value: localization.t('labels.productTechnicalIssue'), id: 'PTI' },
        { value: localization.t('labels.subscriptionFlexibility'), id: 'SUB' },
        { value: localization.t('labels.technicalIssue'), id: 'TCH' },
        { value: localization.t('labels.test'), id: 'TST' },
        { value: localization.t('labels.unsettledTransactions'), id: 'UNT' },
        { value: localization.t('labels.unwillingSubscription'), id: 'UNW' },
        { value: localization.t('labels.vatIssue'), id: 'VAT' },
        { value: localization.t('labels.wrongProductChoice'), id: 'WRG' },
      ],
    },
    {
      id: 'preorder',
      label: localization.t('labels.preorder'),
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.yes'), id: 'true' },
        { value: localization.t('labels.no'), id: 'false' },
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.enabled'), id: 'ENABLED' },
        { value: localization.t('labels.disabled'), id: 'DISABLED' },
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.enabled'), id: 'Active' },
        { value: localization.t('labels.disabled'), id: 'Inactive' },
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.done'), id: 'Done' },
        { value: localization.t('labels.error'), id: 'Error' },
        { value: localization.t('labels.inProgress'), id: 'InProgress' },
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.creationInProgress'), id: 'CreationInProgress' },
        { value: localization.t('labels.creationFailed'), id: 'CreationFailed' },
        { value: localization.t('labels.running'), id: 'Running' },
        { value: localization.t('labels.canceled'), id: 'Canceled' },
        { value: localization.t('labels.paused'), id: 'Paused' },
        { value: localization.t('labels.expired'), id: 'Expired' },
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.acquisition'), id: 'PURCHASE' },
        { value: localization.t('labels.manualRenewal'), id: 'MANUAL_RENEWAL' },
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
  catalogs: [
    {
      id: 'id',
      label: localization.t('labels.catalogsId'),
      type: 'text',
      exactSearch: true,
    },
    {
      id: 'type',
      label: localization.t('labels.type'),
      type: 'selectWithChip',
      values: [
        { id: 'INTERNAL', value: localization.t('labels.internal') },
        { id: 'FULL_REMOTE', value: localization.t('labels.fullRemote') },
        { id: 'PRICING_REMOTE', value: localization.t('labels.pricingRemote') },
        { id: 'VARIANT_PRICING_REMOTE', value: localization.t('labels.variantPricingRemote') },
        { id: 'SIGNED', value: localization.t('labels.signed') },
        { id: 'SHARED', value: localization.t('labels.shared') },
      ],
    },
    {
      id: 'salesMode',
      label: localization.t('labels.salesMode'),
      type: 'selectWithChip',
      values: [
        { id: 'STANDARD', value: localization.t('labels.standart') },
        { id: 'BILLING_PLAN', value: localization.t('labels.billingPlan') },
      ],
    },
    {
      id: 'singleUse',
      label: localization.t('labels.singleUse_v1'),
      type: 'selectWithChip',
      values: [
        { id: 'true', value: localization.t('labels.yes') },
        { id: 'false', value: localization.t('labels.no') },
      ],
    },
    {
      id: 'running',
      label: localization.t('labels.running'),
      type: 'selectWithChip',
      values: [
        { id: 'true', value: localization.t('labels.yes') },
        { id: 'false', value: localization.t('labels.no') },
      ],
    },
    {
      id: 'status',
      label: localization.t('labels.status'),
      type: 'selectWithChip',
      values: [
        { id: 'ENABLED', value: localization.t('labels.enabled') },
        { id: 'DISABLED', value: localization.t('labels.disabled') },
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.yes'), id: 'YES' },
        { value: localization.t('labels.no'), id: 'NO' },
      ],
    },
  ],
  pricefunctions: [
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
      label: localization.t('labels.ruleId'),
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.enabled'), id: 'ENABLED' },
        { value: localization.t('labels.disabled'), id: 'DISABLED' },
      ],
    },
    {
      id: 'type',
      label: localization.t('labels.type'),
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.crossSell'), id: 'CROSS_SELL' },
        { value: localization.t('labels.upSell'), id: 'UP_SELL' },
        { value: localization.t('labels.upgrade'), id: 'UPGRADE' },
      ],
    },
    {
      id: 'levels',
      label: localization.t('labels.levels'),
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.cart'), id: 'CART' },
        { value: localization.t('labels.product'), id: 'PRODUCT' },
        { value: localization.t('labels.interstitial'), id: 'INTERSTITIAL' },
        { value: localization.t('labels.purchase'), id: 'PURCHASE' },
      ],
    },
    {
      id: 'sources',
      label: localization.t('labels.sources'),
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.purchase'), id: 'PURCHASE' },
        { value: localization.t('labels.manualRenewal'), id: 'MANUAL_RENEWAL' },
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.enabled'), id: 'ENABLED' },
        { value: localization.t('labels.disabled'), id: 'DISABLED' },
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.enabled'), id: 'Active' },
        { value: localization.t('labels.disabled'), id: 'Inactive' },
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.enabled'), id: 'ENABLED' },
        { value: localization.t('labels.disabled'), id: 'DISABLED' },
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.enabled'), id: 'ENABLED' },
        { value: localization.t('labels.disabled'), id: 'DISABLED' },
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
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.enabled'), id: 'ENABLED' },
        { value: localization.t('labels.disabled'), id: 'DISABLED' },
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
  users: [
    {
      id: 'userName',
      label: localization.t('labels.userName'),
      type: 'text',
    },
    {
      id: 'clientId',
      label: localization.t('labels.clientId'),
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
      id: 'inactive',
      label: localization.t('labels.status'),
      type: 'selectWithChip',
      values: [
        { value: localization.t('labels.disabled'), id: true },
        { value: localization.t('labels.enabled'), id: false },
      ],
    },
  ],
  realms: [
    {
      id: 'id',
      label: localization.t('labels.id'),
      type: 'text',
    },
    {
      id: 'path',
      label: localization.t('labels.path'),
      type: 'text',
    },
  ],
};

export default filters;
