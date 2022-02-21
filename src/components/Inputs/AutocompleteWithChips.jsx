import React from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';
import PropTypes from 'prop-types';
import localization from '../../localization';

const AutocompleteWithChips = ({
  selectOptions,
  label,
  onChange,
  arrayValue,
}) => (
  <Autocomplete
    isOptionEqualToValue={(option, value) => option.id === value?.id}
    getOptionLabel={(option) => option?.value || ''}
    onChange={(e, newValue) => onChange(newValue)}
    value={arrayValue}
    multiple
    id='tags-filled'
    options={selectOptions}
    clearOnBlur
    renderTags={(value, getTagProps) => value.map((option, index) => (
      <Chip
        variant='outlined'
        label={option.value.split('(')[0]}
        {...getTagProps({ index })}
      />
    ))}
    renderInput={(params) => (
      <TextField
        {...params}
        variant='outlined'
        label={localization.t(`labels.${label}`)}
      />
    )}
  />
);

AutocompleteWithChips.propTypes = {
  optionLabelKey: PropTypes.string,
  label: PropTypes.string,
  arrayValue: PropTypes.array,
  selectOptions: PropTypes.array,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
};

export default AutocompleteWithChips;
