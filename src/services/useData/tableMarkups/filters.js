// ToDo: add filter labels localizations
const filters = {
  products: [
    { id: 'creationDate', label: 'Creation Date', type: 'date' },
    { id: 'updatingDate', label: 'Last Update', type: 'date' },
    { id: 'genericName', label: 'Name', type: 'text' },
    { id: 'publisherRefId', label: 'Publisher Ref ID', type: 'text' },
    {
      id: 'type',
      label: 'Type',
      type: 'select',
      values: [
        { label: 'Software', value: 'SOFTWARE' },
        { label: 'Games', value: 'GAMES' },
        { label: 'Casual', value: 'CASUAL' },
        { label: 'Service', value: 'SERVICE' },
        { label: 'B2B', value: 'B2B' },
        { label: 'B2C', value: 'B2C' },
      ],
    },
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      values: [
        { label: 'Enabled', value: 'ENABLED' },
        { label: 'Disabled', value: 'DISABLED' },
      ],
    },
  ],
  orders: [
    { id: 'payment.paymentTypeId', label: 'Payment Type', type: 'text' },
  ],
  stores: [
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'id', label: 'Store ID', type: 'text' },
    { id: 'creationDate', label: 'Creation Date', type: 'date' },
    { id: 'updatingDate', label: 'Last Update', type: 'date' },
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      values: [
        { label: 'Enabled', value: 'ENABLED' },
        { label: 'Disabled', value: 'DISABLED' },
      ],
    },
  ],
};

export default filters;
