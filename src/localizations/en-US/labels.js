const labels = {
  creationDate: 'Creation Date',
  anniversaryDate: 'Anniversary date',
  lastUpdate: 'Last Update',
  updateDate: 'Last Update',
  subject: 'Event Subject',
  fact: 'Event Fact',
  name: 'Name',
  publisherRefId: 'Publisher Ref ID',
  type: 'Type',
  software: 'Software',
  games: 'Games',
  casual: 'Casual',
  service: 'Service',
  b2B: 'B2B',
  b2C: 'B2C',
  status: 'Status',
  enabled: 'Enabled',
  disabled: 'Disabled',
  orderStatusCompleted: 'Completed',
  orderStatusPaymentPending: 'Payment Pending',
  orderStatusPaymentRefused: 'Payment Refused',
  orderStatusFraudPending: 'Fraud Pending',
  orderStatusPending: 'Pending',
  orderStatusPendingError: 'Pending with error',
  orderStatusCreated: 'Created',
  orderStatusCancelPending: 'Cancel Pending',
  orderStatusPartialCompleted: 'Partial Completed',
  orderStatusCanceled: 'Canceled',
  orderStatusCanceledError: 'Canceled with error',
  orderStatusPartialCanceled: 'Partial Canceled',
  orderStatusForceCompleted: 'Force-Completed',
  orderStatusForceCancelled: 'Force-Cancelled',
  orderStatusAborted: 'Aborted',
  orderPaymentStatusCompleted: 'Completed',
  orderPaymentStatusPending: 'Pending',
  paymentType: 'Payment Type',
  storeId: 'Store ID',
  id: 'ID',
  destination: 'Destination',
  customer: 'Customer',
  notification_history_id: 'Notification history ID',
  email_body: 'Email body',
  webhook_success_payload: 'Webhook Success Payload',
  webhook_errors: 'Webhook Errors',
  processingDate: 'Processing Date',
  processedEvent: 'Event',
  receiverEmail: 'Receiver(s) email(s)',
  receiverUrl: 'Receiver URL (webhook)',
  webHook: 'Webhook Success Response',
  amount: 'Amount',
  store: 'Store',
  paymentID: 'Payment ID',
  paymentStatus: 'Payment Status',
  fraudStatus: 'Fraud Status',
  fulfillment: 'Fulfillment',
  subscription: 'Subscription',
  email: 'Email',
  onlineStore: 'Online Store',
  companyName: 'Company Name',
  orderID: 'Order ID',
  invoiceId: 'InvoiceID',
  currency: 'Currency',
  applicableUntil: 'Applicable until',
  products: 'Products',
  country: 'Country',
  sellingStores: 'Selling Stores',
  lifeTime: 'Life Time',
  trialAllowed: 'Trial Allowed',
  totalPrice: 'Total Price',
  total: 'Total',
  fullName: 'Full Name',
  userID: ' User ID',
  accountCreated: 'Account Created',
  productId: 'Product ID',
  family: 'Family',
  externalContext: 'External Context',
  decodedExtContext: 'Decoded Ext. Context',
  priceFunction: 'Price function',
  hostnames: 'Hostnames',
  storeHostname: 'Store Hostname',
  defaultLanguage: 'Default Language',
  salesLanguages: 'Sales Languages',
  enduserPortalTheme: 'Enduser Portal Theme',
  checkoutTheme: 'Checkout theme',
  checkoutFont: 'Checkout font',
  checkoutLayout: 'Checkout layout',
  checkoutTranslation: 'Checkout translation',
  paymentMethods: 'Available Payment methods',
  gtmId: 'GTM ID',
  updateReason: 'Update Reason',
  emailDate: 'Email Date',
  invoiceDate: 'Invoice Date',
  endUser: 'End User',
  address: 'Address',
  zipCode: 'Zip Code',
  transactionID: 'Transaction ID',
  installments: 'Installments',
  paymentDeadline: 'Payment Deadline',
  reseller: 'Reseller',
  onboarding: 'Onboarding',
  remittance: 'Remittance',
  product: 'Product',
  seller: 'Seller',
  sellerOnBehalf: 'Seller on Behalf',
  createInvoice: 'Create Invoice',
  orderConfirmation: 'Order confirmation',
  subscriptionUpgrade: 'Subscription Upgrade',
  subscriptionV1: 'Subscription v1',
  fulfillmentV1: 'Fulfillment v1',
  fulfillmentTemplates: 'Fulfillment templates',
  subscriptionsModels: 'Subscriptions models',
  availablePayments: 'Available payments',
  blockedPayments: 'Blocked payments',
  maxPaymentsPart: 'Max payments part',
  oneClickPayment: 'One Click Payment',
  date: 'Date',
  startDate: 'Start Date',
  endDate: 'End Date',
  ruleName: 'Rule Name',
  levels: 'Level(s)',
  sources: 'Source(s)',
  weight: 'Weight',
  discount: 'Discount',
  discountRuleName: 'Discount Rule Name',
  model: 'Model',
  discountAmount: 'Discount Amount',
  discountApply: 'Apply discount ?',
  maximumUses: 'Maximum Uses',
  user: 'User',
  application: 'Application',
  firstName: 'First Name',
  lastName: 'Last Name',
  userName: 'User Name',
  privileges: 'Privileges',
  roles: 'Roles',
  metaRoles: 'Meta-Roles',
  fontFamily: 'Font Family',
  importCssRule: '@import css rule',
  themes: 'Themes',
  layouts: 'Layouts',
  translations: 'Translations',
  invoiceTranslations: 'Invoice Translations',
  fonts: 'Fonts',
  price: 'Price',
  productName: 'Product Name',
  value: 'Value',
  msrp: 'MSRP',
  vatIncluded: 'VAT included',
  subscriptionModel: 'Subscription Model',
  trialDuration: 'Trial Duration',
  fulfillmentTemplate: 'Fulfillment Template',
  licenseKeyPackages: 'License Key Packages',
  renewingProducts: 'Renewing Products',
  allowTrial: 'Allow trial',
  preorderReleaseDate: 'Preorder Release Date',
  fulfillmentAndSubscription: 'Fulfillment & Subscription',
  general: 'General',
  prices: 'Prices',
  productsByParent: 'Products By Parent',
  productsByReference: 'Products By Reference',
  endUserGroups: 'End-User Groups',
  countries: 'Countries',
  endUserMails: 'End-User Mails',
  maximumUsesPerStore: 'Maximum Uses Per Store',
  maximumUsesPerEndUser: 'Maximum Uses Per End-User',
  periodOfValidity: 'Period of Validity',
  validationField: 'This field is mandatory',
  salutation: 'Salutation',
  css: 'CSS',
  fallbackLocale: 'Fallback locale',
  catalog: 'Catalog',
  businessSegment: 'Business Segment',
  physicalProduct: 'Physical Product',
  blockedCountries: 'Blocked Countries',
  localizedContent: 'Localized Content',
  productVariations: 'Product Variations',
  productFiles: 'Product Files',
  backToParent: 'Back to Parent',
  discountLabels: 'Discount Labels',
  language: 'Language',
  discountLabel: 'Discount Label',
  byPercentage: 'By Percentage',
  byCurrency: 'By Currency',
  percents: 'Percents',
  code: 'Code',
  cappingAndLimits: 'Capping And Limits',
  endUserTypes: 'End User Types',
  stores: 'Stores',
  minimumCartAmount: 'Minimum Cart Amount',
  eligibility: 'Eligibility',
  localizedMarketingName: 'Marketing name',
  marketingId: 'Marketing Campaign ID',
  localizedShortDesc: 'Short description',
  localizedLongDesc: 'Long description',
  localizedThankYouDesc: 'Thank you description',
  localizedPurchaseEmailDesc: 'Purchase description',
  localizedManualRenewalEmailDesc: 'Manual renewal description',
  addLanguage: 'Add Language',
  selectFile: 'Select File',
  freeLabel: 'Free label',
  url: 'URL',
  dropFileOrSelect: 'Select files from your computer or click add icon to enter custom URL',
  relatedContents: 'Related Contents',
  resources: 'Resources',
  label: 'Label',
  rebate: 'Rebate',
  headerLogo: 'Header Logo',
  boxshot: 'Boxshot',
  icon: 'Icon',
  bundledProducts: 'Bundled products',
  variationParameters: 'Variation parameters',
  createDate: 'Create date',
  source: 'Source',
  unpaidAmount: 'Unpaid Amount',
  salesFlags: 'Sales Flags',
  salesFlagsHelper: 'Sales flags are separated by spaces',
  termsAndConditions: 'Terms & Conditions',
  numberOfInstallments: 'Number of installments',
  creditNote: 'Credit Note',
  creditNoteDate: 'Credit Note Date',
  emailAddress: 'Email Address',
  streetAddress: 'Street Address',
  city: 'City',
  zip: 'Zip',
  phone: 'Phone',
  ip: 'IP',
  paymentRequestDate: 'Payment Request Date',
  paymentDate: 'Payment Date',
  paymentProvider: 'Payment Provider',
  cardBin: 'Card Bin',
  paymentAttempt1_1: 'Payment Attempt 1/1',
  defaultCurrency: 'Default Currency',
  priceCurrency: 'Price',
  priceCountry: 'Country',
  cancelOrder: 'Cancel Order',
  upsellPrice: 'Upsell price',
  crossSellPrice: 'Cross-sell price',
  overrideEmailSender: 'Override Email Sender',
  saleLanguages: 'Sale Languages',
  displayName: 'Display Name',
  storeWebsite: 'Store Website',
  installmentOptions: 'Installment Options',
  senderName: 'Sender Name',
  allowInstallments: 'Allow installments',
  restrictedCountries: 'Restricted Countries',
  gtmIdOwnedByNexway: 'GTM ID (owned by Nexway)',
  forceEndUserCreation: 'Force End-user creation',
  promoteOneClickPayment: 'Promote one-click payment',
  displayProductDeliveryOnCheckoutConfirmation: 'Display product delivery on checkout confirmation',
  enableRecipientCode: 'Enable Recipient Code',
  eligibleEndUserTypes: 'Eligible End User Types',
  allowQuotes: 'Allow Quotes',
  externalContextGenerationParamsOnePerLine: 'External Context Generation Params (one per line)',
  externalContextAlias: 'External Context Alias',
  useGeoIpToForceEnduserCountry: 'Use GeoIp to force Enduser country',
  fallbackCartCountry: 'Fallback Cart Country',
  resellerAuthentication: 'Reseller authentication',
  buyer: 'Buyer',
  prefillWith: 'Prefill with',
  buyerAuthentication: 'Buyer authentication',
  buyerDetails: 'Buyer details input mode',
  noAuthentication: 'No authentication',
  routes: 'Routes',
  design: 'Design',
  payment: 'Payment',
  enduserPortal: 'Enduser Portal',
  checkout: 'Checkout',
  resellerPortalEmbeddedCheckout: 'Reseller Portal embedded checkout',
  theme: 'Theme',
  layout: 'Layout',
  font: 'Font',
  i18n: 'I18n',
  paymentMethodsByDefault: 'Payment Methods by Default',
  blacklistedPaymentTypes: 'Blacklisted Payment Types',
  additionalPaymentTypes: 'Additional Payment Types',
  paymentTabsRanking: 'Payment tabs ranking',
  group: 'Group',
  paymentTypes: 'Payment Types',
  assetsResource: 'Assets Resource',
  logoFavicon: 'Favicon',
  bannerInvoice: 'Invoice banner ',
  bannerOrderConfEmail: 'Confirmation email banner',
  logoStore: 'Logo',
  customerId: 'Customer ID',
  events: 'Events',
  clientId: 'Client ID',
  byProduct: 'By Product',
  byParentProducts: 'By Parent Products',
  sourceProduct: 'Source Product',
  targetProducts: 'Target Products',
  recommendationName: 'Recommendation Name',
  crossSell: 'Cross Sell',
  upSell: 'Up Sell',
  upgrade: 'Upgrade',
  cart: 'Cart',
  interstitial: 'Interstitial',
  purchase: 'Purchase',
  manualRenewal: 'Manual Renewal',
  recommendationsSelectionMode: 'Recommendations Selection Mode',
  fixedListOfProducts: 'Fixed List Of Products',
  productListAssociation: 'Product list association',
  byParentProduct: 'By parent product',
  conditionsOfAvailabilty: 'Conditions Of Availabilty',
  rights: 'Rights',
  aggregatedRoles: 'Aggregated Roles',
  serviceName: 'Service Name',
  availableActions: 'Available Actions',
  customers: 'Customers',
  reasonForCurrentChange: 'Reason for current change',
  nameOrId: 'Name or ID',
  description: 'Description',
  clearances: 'Clearances',
  lastUpdateReason: 'Last Update Reason',
  metaRole: 'Meta-Role',
  role: 'Role',
  conditionsOfAvailability: 'Conditions of availability',
  privilege: 'Privilege',
  lifecycleId: 'Lifecycle ID',
  lifecycle: 'Lifecycle',
  enduserId: 'Enduser ID',
  subscriptionId: 'Subscription ID',
  subscriptionName: 'Subscription Name',
  contactEmailAddress: 'Contact Email Address',
  identification: 'Identification',
  permissions: 'Permissions',
  emails: 'Emails',
  modelId: 'Model ID',
  numDaysBeforeAnniversary: 'Number of days before anniversary',
  nextBillingDate: 'Next billing date',
  paymentServiceConfiguration: 'Payment Service Configuration',
  assets: 'Assets',
  cancelPeriod: 'Cancel period (in days, 0 or empty = no cancel period)',
  authenticationRealm: 'Authentication Realm',
  apiSecret: 'API Secret',
  realmName: 'Realm Name',
  test: 'Test',
  live: 'Live',
  remittableId: 'Remittable ID',
  features: 'Features',
  emailId: 'Email ID',
  managedCustomers: 'Managed Customers',
  secretKeys: 'Secret Keys',
  secretKey: 'Secret Key',
  secret: 'secret',
  deleteSecretKey: 'Delete Secret Key',
  add: 'Add',
  invoiceCreditNotesTypeOfId: 'Type of ID',
  invoiceCreditNotesId: 'ID',
  sgOrdersManagement: 'SG Order Management',
  resellerManagement: 'Reseller Management',
  onboardingManagement: 'Onboarding Management',
  remittanceManagement: 'Remittance Management',
  productManagement: 'Product Management',
  sellOnBehalf: 'Sell On Behalf',
  sendOrderConfirmationEmail: 'Send Order Confirmation Email',
  subscriptionUpgradeAuthorized: 'Subscription Upgrade Authorized',
  usingSubscriptionV1: 'Using Subscription V1',
  usingFulfillmentV1: 'Using Fulfillment V1',
  platformModules: 'Platform Modules',
  workflowAgreement: 'Workflow Agreement',
  technicalFeatures: 'Technical Features',
  forcedPaymentMethods: 'Forced Payment Methods',
  blackListedPaymentTypes: 'Black Listed Payment Types',
  availableAdditionalPaymentTypes: 'Available Additional Payment Types',
  signedPartialAmountRequired: 'Signed Partial Amount Required',
  minPaymentAmountInPercent: 'Min Payment Amount in Percent',
  maxPaymentsParts: 'Max Payments Parts',
  paymentVendor: 'Payment Vendor',
  createEndUserWithoutSubscription: 'Create end-user without subscription',
  customerName: 'Customer Name',
  onboardingGuide: 'Onboarding Guide',
  onboardingTerms: 'Onboarding Terms',
  reports: 'Reports',
  notification: 'Notifications',
  notificationDefinitions: 'Notification Definitions',
  notificationHistory: 'Notifications History',
  notificationsId: 'Notifications ID',
  notificationCustomer: 'Customer',
  notificationName: 'Name',
  notificationUrl: 'Url',
  notificationEmails: 'Emails',
  oneByLine: ' (one by line)',
  notificationEvents: 'Events',
  notificationStatus: 'Status',
  httpHeaders: 'HTTP Headers',
  oAuthConfiguration: 'OAuth 2.0 configuration',
  tlsConfiguration: 'TLS configuration',
  receiverType: 'Receiver Type',
  webhook: 'Webhook',
  targetedCustomers: 'Targeted Customers',
  contentTypeOneByLine: 'Content-type (one by line)',
  versionOneByLine: 'Version (one by line)',
  emailsOneByLine: 'Emails (one by line)',
  clientSecret: 'Client Secret',
  clientID: 'Client ID',
  tokenURL: 'Token URL',
  scopesOneByLine: 'Scopes(one by line)',
  TLSAuthMode: 'TLS Auth Mode',
  none: 'None',
  client: 'Client',
  server: 'Server',
  clientCertificates: 'Client Certificates',
  privateKey: 'Private Key',
  cACertificate: 'CA Certificate',
  notificationid: 'Notifications ID',
  notificationsHistory: {
    customer: 'Customer',
    processingDate: 'ProcessingDate',
    notificationHistoryId: 'Notification History ID',
    status: 'Status',
    event: 'Event',
    receiverEmail: 'Receiver(s) email(s)',
    receiverURL: 'Receiver URL (webhook)',
    webhookSuccessResponse: 'Webhook Success Response',
  },
  licenses: 'licenses',
  last4Digits: 'Last four digits',
  licenseId: 'License ID',
  orderId: 'Order ID',
  orderLineId: 'Order Line ID',
  locale: 'Locale',
  licenseProviderDefinition: 'License provider definition',
  publisherProductId: 'Publisher product ID',
  creationInProgress: 'Creation In Progress',
  creationFailed: 'Creation Failed',
  running: 'Running',
  canceled: 'Canceled',
  paused: 'Paused',
  expired: 'Expired',
  notificationHistoryId: 'Notification History ID',
  event: 'Event',
  webhookSuccessResponse: 'Webhook Success Response',
  cartId: 'Cart ID',
  checkoutUrl: 'Checkout URL',
  cartsUpdateDate: 'Update date',
  scheduledRemoval: 'Scheduled Removal',
  acquisition: 'Acquisition',
  genericName: 'Name',
  defaultLocale: 'Default Language',
  eventMatching: 'Event Matching',
  templating: 'Templating',
  mainIdJsonPath: 'JSON path to main ID',
  filters: 'Filters',
  jsonPath: 'JSON Path',
  matchingRegex: 'Matching regexp',
  addFilter: 'Add filter',
  mailSubjectTemplate: 'Mail subject',
  mailBodyTemplate: 'Mail body',
  webHookPayloadTemplate: 'Webhook payload',
  licenseProviderDefinitionId: 'License Provider Definition ID',
  executionId: 'Execution ID',
  timeOfTheRequest: 'Time Of The request',
  requestOperation: 'Request operation',
  requestUserEmail: 'Request user email',
  processingDataLicenseId: 'Processing data license ID',
  quantity: 'Quantity',
  activationCodeKey: 'Activation Code/Key',
  vat: 'VAT',
  vatNumber: 'VAT number',
  taxOffice: 'Tax Office',
  net: 'Net',
  gross: 'Gross',
  netPrice: 'Net price',
  grossPrice: 'Gross price',
  vatAmount: 'Vat amount',
  discountedNetPrice: 'Net price discounted',
  discountedGrossPrice: 'Gross price discounted',
  vatDiscountAmount: 'Vat amount discounted',
  transactionId: 'Transaction ID',
  subscriptionStatus: 'Subscription Status',
  creditNoteId: 'Credit Note ID',
  cancelationReasons: 'Cancelation Reasons',
  preorder: 'Preorder',
  custoemrStatus: 'Custoemr Status',
  splitPayment: 'Split Payment',
  customerStatus: 'Customer Status',
  informativeDPStatus: 'Estimated Payment status',
  billingPlan: 'Billing plan',
  init: 'Init',
  pendingReview: 'Pending Review',
  pending: 'Pending',
  pendingCapture: 'Pending Capture',
  pendingRefund: 'Pending Refund',
  accepted: 'Accepted',
  captured: 'Captured',
  error: 'Error',
  failed: 'Failed',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
  partialRefunded: 'Partial Refunded',
  chargeback: 'Chargeback',
  chargebackReversed: 'Chargeback Reversed',
  refused: 'Refused',
  success: 'Success',
  failure: 'Failure',
  initialized: 'Initialized',
  creationPending: 'Creation Pending',
  creationFailure: 'Creation Failure',
  creationAccepted: 'Creation Accepted',
  cancelPending: 'Cancel Pending',
  cancelFailure: 'Cancel Failure',
  cancelAccepted: 'Cancel Accepted',
  chargebackAlert: 'Chargeback Alert',
  chargeBack: 'ChargeBack',
  doubleOrder: 'Double Order',
  disappointingProduct: 'Disappointing Product',
  disappointingService: 'Disappointing Service',
  fraudSuspicion: 'Fraud Suspicion',
  orderCancellation: 'Order Cancellation',
  outOfStock: 'Out Of Stock',
  partnersCancellationRequest: 'Partners Cancellation Request',
  priceSubscriptionEvolution: 'Price Subscription Evolution',
  productTechnicalIssue: 'Product Technical Issue',
  subscriptionFlexibility: 'Subscription Flexibility',
  technicalIssue: 'Technical Issue',
  unsettledTransactions: 'Unsettled Transactions',
  unwillingSubscription: 'Unwilling Subscription',
  vatIssue: 'VAT Issue',
  wrongProductChoice: 'Wrong Product Choice',
  yes: 'Yes',
  no: 'No',
  operationDetails: 'Operation Details',
  httpConfiguration: 'HTTP Configuration',
  enable: 'Enable',
  disable: 'Disable',
  testMode: 'TestMode',
  format: 'Format',
  baseUrl: 'Base URL',
  urlComplement: 'URL Complement',
  bodyTemplate: 'Body Template',
  activationCode: 'Activation Code',
  responsePaths: 'Response Paths',
  conversionTemplate: 'Conversion Template',
  downloadExpireDate: 'Download ExpireDate',
  downloadUrl: 'Download URL',
  errorMessage: 'Error Message',
  errorStatusCodesOnePerLine: 'Error status codes (one per line)',
  contentType: 'Content Type',
  aAuth2_0Configuration: 'OAuth 2.0 configuration',
  tokenUrl: 'Token URL',
  tlsAuthMode: 'TLS Auth Mode',
  caCertificate: 'CA Certificate',
  testModeHTTPConfiguration: 'Test mode HTTP configuration',
  baseUrlTest: 'Base URL (Test)',
  operationExecutions: 'Operation Executions',
  autoFulfillments: 'Auto Fulfillments',
  manualFulfillments: 'Manual Fulfillments',
  licenseProviderDefinitions: 'License Provider Definitions',
  packageId: 'Package ID',
  available: 'Available',
  blacklisted: 'Blacklisted',
  occupied: 'Occupied',
  renewed: 'Renewed',
  threshold: 'Threshold',
  providerDefinitionId: 'Provider Definition ID',
  definitionName: 'Definition Name',
  inProgress: 'In Progress',
  done: 'Done',
  delayMn: 'Delay (mn)',
  abandonedCart: 'Abandoned Cart',
  abandonedCarts: 'Abandoned Carts',
  priceFunctionId: 'Price Function ID',
  priceFunctionName: 'Price Function Name',
  from: 'From',
  to: 'To',
};

export default labels;
