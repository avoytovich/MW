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

export { checkRequiredFields, formatBeforeSanding };
