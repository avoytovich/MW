import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import localization from '../../localization';

const NumberInput = ({
  label, value, onChangeInput, minMAx, isDisabled, isRequired, helperText, hasError,
}) => (
  <TextField
    error={hasError}
    helperText={helperText}
    required={isRequired}
    data-test={label}
    disabled={isDisabled}
    name={label}
    value={value}
    fullWidth
    label={label ? localization.t(`labels.${label}`) : ''}
    type="number"
    InputProps={{
      inputProps: minMAx,
      form: { autocomplete: 'off' },
    }}
    onChange={onChangeInput}
    variant="outlined"
  />
);

NumberInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minMAx: PropTypes.object,
  onChangeInput: PropTypes.func,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  hasError: PropTypes.bool,
};

export default NumberInput;
