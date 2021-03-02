import React from 'react';
import PropTypes from 'prop-types';
import {
  MenuItem,
  TextField,
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
  <TextField
    fullWidth
    select
    required={isRequired}
    variant="outlined"
    disabled={!selectOptions}
    value={selectOptions ? value : ''}
    InputProps={{
      startAdornment: !selectOptions && (
        <InputAdornment>
          <CircularProgress />
        </InputAdornment>
      ),
    }}
    label={localization.t(`labels.${label}`)}
    onChange={onChangeSelect}
  >
    {selectOptions?.length ? (
      selectOptions.map((option) => (
        <MenuItem key={option.id || option.value} value={option.id}>
          {option.value}
        </MenuItem>
      ))
    ) : (
      <MenuItem disabled>
        {localization.t('general.noAvailableOptions')}
      </MenuItem>
    )}
  </TextField>
);

SelectCustom.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  selectOptions: PropTypes.array,
  onChangeSelect: PropTypes.func,
  isRequired: PropTypes.bool,
};

export default SelectCustom;
