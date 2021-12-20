/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  MenuItem,
  Chip,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

import parentPaths from '../../services/paths';
import localization from '../../localization';

const SelectWithChip = ({
  label,
  value,
  selectOptions,
  onChangeSelect,
  onClickDelIcon,
  isDisabled,
  isRequired,
  isMultiple = true,
  helperText,
  redirectTo = '',
  name,
  noTranslate,
  hasError,
}) => {
  const handleClick = (condition, id) => {
    switch (condition) {
      case 'store':
        return window.open(`${parentPaths.stores}/${id}`, '_blank');
      default:
        return null;
    }
  };
  const curLabel = noTranslate ? label : label ? localization.t(`labels.${label}`) : null;
  return (
    <TextField
      fullWidth
      error={hasError}
      select
      name={name}
      data-test={label}
      label={curLabel}
      SelectProps={{
        placeholder: 'Write here...',
        multiple: isMultiple,
        value: selectOptions ? value : [],
        onChange: onChangeSelect,
        renderValue: (selected) => (
          <Box display='flex' alignItems='center' flexDirection='row' flexWrap='wrap'>
            {selected?.map((chip) => {
              const selectedItem = selectOptions?.filter((item) => item.id === chip)[0];
              return (
                <Box mb='2px' mr='2px' key={chip}>
                  <Chip
                    variant='outlined'
                    onDelete={() => onClickDelIcon(chip)}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                    onClick={() => handleClick(redirectTo, selectedItem.id)}
                    label={selectedItem?.value || chip}
                  />
                </Box>
              );
            })}
          </Box>
        ),
        MenuProps: {
          getContentAnchorEl: null,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          transformOrigin: { vertical: 'top', horizontal: 'center' },
        },
      }}
      disabled={!selectOptions || isDisabled}
      required={isRequired}
      variant='outlined'
      helperText={helperText}
      InputProps={{
        startAdornment: !selectOptions && (
          <InputAdornment position='start'>
            <CircularProgress />
          </InputAdornment>
        ),
      }}
    >
      {selectOptions?.length ? (
        selectOptions.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.value}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>{localization.t('general.noAvailableOptions')}</MenuItem>
      )}
    </TextField>
  );
};

SelectWithChip.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array,
  isDisabled: PropTypes.bool,
  selectOptions: PropTypes.array,
  onChangeSelect: PropTypes.func,
  onClickDelIcon: PropTypes.func,
  isRequired: PropTypes.bool,
  isMultiple: PropTypes.bool,
  helperText: PropTypes.string,
  redirectTo: PropTypes.string,
  name: PropTypes.string,
  noTranslate: PropTypes.bool,
  hasError: PropTypes.bool,
};

export default SelectWithChip;
