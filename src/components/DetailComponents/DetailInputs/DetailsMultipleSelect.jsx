import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Chip, Select, MenuItem } from '@material-ui/core';
import './DetailsInput.scss';

const DetailsMultipleSelect = ({
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
  const handleDeleteChip = () => {};
  // console.log('item', item);
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
          {!editable ? (
            <Typography color="secondary">{item.value.join(', ')}</Typography>
          ) : (
            <Select
              name={item.id}
              multiple
              value={item.value}
              onChange={handleChange}
              renderValue={(selected) => (
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="row"
                  flexWrap="wrap"
                >
                  {selected.map((chip) => (
                    <Chip
                      variant="outlined"
                      color="primary"
                      onDelete={() => handleDeleteChip(chip)}
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      key={chip}
                      label={chip}
                    />
                  ))}
                </Box>
              )}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>
      </Box>
    )
  );
};

DetailsMultipleSelect.propTypes = {
  item: PropTypes.object,
  editable: PropTypes.bool,
  handleEditDetails: PropTypes.func,
  options: PropTypes.array,
  rowType: PropTypes.string,
};

export default DetailsMultipleSelect;
