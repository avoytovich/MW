const defaultShow = {
  id: false,
  createDate: true,
  updateDate: true,
  customerId: true,
  genericName: true,
  publisherRefId: true,
  type: true,
  lifeTime: true,
  status: true,
  family: false,
};

const markUp = {
  headers: [
    { value: 'Product ID', id: 'id' },
    { value: 'Creation Date', id: 'createDate' },
    { value: 'Last Update', id: 'updateDate' },
    { value: 'Customer', id: 'customerId' },
    { value: 'Name', id: 'genericName' },
    { value: 'Publisher Ref ID', id: 'publisherRefId' },
    { value: 'Type', id: 'type' },
    { value: 'Lifetime', id: 'lifeTime' },
    { value: 'Status', id: 'status' },
    { value: 'Family', id: 'family' },
    { value: 'Price function', id: 'priseFunction' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    createDate: val.createDate,
    updateDate: val.updateDate,
    customerId: val.customerId,
    genericName: val.genericName,
    publisherRefId: val.publisherRefId,
    type: val.type,
    lifeTime: val.lifeTime,
    status: val.status,
    family: val.family,
  }));

  const meta = {
    totalPages: data.totalPages,
  };
  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow };
