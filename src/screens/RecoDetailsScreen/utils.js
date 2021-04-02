const defRecoObject = {
  eligibleProductIds: [],
  eligibleStoreIds: [],
  eligibleParentProductIds: [],
  productIds: [],
  byProductIds: [],
  byParentProductIds: [],
};

const fromObjectToArray = (object, keyName) => {
  const res = Object.keys({
    ...object,
  }).map((item, index) => ({
    key: `${index}_${keyName}`,
    keyValue: item,
    value: object[item],
  }));

  return res;
};

const recoRequiredFields = (reco) => {
  let resObj = { ...defRecoObject, ...reco };

  if (reco.byProductIds) {
    const newByProductIds = fromObjectToArray(reco.byProductIds, 'productId');
    resObj = { ...resObj, byProductIds: newByProductIds };
  }
  if (reco.byParentProductIds) {
    const newByParentProductIds = fromObjectToArray(
      reco.byParentProductIds,
      'parentProductId',
    );
    resObj = { ...resObj, byParentProductIds: newByParentProductIds };
  }
  return resObj;
};
const formateProductOptions = (options) => {
  let res = [];
  if (options) {
    res = options.map((option) => {
      const resObj = {
        id: option.id,
        value: `${option.genericName}- ${option.publisherRefId}`,
      };
      return resObj;
    });
  }
  return res;
};
const filterOptions = (all, selected, currentValue) => {
  const res = all.filter(
    (option) => !selected.includes(option.id) || option.id === currentValue,
  );
  return res;
};

export {
  recoRequiredFields,
  formateProductOptions,
  fromObjectToArray,
  filterOptions,
};
