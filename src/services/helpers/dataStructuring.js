/* eslint-disable max-len */
import * as R from 'ramda';

const defaultProduct = {
  status: 'DISABLED',
  type: '',
  genericName: '',
  catalogId: '',
  publisherRefId: '',
  priceByCountryByCurrency: {},
  lifeTime: { name: 'PERMANENT', number: 1 },
  physical: false,
  sellingStores: [],
  blackListedCountries: [],
  trialAllowed: false,
  subscriptionTemplate: '',
  trialDuration: '',
  fulfillmentTemplate: '',
  businessSegment: '',
  externalContext: '',
  productFamily: '',
  priceFunction: '',
  nextGenerationOf: [],
  resources: [],
  prices: {
    defaultCurrency: '',
    priceByCountryByCurrency: {},
  },
};
const defaultManualFulfillment = {
  name: '',
  nexwayProductId: [],
  publisherProductId: [],
  status: 'DISABLED',
  stock: {
    available: 0, blacklisted: 0, canceled: 0, occupied: 0, renewed: 0,
  },
  threshold: 0,
};
const defaultStore = {
  status: 'DISABLED',
  name: '',
  emailSenderOverride: '',
  routes: [{ hostname: '' }],
  defaultLocale: '',
  saleLocales: [],
  thankYouDesc: {},
  storeWebsite: '',
  displayName: '',
  blackListedPaymentTypes: [],
  forceGeoipLocalization: false,
  promoteOneClickPayment: false,
  allowOrderDetailsOnCheckoutConfirmation: false,
  recipientCodeMandatory: false,
  allowInstallments: false,
  blackListedCountries: [],
  restrictedCountries: [],
  installmentOptions: [],
  eligibleEndUserTypes: ['RESELLER_AUTHENTICATION_REQUIRED', 'BUYER_AUTHENTICATION_REQUIRED', 'AUTHENTICATION_NOT_REQUIRED'],
  externalContextGenerationParams: [],
  paymentGroups: {},
  designs: {
    endUserPortal: {
      fontRef: {},
      layoutRef: {},
      themeRef: {},
      i18nRef: {},
    },
    checkout: {
      fontRef: {},
      layoutRef: {},
      themeRef: {},
      i18nRef: {},
      dpThemeRef: {},
    },
    resellerCheckout: {
      fontRef: {},
      layoutRef: {},
      themeRef: {},
      i18nRef: {},
    },
    paymentComponent: {
      rankedPaymentTabsByCountriesList: [{ rankedPaymentTabs: ['credit_card'] }],
    },
  },
};

const defaultProductLocales = {
  localizedLongDesc: {},
  localizedManualRenewalEmailDesc: {},
  localizedPurchaseEmailDesc: {},
  localizedMarketingName: { 'en-US': '' },
  localizedShortDesc: {},
  localizedThankYouDesc: {},
};

const localizedValues = [
  'localizedLongDesc',
  'localizedManualRenewalEmailDesc',
  'localizedMarketingName',
  'localizedPurchaseEmailDesc',
  'localizedShortDesc',
  'localizedThankYouDesc',
];

const defaultIndependentFields = [
  // 'fulfillmentTemplateName',
  'subscriptionTemplate',
  'releaseDate',
  'nextGenerationOf',
  'id',
  'parentId',
  // 'resources',
  // 'externalContext',
  // 'productFamily',
  // 'priceFunction',
  // 'trialAllowed',
  // 'trialDuration',
];

const changableFields = ['fulfillmentTemplate', 'subscriptionTemplate'];

const unchangableInheritedFields = ['customerId', 'status'];

const productRequiredFields = (product) => {
  let resourcesKeys = null;

  const priceByCountryByCurrency = {};

  if (product.prices?.priceByCountryByCurrency) {
    Object.keys(product.prices?.priceByCountryByCurrency)?.forEach((item) => {
      priceByCountryByCurrency[item] = [];
      Object.keys(product.prices.priceByCountryByCurrency[item]).forEach((itemChild, index) => {
        if (Object.keys(priceByCountryByCurrency[item]).length === 0) {
          priceByCountryByCurrency[item].push({
            key: `${item}_${index}`,
            countries: [itemChild],
            value: product.prices.priceByCountryByCurrency[item][itemChild].value,
            crossSell: product.prices.priceByCountryByCurrency[item][itemChild].crossSell || '',
            msrp: product.prices.priceByCountryByCurrency[item][itemChild].msrp || '',
            upSell: product.prices.priceByCountryByCurrency[item][itemChild].upSell || '',
            vatIncluded: product.prices.priceByCountryByCurrency[item][itemChild].vatIncluded,
          });
        } else {
          const isTheSame = (element) => element.value
            === product.prices.priceByCountryByCurrency[item][itemChild].value
            && element.vatIncluded
            === product.prices.priceByCountryByCurrency[item][itemChild].vatIncluded
            && (!element.crossSell
              ? !element.crossSell && !product.prices.priceByCountryByCurrency[item][itemChild].crossSell
              : element.crossSell === product.prices.priceByCountryByCurrency[item][itemChild].crossSell)
            && (!element.msrp
              ? !element.msrp && !product.prices.priceByCountryByCurrency[item][itemChild].msrp
              : element.msrp === product.prices.priceByCountryByCurrency[item][itemChild].msrp)

            && (!element.upSell
              ? !element.upSell && !product.prices.priceByCountryByCurrency[item][itemChild].upSell
              : element.upSell === product.prices.priceByCountryByCurrency[item][itemChild].upSell);

          const existedIndex = priceByCountryByCurrency[item].findIndex(isTheSame);
          if (existedIndex >= 0) {
            priceByCountryByCurrency[item][existedIndex].countries.push(itemChild);
          } else {
            priceByCountryByCurrency[item].push({
              key: `${item}_${index}`,
              countries: [itemChild],
              value: product.prices.priceByCountryByCurrency[item][itemChild].value,
              crossSell: product.prices.priceByCountryByCurrency[item][itemChild].crossSell || '',
              msrp: product.prices.priceByCountryByCurrency[item][itemChild].msrp || '',
              upSell: product.prices.priceByCountryByCurrency[item][itemChild].upSell || '',
              vatIncluded: product.prices.priceByCountryByCurrency[item][itemChild].vatIncluded,
            });
          }
        }
      });
    });
  } else {
    priceByCountryByCurrency[product.prices.defaultCurrency] = [{
      countries: ['default'],
      crossSell: '',
      key: `${product.prices.defaultCurrency}_0`,
      msrp: '',
      upSell: '',
      value: '',
      vatIncluded: false,
    }];
  }
  if (product.resources) {
    resourcesKeys = [...product.resources].map((resource, index) => ({
      ...resource,
      index,
    }));
  }
  let { lifeTime } = product;
  if (typeof lifeTime === 'string') {
    const res = product.lifeTime !== '7DAY' ? product.lifeTime.match(/[a-zA-Z]+|[0-9]+/g) : ['7DAY'];
    lifeTime = { number: res[1] ? res[0] : '1', name: res[1] ? res[1] : res[0] };
  }

  const newDefault = { ...defaultProduct };

  delete newDefault.fulfillmentTemplate;

  return {
    ...newDefault, ...product, resources: resourcesKeys || [], priceByCountryByCurrency, lifeTime,
  };
};
const productVariationRequiredFields = (product) => {
  const res = product.lifeTime !== '7DAY' ? product.lifeTime.match(/[a-zA-Z]+|[0-9]+/g) : ['7DAY'];
  const lifeTime = { number: res[1] ? res[0] : '1', name: res[1] ? res[1] : res[0] };
  return {
    ...product, lifeTime,
  };
};
const structureProdAutocompleteSelectOptions = ({
  options, optionValue, otherOptions, optionId,
}) => {
  const res = [];
  if (options) {
    options.forEach((option) => {
      const id = optionId ? option[optionId] : option.id || option[optionValue];
      if (!res.find((u) => u.id === id)) {
        const newObj = { id, value: `${option[optionValue]}(${option.id})` || id };
        if (otherOptions) {
          otherOptions.forEach((element) => {
            newObj[element] = option[element];
          });
        }
        res.push(newObj);
      }
    });
  }
  return res;
};

const structureSelectOptions = ({
  options, optionValue, otherOptions, optionId, adIddToValue,
}) => {
  const res = [];
  if (options) {
    options.forEach((option) => {
      const id = optionId ? option[optionId] : option.id || option[optionValue];
      if (!res.find((u) => u.id === id)) {
        const newObj = { id, value: !adIddToValue ? option[optionValue] : `${option[optionValue]} (${id})` || id };
        if (otherOptions) {
          otherOptions.forEach((element) => {
            newObj[element] = option[element];
          });
        }
        res.push(newObj);
      }
    });
  }
  return res;
};

const groupBy = (objectArray, property) => objectArray.reduce((acc, obj) => {
  const key = obj[property];
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(obj);
  return acc;
}, {});
const renewingProductsOptions = (options) => options.map((item) => {
  const value = item?.genericName
    ? `${item.genericName}(${item.publisherRefId}${item.subscriptionTemplate ? ', '
      : ''}${item.subscriptionTemplate || ''})(${item?.id})`
    : item?.id;

  return { id: item.id, value };
});

const productsVariations = (renewingProducts, productId) => (productId
  ? renewingProducts
    ?.filter((item) => item.id === productId)
    .reduce((accumulator, current) => {
      // eslint-disable-next-line
      current.availableVariables = current?.availableVariables?.reduce(
        (acc, curr) => [
          ...acc,
          {
            ...curr,
            fieldValue: current[curr.field],
          },
        ],
        [],
      );
      return [...accumulator, current];
    }, [])[0]
  : {});

const formatePaymentGroups = (array) => {
  const ar = [...array].splice(1);
  const newParams = {};
  const data = groupBy(ar, 'countries');
  Object.keys(data).forEach((key, index) => {
    newParams[index] = {
      countries: key.split(','),
      options: {},
    };
    data[key].forEach((item, ind) => {
      newParams[index].options[ind] = {
        customerType: item.customerType || 'PERSONAL', rankedPaymentTabs: item.rankedPaymentTabs,
      };
    });
  });
  return newParams;
};
const defaultStoreLocalObj = { deliveryRemark: '' };
const storeRequiredFields = (store) => {
  const res = { ...defaultStore, ...store };

  if (store.designs) {
    const checkoutObj = {
      ...defaultStore.designs.checkout,
      ...store.designs.checkout,
    };
    const endUserPortalObj = {
      ...defaultStore.designs.endUserPortal,
      ...store.designs.endUserPortal,
    };
    const resellerCheckoutObj = {
      ...defaultStore.designs.resellerCheckout,
      ...store.designs.resellerCheckout,
    };
    const newDesigns = {
      ...store.designs,
      checkout: checkoutObj,
      endUserPortal: endUserPortalObj,
      resellerCheckout: resellerCheckoutObj,
    };
    res.designs = newDesigns;
  }
  if (res.designs.paymentComponent.rankedPaymentTabsByCountriesList.length > 1) {
    const nwePaymentGroups = formatePaymentGroups(
      res.designs.paymentComponent.rankedPaymentTabsByCountriesList,
    );
    res.paymentGroups = nwePaymentGroups;
  }
  if (Object.keys(res.thankYouDesc).length === 0 && res.defaultLocale) {
    res.thankYouDesc = { [res.defaultLocale]: defaultStoreLocalObj };
  } else {
    const newThankYouDesc = {};
    Object.keys(res.thankYouDesc).forEach((elKey) => {
      newThankYouDesc[elKey] = { deliveryRemark: res.thankYouDesc[elKey] };
    });
    res.thankYouDesc = { ...newThankYouDesc };
  }

  return res;
};

const types = {
  array: [],
  string: '',
  boolean: false,
  object: {},
};

const createStandaloneValue = (value, key) => {
  if (!value?.state) return value;

  let valueType = typeof value.value;

  if (valueType === 'object' && Array.isArray(value.value)) {
    valueType = 'array';
  }

  return (value?.state === 'inherits' && !changableFields.includes(key)) ? types[valueType] : (value?.value || value || '');
};

const createChangableValue = (value, selfValue) => ({ state: (selfValue || selfValue === '') ? 'overrides' : 'inherits', parentValue: value.parentValue, value: selfValue });

const createUnchangableInheritedValue = (value, key) => (value?.parentValue && key !== 'status' ? value.parentValue : (value || ''));

const createInheritableValue = (value, parentValue, key) => {
  const state = ((R.isEmpty(value) || R.isNil(value)) && !changableFields.includes(key)) || R.equals(value, parentValue) || (parentValue?.defaultCurrency && !value?.defaultCurrency)
    ? 'inherits'
    : 'overrides'; // initial state, user can force after

  return {
    parentValue,
    state,
    value: state === 'inherits' ? parentValue : value,
  };
};

const backToFront = (
  parent,
  resource = defaultProduct,
  independentFields = defaultIndependentFields,
) => {
  // if field in both parent and variant, associate fieldName with properly set inheritable
  if (!parent) resource;

  const handler = (resourceOwn, parentOwn) => createInheritableValue(
    resourceOwn.value, parentOwn.parentValue,
  );

  const inputA = R.mapObjIndexed(
    (value, key) => createInheritableValue(value, undefined, key),
    resource,
  );

  const inputB = R.mapObjIndexed(
    (value, key) => createInheritableValue(undefined, value, key),
    parent || {},
  );

  let iResource = R.mergeWith(handler, inputA, inputB);
  // managing fields which cannot inherit
  iResource = R.mapObjIndexed((value, key) => {
    if (changableFields.includes(key)) {
      return createChangableValue(value, resource[key]);
    }

    if (independentFields.includes(key)) {
      return createStandaloneValue(value, key);
    }

    if (unchangableInheritedFields.includes(key)) {
      return createUnchangableInheritedValue(value, key);
    }

    return value;
  }, iResource);
  return iResource;
};

// MANDATORY FIELDS
const mandatoryFields = ['lifeTime', 'publisherRefId', 'salesMode'];

const frontToBack = (data) =>
  // eslint-disable-next-line
   Object.entries(data).reduce((accumulator, [key, value]) => {
    let newValue = (!value?.state && !value?.value) // eslint-disable-line
      ? value
      : (value?.state === 'overrides' || (!value?.state && value?.value))
        ? value?.value : undefined;

    if (mandatoryFields.includes(key) && !newValue) {
      newValue = value?.parentValue;
    }
    if (typeof newValue !== 'undefined' || changableFields.includes(key)) {
      accumulator = {
        ...accumulator,
        // [key]: newValue ? newValue : changableFields.includes(key) ? 'NONE' : '',
        [key]: newValue || '',
      };
    }
    return accumulator;
  }, {})
;

// eslint-disable-next-line no-nested-ternary
const checkValue = (data, type) => (((!data?.state && !data?.value && data?.value !== '') || changableFields.includes(type)) ? data : data.state === 'inherits' ? data.parentValue : data.value);

const identityRequiredFields = (identity) => {
  const defaultIdentity = {
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    clientId: '',
    authorizedCustomerIds: [],
    roleIds: [],
    metaRoleIds: [],
    inactive: true,
  };
  return { ...defaultIdentity, ...identity };
};

const realmRequiredFields = (realm) => {
  const defaultRealm = {
    dbVersion: '',
    id: '',
    jwtPrivateKey: '',
    jwtPublicKey: '',
    lastUpdateReason: '',
    path: '',
    authorizedCustomerIds: [],
  };
  return { ...defaultRealm, ...realm };
};

const countriesOptionsFormatting = (array) => array.map((item) => (
  { id: item.alpha2Code, value: item.name }
));

const legalEntitiesOptionsFormatting = (array) => array.map((item) => (
  { id: item.id, value: item.legalEntityName }
));

const languagesOptionsFormatting = (array) => array.map((item) => {
  const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
  return (
    { id: item.code, value: `${item.code}: ${languageNames.of(item.code)}` });
});

const notificationRequiredFields = (obj) => {
  const receiverType = obj.emails ? 'email' : 'webhook';
  const defaultObj = {
    name: '',
    status: 'Inactive',
    notificationDefinitionIds: [],
    targetedCustomerIds: [],
    emails: [],
    url: '',
    httpClientConfiguration: {
      httpHeaders: { 'Content-Type': [], Version: [] },
      clientCredentialOauth2Config: {
        clientId: '',
        clientSecret: '',
        tokenUrl: '',
        scopes: [],
      },
      tlsConfiguration: { tlsAuthMode: '' },
    },
  };

  const httpHeaders = {
    ...defaultObj.httpClientConfiguration.httpHeaders,
    ...obj.httpClientConfiguration?.httpHeaders,
  };
  const clientCredentialOauth2Config = {
    ...defaultObj.httpClientConfiguration.clientCredentialOauth2Config,
    ...obj.httpClientConfiguration?.clientCredentialOauth2Config,
  };
  const tlsConfiguration = {
    ...defaultObj.httpClientConfiguration.tlsConfiguration,
    ...obj.httpClientConfiguration?.tlsConfiguration,
  };

  return {
    ...defaultObj,
    ...obj,
    receiverType,
    httpClientConfiguration: { httpHeaders, clientCredentialOauth2Config, tlsConfiguration },
  };
};

const removeEmptyPropsInObject = (data) => {
  const res = { ...data };
  return Object.keys(res).reduce((accumulator, key) => {
    const isObject = typeof res[key] === 'object';
    const isNotEmptyArray = Array.isArray(res[key]) && res[key].length > 0;
    const value = isObject && !isNotEmptyArray ? removeEmptyPropsInObject(res[key]) : res[key];
    const isEmptyObject = isObject && !Object.keys(value).length;
    if (value === '' || isEmptyObject) {
      return accumulator;
    }

    return Object.assign(accumulator, { [key]: value });
  }, {});
};

export {
  storeRequiredFields,
  productRequiredFields,
  structureSelectOptions,
  renewingProductsOptions,
  defaultProduct,
  productsVariations,
  backToFront,
  frontToBack,
  identityRequiredFields,
  checkValue,
  localizedValues,
  countriesOptionsFormatting,
  languagesOptionsFormatting,
  notificationRequiredFields,
  removeEmptyPropsInObject,
  formatePaymentGroups,
  createInheritableValue,
  defaultManualFulfillment,
  defaultProductLocales,
  structureProdAutocompleteSelectOptions,
  realmRequiredFields,
  legalEntitiesOptionsFormatting,
  productVariationRequiredFields,
};
