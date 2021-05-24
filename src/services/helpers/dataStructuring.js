import * as R from 'ramda';

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

const types = {
  array: [],
  string: '',
  boolean: false,
  object: {},
};

const createStandaloneValue = (value) => {
  if (!value?.state) return value;

  let valueType = typeof value.value;

  if (valueType === 'object' && Array.isArray(value.value)) {
    valueType = 'array';
  }
  return value?.state === 'inherits' ? types[valueType] : value.value;
};

const createInheritableValue = (value, parentValue) => {
  const state =
    R.isEmpty(value) || R.isNil(value) || R.equals(value, parentValue)
      ? 'inherits'
      : 'overrides'; // initial state, user can force after
  return {
    parentValue,
    state,
    // NC-915: when initialiy inheriting, a field value must be set to parentValue
    // to allow switching to override mode starting with the value of the core product
    value: state === 'inherits' ? parentValue : value,
  };
};

const backToFront = (
  parent,
  resource = defaultProduct,
  independentFields = [
    // 'blackListedCountries',
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
    'parentId',
    // 'sellingStores',
    // 'availableVariables',
    // 'lifeTime',
    // 'genericName',
  ],
) => {
  // if field in both parent and variant, associate fieldName with properly set inheritable
  if (!parent) return;

  const handler = (resourceOwn, parentOwn) =>
    createInheritableValue(resourceOwn.value, parentOwn.parentValue);
  const inputA = R.mapObjIndexed(
    (value) => createInheritableValue(value, undefined),
    resource,
  );
  const inputB = R.mapObjIndexed(
    (value) => createInheritableValue(undefined, value),
    parent || {},
  );
  let iResource = R.mergeWith(handler, inputA, inputB);
  // managing fields which cannot inherit
  iResource = R.mapObjIndexed(
    // when field is forced to override, value will be standalone, as it is in a core product
    (value, key) => {
      if ((independentFields || []).includes(key)) {
        return createStandaloneValue(value);
      }
      return value;
    },
    iResource,
  );

  return iResource;
};

// unwrap will remove the inheritance state layer from each property and put the inner value instead
// const stateEquals = R.propEq('state');
// const innerValue = R.prop('value');
// const frontToBack = () =>
//   R.map(
//     R.cond([
//       [stateEquals('standalone'), innerValue],

//       [
//         stateEquals('overrides'),
//         R.ifElse(R.compose(R.isNil, innerValue), R.always(''), innerValue),
//       ],

//       [R.T, R.always(undefined)],
//     ]),
//   );

// MANDATORY FIELDS
const mandatoryFields = ['lifeTime', 'publisherRefId', 'salesMode'];
const trial = 'trialAllowed';

const frontToBack = (data) =>
  Object.entries(data).reduce((accumulator, [key, value]) => {
    let newValue = !value.state
      ? value
      : value?.state === 'overrides'
      ? value?.value
      : undefined;
    if (mandatoryFields.includes(key) && !newValue) {
      newValue = value?.parentValue;
    }

    if (typeof newValue !== 'undefined') {
      accumulator = {
        ...accumulator,
        [key]: newValue,
      };
    }
    return accumulator;
  }, {});

export {
  storeRequiredFields,
  productRequiredFields,
  structureSelectOptions,
  discountRequiredFields,
  renewingProductsOptions,
  defaultProduct,
  productsVariations,
  backToFront,
  frontToBack,
};
