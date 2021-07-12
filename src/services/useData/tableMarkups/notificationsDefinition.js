import moment from 'moment';
import localization from '../../../localization';

const defaultShow = {
  id: true,
  name: true,
  updateDate: true,
  subject: true,
  fact: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id', sortParam: 'id' },
    { value: localization.t('labels.name'), id: 'name', sortParam: 'name' },
    { value: localization.t('labels.updateDate'), id: 'updateDate', sortParam: 'updateDate' },
    { value: localization.t('labels.subject'), id: 'subject', sortParam: 'subject' },
    { value: localization.t('labels.fact'), id: 'fact', sortParam: 'fact' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    name: val.name,
    updateDate: moment(val.updateDate).format('D MMM YYYY'),
    subject: val.eventMatcher.subject,
    fact: val.eventMatcher.fact,
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
