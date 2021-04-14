import _ from 'lodash';

const defaultProduct = {
  status: 'DISABLED',
  type: '',
  genericName: '',
  catalogId: '',
  publisherRefId: '',
  lifeTime: 'PERMANENT',
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
  prices: {
    defaultCurrency: 'AED',
    priceByCountryByCurrency: {
      AED: {
        default: {
          value: 1,
          msrp: null,
          upSell: null,
          crossSell: null,
          vatIncluded: false,
        },
      },
    },
  },
};

const defaultStore = {
  status: '',
  emailSenderOverride: '',
  routes: [{ hostname: '' }],
  defaultLocale: [],
  saleLocales: [],
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
  fallbackCartCountry: '',
  externalContextGenerationParams: [],
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
    },
    resellerCheckout: {
      fontRef: {},
      layoutRef: {},
      themeRef: {},
      i18nRef: {},
    },
    paymentComponent: {
      rankedPaymentTabsByCountriesList: [{ rankedPaymentTabs: [] }],
    },
  },
};

const productRequiredFields = (product) => {
  let resourcesKeys = null;

  if (product.resources) {
    resourcesKeys = [...product.resources].map((resource, index) => ({
      ...resource,
      index,
    }));
  }
  return { ...defaultProduct, ...product, resources: resourcesKeys };
};

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
    discountRate: 1,
    endDate: Date.now() + 6.048e8,
    endUserTypes: ['BUYER', 'RESELLER'],
  };
  const resObj = { ...defDiscount, ...discount };
  if (resObj.discountRate && resObj.discountRate < 1) {
    resObj.discountRate = discount.discountRate * 100;
  }
  return resObj;
};
const structureSelectOptions = (options, optionValue, ...otherOptions) => {
  let res = [];
  if (options) {
    res = options.map((option) => {
      const resObj = { id: option.id, value: option[optionValue] };
      if (otherOptions) {
        otherOptions.forEach((element) => {
          resObj[element] = option[element];
        });
      }
      return resObj;
    });
  }
  return res;
};

const renewingProductsOptions = (options) =>
  options.map((item) => {
    const value = item?.genericName
      ? `${item.genericName} (${item.publisherRefId}${item.subscriptionTemplate ? ', ' : ''}
          ${item.subscriptionTemplate || ''})`
      : item?.id;
    return { id: item.id, value };
  });

const productsVariations = (renewingProducts, productId) =>
  productId
    ? renewingProducts
        ?.filter((item) => item.id === productId)
        .reduce((accumulator, current) => {
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
    : {};

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
  return res;
};
const defaultTypes = {
  array: [],
  string: '',
  object: null,
};

const createStandaloneValue = (value) => value;

const createInheritableValue = (value, parentValue) => {
  // console.log('Value', value);
  // console.log('parentValue', parentValue);
  const typeValue = typeof value;
  const typeParentValue = typeof parentValue;
  const state =
    (typeof value === 'object' && _.isEmpty(value)) ||
    _.isNil(value) ||
    _.isEqual(value, parentValue)
      ? 'inherits'
      : 'overrides'; // initial state, user can force after

  return {
    parentValue: parentValue
      ? parentValue
      : value
      ? defaultTypes[typeValue]
      : defaultTypes[typeParentValue],
    state,
    // NC-915: when initialiy inheriting, a field value must be set to parentValue
    // to allow switching to override mode starting with the value of the core product
    // value: state === 'inherits' ? parentValue : value,
    value: value
      ? value
      : parentValue
      ? defaultTypes[typeParentValue]
      : defaultTypes[typeValue],
  };
};

const backToFront = (
  parent,
  resource = defaultProduct,
  independentFields = [
    'i18nFields',
    'blackListedCountries',
    'externalContext',
    'productFamily',
    'priceFunction',
    'trialAllowed',
    'subscriptionTemplate',
    'trialDuration',
    'fulfillmentTemplate',
    'releaseDate',
    'nextGenerationOf',
    'id',
  ],
) => {
  // if field in both parent and variant, associate fieldName with properly set inheritable
  if (!parent) return;

  const handler = (resourceOwn, parentOwn) =>
    createInheritableValue(resourceOwn.value, parentOwn.parentValue);
  const inputA = _.mapValues(resource, (value) => createInheritableValue(value, undefined));
  const inputB = _.mapValues(parent, (value) => createInheritableValue(undefined, value));
  let iResource = _.mergeWith(handler, inputA, inputB);
  // managing fields which cannot inherit
  iResource = _.mapValues(
    // when field is forced to override, value will be standalone, as it is in a core product
    iResource,
    (value, key) =>
      (independentFields || []).includes(key) ? createStandaloneValue(value.value) : value,
  );

  // if (independentFields) {
  //   // i18nFields.innerFields with possibility to inheritance

  //   const i18nFieldsA = { ...inputA.i18nFields.value };
  //   const i18nFieldsB = { ...inputB.i18nFields.value };

  //   const i18nKeysListA = Object.keys(i18nFieldsA);
  //   const i18nKeysListB = Object.keys(i18nFieldsB);

  //   const inheritedA = i18nKeysListA.reduce((accumulator, current) => {
  //     accumulator[current] = _.mapValues(i18nFieldsA[current], (value) =>
  //       createInheritableValue(value, undefined),
  //     );
  //     return accumulator;
  //   }, {});

  //   const inheritedB = i18nKeysListB.reduce((accumulator, current) => {
  //     accumulator[current] = _.mapValues(i18nFieldsB[current], (value) =>
  //       createInheritableValue(undefined, value),
  //     );
  //     return accumulator;
  //   }, {});

  //   const isNewProductVariant = Object.keys(inheritedA).length
  //     ? Object.keys(inheritedA)
  //     : Object.keys(inheritedB);

  //   const combinedI18nInheritedFields = isNewProductVariant.reduce((accumulator, current) => {
  //     accumulator[current] = _.mergeWith(
  //       handler,
  //       inheritedA[current],
  //       inheritedB[current] || {},
  //     );
  //     return accumulator;
  //   }, {});
  //   iResource.i18nFields.value = combinedI18nInheritedFields;
  // }
  console.log('iResource', iResource);
  return iResource;
};

export {
  storeRequiredFields,
  productRequiredFields,
  structureSelectOptions,
  discountRequiredFields,
  renewingProductsOptions,
  defaultProduct,
  productsVariations,
  backToFront,
};
