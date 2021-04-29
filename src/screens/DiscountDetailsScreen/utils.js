const filterOptions = (all, selected, currentValue) => {
  const keys = [...selected].map((item) => item.key);
  const res = all.filter(
    (option) => !keys.includes(option.id) || option.id === currentValue,
  );
  return res;
};

const fromObjectToArray = (object, keyValue, defParam) => {
  const res = Object.keys({
    ...object,
  }).map((item) => (
    keyValue === 'key' ? {
      key: item,
      value: object[item],
    } : {
      key: object[item],
      value: item,
    }
  ));
  if (res.length === 0 && defParam) {
    res.push(defParam);
  }
  return res;
};

const fromArrayToObject = (array, keyValue) => {
  const res = {};
  array.forEach((item) => {
    if (item.value && item.key) {
      if (keyValue === 'key') {
        res[item.key] = item.value;
      } else {
        res[item.value] = item.key;
      }
    }
  });
  return res;
};

const tabsLabels = ['general', 'cappingAndLimits', 'eligibility'];

export {
  filterOptions, fromObjectToArray, fromArrayToObject, tabsLabels,
};
