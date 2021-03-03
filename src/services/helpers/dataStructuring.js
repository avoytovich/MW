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

const discountRequiredFields = (discount) => {
  let resObj = { ...discount };
  if (!resObj.publisherRefIds) {
    resObj = { ...resObj, publisherRefIds: [] };
  }
  if (!resObj.countries) {
    resObj = { ...resObj, countries: [] };
  }
  return resObj;
};

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

const productsVariations = (renewingProducts, productId) =>
  productId
    ? renewingProducts
        .filter((item) => item.id === productId)
        .reduce((accumulator, current) => {
          current.availableVariables = current.availableVariables.reduce(
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

export {
  productRequiredFields,
  structureSelectOptions,
  discountRequiredFields,
  renewingProductsOptions,
  defaultProduct,
  productsVariations,
};
