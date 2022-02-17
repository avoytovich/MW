import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Button, TextField,
} from '@mui/material';

import '../variations.scss';

const AddParameterSecondStepList = ({
  setModalState,
  onClose,
  onSubmit,
  modalState,
}) => (
  <>
    <Typography variant="h2" className="header" style={{ marginBottom: '20px' }}>
      New Parameter
    </Typography>

    <Typography variant="h6">
      Please enter in this text zone all values the paramater can take:
      <br />
      One value per line.
      <br />
      Written as it would appear for buyers speaking language 'en-US'.
    </Typography>

    <TextField
      multiline
      aria-label="minimum height"
      minRows={3}
      maxRows={8}
      variant='outlined'
      placeholder={
`Tee-shirt size S
Tee-shirt size M
Tee-shirt size L`
      }
      style={{
        marginTop: '20px',
      }}
      onChange={(e) => setModalState({
        ...modalState,
        listValue: e.target.value,
      })}
    />

    <Box display="flex" justifyContent="flex-end" marginTop="40px">
      <Button variant="outlined" color="secondary" onClick={onClose}>
        cancel
      </Button>
      <Box marginLeft="20px">
        <Button variant="contained" color="primary" onClick={onSubmit}>
          create new parameter
        </Button>
      </Box>
    </Box>
  </>
);

AddParameterSecondStepList.propTypes = {
  setModalState: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  modalState: PropTypes.object,
};

export default AddParameterSecondStepList;
