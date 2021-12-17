import React from 'react';
import PropTypes from 'prop-types';
import {
  MenuItem,
  TextField,
  CircularProgress,
  InputAdornment,
  Box,
  Tooltip,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
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
            <InputAdornment>
              <CircularProgress />
            </InputAdornment>
          ),
        }}
        SelectProps={{
          value: value || '',
          onChange: onChangeSelect,
          // eslint-disable-next-line
          renderValue: (selected) => {
            const selectedItem = selectOptions?.find((item) => item.id === selected);

            if (selectOptions) {
              return (
                <Box display='flex' alignItems='center' flexDirection='row' flexWrap='wrap'>
                  {selectedItem?.value || selected}
                </Box>
              );
            }
          },
          MenuProps: {
            getContentAnchorEl: null,
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            transformOrigin: { vertical: 'top', horizontal: 'center' },
          },
        }}
        label={localization.t(`labels.${label}`)}
        onChange={onChangeSelect}
      >
        {noRepeatingOptions?.length ? (
          noRepeatingOptions
            .filter((so) => !usedOptions.filter((uo) => uo.id === so.id).length)
            .map((option) => (
              <MenuItem
                key={option.id || option.value}
                value={option.id}
                disabled={!option.configName}
              >
                {option.value}
              </MenuItem>
            ))
        ) : (
          <MenuItem disabled>{localization.t('general.noAvailableOptions')}</MenuItem>
        )}
      </TextField>

      {
        tooltip && (
          <Tooltip
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
};

export default SelectCustom;
