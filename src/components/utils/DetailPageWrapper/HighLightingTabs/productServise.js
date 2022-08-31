const hightLightGeneral = (curData) => (
  (curData.genericName)
    && (curData.type)
      && (curData.publisherRefId) ? null : false
);

const hightLightPrices = (curData, priceTableError) => (
  (curData.prices.defaultCurrency || Object.keys(curData.priceByCountryByCurrency).length)
    && (!priceTableError.length)
    ? null : false
);

const hightLightLocalizedContent = (localizedErrors) => (
  (!Object.keys(localizedErrors).length)
    ? null : false
);

const productHightLight = (
  curData,
  priceTableError,
  errors = {},
  setErrors = () => {},
  tabs,
  localizedErrors = {},
) => {
  if (!Object.keys(errors).length) {
    if (tabs?.tabLabels?.[tabs.curTab] === 'general') {
      setErrors({
        ...errors,
        [tabs?.tabLabels?.[tabs.curTab]]: {
          ...errors?.[tabs?.tabLabels?.[tabs.curTab]],
          isFulfilled: hightLightGeneral(curData),
        },
      });
    }
  } else if (tabs?.tabLabels?.[tabs.curTab] !== 'general') {
    if (tabs?.tabLabels?.[tabs.curTab] === 'prices') {
      setErrors({
        ...errors,
        general: {
          isFulfilled: hightLightGeneral(curData),
          name: errors?.general?.name ? true : !curData.genericName,
          type: errors?.general?.type ? true : !curData.type,
          publisherRefId: errors?.general?.publisherRefId ? true : !curData.publisherRefId,
        },
        [tabs?.tabLabels?.[tabs.curTab]]: {
          ...errors?.[tabs?.tabLabels?.[tabs.curTab]],
          isFulfilled: hightLightPrices(curData, priceTableError),
          currency: errors?.prices?.currency ? true : !curData.prices.defaultCurrency,
          price: errors?.prices?.price ? true : !!priceTableError.length,
        },
      });
    } else if (tabs?.tabLabels?.[tabs.curTab] === 'localizedContent') {
      setErrors({
        ...errors,
        general: {
          isFulfilled: hightLightGeneral(curData),
          name: errors?.general?.name ? true : !curData.genericName,
          type: errors?.general?.type ? true : !curData.type,
          publisherRefId: errors?.general?.publisherRefId ? true : !curData.publisherRefId,
        },
        [tabs?.tabLabels?.[tabs.curTab]]: {
          ...errors?.[tabs?.tabLabels?.[tabs.curTab]],
          isFulfilled: hightLightLocalizedContent(localizedErrors),
          marketingName: !!Object.keys(localizedErrors).length,
        },
      });
    } else {
      setErrors({
        ...errors,
        general: {
          isFulfilled: hightLightGeneral(curData),
          name: errors?.general?.name ? true : !curData.genericName,
          type: errors?.general?.type ? true : !curData.type,
          publisherRefId: errors?.general?.publisherRefId ? true : !curData.publisherRefId,
        },
      });
    }
  }
};

export default productHightLight;
