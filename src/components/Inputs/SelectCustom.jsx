import React from 'react';
import PropTypes from 'prop-types';
import {
  MenuItem,
  TextField,
  CircularProgress,
  InputAdornment,
  Box,
  Tooltip,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import localization from '../../localization';

const SelectCustom = ({
  label,
  value,
  tooltip,
  selectOptions,
  usedOptions = [],
  onChangeSelect,
  isRequired,
  isDisabled,
  name,
  withDots,
  optionKeyName,
  hasError = false,
  helperText = '',
  testing,
}) => {
  const noRepeatingOptions = selectOptions
    .filter((so) => !usedOptions.filter((uo) => (uo.id || uo) === so.id).length);

  return (
    <Box display='flex' alignItems='center' flexGrow='1'>
      <TextField
        name={name}
        fullWidth
        select
        data-test={label}
        required={isRequired}
        variant='outlined'
        disabled={!selectOptions || isDisabled}
        InputProps={{
          startAdornment: !selectOptions && (
            <InputAdornment position='start'>
              <CircularProgress />
            </InputAdornment>
          ),
        }}
        InputLabelProps={testing ? null : !label && { shrink: false }}
        SelectProps={{
          value: value || '',
          onChange: onChangeSelect,
          // eslint-disable-next-line
          renderValue: (selected) => {
            const selectedItem = selectOptions?.find((item) => item.id === selected);

            if (selectOptions) {
              return (
                <Box
                  display={withDots ? 'unset' : 'flex'}
                  alignItems='center'
                  flexDirection='row'
                  flexWrap='wrap'
                >
                  {
                    selectedItem?.value
                      || (optionKeyName && selectedItem[optionKeyName])
                      || selected
                  }
                </Box>
              );
            }
          },
          MenuProps: {
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            transformOrigin: { vertical: 'top', horizontal: 'center' },
          },
        }}
        label={label && localization.t(`labels.${label}`)}
        onChange={onChangeSelect}
        error={hasError}
        helperText={helperText}
      >
        {noRepeatingOptions?.length ? (
          noRepeatingOptions
            .filter((so) => !usedOptions.filter((uo) => uo.id === so.id).length)
            .map((option) => (
              <MenuItem
                key={option.id || option.value || (optionKeyName && option[optionKeyName])}
                value={option.id}
                disabled={!option.configName && name === 'serviceConfig'}
              >
                {option.value || (optionKeyName && option[optionKeyName])}
              </MenuItem>
            ))
        ) : (
          <MenuItem disabled>{localization.t('general.noAvailableOptions')}</MenuItem>
        )}
      </TextField>

      {
        tooltip && (
          <Tooltip
            disableInteractive
            placement='right'
            title={tooltip}
            style={{ marginLeft: '10px' }}
          >
            <HelpIcon />
          </Tooltip>
        )
      }
    </Box>
  );
};

SelectCustom.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  tooltip: PropTypes.string,
  selectOptions: PropTypes.array,
  usedOptions: PropTypes.array,
  onChangeSelect: PropTypes.func,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  name: PropTypes.string,
  withDots: PropTypes.bool,
  hasError: PropTypes.bool,
  helperText: PropTypes.string,
  testing: PropTypes.bool,
  optionKeyName: PropTypes.string,
};

export default SelectCustom;
