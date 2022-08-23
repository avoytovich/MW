import localization from '../../localization';

const defaultShow = {
  batchId: true,
  uploadedAt: true,
  available: true,
  blacklisted: true,
  canceled: true,
  occupied: true,
  renewed: true,
};

const markUp = {
  headers: [
    {
      value: localization.t('labels.batchId'),
      id: 'batchId',
    },
    {
      value: localization.t('labels.uploadedAt'),
      id: 'uploadedAt',
    },
    {
      value: localization.t('labels.available'),
      id: 'available',
    },
    { value: localization.t('labels.blacklisted'), id: 'blacklisted' },
    {
      value: localization.t('labels.canceled'),
      id: 'canceled',
    },
    {
      value: localization.t('labels.occupied'),
      id: 'occupied',
    },
    {
      value: localization.t('labels.renewed'),
      id: 'renewed',
    },
  ],
};

const generateData = (data) => {
  const values = [{
    batchId: data.batchId || '-',
    uploadedAt: data.uploadedAt || '-',
    id: 'manualFulfillmentBatches',
    available: data?.available || 0,
    blacklisted: data?.blacklisted || 0,
    canceled: data?.canceled || 0,
    occupied: data?.occupied || 0,
    renewed: data?.renewed || 0,
  }];

  const meta = {
    totalPages: data.totalPages,
    totalItems: data.totalItems,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
