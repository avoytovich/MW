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
export { requiredFields, structureSelectOptions, defaultMetaRoleObj };
