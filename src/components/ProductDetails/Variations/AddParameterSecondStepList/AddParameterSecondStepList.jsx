import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, TextareaAutosize } from '@material-ui/core';

import { InputCustom } from '../../../Inputs';

import './addParameterSecondStepList.scss';

const AddParameterSecondStepList = ({
  setModalState,
  onClose,
  onSubmit,
  modalState,
}) => {
  return (
    <Box>
      <TextareaAutosize
        aria-label="minimum height"
        rowsMin={3}
        placeholder="Minimum 3 rows"
        onChange={(e) =>
          setModalState({
            ...modalState,
            listValue: e.target.value,
          })
        }
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
    </Box>
  );
};

AddParameterSecondStepList.propTypes = {
  setModalState: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  modalState: PropTypes.object,
};

export default AddParameterSecondStepList;
('');
