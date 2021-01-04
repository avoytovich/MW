import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Typography, Select, MenuItem,
} from '@material-ui/core';

import './MainInfo.scss';

const CheckOutSelect = ({
  boxClass,
  value,
  emValue,
  label,
  editable,
  handleChanges,
  selectOptions,
  customers,
}) => (
  <Box
    width="100%"
    flexWrap="nowrap"
    className={boxClass}
    display="flex"
    flexDirection="row"
  >
    <Box width="40%" pr={4} pt="7px" pl="4px">
      <Typography color="secondary" variant="body2">
        {label}
      </Typography>
    </Box>
    <Box width="60%">
      <Select
        fullWidth
        className="storeCheckoutTheme"
        value={value}
        disabled={!editable}
        disableUnderline
        onChange={handleChanges}
      >
        <MenuItem value={emValue}>
          <em />
        </MenuItem>
        {selectOptions.map((option) => {
          let customerName;
          let showValue;
          if (customers) {
            customerName = customers.find(
              (customer) => customer.id === option.customerId,
            );
            showValue = `${customerName?.name || option.customerId}: ${
              option.name
            }`;
          } else {
            showValue = option.customerId;
          }
          return (
            <MenuItem
              key={option.id}
              value={
                customers
                  ? `${option.customerId}: ${option.name}`
                  : option.customerId
              }
            >
              {showValue}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  </Box>
);

CheckOutSelect.propTypes = {
  selectOptions: PropTypes.array,
  value: PropTypes.string,
  emValue: PropTypes.any,
  label: PropTypes.string,
  editable: PropTypes.bool,
  handleChanges: PropTypes.func,
  customers: PropTypes.array,
  boxClass: PropTypes.string,
};

export default CheckOutSelect;
