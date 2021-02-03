// ToDo - add localization
import moment from 'moment';

const defaultShow = {
  occuredAt: true,
  event: true,
  status: true,
};

const markUp = {
  headers: [
    { value: 'Occured at', id: 'occuredAt' },
    { value: 'Event', id: 'event' },
    { value: 'Status', id: 'status' },
  ],
};

const generateData = (data) => {
  const values = data.map((val, ind) => ({
    id: val.name + ind,
    occuredAt: moment(val.createDate).format('D MMM YYYY'),
    event: val.name,
    status: val.status,
    statusError: val.status === 'Failed',
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };
