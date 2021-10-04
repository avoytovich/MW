import localization from '../../../localization';

const defaultShow = {
  providerDefinitionId: false,
  customer: true,
  definitionName: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.providerDefinitionId'), id: 'providerDefinitionId' },
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.definitionName'), id: 'definitionName' },
  ],
};

const generateData = (data, customers) => {
  const values = data.items.map((val) => {
    // todo: remake using common service
    const customer = customers.items.filter(
      (item) => item.id === val.customerId,
    )[0]?.name;
    return ({
      id: val.id,
      providerDefinitionId: val.id,
      customer: customer || val.customerId,
      definitionName: val.name,
    });
  });

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
