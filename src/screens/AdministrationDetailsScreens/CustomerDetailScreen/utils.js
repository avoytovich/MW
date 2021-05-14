const defCustomerObj = {
  subscriptions: [],
  fulfillments: [],
  cancelPeriod: '',
  email: '',
  status: 'RUNNING',
  name: '',
  iamClient: { realmName: '' },
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
const checkRequiredFields = (data) => {
  const fulfillments = fromObjToArray(data.fulfillments);
  const subscriptions = fromObjToArray(data.subscriptions);

  return ({
    ...defCustomerObj, ...data, fulfillments, subscriptions,
  });
};

const formatBeforeSanding = (data) => {
  const resObj = { ...data };
  if (data.fulfillments) {
    resObj.fulfillments = fromArrayToObj(data.fulfillments);
  }
  if (data.subscriptions) {
    resObj.subscriptions = fromArrayToObj(data.subscriptions);
  }
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

export {
  checkRequiredFields, formatBeforeSanding, checkBoxObj, formatPaymentOptions,
};
