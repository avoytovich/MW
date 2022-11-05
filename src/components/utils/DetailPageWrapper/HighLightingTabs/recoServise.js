const hightLightGeneral = (curData) => (
  (curData.name)
    ? null : false
);

const recoHightLight = (
  curData,
  errors = {},
  setErrors = () => {},
  tabs,
  paramsId,
  customer,
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
        name: !!errors?.general?.name || !curData.name,
        isFulfilled: hightLightGeneral(curData),
      },
    });
  }
};

export default recoHightLight;
