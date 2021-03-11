const labels = {
  creationDate: 'Creation Date',
  lastUpdate: 'Last Update',
  name: 'Name',
  publisherRefID: 'Publisher Ref ID',
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
  storeID: 'Store ID',
  id: 'ID',
  customer: 'Customer',
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
  invoiceID: 'InvoiceID',
  currency: 'Currency',
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
  productID: 'Product ID',
  family: 'Family',
  externalContext: 'External Context',
  priceFunction: 'Price function',
  hostnames: 'Hostnames',
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
  startDate: 'Start Date',
  endDate: 'End Date',
  ruleName: 'Rule Name',
  levels: 'Level(s)',
  sources: 'Source(s)',
  weight: 'Weight',
  discountRuleName: 'Discount Rule Name',
  model: 'Model',
  discountAmount: 'Discount Amount',
  maximumUses: 'Maximum Uses',
  user: 'User',
  application: 'Application',
  firstName: 'First Name',
  lastName: 'Last Name',
  userName: 'User Name',
  privileges: 'Privileges',
  roles: 'Roles',
  metaRoles: 'Meta-roles',
  fontFamily: 'Font Family',
  importCssRule: '@import css rule',
  themes: 'Themes',
  layouts: 'Layouts',
  translations: 'Translations',
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
  css: 'CSS',
  fallbackLocale: 'Fallback locale',
  catalog: 'Catalog',
  businessSegment: 'Business Segment',
  physicalProduct: 'Physical Product',
  blockedCountries: 'Blocked Countries',
  localizedContent: 'Localized Content',
  productVariations: 'Product Variations',
  productFiles: 'Product Files',
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
  marketingName: 'Marketing name',
  shortDesc: 'Short description',
  longDesc: 'Long description',
  thankYouDesc: 'Thank you description',
  purchaseEmailDesc: 'Purchase description',
  manualRenewalEmailDesc: 'Manual renewal description',
  addLanguage: 'Add Language',
  selectFile: 'Select File',
  freeLabel: 'Free label',
  url: 'URL',
  dropFileOrSelect:
    'Select files from your computer or click add icon to enter custom URL',
  relatedContents: 'Related Contents',
  resources: 'Resources',
  label: 'Label',
  headerLogo: 'Header Logo',
  boxshot: 'Boxshot',
  icon: 'Icon',
  bundledProducts: 'Bundled products',
  variationParameters: 'Variation parameters',
  createDate: 'Create date',
  source: 'Source',
  unpaidAmount: 'Unpaid Amount',
  salesFlags: 'Sales Flags',
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
  displayProductDeliveryOnCheckoutConfirmation:
    'Display product delivery on checkout confirmation',
  enableRecipientCode: 'Enable Recipient Code',
  eligibleEndUserTypes: 'Eligible End User Types',
  allowQuotes: 'Allow Quotes',
  externalContextGenerationParamsOnePerLine:
    'External Context Generation Params (one per line)',
  externalContextAlias: 'External Context Alias',
  useGeoIpToForceEnduserCountry: 'Use GeoIp to force Enduser country',
  fallbackCartCountry: 'Fallback Cart Country',
  resellerAuthentication: 'Reseller authentication',
  buyerAuthentication: 'Buyer authentication',
  noAuthentication: 'No authentication',
  routes: 'Routes',
};

export default labels;
