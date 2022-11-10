const sectionsValidation = {
  recommendation: {
    general: ['name'],
  },
  discountrules: { general: ['name'] },
  stores: { general: ['name', 'defaultLocale', 'displayName'] },
};

const additionalValidation = {
  stores: (curData) => {
    const res = [];
    if (!curData.routes[0]?.hostname) {
      res.push({ section: 'general', field: 'routes' });
    }
    return res;
  },
};

export { sectionsValidation, additionalValidation };
