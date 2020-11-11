const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const formatDate = (formattingData) => {
  let res = '';
  if (formattingData) {
    const fullDate = new Date(formattingData);
    const day = fullDate.getDay();
    const month = MONTH_NAMES[fullDate.getMonth()].substring(0, 3);
    const year = fullDate.getUTCFullYear();

    res = `${day} ${month} ${year}`;
  }
  return res;
};

export default formatDate;