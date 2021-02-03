import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  TextField,
} from '@material-ui/core';

import moment from 'moment';

import CustomCard from '../../../components/utils/CustomCard';

import api from '../../../api';

const Payments = ({ orderData }) => {
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    (async () => {
      const paymentId = orderData?.payment?.paymentId;

      if (!paymentId) return;

      const { data } = await api.getPaymentById(paymentId);

      setPayment(data);
    })();

    return () => setPayment(null);
  }, []);

  return (
    payment && (
      <CustomCard title="Payments">
        <Box display="flex" py={5} pb={2}>
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label="Payment ID"
              name="paymentId"
              type="text"
              value={payment.paymentId}
              variant="outlined"
            />
          </Box>

          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label="Payment status"
              name="status"
              type="text"
              value={payment.status}
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display="flex" py={5} pb={2}>
          <Box px={1} width="100%">
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="text"
              value={`${payment.amount || 0} ${payment.currency}`}
              variant="outlined"
            />
          </Box>

          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label="Fraud status"
              name="fraudStatus"
              type="text"
              value={payment.fraudStatus}
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display="flex" py={5} pb={2}>
          <Box px={1} width="100%">
            <TextField
              fullWidth
              label="Payment type"
              name="paymentType"
              type="text"
              value={payment.paymentType.id.toUpperCase()}
              variant="outlined"
            />
          </Box>

          <Box px={1} width="100%">
            <TextField
              fullWidth
              label="Payment provider"
              name="pspId"
              type="text"
              value={payment.pspId}
              variant="outlined"
            />
          </Box>

          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label="Card bin"
              name="creditCardDetails"
              type="text"
              value={payment.creditCardDetails.bin}
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display="flex" py={5} pb={2}>
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label="Payment Request date"
              name="paymentRequestDate"
              type="text"
              value={moment(payment.paymentRequestDate).format('ll')}
              variant="outlined"
            />
          </Box>

          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label="Payment date"
              name="paymentDate"
              type="text"
              value={moment(payment.paymentDate).format('ll')}
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display="flex" py={5} pb={2}>
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label="Transaction ID"
              name="transactionId"
              type="text"
              value={payment.transactionId}
              variant="outlined"
            />
          </Box>

          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label="IP"
              name="enduserIp"
              type="text"
              value={payment.enduserIp}
              variant="outlined"
            />
          </Box>
        </Box>
      </CustomCard>
    )
  );
};

Payments.propTypes = {
  orderData: PropTypes.object,
};

export default Payments;
