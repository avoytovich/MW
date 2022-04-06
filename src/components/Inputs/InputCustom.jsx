import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import localization from '../../localization';

const InputCustom = ({
  label,
  value,
  onChangeInput,
  isRequired,
  isDisabled,
  isMultiline,
  helperText,
  hasError,
  rowsMax,
  tooltip,
  onBlur,
}) => (
  <form autoComplete='off' style={{ width: '100%', position: 'relative' }}>
    <TextField
      onKeyDown={(e) => {
        if (e.code === 'Enter' && !isMultiline) {
          e.preventDefault();
        }
      }}
      maxRows={rowsMax}
      error={hasError}
      data-test={label}
      helperText={helperText}
      disabled={isDisabled}
      multiline={isMultiline}
      required={isRequired}
      name={label}
      value={value || ''}
      fullWidth
      onBlur={onBlur}
      label={label ? localization.t(`labels.${label}`) : ''}
      type='text'
      InputProps={{
        form: { autocomplete: 'off' },
      }}
      InputLabelProps={!label && { shrink: false }}
      onChange={onChangeInput}
      variant='outlined'
    />

    {
      tooltip && (
        <Tooltip
          disableInteractive
          placement='right'
          title={tooltip}
          style={{ position: 'absolute', right: 10, top: 16 }}
        >
          <HelpIcon />
        </Tooltip>
      )
    }
  </form>
);

InputCustom.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isMultiline: PropTypes.bool,
  hasError: PropTypes.bool,
  onChangeInput: PropTypes.func,
  onBlur: PropTypes.func,
  helperText: PropTypes.string,
  rowsMax: PropTypes.number,
  tooltip: PropTypes.string,
};

export default InputCustom;
