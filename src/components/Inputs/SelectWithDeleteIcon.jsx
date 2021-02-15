import React from 'react';
import PropTypes from 'prop-types';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  InputAdornment,
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
      value={selectOptions ? value : ''}
      inputProps={{
        name: label,
        id: label,
      }}
      disabled={!selectOptions}
      label={localization.t(`labels.${label}`)}
      onChange={onChangeSelect}
      variant="outlined"
      startAdornment={
        !selectOptions && (
          <InputAdornment>
            <CircularProgress />
          </InputAdornment>
        )
      }
      endAdornment={
        value && (
          <CancelIcon
            className="cancelIcon"
            fontSize="small"
            onClick={onClickDelIcon}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          />
        )
      }
    >
      {selectOptions?.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.value}
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
