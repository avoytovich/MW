import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  TextField,
} from '@material-ui/core';

import CustomCard from '../../../components/utils/CustomCard';

const EndUser = ({ orderData }) => (
  <CustomCard title="End User" style={{ height: 'unset', marginTop: 0 }}>
    <Box display="flex" py={5} pb={2}>
      <Box px={1} width="100%">
        <TextField
          fullWidth
          label="ID"
          name="id"
          type="text"
          value={orderData?.endUser?.id}
          variant="outlined"
        />
      </Box>
    </Box>

    <Box display="flex" py={3} pb={2}>
      <Box px={1} width=" 100%">
        <TextField
          fullWidth
          label="First name"
          name="firstName"
          type="text"
          value={orderData?.endUser?.firstName}
          variant="outlined"
        />
      </Box>

      <Box px={1} width=" 100%">
        <TextField
          fullWidth
          label="Last name"
          name="lastName"
          type="text"
          value={orderData?.endUser?.lastName}
          variant="outlined"
        />
      </Box>
    </Box>

    <Box display="flex" py={3} pb={2}>
      <Box px={1} width="100%">
        <TextField
          fullWidth
          label="Email address"
          name="email"
          type="text"
          value={orderData?.endUser?.email}
          variant="outlined"
        />
      </Box>
    </Box>

    <Box display="flex" py={3} pb={2}>
      <Box px={1} width="100%">
        <TextField
          fullWidth
          label="Street address"
          name="street"
          type="text"
          value={orderData?.endUser?.street}
          variant="outlined"
        />
      </Box>
    </Box>

    <Box display="flex" py={3} pb={2}>
      <Box px={1} width=" 100%">
        <TextField
          fullWidth
          label="City"
          name="city"
          type="text"
          value={orderData?.endUser?.city}
          variant="outlined"
        />
      </Box>

      <Box px={1} width=" 100%">
        <TextField
          fullWidth
          label="Zip"
          name="zipCode"
          type="text"
          value={orderData?.endUser?.zipCode}
          variant="outlined"
        />
      </Box>

      <Box px={1} width=" 100%">
        <TextField
          fullWidth
          label="Country"
          name="country"
          type="text"
          value={orderData?.endUser?.country}
          variant="outlined"
        />
      </Box>
    </Box>

    <Box display="flex" py={3} pb={2}>
      <Box px={1} width=" 100%">
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          type="text"
          value={orderData?.endUser?.phone}
          variant="outlined"
        />
      </Box>
    </Box>

    <Box display="flex" py={3} pb={2}>
      <Box px={1} width=" 100%">
        <TextField
          fullWidth
          label="IP"
          name="endUserIp"
          type="text"
          value={orderData?.endUserIp}
          variant="outlined"
        />
      </Box>
    </Box>
  </CustomCard>
);

EndUser.propTypes = {
  orderData: PropTypes.object,
};

export default EndUser;
