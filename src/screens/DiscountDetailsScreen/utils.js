const filterOptions = (all, selected, currentValue) => {
  const keys = [...selected].map((item) => item.key);
  const res = all.filter(
    (option) => !keys.includes(option.id) || option.id === currentValue,
  );
  return res;
};

const fromObjectToArray = (object, keyValue, defParam) => {
  const res = Object.keys({
    ...object,
  }).map((item) => (
    keyValue === 'key' ? {
      key: item,
      value: object[item],
    } : {
      key: object[item],
      value: item,
    }
  ));
  if (res.length === 0 && defParam) {
    res.push(defParam);
  }
  return res;
};
const formatCodesToObject = (data) => {
  const array = [...data];
  array.shift();
  const res = { [data[0].value]: data[0].key };
  array.forEach((item) => {
    if (!res[item.value]) {
      res[item.value] = [item.key];
    } else if (Array.isArray(res[item.value])) {
      res[item.value] = [...res[item.value], item.key];
    }
  });
  return res;
};
const formatCodesToArray = (obj, defParam) => {
  const res = [];
  if (obj) {
    Object.keys(obj).forEach((key) => {
      if (!Array.isArray(obj[key])) {
        res.push({ key: obj[key], value: key });
      } else {
        obj[key].forEach((item) => {
          res.push({ key: item, value: key });
        });
      }
    });
  }
  if (res.length === 0 && defParam) {
    res.push(defParam);
  }
  return res;
};

const fromArrayToObject = (array, keyValue) => {
  const res = {};
  array.forEach((item) => {
    if (item.value && item.key) {
      if (keyValue === 'key') {
        res[item.key] = item.value;
      } else {
        res[item.value] = item.key;
      }
    }
  });
  return res;
};

const tabsLabels = ['general', 'cappingAndLimits', 'eligibility', 'singleUseCodesGenerations'];

const discountRequiredFields = (discount) => {
  const defDiscount = {
    discountRate: 0.1,
    publisherRefIds: [],
    name: '',
    maxUsages: '',
    maxUsePerStore: '',
    maxUsePerEndUser: '',
    countries: [],
    parentProductIds: [],
    productIds: [],
    enduserId: '',
    storeIds: [],
    codes: {},
    endUserGroupIds: [],
    endUserEmails: [],
    level: 'PRODUCT',
    model: 'CAMPAIGN',
    status: 'ENABLED',
    endDate: Date.now() + 6.048e8,
    endUserTypes: ['BUYER', 'RESELLER'],
    sources: [],
  };
  const amountByCurrency = fromObjectToArray(
    discount.amountByCurrency,
    'key',
  );
  const thresholds = fromObjectToArray(
    discount.thresholds,
    'key',
    { key: '', value: '' },
  );
  const codes = formatCodesToArray(discount.codes, {
    key: 'default',
    value: '',
  });
  const localizedLabels = fromObjectToArray(
    discount.localizedLabels,
    'key',
    { key: 'neutral', value: '' },
  );

  const resObj = {
    ...defDiscount,
    ...discount,
    amountByCurrency,
    thresholds,
    codes,
    localizedLabels,
  };
  if (resObj.discountRate && resObj.discountRate < 1) {
    resObj.discountRate = discount.discountRate * 100;
  }

  return resObj;
};
export {
  filterOptions,
  fromObjectToArray,
  fromArrayToObject,
  tabsLabels,
  discountRequiredFields,
  formatCodesToObject,
  formatCodesToArray,
};
