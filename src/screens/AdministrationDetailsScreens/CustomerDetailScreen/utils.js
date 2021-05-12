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

const checkRequiredFields = (data) => {
  const fulfillments = fromObjToArray(data.fulfillments);
  const subscriptions = fromObjToArray(data.subscriptions);

  return ({
    ...defCustomerObj, ...data, fulfillments, subscriptions,
  });
};
export default checkRequiredFields;
