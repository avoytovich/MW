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
  const fullDate = new Date(formattingData);
  const day = fullDate.getDay();
  const month = MONTH_NAMES[fullDate.getMonth()].substring(0, 3);
  const year = fullDate.getUTCFullYear();

  return `${day} ${month} ${year}`;
};

export default formatDate;
