import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Typography, Box, TextField } from '@material-ui/core';
import './DetailRow.scss';

const DetailRow = ({
  item, inputType, editable, setHasChanges,
}) => {
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
          <TextField
            select="true"
            disabled={!editable}
            fullWidth
            multiple
            margin="normal"
            name={curRow.id}
            onChange={handleChange}
            type={inputType}
            value={curRow.value}
            inputProps={{ form: { autocomplete: 'off' } }}
          />
        </Box>
      </Box>
    )
  );
};

DetailRow.propTypes = {
  item: PropTypes.object,
  editable: PropTypes.bool,
  setHasChanges: PropTypes.func,
  inputType: PropTypes.string,
};
export default DetailRow;
