const productRequiredFields = (product) => {
  let resourcesKeys = null;

  const defProduct = {
    type: '',
    sellingStores: [],
    lifeTime: '',
    trialAllowed: false,
    subscriptionTemplate: '',
    trialDuration: '',
    fulfillmentTemplate: '',
    businessSegment: '',
  };
  if (product.resources) {
    resourcesKeys = [...product.resources].map((resource, index) => ({
      ...resource,
      index,
    }));
  }
  defProduct.resources = resourcesKeys;

  return { ...defProduct, ...product };
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
export {
  productRequiredFields,
  structureSelectOptions,
  discountRequiredFields,
};
