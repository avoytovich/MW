import React from 'react';
import PropTypes from 'prop-types';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import localization from '../../localization';
import './Inputs.scss';

const SelectWithDeleteIcon = ({
  label,
  value,
  isDisabled,
  selectOptions,
  onChangeSelect,
  onClickDelIcon,
  hasError = false,
  helperText = '',
}) => (
  <FormControl fullWidth error={hasError}>
    <InputLabel htmlFor={label}>{localization.t(`labels.${label}`)}</InputLabel>
    <Select
      value={selectOptions && value ? value : ''}
      data-test={label}
      inputProps={{
        name: label,
        id: label,
      }}
      disabled={!selectOptions || isDisabled}
      label={localization.t(`labels.${label}`)}
      onChange={onChangeSelect}
      variant='outlined'
      startAdornment={
        !selectOptions && (
          <InputAdornment position='start'>
            <CircularProgress />
          </InputAdornment>
        )
      }
      endAdornment={
        value && (
          <InputAdornment position='end'>
            <CancelIcon
              className='cancelSelectIcon'
              fontSize='small'
              color='secondary'
              onClick={isDisabled ? () => null : onClickDelIcon}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
            />
          </InputAdornment>
        )
      }
    >
      {selectOptions?.length ? (
        selectOptions.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.value || option.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>{localization.t('general.noAvailableOptions')}</MenuItem>
      )}
    </Select>
    <FormHelperText>{helperText}</FormHelperText>
  </FormControl>
);

SelectWithDeleteIcon.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  isDisabled: PropTypes.bool,
  selectOptions: PropTypes.array,
  onChangeSelect: PropTypes.func,
  onClickDelIcon: PropTypes.func,
  hasError: PropTypes.bool,
  helperText: PropTypes.string,
};

export default SelectWithDeleteIcon;
