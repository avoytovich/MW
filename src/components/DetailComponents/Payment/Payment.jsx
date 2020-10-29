import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Prices from './Prices';
import './Payment.scss';

const Payment = ({ right, setHasChanges }) =>
  right && (
    <Box
      className="paymentBlock"
      display="flex"
      flexDirection="column"
      flexWrap="wrap"
      justifyContent="space-around"
    >
      {right.prices && (
        <Prices prices={right.prices} setHasChanges={setHasChanges} />
      )}
      {/* {right.paymentMethods && (
        <PaymentMethods
          setHasChanges={setHasChanges}
          paymentMethods={right.paymentMethods}
        />
      )} */}
    </Box>
  );

Payment.propTypes = {
  right: PropTypes.object,
  setHasChanges: PropTypes.func,
};

export default Payment;
