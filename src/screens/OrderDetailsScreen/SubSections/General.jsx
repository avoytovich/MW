import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Chip,
  TextField,
  Button,
} from '@material-ui/core';

import GetAppIcon from '@material-ui/icons/GetApp';

import moment from 'moment';

import CustomCard from '../../../components/utils/CustomCard';

import api from '../../../api';

const General = ({ orderData }) => {
  const [customer, setCustomer] = useState({ name: '-' });

  useEffect(() => {
    (async () => {
      const cust = await api.getCustomerById(orderData?.customer?.id);

      setCustomer(cust.data);
    })();

    return () => setCustomer({ name: '-' });
  }, []);

  return (
    <CustomCard title="General" style={{ height: 'unset', marginTop: 0, marginBottom: 0 }}>
      <Box display="flex" py={5} pb={2}>
        <Box px={1} width="70%">
          <TextField
            fullWidth
            label="Customer"
            name="customer"
            type="text"
            value={customer.name}
            variant="outlined"
          />
        </Box>

        <Box display='flex' justifyContent='center' width="30%" alignItems='center'>
          <Chip
            label={customer.status === 'RUNNING' ? 'LIVE' : 'TEST'}
            style={{
              backgroundColor: customer.status === 'RUNNING' ? '#99de90' : '',
              color: '#fff',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              padding: '0 20px',
            }}
          />
        </Box>
      </Box>

      <Box display="flex" py={3} pb={2}>
        <Box px={1} width="100%">
          <TextField
            fullWidth
            label="Source"
            name="source"
            type="text"
            value={orderData.source}
            variant="outlined"
          />
        </Box>
      </Box>

      <Box display="flex" py={3} pb={2}>
        <Box px={1} width=" 100%">
          <TextField
            fullWidth
            label="Create date"
            name="createDate"
            type="text"
            value={moment(orderData.createDate).format('ll')}
            variant="outlined"
          />
        </Box>

        <Box px={1} width=" 100%">
          <TextField
            fullWidth
            label="Last Update"
            name="updateDate"
            type="text"
            value={moment(orderData.updateDate).format('ll')}
            variant="outlined"
          />
        </Box>
      </Box>

      <Box display="flex" py={3} pb={2}>
        <Box px={1} width="100%">
          <TextField
            fullWidth
            label="Status"
            name="status"
            type="text"
            value={orderData.status}
            variant="outlined"
          />
        </Box>
      </Box>

      <Box display="flex" py={3} pb={2}>
        <Box px={1} width=" 100%">
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="text"
            value={`${orderData?.payment?.amount || 0} ${orderData.currency}`}
            variant="outlined"
          />
        </Box>

        <Box px={1} width=" 100%">
          <TextField
            fullWidth
            label="Unpaid Amount"
            name="unpaid"
            type="text"
            value={`0 ${orderData.currency}`}
            variant="outlined"
          />
        </Box>
      </Box>

      <Box display="flex" py={3} pb={2}>
        <Box px={1} width="100%">
          <TextField
            fullWidth
            label="Online store"
            name="onlineStore"
            type="text"
            value={orderData?.store?.name}
            variant="outlined"
          />
        </Box>
      </Box>

      <Box display="flex" py={3} pb={2}>
        <Box px={1} width="100%">
          <TextField
            fullWidth
            label="Sales Flags"
            name="salesFlags"
            type="text"
            value={orderData.salesFlags && orderData.salesFlags.join(', ')}
            variant="outlined"
          />
        </Box>
      </Box>

      <Box display="flex" py={3} pb={2}>
        <Box display="flex" px={1} width="90%">
          <Box width='100%' pr={2}>
            <TextField
              fullWidth
              label="InvoiceID"
              name="invoice"
              type="text"
              value={orderData?.invoice?.id}
              variant="outlined"
            />
          </Box>

          <Box width='100%' pr={1}>
            <TextField
              fullWidth
              label="Invoice Date"
              name="invoiceDate"
              type="text"
              value={moment(orderData?.invoice?.date).format('ll')}
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display='flex' justifyContent='center' width="10%" alignItems='center'>
          <Button width="100%">
            <GetAppIcon color='primary' />
          </Button>
        </Box>
      </Box>

      <Box display="flex" py={3} pb={2}>
        <Box display="flex" px={1} width="90%">
          <Box width='100%' pr={2}>
            <TextField
              fullWidth
              label="Credit Note"
              name="creditNote"
              type="text"
              value={orderData?.creditNotes && orderData?.creditNotes[0]?.id}
              variant="outlined"
            />
          </Box>

          <Box width='100%' pr={1}>
            <TextField
              fullWidth
              label="Credit Note Date"
              name="creditDate"
              type="text"
              value={orderData?.creditNotes && moment(orderData?.creditNotes[0]?.date).format('ll')}
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display='flex' justifyContent='center' width="10%" alignItems='center'>
          <Button width="100%">
            <GetAppIcon color='primary' />
          </Button>
        </Box>
      </Box>

      <Box display="flex" py={3} pb={2}>
        <Box px={1} width="100%">
          <TextField
            fullWidth
            label="Number of installments"
            name="installments"
            type="text"
            value={orderData?.installments}
            variant="outlined"
          />
        </Box>
      </Box>

      <Box display="flex" py={2} pb={1} px={1}>
        <Button width="100%">
          Terms & Conditions

          <GetAppIcon color='primary' style={{ marginLeft: '10px' }} />
        </Button>
      </Box>
    </CustomCard>
  );
};
General.propTypes = {
  orderData: PropTypes.object,
};

export default General;
