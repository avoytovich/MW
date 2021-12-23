import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  Chip,
} from '@mui/material';

const CustomerStatusLabel = ({ customer }) => (
  customer && (
    <Box display='flex' flexDirection='row' justifyContent='space-between' my={2}>
      <Box display='flex' flexDirection='column'>
        <Box display='flex' alignItems='center'>
          <Box px={2}>
            <Typography variant='body2'>
              {customer.name}
            </Typography>
          </Box>

          <Chip
            label={customer.status === 'RUNNING' ? 'LIVE' : 'TEST'}
            style={{
              backgroundColor:
                customer.status === 'RUNNING' ? '#99de90' : '',
              lineHeight: '30px',
              color: '#fff',
            }}
          />
        </Box>
      </Box>
    </Box>
  )
);

CustomerStatusLabel.propTypes = {
  customer: PropTypes.object,
};

export default CustomerStatusLabel;
