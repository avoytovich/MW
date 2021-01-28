import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Switch,
} from '@material-ui/core';

import CustomCard from '../../components/utils/CustomCard';

import './discountDetailsScreen.scss';

const BasicSection = ({
  curDiscount,
  handleChange,
  updateDiscount,
  setCurDiscount,
}) => (
  <CustomCard title="Basic">
    <Box display="flex" py={5} pb={2}>
      <TextField
        fullWidth
        label="Customer"
        name="customerId"
        type="text"
        disabled
        value={curDiscount.customerId}
        variant="outlined"
      />

      <TextField
        fullWidth
        label="Amount"
        name="discountRate"
        type="text"
        value={curDiscount.discountRate * 100}
        onChange={(e) => handleChange(e)}
        InputProps={{
          endAdornment: <span>%</span>,
        }}
        variant="outlined"
      />
    </Box>

    <Box display="flex">
      <TextField
        fullWidth
        label="Discount Name"
        name="name"
        type="text"
        value={curDiscount.name}
        onChange={(e) => handleChange(e)}
        variant="outlined"
      />

      <TextField
        fullWidth
        label="Label"
        name="localizedLabels.neutral"
        type="text"
        value={curDiscount.localizedLabels.neutral}
        onChange={(e) => setCurDiscount((d) => ({
          ...d,
          localizedLabels: {
            ...d.localizedLabels,
            neutral: e.target.value,
          },
        }))}
        variant="outlined"
        helperText={
          !curDiscount.localizedLabels.neutral
          && 'If left empty the label will not be displayed on the checkout'
        }
      />
    </Box>

    <Box display="flex" mx={2}>
      <div>
        <Typography gutterBottom variant="h5">
          Model
        </Typography>

        <Box display="flex" alignItems="center">
          <FormControlLabel
            control={(
              <Checkbox
                name="CAMPAIGN"
                color="primary"
                checked={curDiscount.model === 'CAMPAIGN'}
              />
            )}
            onChange={() => updateDiscount('model', 'CAMPAIGN')}
            label="Campaign"
          />

          <FormControlLabel
            control={(
              <Checkbox
                name="COUPON"
                color="primary"
                checked={curDiscount.model === 'COUPON'}
              />
            )}
            onChange={() => updateDiscount('model', 'COUPON')}
            label="Coupon"
          />

          <FormControlLabel
            control={(
              <Checkbox
                name="SINGLE_USE_CODE"
                color="primary"
                checked={curDiscount.model === 'SINGLE_USE_CODE'}
              />
            )}
            onChange={() => updateDiscount('model', 'SINGLE_USE_CODE')}
            label="Single use code"
          />
        </Box>
      </div>
    </Box>

    <Box py={3} mx={2}>
      <Typography gutterBottom variant="h5">
        Status
      </Typography>

      <Box display="flex" alignItems="center">
        <FormControlLabel
          control={(
            <Switch
              color="primary"
              checked={curDiscount.status === 'ENABLED'}
              name="status"
            />
          )}
          onChange={() => updateDiscount(
            'status',
            curDiscount.status === 'ENABLED' ? 'DISABLED' : 'ENABLED',
          )}
          label={curDiscount.status === 'ENABLED' ? 'Enabled' : 'Disabled'}
        />
      </Box>
    </Box>
  </CustomCard>
);

export default BasicSection;

BasicSection.propTypes = {
  handleChange: PropTypes.func,
  updateDiscount: PropTypes.func,
  curDiscount: PropTypes.object,
  setCurDiscount: PropTypes.func,
};
