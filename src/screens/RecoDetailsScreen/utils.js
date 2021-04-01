const defRecoObject = {
  eligibleProductIds: [],
  eligibleStoreIds: [],
  eligibleParentProductIds: [],
};
const recoRequiredFields = (reco) => {
  const resObj = { ...defRecoObject, ...reco };

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

export { recoRequiredFields, formateProductOptions };
