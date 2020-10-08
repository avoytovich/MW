const Forms = {
  headers: {
    signIn: 'Sign in',
    tableFilters: 'Table Filters',
    noFilters: 'No Filters Available',
  },
  text: {
    dontHaveAccount: "Don't have an account",
    signInSso: 'Sign in With SSO',
    loginWithEmailAddress: 'or login with email address',
    forgotPassword: 'Forgot password',
    unlimited: 'Unlimited',
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
    contains: 'Contains',
    googleLogin: 'LOGIN WITH GOOGLE',
  },
  links: {
    signUp: 'Sign Up',
    signIn: 'Back to sign in page',
    lostPassword: 'Forgotten password',
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
  },
};

export default Forms;
