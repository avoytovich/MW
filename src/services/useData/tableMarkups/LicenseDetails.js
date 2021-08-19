import moment from 'moment';

import localization from '../../../localization';

const defaultShow = {
  executionId: true,
  requestTime: true,
  requestOperation: true,
  requestUserEmail: true,
  processingDataLicenseId: true,

};

const markUp = {
  headers: [
    { value: localization.t('labels.executionId'), id: 'executionId' },
    {
      value: localization.t('labels.timeOfTheRequest'),
      id: 'requestTime',
    },
    {
      value: localization.t('labels.requestOperation'),
      id: 'requestOperation',
    },
    {
      value: localization.t('labels.requestUserEmail'),
      id: 'requestUserEmail',
    },
    {
      value: localization.t('labels.processingDataLicenseId'),
      id: 'processingDataLicenseId',
    },
  ],
};

const generateData = (data) => {
  const values = data.operationExecutions.map((val) => ({
    executionId: val.id,
    requestTime: moment(val.requestTimestamp).format('D MMM YYYY, h:mm:ss'),
    requestOperation: val.request.operation,
    requestUserEmail: val.request.user ? val.request.user.email : '-',
    processingDataLicenseId: val.processingData.licenseId,

  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
