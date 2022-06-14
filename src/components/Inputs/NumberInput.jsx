import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import { TextField } from '@mui/material';
import localization from '../../localization';

const ValidationTextField = styled(TextField)({
  '& fieldset': {
    borderColor: 'green',
  },

});
const NumberInput = ({
  label,
  value,
  onChangeInput,
  minMAx,
  isDisabled,
  isRequired,
  helperText,
  hasError,
  hasNoChanges,
  inputRefFunc,
}) => (hasNoChanges ? (
  <TextField
    inputRef={inputRefFunc}
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
)
  : (
    <ValidationTextField
      inputRef={inputRefFunc}
      error={hasError}
      autoFocus
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
  ));

NumberInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minMAx: PropTypes.object,
  onChangeInput: PropTypes.func,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  hasError: PropTypes.bool,
  hasNoChanges: PropTypes.bool,
  inputRefFunc: PropTypes.func,
};

export default NumberInput;
