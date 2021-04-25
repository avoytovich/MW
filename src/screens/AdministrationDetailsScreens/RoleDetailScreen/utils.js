const defaultRoleObj = {
  availabilityConditions: [],
  name: '',
  rights: [],
  reason: '',
  description: '',
};

const addDenialOptions = (options) => {
  const newArray = [];
  options.forEach((element) => {
    newArray.push({ id: element, value: element });
    newArray.push({ id: `!${element}`, value: `not '${element}'` });
  });
  return newArray;
};

const clearancesArrayFormatting = (array) => {
  const res = {};
  array.forEach((item, index) => {
    if (res[item.serviceName]) {
      res[item.serviceName].push({
        key: `${item.serviceName}_${index}`,
        actions: item.actions,
        availabilityConditions: item.availabilityConditions,
      });
    } else {
      res[item.serviceName] = [
        {
          key: `${item.serviceName}_${index}`,
          actions: item.actions,
          availabilityConditions: item.availabilityConditions,
        },
      ];
    }
  });
  return res;
};
const formattingForSending = (obj) => {
  const res = [];
  Object.keys(obj.rights).forEach((key) => {
    obj.rights[key].forEach((item) => {
      if (item.actions.length > 0 || item.availabilityConditions.length > 0) {
        res.push({
          serviceName: key,
          actions: item.actions,
          availabilityConditions: item.availabilityConditions,
        });
      }
    });
  });
  return { ...obj, rights: res };
};
const formPrivilegeOptions = (options) => {
  const serviceNames = [];
  const privileges = {};
  options.forEach((item) => {
    serviceNames.push({ id: item.serviceName, value: item.serviceName });
    privileges[item.serviceName] = item.availableActions.map((action) => ({
      id: action,
      value: action,
    }));
  });
  return { serviceNames, privileges };
};
const requiredFields = (obj) => {
  let res = { ...defaultRoleObj, ...obj };
  if (obj.rights) {
    const newRights = clearancesArrayFormatting(obj.rights);
    res = { ...res, rights: newRights };
  }
  return res;
};
const createKey = (obj, newServiceName) => {
  let keyNumber = 0;

  if (obj.rights[newServiceName]) {
    keyNumber =
      Number(
        obj.rights[newServiceName][
          obj.rights[newServiceName].length - 1
        ].key.split('_')[1],
      ) + 1;
  }
  return `${newServiceName}_${keyNumber}`;
};
export {
  addDenialOptions,
  formPrivilegeOptions,
  requiredFields,
  clearancesArrayFormatting,
  formattingForSending,
  createKey,
};
