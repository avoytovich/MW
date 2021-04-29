import React from 'react';

import {
  Box,
  TextField,
} from '@material-ui/core';

import CustomCard from '../../../components/utils/CustomCard';

const Subscriptions = () => (
  <CustomCard title="Subscriptions">
    <Box display="flex" py={5} pb={2}>
      <Box px={1} width=" 100%">
        <TextField
          fullWidth
          label="Customer"
          name="customerId"
          type="text"
          disabled
          // value={curReco.customerId}
          variant="outlined"
        />
      </Box>

      <Box px={1} width=" 100%">
        <TextField
          fullWidth
          label="Recommendation Name"
          name="name"
          type="text"
          // value={curReco.name}
          // onChange={handleChange}
          variant="outlined"
        />
      </Box>
    </Box>
  </CustomCard>
);

export default Subscriptions;
