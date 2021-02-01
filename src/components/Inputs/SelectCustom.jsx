import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import localization from '../../localization';

const SelectCustom = ({
  label, value, selectOptions, onChangeSelect,
}) => (
  <Box py={3}>
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor={label}>
        {localization.t(`labels.${label}`)}
      </InputLabel>
      <Select
        value={value}
        inputProps={{
          name: label,
          id: label,
        }}
        label={localization.t(`labels.${label}`)}
        onChange={onChangeSelect}
        variant="outlined"
      >
        {selectOptions.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

SelectCustom.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  selectOptions: PropTypes.array,
  onChangeSelect: PropTypes.func,
};

export default SelectCustom;
