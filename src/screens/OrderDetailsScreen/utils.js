const shouldDownload = (key) => key === 'termsAndConditions';

const shouldCopy = (key) => key === 'id'
  || key === 'invoiceID'
  || key === 'endUserIp'
  || key === 'paymentID'
  || key === 'transactionID'
  || key === 'cardBin';

export { shouldDownload, shouldCopy };
