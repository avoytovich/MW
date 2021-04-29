import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  MenuItem,
  Chip,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';
import localization from '../../localization';

const SelectWithChip = ({
  label,
  value,
  selectOptions,
  onChangeSelect,
  onClickDelIcon,
  isDisabled,
  isRequired,
}) => (
    <TextField
      fullWidth
      select
      SelectProps={{
        multiple: true,
        value: selectOptions ? value : [],
        onChange: onChangeSelect,
        renderValue: (selected) => (
          <Box
            display='flex'
            alignItems='center'
            flexDirection='row'
            flexWrap='wrap'
          >
            {selected?.map((chip) => {
              const selectedItem = selectOptions?.filter(
                (item) => item.id === chip,
              )[0];
              return (
                <Box mb='2px' mr='2px' key={chip}>
                  <Chip
                    variant='outlined'
                    onDelete={() => onClickDelIcon(chip)}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
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
      InputProps={{
        startAdornment: !selectOptions && (
          <InputAdornment>
            <CircularProgress />
          </InputAdornment>
        ),
      }}
      label={label ? localization.t(`labels.${label}`) : null}
    >
      {selectOptions?.length ? (
        selectOptions.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.value}
          </MenuItem>
        ))
      ) : (
          <MenuItem disabled>
            {localization.t('general.noAvailableOptions')}
          </MenuItem>
        )}
    </TextField>
  );

SelectWithChip.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array,
  selectOptions: PropTypes.array,
  onChangeSelect: PropTypes.func,
  onClickDelIcon: PropTypes.func,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
};

export default SelectWithChip;
