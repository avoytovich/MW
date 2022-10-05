const defaultMetaRoleObj = { roleIds: [], reason: '', name: '' };

const requiredFields = (obj) => ({ ...defaultMetaRoleObj, ...obj });

const structureSelectOptions = (options) => {
  let res = [];
  if (options) {
    res = options.map((option) => ({
      id: option.id,
      value: `${option.name}: ${option.description || 'No description'}`,
    }));
  }
  return res;
};

function sortedData(a, b) {
  if (a.value === 'api-services: Responsibility given by default to the application '
    + 'user (clientId = api-services) created during the onboarding. Will be removed in the future.') return -1;
  if (a.value < b.value) {
    return -1;
  }
  if (a.value > b.value) {
    return 1;
  }
  return 0;
}
export {
  requiredFields, structureSelectOptions, defaultMetaRoleObj, sortedData,
};
