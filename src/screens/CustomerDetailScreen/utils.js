import localization from '../../localization';

const defCustomerObj = {
  name: '',
  email: '',
  features: {
    connectManagement: false,
    createInvoice: false,
    onboardingManagement: false,
    productManagement: false,
    remittanceManagement: false,
    resellerManagement: false,
    sellOnBehalf: false,
    seller: false,
    sendOrderConfirmationEmail: false,
    sgOrdersManagement: false,
    subscriptionUpgradeAuthorized: false,
    usingBillingPlan: false,
    usingFulfillmentV1: false,
    usingSubscriptionV1: false,
  },
  iamClient: { realmName: '' },
};

const editCustomerDefObj = {
  subscriptions: [],
  promoteOneClickPayment: false,
  paymentServiceConfiguration: {
    maxPaymentsParts: 1,
    minPaymentAmountInPercent: 10,
    signedPartialAmountRequired: false,
    availableAdditionalPaymentTypes: [],
    blackListedPaymentTypes: [],
    forcedPaymentTypes: [],
  },
  remittableId: '',
  createEndUserWithoutSubscription: false,
  fulfillments: [],
  paymentVendor: '',
  cancelPeriod: '',
  status: 'RUNNING',
};
const assetsLabels = [
  { id: 'onboardingGuide', value: localization.t('labels.onboardingGuide'), apiKey: 'onboardingGuideUrl' },
  { id: 'onboardingTerms', value: localization.t('labels.onboardingTerms'), apiKey: 'onboardingTermsUrl' },
];

const assetsFormatting = (data) => {
  const assets = [];
  if (data.onboardingGuideUrl) {
    assets.push(
      { label: assetsLabels[0].id, url: data.onboardingGuideUrl, key: assetsLabels[0].id },
    );
  }
  if (data.onboardingTermsUrl) {
    assets.push(
      { label: assetsLabels[1].id, url: data.onboardingTermsUrl, key: assetsLabels[1].id },
    );
  }
  return assets;
};
const fromObjToArray = (obj) => {
  const resArray = [];
  Object.keys(obj).forEach((item) => resArray.push(item));
  return resArray;
};
const fromArrayToObj = (array) => {
  const resObj = {};
  if (array.length > 0) {
    array.forEach((item) => { resObj[item] = item; });
  }
  return resObj;
};
const checkRequiredFields = (data, createCustomer) => {
  let res = {
    ...defCustomerObj, ...data,
  };
  if (!createCustomer) {
    res = { ...res, ...editCustomerDefObj };
    const fulfillments = data.fulfillments ? fromObjToArray(data.fulfillments) : [];
    const subscriptions = data.subscriptions ? fromObjToArray(data.subscriptions) : [];
    const paymentServiceConfiguration = {
      ...editCustomerDefObj.paymentServiceConfiguration,
      ...data.paymentServiceConfiguration,
    };
    const assets = assetsFormatting(data);
    res = {
      ...res, fulfillments, subscriptions, paymentServiceConfiguration, assets,
    };
    delete res.onboardingGuideUrl;
    delete res.onboardingTermsUrl;
  }
  return res;
};

const formatBeforeSanding = (data) => {
  const resObj = { ...data };
  if (data.fulfillments) {
    resObj.fulfillments = fromArrayToObj(data.fulfillments);
  }
  if (data.subscriptions) {
    resObj.subscriptions = fromArrayToObj(data.subscriptions);
  }
  if (data.assets?.length > 0) {
    data.assets.forEach((asset) => {
      const key = assetsLabels.find((item) => item.id === asset.label).apiKey;
      resObj[key] = asset.url;
    });
  }
  delete resObj.assets;
  return resObj;
};

const formatPaymentOptions = (options) => {
  const additional = [];
  const black = [];
  const forced = [];

  options.forEach((item) => {
    if (item.status === 'DEFAULT') {
      black.push({ id: item.id, value: item.id });
    } else if (item.status === 'OPTIONAL') {
      additional.push({ id: item.id, value: item.id });
    }
    if (!item.creditCard) {
      forced.push({ id: item.id, value: item.id });
    }
  });
  return { additional, black, forced };
};

const checkBoxObj = {
  platformModules: ['sgOrdersManagement', 'resellerManagement', 'onboardingManagement',
    'remittanceManagement', 'productManagement'],
  workflowAgreement: ['seller', 'sellOnBehalf', 'createInvoice', 'sendOrderConfirmationEmail'],
  technicalFeatures: ['subscriptionUpgradeAuthorized', 'usingSubscriptionV1', 'usingFulfillmentV1'],
};

const checkLabelDuplicate = (values) => {
  const valueArr = values?.map((item) => item.label);
  return valueArr?.some((item, id) => valueArr.indexOf(item) !== id);
};

const checkExistingLabelsUrl = (values) => {
  const checkExistingLabel = values?.map((item) => item.label).every((item) => item);
  const checkExistingUrl = values?.map((item) => item.url).every((item) => item);
  return checkExistingLabel && checkExistingUrl;
};

export {
  checkRequiredFields,
  formatBeforeSanding,
  checkBoxObj,
  formatPaymentOptions,
  assetsLabels,
  checkExistingLabelsUrl,
  checkLabelDuplicate,
};
