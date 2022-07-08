const Forms = {
  headers: {
    signIn: 'Sign in',
    tableFilters: 'Table Filters',
    noFilters: 'No Filters Available',
    welcome: 'Welcome',
    findByCC: 'Find orders with card digits',
    findByCCDesc: 'From there you can find an order with the card bin and/or the last four digits, the date, the amout and the currency.',
    findByCCNote: 'Note that only the cardBin or the last four digits are mandatory.',
  },
  subHeaders: {
    loginWelcomSubHeader: 'Through nexway’s Nexway Center interface, you will be able to get a 360-degree view of your e-store’s performance, and to access all orders in real time.',
  },
  text: {
    dontHaveAccount: "Don't have an account",
    signInSso: 'Sign in With SSO',
    loginWithEmailAddress: 'or login with email address',
    forgotPassword: 'Forgot password',
    unlimited: 'Unlimited',
    cancelOrder: 'Cancel Order',
    cancelOrderPopupText: 'Are you sure you want to cancel Order, and refund payment to the end-user ?',
    sendConfirmationEmail: 'Send confirmation mail again',
    sendConfirmationEmailText: 'Send confirmation email on the following email address:',
    sendCancellationMail: 'Send cancellation mail again',
    SendPrebillingMailAgain: 'Send resources.orders.misc.emailTemplates.PREBILLING mail again',
    repairOrder: 'Repair Order',
  },
  inputs: {
    username: 'Username',
    password: 'Password',
    email: 'Email address',
    createPassword: 'Password',
    confirmPassword: 'Confirm password',
    productName: 'Product name',
    publisherRefId: 'Publisher Ref ID',
    type: 'Type',
    sellingStores: 'Selling stores',
    subscriptionTemplate: 'Subscription Template',
    fulfillmentTemplate: 'Fulfillment Template',
    productFamily: 'Product family',
    blockedCountries: 'Blocked countries',
    catalog: 'Catalog',
    enabled: 'Enabled',
    externalContext: 'External Context',
    physical: 'Physical',
    priceFunction: 'Price function',
    name: 'Name',
    displayName: 'Display name',
    localizedContent: {
      marketing: 'Marketing name',
      longDesc: 'Long description',
      shortDesc: 'Short description',
      remark: 'Product delivery remark',
      defaultLanguage: 'Default language',
      deliveryRemark: 'Delivery remark',
      localizedZendeskGuideUrls: 'Localized Zendesk Guide Urls',
      localizedShortDesc: 'Short Description',
      localizedLongDesc: 'Long Description',
      bannerImageUrl: 'Banner Image URL',
      localizedLogo: 'Logo URL',
      bannerLinkUrl: 'Banner Link URL',
    },
    allowOrderDetailsOnCheckoutConfirmation:
      'Display product delivery on checkout confirmation',
    allowQuotes: 'Allow quotes',
    createEndUserWithoutSubscription: 'Force End-user creation',
    defaultLocale: 'Default Language',
    eligibleEndUserTypes: {
      buyer: 'Buyer authentication',
      no: 'No authentication',
      reseller: 'Reseller authentication',
    },
    forceGeoipLocalization: 'Use GeoIp to force Enduser country',
    gtmId: 'GTM ID',
    nexwayGtmId: 'GTM ID (owned by Nexway)',
    promoteOneClickPayment: 'Promote one-click payment',
    saleLocales: 'Sale Languages',
    storeWebsite: 'Store website',
    productRecommendationTypes: {
      crossSell: 'Cross Sell',
      upSell: 'Up Sell',
    },
    productRecommendationLevels: {
      product: 'Product',
      cart: 'Cart',
      interstitial: 'Interstitial',
      purchase: 'Purchase',
    },
    productRecommendationSources: {
      purchase: 'Purchase',
      manualRenewal: 'Manual Renewal',
    },
    weight: 'Weight',
    stores: 'Stores',
    byProducts: 'By products',
    byParentProducts: 'By parent products',
  },
  buttons: {
    createAccount: 'Create your account',
    signIn: 'Sign In',
    signOut: 'Sign out',
    save: 'Save',
    submit: 'Submit',
    createPassword: 'Set a new password',
    reset: 'Reset',
    apply: 'Apply',
    clear: 'Clear',
    cancel: 'Cancel',
    exact: 'Is Exactly',
    startsWith: 'Starts with',
    googleLogin: 'LOGIN WITH GOOGLE',
    actions: 'ACTIONS',
    resyncPayments: 'Resync Payments',
    resyncPaymentsNo: 'No',
    resyncPaymentsConfirmed: 'Yes, confirmed',
    confirmationEmailCancel: 'Cancel',
    confirmationEmailSend: 'Send',
    close: 'Close',
    search: 'Search',
    sendByEmail: 'Send by email',
    retrySending: 'Retry sending',
    generateQuote: 'Generate quote',
    checkout: 'Checkout',
    clone: 'Clone',
  },
  links: {
    signUp: 'Sign Up',
    signIn: 'Back to sign in page',
    lostPassword: 'Forgotten password',
    logInToYourAccount: 'Log in to your account',
  },
  messages: {
    welcome: 'Welcome',
    welcomeBack: 'Welcome back',
    createAccount:
      'Need an account? Click the button below to fill-in a short registration form: ',
    signIn:
      'Through Nexway’s Nexway Center interface, you will be able to get a 360-degree view of your e-store’s performance, and to access all orders in real time. Let’s get started by logging you in.',
    wrongCredentials: 'Wrong username or password',
    createPasswordTitle: 'Create a password',
    createPassword: 'Follow the instructions to set a new password',
    createPasswordInvalid: 'Url to recreate password is no longer valid',
    changedField: 'You have {{count}} change',
    changedField_plural: 'You have {{count}} changes',
    selectFiles: 'Select files',
    clickOrDrop: 'Click or drop files here',
    newParamFirstTip: 'First pick a name for this new parameter. This name will be used in price functions definitions.',
    newParamFirstExtraTip: 'Allowed: alphanumeric characters and underscore',
    newParamSecondTip: "Give a display string for this parameter, in language 'en-US'.",
    newParamSecondExtraTip: 'The label displayed to the buyer when refering to this parameter',
    newParamThirdTip: 'Now choose the type of the parameter:',
    parametersNameTip: 'The name of parameters are referenced by product price functions, it can contain any alphanumeric characters and underscores.',
    parametersStringTip: 'The parameter display string is displayed in checkout page to your buyer. You can define it for every needed language.',
    parametersValuesTip: 'Manage the values your parameter can take and how these values are displayed to the user.',
  },
  sections: {
    general: 'General',
    subscription: 'Fulfillment & Subscription',
    localizedContent: 'Localized content',
    prices: 'Prices',
    bundledProducts: 'Bundled products',
    variationParams: 'Variation parameters',
    productVariations: 'Product variations',
    productFiles: 'Product files',
    design: 'Design',
    paymentTabsRanking: 'Payment Tabs Ranking',
    assets: 'Assets',
    eligibility: 'Eligibility',
    recommendations: 'Recommendations',
    cappingLimits: 'Capping and limits',
  },
  labels: {
    product: {
      headerLogo: 'Header Logo',
      boxshot: 'Boxshot',
      icon: 'Icon',
    },
    store: {
      confirmation: 'Confirmation email banner',
      favicon: 'Favicon',
      invoice: 'Invoice banner',
      logo: 'Logo',
    },
    confirmationEmailAddress: 'Email Address',
    selectView: 'Select a view',
    addView: 'Add new view',
  },
};

export default Forms;
