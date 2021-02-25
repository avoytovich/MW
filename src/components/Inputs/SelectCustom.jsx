import React from 'react';
import PropTypes from 'prop-types';
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  InputAdornment,
} from '@material-ui/core';
import localization from '../../localization';

const SelectCustom = ({
  label,
  value,
  selectOptions,
  onChangeSelect,
  isRequired,
}) => (
  <FormControl fullWidth variant="outlined">
    <InputLabel htmlFor={label}>{localization.t(`labels.${label}`)}</InputLabel>
    <Select
      required={isRequired}
      disabled={!selectOptions}
      value={selectOptions ? value : ''}
      inputProps={{
        name: label,
        id: label,
      }}
      startAdornment={
        !selectOptions && (
          <InputAdornment>
            <CircularProgress />
          </InputAdornment>
        )
      }
      label={localization.t(`labels.${label}`)}
      onChange={onChangeSelect}
      variant="outlined"
    >
      {selectOptions?.map((option) => (
        <MenuItem key={option.id || option.value} value={option.id}>
          {option.value}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

SelectCustom.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  selectOptions: PropTypes.array,
  onChangeSelect: PropTypes.func,
  isRequired: PropTypes.bool,
};

export default SelectCustom;
