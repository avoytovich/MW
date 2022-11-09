const hightLightMaxUses = (curData) => ((curData?.model === 'SINGLE_USE_CODE' && !curData?.maxUsages) ? false : null);

const hightLightGeneral = (curData) => (curData.name ? null : false);

const discountHighlight = (
  curData,
  errors = {},
  setErrors = () => {},
  tabs,
  paramsId,
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
    } else if (tabs?.tabLabels?.[tabs.curTab] === 'cappingAndLimits') {
      setErrors({
        ...errors,
        [tabs?.tabLabels?.[tabs.curTab]]: {
          ...errors?.[tabs?.tabLabels?.[tabs.curTab]],
          isFulfilled: hightLightMaxUses(curData),
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
        name: !!errors?.general?.discountRuleName || !curData.name,
        isFulfilled: hightLightGeneral(curData),
      },
    });
  } else if (tabs?.tabLabels?.[tabs.curTab] !== 'cappingAndLimits') {
    setErrors({
      ...errors,
      cappingAndLimits: {
        ...errors?.cappingAndLimits,
        isFulfilled: hightLightMaxUses(curData),
      },
    });
  }
};

export default discountHighlight;
