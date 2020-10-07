import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Divider } from '@material-ui/core';
import getPaymentImages from './images';
import './Payment.scss';

const Payment = ({ right }) => (
  <>
    <Box>
      <Typography color="secondary">{right.id}</Typography>
      <Divider width="60%" />
    </Box>
    <Box display="flex" alignItems="center" flexDirection="row" flexWrap="wrap">
      {right.value.map((item) => {
        const src = getPaymentImages(item);
        return (
          <Box key={item} className="paymentImageWrapper">
            <img className="paymentImage" src={src} alt={item} />
          </Box>
        );
      })}
    </Box>
  </>
);
Payment.propTypes = {
  right: PropTypes.object,
};

export default Payment;
