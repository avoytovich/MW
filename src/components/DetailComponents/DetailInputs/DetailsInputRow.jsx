import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Box, TextField } from '@material-ui/core';
import './DetailsInput.scss';

const DetailsInputRow = ({
  item,
  inputType,
  editable,
  handleEditDetails,
  rowType,
}) => {
  const handleChange = (e) => {
    e.persist();
    let newValue = e.target.value;
    if (inputType === 'number') {
      newValue = Number(newValue);
    }
    handleEditDetails({
      name: e.target.name,
      value: { ...item, value: newValue },
    });
  };
  return (
    item && (
      <Box
        width="100%"
        flexWrap="nowrap"
        className={rowType}
        key={item.id}
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4}>
          <Typography color="secondary" variant="body2">
            {item.label}
          </Typography>
        </Box>
        <Box width="60%">
          <TextField
            disabled={!editable}
            fullWidth
            multiple
            margin="normal"
            name={item.id}
            onChange={handleChange}
            type={inputType}
            value={item.value}
            inputProps={{ form: { autocomplete: 'off' } }}
          />
        </Box>
      </Box>
    )
  );
};

DetailsInputRow.propTypes = {
  item: PropTypes.object,
  editable: PropTypes.bool,
  handleEditDetails: PropTypes.func,
  inputType: PropTypes.string,
  rowType: PropTypes.string,
};
export default DetailsInputRow;
