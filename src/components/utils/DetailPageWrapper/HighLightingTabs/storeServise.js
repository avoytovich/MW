const validCountries = (curData, keyPaymentGroups) => {
  const result = [];
  if (curData.paymentGroups[keyPaymentGroups[0]]?.countries.length) {
    keyPaymentGroups.forEach((key) => {
      if (curData.paymentGroups[key]?.countries[0]) {
        result.push(true);
      } else {
        result.push(false);
      }
    });
  }
  if (result.length) {
    return result.every((item) => item === true);
  }
  return false;
};

const validPaymentTypes = (curData, keyPaymentGroups) => {
  const result = [];
  Object.keys(curData.paymentGroups[keyPaymentGroups[0]]?.options || {}).forEach((every) => {
    if (curData.paymentGroups[keyPaymentGroups[0]]?.options[every]?.rankedPaymentTabs.length) {
      Object.keys(curData?.paymentGroups || {}).forEach((key) => {
        Object.keys(curData?.paymentGroups[key].options || {}).forEach((each) => {
          if (curData.paymentGroups[key]?.options[each].rankedPaymentTabs[0]) {
            result.push(true);
          } else {
            result.push(false);
          }
        });
      });
    }
  });
  if (result.length) {
    return result.every((item) => item === true);
  }
  return false;
};

const hightLightPayment = (curData, isRankingOpen) => {
  const keyPaymentGroups = Object.keys(curData?.paymentGroups || {});
  return (
    (curData.designs.paymentComponent.rankedPaymentTabsByCountriesList[0].rankedPaymentTabs[0])
      && (!isRankingOpen || !curData.paymentGroups[keyPaymentGroups[0]]
        || (validCountries(curData, keyPaymentGroups)
          && validPaymentTypes(curData, keyPaymentGroups))) ? null : false
  );
};

const hightLightGeneral = (curData) => (
  (curData.name)
    && (curData.displayName)
      && (curData.routes[0]?.hostname) ? null : false
);

const storeHightLight = (
  curData,
  isRankingOpen,
  errors = {},
  setErrors = () => {},
  tabs,
  paramsId,
) => {
  if (!Object.keys(errors).length) {
    if (tabs?.tabLabels?.[tabs.curTab] === 'payment') {
      setErrors({
        ...errors,
        [tabs?.tabLabels?.[tabs.curTab]]: {
          ...errors?.[tabs?.tabLabels?.[tabs.curTab]],
          isFulfilled: hightLightPayment(curData, isRankingOpen),
        },
      });
    } else if (['design', 'localizedContent'].includes(tabs?.tabLabels?.[tabs.curTab])) {
      setErrors({
        ...errors,
        [tabs?.tabLabels?.[tabs.curTab]]: {
          ...errors?.[tabs?.tabLabels?.[tabs.curTab]],
          isFulfilled: null,
        },
      });
    } else {
      setErrors({
        ...errors,
        [tabs?.tabLabels?.[tabs.curTab]]: {
          ...errors?.[tabs?.tabLabels?.[tabs.curTab]],
          isFulfilled: paramsId === 'add' ? false : null,
        },
      });
    }
  } else if (tabs?.tabLabels?.[tabs.curTab] !== 'general') {
    setErrors({
      ...errors,
      general: {
        ...errors?.general,
        isFulfilled: hightLightGeneral(curData),
      },
      payment: {
        ...errors?.payment,
        isFulfilled: hightLightPayment(curData, isRankingOpen),
      },
    });
  } else if (tabs?.tabLabels?.[tabs.curTab] !== 'payment') {
    setErrors({
      ...errors,
      payment: {
        ...errors?.payment,
        isFulfilled: hightLightPayment(curData, isRankingOpen),
      },
      general: {
        name: !!errors?.general?.name || !curData.name,
        displayName: !!errors?.general?.displayName || !curData.displayName,
        routes: !!errors?.general?.routes || !curData.routes
          ?.map((el) => !el.hostname).some((el) => !el === true),
      },
    });
  }
};

export default storeHightLight;
