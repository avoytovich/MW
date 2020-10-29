import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Select, MenuItem } from '@material-ui/core';
import './DetailsInput.scss';

const DetailsSelectRow = ({
  item,
  editable,
  handleEditDetails,
  options,
  rowType,
}) => {
  const handleChange = (e) => {
    e.persist();
    handleEditDetails({
      name: e.target.name,
      value: { ...item, value: e.target.value },
    });
  };
  return (
    item && (
      <Box
        width="100%"
        flexWrap="nowrap"
        className={rowType}
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {item.id}
          </Typography>
        </Box>
        <Box width="60%">
          <Select
            name={item.id}
            disabled={!editable}
            value={item.value}
            onChange={handleChange}
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    )
  );
};

DetailsSelectRow.propTypes = {
  item: PropTypes.object,
  editable: PropTypes.bool,
  handleEditDetails: PropTypes.func,
  options: PropTypes.array,
  rowType: PropTypes.string,
};
export default DetailsSelectRow;
