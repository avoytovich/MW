import moment from 'moment';
import localization from '../../../localization';

const defaultShow = {
  occuredAt: true,
  event: true,
  status: true,
  details: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.occuredAt'), id: 'occuredAt' },
    { value: localization.t('labels.event'), id: 'event' },
    { value: localization.t('labels.status'), id: 'status' },
    { value: localization.t('labels.details'), id: 'details' },
  ],
};

const generateData = (data) => {
  const values = data.map((val, ind) => ({
    id: val.name + ind,
    occuredAt: moment(val.createDate).format('D MMM YYYY'),
    event: val.name,
    status: val.status,
    message: val.message,
    details: val.status === 'Failed' ? 'failed_event' : undefined,
    processingError: val.status === 'Failed',
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
