const generateData = (data) => {
  const values = [
    {
      id: 'id',
      value: data?.id,
      type: 'text',
    },
    {
      id: 'customerId',
      value: data?.customerId,
    },
    {
      id: 'catalog',
      value: data?.catalog,
    },
    {
      id: 'genericName',
      value: data?.genericName,
    },
    {
      id: 'publisherRefId',
      value: data?.publisherRefId,
    },
    {
      id: 'type',
      value: data?.type,
    },
    {
      id: 'physicalProduct',
      value: data?.physicalProduct,
    },
    {
      id: 'lifeTime',
      value: data?.lifeTime,
    },
    {
      id: 'sellingStores',
      value: data?.sellingStores,
    },
    {
      id: 'blockedCountries',
      value: data?.blockedCountries,
    },
    {
      id: 'externalContext',
      value: data?.externalContext,
    },
    {
      id: 'status',
      value: data?.status,
    },
    {
      id: 'family',
      value: data?.family,
    },
    {
      id: 'priceFunction',
      value: data?.priceFunction,
    },
  ];
  return values;
};

export default generateData;
