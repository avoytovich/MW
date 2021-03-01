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
  };

  return { ...defDiscount, ...discount };
};

const structureSelectOptions = (options, optionValue, ...otherOptions) =>
  options.map((option) => {
    const resObj = { id: option.id, value: option[optionValue] };
    if (otherOptions) {
      otherOptions.forEach((element) => {
        resObj[element] = option[element];
      });
    }
    return resObj;
  });

const renewingProductsOptions = (options) =>
  options.map((item) => {
    const value = item?.genericName
      ? `${item.genericName} (${item.publisherRefId}${
          item.subscriptionTemplate ? ', ' : ''
        }
          ${item.subscriptionTemplate || ''})`
      : item?.id;
    return { id: item.id, value };
  });

export {
  productRequiredFields,
  structureSelectOptions,
  discountRequiredFields,
  renewingProductsOptions,
  defaultProduct,
};
