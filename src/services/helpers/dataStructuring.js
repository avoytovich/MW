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

const renewingProductsOptions = (options) => (
  options.map((item) => {
    const value = item?.genericName
      ? `${item.genericName} (${item.publisherRefId}${
        item.subscriptionTemplate ? ', ' : ''
      } ${item.subscriptionTemplate || ''})`
      : item?.id;

    return { id: item.id, value };
  })
);

const productsVariations = (renewingProducts, productId) => (
  productId
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
    : {}
);

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

export {
  storeRequiredFields,
  productRequiredFields,
  structureSelectOptions,
  discountRequiredFields,
  renewingProductsOptions,
  defaultProduct,
  productsVariations,
};
