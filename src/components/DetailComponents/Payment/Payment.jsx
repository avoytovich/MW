import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Divider } from '@material-ui/core';
import getPaymentImages from './images';
import './Payment.scss';

const Payment = ({ right }) => (
  <Box
    className="paymentBlock"
    display="flex"
    flexDirection="column"
    flexWrap="wrap"
    justifyContent="space-around"
  >
    {right.prices && (
      <Box py={2} className="paymentItem" alignSelf="center">
        <Box display="flex" flexDirection="column" flexWrap="wrap">
          <Box p={3}>
            {right.prices.map((item) => (
              <Box
                key={item.id}
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
              >
                <Box flexBasis="70%">
                  <Typography variant="body2">{`${item.id}: `}</Typography>
                </Box>
                <Box flexGrow={1}>
                  <Typography variant="body2">{item.value}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    )}
    {right.paymentMethods && (
      <Box>
        <Typography variant="overline">{right.paymentMethods.id}</Typography>
        <Divider width="100%" />
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
      </Box>
    )}
  </Box>
);

Payment.propTypes = {
  right: PropTypes.object,
};

export default Payment;
