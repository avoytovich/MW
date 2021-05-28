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

const tabsLabels = ['general', 'cappingAndLimits', 'eligibility'];

const discountRequiredFields = (discount) => {
  const defDiscount = {
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
  const codes = fromObjectToArray(discount.codes, 'value', {
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
  filterOptions, fromObjectToArray, fromArrayToObject, tabsLabels, discountRequiredFields,
};
