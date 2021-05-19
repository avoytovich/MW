const DateFormat = ({ date }) => {

  const dateFormat = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  };

  return (
    // eslint-disable-next-line
    new Intl.DateTimeFormat('en-US', dateFormat ).format(date).toString()
  );
};

export default DateFormat;
