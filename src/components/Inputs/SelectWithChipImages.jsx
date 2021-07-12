import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  MenuItem,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import localization from '../../localization';
import { paymentImages } from '../../services/selectOptions/selectOptions';

const SelectWithChipImages = ({
  label,
  value,
  selectOptions,
  onChangeSelect,
  onClickDelIcon,
  isDisabled,
  isRequired,
  isMultiple = true,
}) => (
  <TextField
    fullWidth
    select
    data-test={label}
    SelectProps={{
      multiple: isMultiple,
      value: selectOptions ? value : [],
      onChange: onChangeSelect,
      renderValue: (selected) => (
        <Box display='flex' alignItems='center' flexDirection='row' flexWrap='wrap'>
          {selected?.map((chip) => {
            const selectedItem = selectOptions?.filter((item) => item.id === chip)[0];
            return (
              <Box
                mx={2}
                key={chip}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundImage: `url(https://drive.google.com/uc?id=${paymentImages[selectedItem.id]})`,
                }}
              >
                <Box style={{
                  position: 'absolute',
                  top: -9,
                  right: -9,
                }}
                >
                  <CancelIcon
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                    onClick={() => onClickDelIcon(chip)}
                    fontSize='small'
                    color='secondary'
                  />
                </Box>
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
      <MenuItem disabled>{localization.t('general.noAvailableOptions')}</MenuItem>
    )}
  </TextField>
);

SelectWithChipImages.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array,
  isDisabled: PropTypes.bool,
  selectOptions: PropTypes.array,
  onChangeSelect: PropTypes.func,
  onClickDelIcon: PropTypes.func,
  isRequired: PropTypes.bool,
  isMultiple: PropTypes.bool,
};

export default SelectWithChipImages;
