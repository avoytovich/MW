const requiredFields = {
  delay: 1,
  name: '',
  startDate: new Date(),
  endDate: new Date(),
  status: 'Active',
  type: 'AbandonedCart',

};
const validPeriodOptions = [
  {
    id: 'unlimited',
    value: 'unlimited',
  },
  {
    id: 'after',
    value: 'after',
  }, {
    id: 'before',
    value: 'before',
  }, {
    id: 'between',
    value: 'between',
  },
];

const beforeSend = (obj) => {
  const res = { ...obj };
  if (obj.validPeriod === 'unlimited') {
    delete res.startDate;
    delete res.endDate;
  } else if (obj.validPeriod === 'after') {
    delete res.endDate;
  } else if (obj.validPeriod === 'before') {
    delete res.startDate;
  }
  delete res.validPeriod;
  return res;
};

const checkRequiredFields = (data) => {
  let validPeriod = 'unlimited';
  if (data.startDate && data.endDate) {
    validPeriod = 'between';
  } else if (data.startDate) {
    validPeriod = 'after';
  } else if (data.endDate) {
    validPeriod = 'before';
  }
  return { ...requiredFields, ...data, validPeriod };
};
export { validPeriodOptions, beforeSend, checkRequiredFields };
