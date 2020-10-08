import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import getPaymentImages from './images';
import './Payment.scss';

const Payment = ({ right }) => (
  <>
    {right.prices && (
      <Box
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
        alignContent="center"
      >
        <Box p={2} className="pricesBlock">
          {right.prices.map((item) => (
            <Box
              key={item.id}
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
            >
              <Box pr={2}>
                <Typography variant="body2">{`${item.id}: `}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">{item.value}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    )}
    {right.paymentMethods && (
      <>
        <Typography>{right.paymentMethods.id}</Typography>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="row"
          flexWrap="wrap"
        >
          {right.paymentMethods.value.map((item) => {
            const src = getPaymentImages(item);
            return (
              <Box key={item} className="paymentImageWrapper">
                <img className="paymentImage" src={src} alt={item} />
              </Box>
            );
          })}
        </Box>
      </>
    )}
  </>
);

Payment.propTypes = {
  right: PropTypes.object,
};

export default Payment;
