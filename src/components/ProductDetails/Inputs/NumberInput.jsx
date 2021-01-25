import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@material-ui/core';

import localization from '../../../localization';

const NumberInput = ({
  label, value, onChangeInput, minMAx,
}) => (
  <Box my={3}>
    <TextField
      name={label}
      value={value}
      fullWidth
      label={localization.t(`labels.${label}`)}
      type="number"
      InputProps={{
        inputProps: minMAx,
        form: { autocomplete: 'off' },
      }}
      onChange={onChangeInput}
      variant="outlined"
    />
  </Box>
);

NumberInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minMAx: PropTypes.object,
  onChangeInput: PropTypes.func,
};

export default NumberInput;
