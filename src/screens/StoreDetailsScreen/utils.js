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
  'assetsResource',
];
const formDesignOptions = (options, customers) => (options
  ? options.map((option) => {
    const curCustomer = customers.find(
      (customer) => customer.id === option.customerId,
    );
    return {
      value: `${curCustomer ? curCustomer.name : option.customerId}: ${
        option.name
      }`,
      id: `${curCustomer ? curCustomer.id : option.customerId}: ${
        option.name
      }`,
    };
  })
  : []);

const filterOptions = (all, selected, currentIndex) => {
  const availableCountries = [...selected].filter(
    (item, i) => i !== 0 && i !== currentIndex,
  );
  let keys = [];
  availableCountries.forEach((item) => {
    keys = [...keys, ...item.countries];
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
    if (data[key]) {
      resultArray.push({ label: `${key}`, url: data[key], key: index });
    }
  });
  return resultArray;
};
const checkLabelDuplicate = (values) => {
  const valueArr = values.map((item) => item.label);
  return valueArr.some((item, id) => valueArr.indexOf(item) !== id);
};
export {
  formDesignOptions,
  filterOptions,
  resourceLabel,
  structureResources,
  checkLabelDuplicate,
  resourcesKeys,
  tabLabels,
};