import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Typography, Box, Select, MenuItem } from '@material-ui/core';
import './StoreDetails.scss';

const DetailsSelectRow = ({ item, editable, setHasChanges }) => {
  const [curRow, setCurRow] = useState(null);

  useEffect(() => {
    setCurRow({ ...item });
    return () => setCurRow(null);
  }, [item]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curRow) !== JSON.stringify(item));
    return () => setHasChanges(false);
  }, [curRow]);

  const handleChange = (e) => {
    e.persist();
    let newValue = e.target.value;
    if (inputType === 'number') {
      newValue = Number(newValue);
    }
    setCurRow({ ...item, value: newValue });
  };

  return (
    curRow && (
      <Box
        width="100%"
        flexWrap="nowrap"
        className={curRow.row}
        key={curRow.id}
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4}>
          <Typography color="secondary" variant="body2">
            {curRow.id}
          </Typography>
        </Box>
        <Box width="60%">
          <Select
            disabled={!editable}
            value={curRow.value}
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Box>
      </Box>
    )
  );
};

DetailsSelectRow.propTypes = {
  item: PropTypes.object,
  editable: PropTypes.bool,
  setHasChanges: PropTypes.func,
};
export default DetailsSelectRow;
