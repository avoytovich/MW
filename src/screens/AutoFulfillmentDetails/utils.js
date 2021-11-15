const structure = (detailsData, customer) => (
  [
    {
      label: 'id',
      field: detailsData?.id || '-',
    },
    {
      label: 'customer',
      field: customer?.name || '-',
    },
    {
      label: 'name',
      field: detailsData?.name || '-',
    },
    {
      label: 'url',
      field: detailsData?.url || '-',
    },
  ]
);

export {
  structure,
};
