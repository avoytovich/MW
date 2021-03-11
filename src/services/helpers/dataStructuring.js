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
    endUserPortal: { themeRef: { customerId: '', name: '' } },
    checkout: {
      themeRef: { customerId: '', name: '' },
      fontRef: { customerId: '', name: '' },
      i18nRef: { customerId: '' },
      layoutRef: { customerId: '', name: '' },
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
    maxUsages: '',
    maxUsePerStore: '',
    maxUsePerEndUser: '',
    countries: [],
    enduserId: '',
    codes: {},
    endUserGroupIds: [],
    endUserEmails: [],
  };
  const resObj = { ...defDiscount, ...discount };
  if (resObj.discountRate) {
    resObj.discountRate = discount.discountRate * 100;
  }
  return resObj;
};
const structureSelectOptions = (options, optionValue, ...otherOptions) => options.map((option) => {
  const resObj = { id: option.id, value: option[optionValue] };
  if (otherOptions) {
    otherOptions.forEach((element) => {
      resObj[element] = option[element];
    });
  }
  return resObj;
});

const renewingProductsOptions = (options) => options.map((item) => {
  const value = item?.genericName
    ? `${item.genericName} (${item.publisherRefId}${
      item.subscriptionTemplate ? ', ' : ''
    }
          ${item.subscriptionTemplate || ''})`
    : item?.id;
  return { id: item.id, value };
});

const productsVariations = (renewingProducts, productId) => (productId
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
  : {});

const storeRequiredFields = (store) => ({ ...defaultStore, ...store });

export {
  storeRequiredFields,
  productRequiredFields,
  structureSelectOptions,
  discountRequiredFields,
  renewingProductsOptions,
  defaultProduct,
  productsVariations,
};
