import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import localization from '../../localization';

const SelectWithChip = ({
  label,
  value,
  selectOptions,
  optionName,
  onChangeSelect,
  onClickDelIcon,
}) => (
  <Box py={3}>
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor={label}>
        {localization.t(`labels.${label}`)}
      </InputLabel>
      <Select
        inputProps={{
          name: label,
          id: label,
        }}
        label={localization.t(`labels.${label}`)}
        multiple
        value={value || []}
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
              const itemName = optionName(selectedItem);
              return (
                <Box mb="2px" mr="2px" key={chip}>
                  <Chip
                    variant="outlined"
                    color="primary"
                    onDelete={() => onClickDelIcon(chip)}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                    label={itemName}
                  />
                </Box>
              );
            })}
          </Box>
        )}
      >
        {selectOptions?.map((item) => {
          const itemName = optionName(item);
          return (
            <MenuItem key={item.id} value={item.id}>
              {itemName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  </Box>
);

SelectWithChip.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array,
  selectOptions: PropTypes.array,
  optionName: PropTypes.func,
  onChangeSelect: PropTypes.func,
  onClickDelIcon: PropTypes.func,
};

export default SelectWithChip;
