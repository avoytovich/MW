import React from 'react';

const PriceNumberFormat = ({ number, currency, country }) => {
  let formatter = new Intl.NumberFormat( country, { style: 'currency', currency: currency } );
  return (
    formatter.format(number).replace(/[^\d\.\,\s]+/g, "")
  )
};

export default PriceNumberFormat;
