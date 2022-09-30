const defRecoObject = {
  eligibleProductIds: [],
  eligibleStoreIds: [],
  eligibleParentProductIds: [],
  productIds: [],
  byProductIds: {},
  byParentProductIds: {},
  function: 'idToIdsRecoRule',
  levels: ['PRODUCT'],
  name: '',
  sources: ['PURCHASE'],
  status: 'DISABLED',
  weight: 0,
  type: 'CROSS_SELL',
};

const fromObjectToArray = (object, keyName) => {
  if (Object.keys(object).length === 0) {
    return [
      {
        key: `0_${keyName}`,
        keyValue: '',
        value: [],
      },
    ];
  }

  const res = Object.keys({
    ...object,
  }).map((item, index) => ({
    key: `${index}_${keyName}`,
    keyValue: item,
    value: object[item],
  }));

  return res;
};
const fromArrayToObj = (array) => {
  const resObject = {};
  array.forEach((item) => {
    if (item.keyValue) {
      resObject[item.keyValue] = item.value;
      delete resObject.key;
    }
  });
  return resObject;
};
const recoRequiredFields = (reco) => {
  const resObj = { ...defRecoObject, ...reco };

  const newByProductIds = fromObjectToArray(
    resObj.byProductIds,
    'newByProductIds',
  );

  const newByParentProductIds = fromObjectToArray(
    resObj.byParentProductIds,
    'byParentProductIds',
  );
  const localizedDesc = {};
  if (reco.localizedDesc) {
    Object.keys(reco.localizedDesc)?.forEach((lang) => {
      localizedDesc[lang] = { recommendationDescription: reco.localizedDesc[lang] };
    });
  }
  return {
    ...resObj,
    localizedDesc,
    byParentProductIds: newByParentProductIds,
    byProductIds: newByProductIds,
  };
};
const formateProductOptions = (options) => {
  let res = [];
  if (options) {
    res = options.map((option) => {
      const resObj = {
        id: option.id,
        value: `${option.genericName}- ${option.publisherRefId} (${option.id})`,
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
  fromArrayToObj,
};
