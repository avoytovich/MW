import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, FormControlLabel, Switch,
} from '@mui/material';

import localization from '../../localization';

const SwitchInput = ({
  label, handleChange, isChecked, switchLabel,
}) => (
  <Box display="flex" flexDirection="row" alignItems="center">
    <Box>
      <Typography>{localization.t(`labels.${label}`)}</Typography>
    </Box>
    <Box px={2}>
      <FormControlLabel
        control={(
          <Switch
            name={label}
            onChange={handleChange}
            color="primary"
            checked={isChecked}
          />
        )}
        label={switchLabel || ''}
      />
    </Box>
  </Box>
);

SwitchInput.propTypes = {
  label: PropTypes.string,
  handleChange: PropTypes.func,
  isChecked: PropTypes.bool,
  switchLabel: PropTypes.string,
};

export default SwitchInput;
