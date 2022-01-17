const shouldDownload = (key) => key === 'termsAndConditions';

const shouldCopy = (key) => (
  key === 'id'
  || key === 'invoiceID'
  || key === 'endUserIp'
  || key === 'paymentID'
  || key === 'transactionID'
  || key === 'cardBin'
  || key === 'customerId'
);

const tabLabels = ['general', 'products', 'events', 'subscriptions'];

const generateSubscriptions = (data) => {
  const res = [];
  data.forEach((element) => {
    res.push({
      name: element.model.name || '',
      subscriptionId: element.id || '',
      status: element.lifecycle?.status || '',
      creationDate: element.lifecycle?.creationDate || '',
      expirationDate: element.lifecycle?.expirationDate || '',
    });
  });
  return res;
};

export {
  shouldDownload,
  shouldCopy,
  tabLabels,
  generateSubscriptions,
};
