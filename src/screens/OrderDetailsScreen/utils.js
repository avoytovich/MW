const shouldDownload = (key) => key === 'termsAndConditions';

const shouldCopy = (key) =>
  key === 'id' ||
  key === 'invoiceID' ||
  key === 'endUserIp' ||
  key === 'paymentID' ||
  key === 'transactionID' ||
  key === 'cardBin';

const tabLabels = ['general', 'products', 'events'];
export { shouldDownload, shouldCopy, tabLabels };
