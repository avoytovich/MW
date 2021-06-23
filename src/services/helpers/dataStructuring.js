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
  status: 'ENABLED',
  name: '',
  emailSenderOverride: '',
  routes: [{ hostname: '' }],
  defaultLocale: '',
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
  // fallbackCartCountry: '',
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

const localizedValues = [
  'localizedLongDesc',
  'localizedManualRenewalEmailDesc',
  'localizedMarketingName',
  'localizedPurchaseEmailDesc',
  'localizedShortDesc',
  'localizedThankYouDesc',
];

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

const structureSelectOptions = (options, optionValue, ...otherOptions) => {
  let res = [];
  if (options) {
    res = options.map((option) => {
      const resObj = { id: option.id || option[optionValue], value: option[optionValue] };
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

const renewingProductsOptions = (options) => options.map((item) => {
  const value = item?.genericName
    ? `${item.genericName} (${item.publisherRefId}${item.subscriptionTemplate ? ', ' : ''}
          ${item.subscriptionTemplate || ''})`
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
  const state = R.isEmpty(value) || R.isNil(value) || R.equals(value, parentValue)
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
  independentFields = [
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
  ],
) => {
  // if field in both parent and variant, associate fieldName with properly set inheritable
  if (!parent) resource;

  const handler = (resourceOwn, parentOwn) => createInheritableValue(resourceOwn.value, parentOwn.parentValue);
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
  iResource = R.mapObjIndexed((value, key) => {
    if ((independentFields || []).includes(key)) {
      return createStandaloneValue(value);
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
    let newValue = !value?.state // eslint-disable-line
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

const checkValue = (data, state) =>
  (!state ? data : state === 'inherits' ? data.parentValue : data.value); // eslint-disable-line

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

const countriesOptionsFormatting = (array) => array.map((item) => (
  { id: item.alpha2Code, value: item.name }
));

const languagesOptionsFormatting = (array) => array.map((item) => {
  const languageNames = new Intl.DisplayNames([item.code], { type: 'language' });
  return (
    { id: item.code, value: languageNames.of(item.code) });
});

const notificationRequiredFields = (obj) => {
  const receiverType = obj.emails ? 'email' : 'webhook';
  const defaultObj = {
    name: '',
    status: 'Active',
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
      tlsConfiguration: { tlsAuthMode: 'none' },
    },

  };
  return { ...defaultObj, ...obj, receiverType };
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
};
