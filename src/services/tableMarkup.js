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
};

export default tableMarkup;
