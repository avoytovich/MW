const tableMarkup = {
  products: {
    headers: [
      { name: 'Product ID', cell: 'id' },
      { name: 'Creation Date', cell: 'createDate' },
      { name: 'Last Update', cell: 'updateDate' },
      { name: 'Customer', cell: 'customerId' },
      { name: 'Name', cell: 'genericName' },
      { name: 'Publisher Ref ID', cell: 'publisherRefId' },
      { name: 'Type', cell: 'type' },
      { name: 'Lifetime', cell: 'lifeTime' },
      { name: 'Status', cell: 'status' },
      { name: 'Family', cell: 'family' },
      { name: 'Price function', cell: 'priseFunction' },
    ],
    defaultShow: {
      id: true,
      createDate: true,
      updateDate: true,
      customerId: true,
      genericName: true,
      publisherRefId: true,
      type: true,
      lifeTime: true,
      status: true,
      family: false,
    },
  },
  orders: {
    headers: [
      { name: 'Customer', cell: 'store.name' },
      { name: 'Create date', cell: 'createDate' },
      { name: 'Last Update', cell: 'updateDate' },
      { name: 'Status', cell: 'status' },
      { name: 'Source', cell: '' },
      { name: 'Order ID', cell: 'id' },
      { name: 'InvoiceID', cell: 'invoice.id' },
      { name: 'Email address', cell: 'endUser.email' },
      { name: 'Phone', cell: '' },
      { name: 'Online store', cell: '' },
      { name: 'Company name', cell: '' },
      { name: 'Net price', cell: '' },
      { name: 'Gross price', cell: '' },
      { name: 'Vat amount', cell: '' },
      { name: 'Net price discounted', cell: '' },
      { name: 'Gross price discounted', cell: '' },
      { name: 'Vat amount discounted', cell: '' },
      { name: 'Currency', cell: '' },
      { name: 'Split Payment', cell: '' },
      { name: 'Activation Code/Key', cell: '' },
      { name: 'Publisher Ref ID', cell: '' },
      { name: 'Products', cell: '' },
      { name: 'Price Function', cell: '' },
      { name: 'Transaction ID', cell: '' },
      { name: 'Payment type', cell: '' },
      { name: 'Invoice Date', cell: '' },
      { name: 'Last name', cell: 'endUser.lastName' },
      { name: 'First name', cell: 'endUser.firstName' },
      { name: 'Country', cell: 'endUser.country' },
      { name: 'IP', cell: 'endUserIp' },
      { name: 'Payment status', cell: 'payment.informativeDPStatus' },
      { name: 'Estimated Payment status', cell: '' },
      { name: 'Subscription Status', cell: '' },
      { name: 'Credit Note ID', cell: '' },
      { name: 'Cancelation Reasons', cell: '' },
      { name: 'Subscription ID', cell: '' },
      { name: 'Sales Flags', cell: '' },
    ],
  },
  stores: {
    headers: [
      { name: 'Customer', cell: 'customerId' }, // Temporary
      { name: 'Name', cell: 'name' },
      { name: 'Creation Date', cell: 'createDate' },
      { name: 'Last update', cell: 'updateDate' },
      { name: 'Default Language', cell: 'defaultLocale' },
      { name: 'Status', cell: 'status' },
      { name: 'GTM ID', cell: 'gtmId' },
      { name: 'Store ID', cell: 'id' },
    ],
    defaultShow: {
      id: true,
      customerId: true, // Temporary
      name: true,
      createDate: true,
      updateDate: true,
      defaultLocale: true,
      'designs?.theme': true,
      status: true,
      gtmId: false,
    },
  },
};

export default tableMarkup;
