const PriceNumberFormat = ({ number, currency, country }) => {
  const formatter = new Intl.NumberFormat(country, { style: 'currency', currency });
  return (
    // eslint-disable-next-line
    formatter.format(number).replace(/[^\d\.\,\s]+/g, '')
  );
};

export default PriceNumberFormat;
