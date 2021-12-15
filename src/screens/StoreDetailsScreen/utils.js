import localization from '../../localization';

const resourcesKeys = [
  'logoFavicon',
  'bannerInvoice',
  'bannerOrderConfEmail',
  'logoStore',
];

const tabLabels = [
  'general',
  'design',
  'payment',
  'localizedContent',
];
const checkGroupFields = (data) => {
  let checkingPassed = false;
  if (data?.paymentGroups && Object.keys(data?.paymentGroups).length) {
    const emptyFields = Object.keys(
      data.paymentGroups,
    ).find((item) => {
      const emptyRankedPaymentTabs = Object.keys(data.paymentGroups[item].options)
        .find((option) => data.paymentGroups[item].options[option].rankedPaymentTabs.length === 0);
      return data.paymentGroups[item].countries.length === 0
        || emptyRankedPaymentTabs;
    });
    checkingPassed = !!emptyFields;
  }
  return checkingPassed;
};
const formDesignOptions = (options, customers) => (options
  ? options.map((option) => {
    const curCustomer = customers.find(
      (customer) => customer.id === option.customerId,
    );
    return {
      value: `${curCustomer ? curCustomer.name : option.customerId}: ${option.name
        }`,
      id: `${curCustomer ? curCustomer.id : option.customerId}: ${option.name
        }`,
    };
  })
  : []);

const filterOptions = (all, selected, curKey) => {
  const obj = { ...selected };
  delete obj[curKey];
  const keys = [];
  Object.keys(obj).forEach((key) => {
    keys.push(...obj[key].countries);
  });
  const res = all.filter((option) => !keys.includes(option.id));
  return res;
};

const resourceLabel = [
  { id: 'logoFavicon', value: localization.t('labels.logoFavicon') },
  {
    id: 'bannerInvoice',
    value: localization.t('labels.bannerInvoice'),
  },
  {
    id: 'bannerOrderConfEmail',
    value: localization.t('labels.bannerOrderConfEmail'),
  },
  { id: 'logoStore', value: localization.t('labels.logoStore') },
];

const structureResources = (data) => {
  const resultArray = [];
  resourcesKeys.forEach((key, index) => {
    if (data[key] || data[key] === '') {
      resultArray.push({ label: `${key}`, url: data[key], key: index });
    }
  });
  return resultArray;
};

const checkExistingLabelsUrl = (values) => {
  const checkExistingLabel = values.map((item) => item.label).every((item) => item);
  const checkExistingUrl = values.map((item) => item.url).every((item) => item);
  return checkExistingLabel && checkExistingUrl;
};

const checkLabelDuplicate = (values) => {
  const valueArr = values.map((item) => item.label);
  return valueArr.some((item, id) => valueArr.indexOf(item) !== id);
};

const formatBeforeSending = (currentStoreData, currentStoreResources, resourcesHasChanges) => {
  const updatedData = { ...currentStoreData };
  Object.keys(updatedData).forEach((item) => {
    if (updatedData[item] === '') {
      delete updatedData[item];
    }
  });

  if (resourcesHasChanges) {
    let notUsedKeys = [...resourcesKeys];
    currentStoreResources.forEach((item) => {
      notUsedKeys = notUsedKeys.filter((key) => key !== item.label);
      updatedData[item.label] = item.url;
    });
    notUsedKeys.forEach((key) => {
      delete updatedData[key];
    });
  }
  const newRankedPayment = [
    currentStoreData.designs.paymentComponent.rankedPaymentTabsByCountriesList[0],
  ];
  const resPaymentGroups = { ...currentStoreData.paymentGroups };
  if (Object.keys(resPaymentGroups).length > 0 && resPaymentGroups[0].countries.length > 0) {
    Object.keys(resPaymentGroups).forEach(
      (key) => {
        Object.keys(resPaymentGroups[key].options).forEach((option) => {
          newRankedPayment.push({
            countries: [...resPaymentGroups[key].countries],
            rankedPaymentTabs: [...resPaymentGroups[key].options[option].rankedPaymentTabs],
            customerType: resPaymentGroups[key].options[option].customerType,
          });
        });
      },

    );
  }
  updatedData.designs = {
    ...updatedData.designs,
    paymentComponent: {
      ...currentStoreData.designs.paymentComponent,
      rankedPaymentTabsByCountriesList: newRankedPayment,
    },
  };
  delete updatedData.paymentGroups;
  return updatedData;
};
const customerTypeOptions = [{ id: 'PERSONAL', value: 'Personal' }, { id: 'COMPANY', value: 'Company' }];

const handleTypeOptions = (selected, curKey) => {
  const obj = { ...selected };
  delete obj[curKey];
  const keys = [];
  Object.keys(obj).forEach((key) => {
    keys.push(obj[key].customerType);
  });
  return keys;
};

export {
  formDesignOptions,
  filterOptions,
  resourceLabel,
  structureResources,
  checkLabelDuplicate,
  checkExistingLabelsUrl,
  resourcesKeys,
  tabLabels,
  formatBeforeSending,
  customerTypeOptions,
  handleTypeOptions,
  checkGroupFields,
};
