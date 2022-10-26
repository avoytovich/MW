import * as R from 'ramda';

import {
  structureSelectOptions,
  renewingProductsOptions,
  createInheritableValue,
  productsVariations,
  localizedValues,
  backToFront,
  frontToBack,
  checkValue,
} from '../../services/helpers/dataStructuring';

import api from '../../api';

const handleGetOptions = (
  setLoading,
  customerId,
  id,
  isCancelled,
  setSelectOptions,
  selectOptions,
  setSubProductVariations,
  setCatalog,
  hasParent,
) => {
  let subscriptionOptions = null;

  const promiseArray = [
    api.getSellingStoreOptions(customerId),
    api.getRenewingProductsByCustomerId(customerId),
    api.getFulfillmentTemplateByCustomerId(customerId),
    api.getCatalogsByCustomerId(customerId),
    api.getPriceFunctionsCustomerByIds(customerId),
    (id && !hasParent) ? api.getSubProductsById(id) : null,
  ];

  api.getCustomerById(customerId).then(({ data: curCustomer }) => {
    if (curCustomer?.usingSubscriptionV1) {
      promiseArray.push(api.getSubscriptionModelsByCustomerId(customerId));
    } else {
      subscriptionOptions = Object.keys(curCustomer?.subscriptions).map((item) => ({
        id: item,
        value: item,
      }));
    }

    Promise.all(promiseArray).then(
      ([
        sellingStores,
        renewingProducts,
        fulfillmentTemplates,
        catalogs,
        priceFunctionsOptions,
        subProducts,
        subscriptions,
      ]) => {
        if (!subscriptionOptions) {
          subscriptionOptions = structureSelectOptions({ options: subscriptions?.data?.items, optionValue: 'name' });
        }

        setSubProductVariations({
          bundledProducts: id === null ? [] : subProducts?.data?.items,
          variations: productsVariations(renewingProducts?.data?.items, id),
        });

        if (!isCancelled) {
          setSelectOptions({
            ...selectOptions,
            sellingStores:
              structureSelectOptions({ options: sellingStores?.data?.items, optionValue: 'name', otherOptions: ['hostnames', 'saleLocales', 'defaultLocale'] }) || [],
            renewingProducts: renewingProductsOptions(renewingProducts?.data?.items) || [],
            fulfillmentTemplates:
              structureSelectOptions({ options: fulfillmentTemplates?.data?.items, optionValue: 'name' }) || [],
            catalogs: structureSelectOptions({ options: catalogs?.data?.items, optionValue: 'name' }) || [],
            priceFunctions:
              structureSelectOptions({ options: priceFunctionsOptions?.data?.items, optionValue: 'name' }) || [],
            subscriptionModels: subscriptionOptions || [],
          });

          if (catalogs.data?.items?.length) {
            setCatalog(catalogs.data?.items[0].id);
          }
        }
      },
    );
  }).finally(() => setLoading(false));
};

const handleGetProductDetails = (
  descriptionId,
  setVariablesDescriptions,
  setProductDetails,
) => {
  if (!descriptionId) return;
  const result = {};
  if (descriptionId?.state) {
    Promise.all([
      api.getProductDescriptionById(descriptionId?.value),
      api.getProductDescriptionById(descriptionId?.parentValue),
    ]).then(([productDescr, parentDescr]) => {
      const avail = [];

      localizedValues.forEach((it) => {
        if (productDescr?.data[it]) {
          Object.keys(productDescr?.data[it]).forEach((loc) => {
            if (avail.indexOf(loc) < 0) {
              avail.push(loc);
            }
          });
        }

        if (parentDescr?.data[it]) {
          Object.keys(parentDescr?.data[it]).forEach((loc) => {
            if (avail.indexOf(loc) < 0) {
              avail.push(loc);
            }
          });
        }
      });

      const { data } = productDescr;
      const { data: dataParent } = parentDescr;
      const i18nFields = avail.reduce((accumulator, current) => {
        const childLocalizedValues = localizedValues.reduce(
          (acc, curr) => ({ ...acc, [curr]: data[curr]?.[current] }),
          {},
        );
        const parentLocalizedValues = localizedValues.reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: dataParent[curr] ? dataParent[curr][current] : '',
          }),
          {},
        );
        return {
          ...accumulator,
          [current]: backToFront(parentLocalizedValues, childLocalizedValues),
        };
      }, {});

      const productDescrData = { ...productDescr?.data };
      localizedValues.forEach((item) => delete productDescrData[item]);
      // eslint-desible-next-line
      productDescrData.i18nFields = i18nFields;

      if (dataParent?.variableDescriptions) {
        setVariablesDescriptions(dataParent?.variableDescriptions);
      }

      setProductDetails(productDescrData);

      result.avail = avail;
    });
    return;
  }

  api.getProductDescriptionById(descriptionId).then(({ data }) => {
    const avail = [];

    localizedValues.forEach((it) => {
      if (data[it]) {
        Object.keys(data[it]).forEach((loc) => {
          if (avail.indexOf(loc) < 0) {
            avail.push(loc);
          }
        });
      }
    });

    const i18nFields = avail.reduce((accumulator, current) => {
      const childLocalizedValues = localizedValues.reduce(
        (acc, curr) => ({ ...acc, [curr]: data[curr] ? data[curr][current] : '' }),
        {},
      );

      return {
        ...accumulator,
        [current]: childLocalizedValues,
      };
    }, {});

    const productDescrData = { ...data };
    localizedValues.forEach((item) => delete productDescrData[item]);
    // eslint-desible-next-line
    productDescrData.i18nFields = i18nFields;

    if (data?.variableDescriptions) {
      setVariablesDescriptions(data?.variableDescriptions);
    }
    setProductDetails(productDescrData);
  });
};

const handleEditorParsing = (data, parentData, setCurLocalizedData, setLocalizedData) => {
  const avail = [];

  localizedValues.forEach((it) => {
    if (data[it]) {
      Object.keys(data[it]).forEach((loc) => {
        if (avail.indexOf(loc) < 0) {
          avail.unshift(loc);
        }
      });
    }

    if (parentData && parentData[it]) {
      Object.keys(parentData[it]).forEach((loc) => {
        if (avail.indexOf(loc) < 0) {
          avail.push(loc);
        }
      });
    }
  });

  const i18nFields = avail.reverse().reduce((accumulator, current) => {
    const childLocalizedValues = localizedValues.reduce(
      (acc, curr) => ({ ...acc, [curr]: data[curr]?.[current] ? data[curr][current] : '' }),
      {},
    );

    if (parentData) {
      const parentLocalizedValues = localizedValues.reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: parentData[curr] ? parentData[curr][current] : '',
        }),
        {},
      );

      return {
        ...accumulator,
        [current]: backToFront(parentLocalizedValues, childLocalizedValues),
      };
    }

    return {
      ...accumulator,
      [current]: childLocalizedValues,
    };
  }, {});

  const productDescrData = { ...data };

  localizedValues.forEach((item) => delete productDescrData[item]);

  productDescrData.i18nFields = { ...i18nFields };

  if (parentData) {
    const inheritedFallbackLocale = createInheritableValue(
      data.fallbackLocale,
      parentData.fallbackLocale,
    );

    productDescrData.fallbackLocale = inheritedFallbackLocale;
  } else if (!productDescrData?.fallbackLocale) {
    productDescrData.fallbackLocale = 'en-US';
  }

  if (setLocalizedData) {
    setLocalizedData({ ...productDescrData });
  }

  setCurLocalizedData({ ...productDescrData });
};

const saveLocalizationDetails = (tempData, currentProductData, nxState) => {
  const frontToBackObj = frontToBack({
    ...tempData,
    fallbackLocale: checkValue(tempData?.fallbackLocale) || 'en-US',
    i18nFields: tempData.i18nFields,
  });

  const i18nFields = Object.entries(frontToBackObj.i18nFields).reduce(
    (accumulator, [key, value]) => ({ ...accumulator, [key]: frontToBack(value || {}) }),
    {},
  );

  const localizedValuesToSave = localizedValues.reduce((acc, cur) => {
    const localizedValue = Object.entries(i18nFields).reduce((ac, [key, value]) => {
      if (i18nFields[key][cur] !== undefined) {
        return { ...ac, [key]: value[cur] };
      }
      return ac;
    }, {});
    return {
      ...acc,
      [cur]: localizedValue || {},
    };
  }, {});

  if (frontToBackObj.i18nFields) {
    delete frontToBackObj.i18nFields;
  }

  const dataToSave = R.mergeRight(frontToBackObj, localizedValuesToSave);

  if (!frontToBackObj?.customerId) {
    frontToBackObj.customerId = currentProductData?.customerId?.state
      ? currentProductData?.customerId?.value
      : (currentProductData?.customerId || nxState?.selectedCustomer?.id);
  }

  if (!Object.keys(dataToSave?.localizedMarketingName)?.length) {
    dataToSave.localizedMarketingName = { [dataToSave.fallbackLocale]: '' };
  }

  return dataToSave;
};

const createKey = (obj, newCurrency) => {
  let keyNumber = 0;
  if (checkValue(obj.priceByCountryByCurrency)[newCurrency]) {
    keyNumber = Number(
      checkValue(obj.priceByCountryByCurrency)[newCurrency][
        checkValue(obj.priceByCountryByCurrency)[newCurrency].length - 1
      ].key.split('_')[1],
    ) + 1;
  }
  return `${newCurrency}_${keyNumber}`;
};
const notShowMaxPaymentsPart = ['PERMANENT', '7DAY'];
const beforeSend = (data) => {
  const res = { ...data };
  const { state } = data.priceByCountryByCurrency;
  const priceByCountryByCurrency = {};
  const mapData = state ? data.priceByCountryByCurrency.value : data.priceByCountryByCurrency;
  Object.keys(mapData).forEach((el) => {
    priceByCountryByCurrency[el] = {};
    mapData[el].forEach((item) => {
      item.countries.forEach((country) => {
        const countryData = { ...item };
        delete countryData.countries;
        delete countryData.key;
        priceByCountryByCurrency[el][country] = countryData;
      });
    });
  });
  delete res.priceByCountryByCurrency;
  if (data.status.state) {
    res.status = { parentValue: data.status.parentValue, state: 'overrides', value: data.status.value };
  }
  if (res.subscriptionTemplate === '') {
    delete res.subscriptionTemplate;
  }
  res.prices = state
    ? { ...res.prices, value: { ...res.prices.value, priceByCountryByCurrency } }
    : { ...res.prices, priceByCountryByCurrency };
  return res;
};
const handleFilterOptions = (allOptions, selected, current) => {
  const allCountries = [];
  selected.forEach((it) => allCountries.push(...it.countries));
  const res = [{ id: 'default', value: 'default' }, ...allOptions].filter((el) => !allCountries.includes(el.id) || current.includes(el.id));
  return res;
};

const validateNumberInput = (curVal, prevVal) => {
  let res = true;
  if (
    (curVal === prevVal)
    || (curVal === '' && prevVal === undefined)) {
    res = false;
  }
  return res;
};
const defLocalizationObj = {
  localizedLongDesc: '',
  localizedManualRenewalEmailDesc: '',
  localizedMarketingName: '',
  localizedPurchaseEmailDesc: '',
  localizedShortDesc: '',
  localizedThankYouDesc: '',
};
const defProductVariationObj = {
  localizedLongDesc: { parentValue: '', state: 'inherits', value: '' },
  localizedManualRenewalEmailDesc: { parentValue: '', state: 'inherits', value: '' },
  localizedMarketingName: { parentValue: '', state: 'inherits', value: '' },
  localizedPurchaseEmailDesc: { parentValue: '', state: 'inherits', value: '' },
  localizedShortDesc: { parentValue: '', state: 'inherits', value: '' },
  localizedThankYouDesc: { parentValue: '', state: 'inherits', value: '' },
};

const tabLabels = [
  'general',
  'fulfillment',
  'subscription',
  'localizedContent',
  'prices',
  'productFiles',
  'productVariations',
];

const tabLabelsVariation = [
  'general',
  'fulfillment',
  'subscription',
  'localizedContent',
  'prices',
  'productFiles',
];

export {
  handleGetOptions,
  handleGetProductDetails,
  handleEditorParsing,
  saveLocalizationDetails,
  createKey,
  beforeSend,
  handleFilterOptions,
  validateNumberInput,
  defLocalizationObj,
  defProductVariationObj,
  tabLabels,
  tabLabelsVariation,
  notShowMaxPaymentsPart,
};
