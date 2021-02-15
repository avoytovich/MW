import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
  Select,
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
}) => (
  <FormControl fullWidth variant="outlined">
    <InputLabel htmlFor={label}>{localization.t(`labels.${label}`)}</InputLabel>
    <Select
      disabled={!selectOptions}
      inputProps={{
        name: label,
        id: label,
      }}
      MenuProps={{
        getContentAnchorEl: null,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        transformOrigin: { vertical: 'top', horizontal: 'center' },
      }}
      startAdornment={
        !selectOptions && (
          <InputAdornment>
            <CircularProgress />
          </InputAdornment>
        )
      }
      label={localization.t(`labels.${label}`)}
      multiple
      value={selectOptions ? value : []}
      onChange={onChangeSelect}
      variant="outlined"
      renderValue={(selected) => (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="row"
          flexWrap="wrap"
        >
          {selected?.map((chip) => {
            const selectedItem = selectOptions?.filter(
              (item) => item.id === chip,
            )[0];
            return (
              <Box mb="2px" mr="2px" key={chip}>
                <Chip
                  variant="outlined"
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
      )}
    >
      {selectOptions?.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item.value}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

SelectWithChip.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array,
  selectOptions: PropTypes.array,
  onChangeSelect: PropTypes.func,
  onClickDelIcon: PropTypes.func,
};

export default SelectWithChip;
