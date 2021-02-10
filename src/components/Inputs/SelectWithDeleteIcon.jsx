import React from 'react';
import PropTypes from 'prop-types';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import localization from '../../localization';
import './Inputs.scss';

const SelectWithDeleteIcon = ({
  label,
  value,
  selectOptions,
  onChangeSelect,
  onClickDelIcon,
}) => (
  <FormControl fullWidth variant="outlined">
    <InputLabel htmlFor={label}>{localization.t(`labels.${label}`)}</InputLabel>
    <Select
      value={value}
      inputProps={{
        name: label,
        id: label,
      }}
      label={localization.t(`labels.${label}`)}
      onChange={onChangeSelect}
      variant="outlined"
      renderValue={(selected) => {
        const optionName = selectOptions.find(
          (option) => option.id === selected,
        );
        return (
          <Box
            display="flex"
            alignItems="center"
            flexDirection="row"
            flexWrap="wrap"
          >
            <Box mb="2px" mr="2px">
              <Typography>{optionName?.name}</Typography>
            </Box>
            <CancelIcon
              className="cancelIcon"
              fontSize="small"
              color="primary"
              onClick={onClickDelIcon}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
            />
          </Box>
        );
      }}
    >
      {selectOptions.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

SelectWithDeleteIcon.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  selectOptions: PropTypes.array,
  onChangeSelect: PropTypes.func,
  onClickDelIcon: PropTypes.func,
};

export default SelectWithDeleteIcon;
