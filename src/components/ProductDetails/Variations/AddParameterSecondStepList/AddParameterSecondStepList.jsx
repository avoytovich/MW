import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Button, TextareaAutosize,
} from '@material-ui/core';

import '../variations.scss';

const AddParameterSecondStepList = ({
  setModalState,
  onClose,
  onSubmit,
  modalState,
}) => (
  <>
    <Typography variant="h2" className="header">
      New Parameter
    </Typography>
    <Typography variant="h4" className="title">
      Please enter in this text zone all values the paramater can take :
    </Typography>
    <Typography ariant="h6">
      Please enter in this text zone all values the paramater can take : One
      value per line. Written as it would appear for buyers speaking language
      'en-US'.
    </Typography>
    <TextareaAutosize
      aria-label="minimum height"
      rowsMin={3}
      placeholder="
        Tee-shirt size S
        Tee-shirt size M
        Tee-shirt size L"
      style={{
        width: '100%',
        height: '345px',
        border: '1px solid gray',
        marginTop: '48px',
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
