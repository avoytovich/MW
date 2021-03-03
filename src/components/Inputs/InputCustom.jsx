import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import localization from '../../localization';

const InputCustom = ({
  label,
  value,
  onChangeInput,
  isRequired,
  idDisabled,
  isMultiline,
}) => (
  <form autoComplete="off">
    <TextField
      disabled={idDisabled}
      multiline={isMultiline}
      required={isRequired}
      name={label}
      value={value}
      fullWidth
      label={label ? localization.t(`labels.${label}`) : ''}
      type="text"
      InputProps={{
        form: { autocomplete: 'off' },
      }}
      onChange={onChangeInput}
      variant="outlined"
    />
  </form>
);

InputCustom.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  idDisabled: PropTypes.bool,
  isMultiline: PropTypes.bool,
  onChangeInput: PropTypes.func,
};

export default InputCustom;
