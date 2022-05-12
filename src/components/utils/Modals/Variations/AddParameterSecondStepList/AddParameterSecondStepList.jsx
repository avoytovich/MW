import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  TextField,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import localization from '../../../../../localization';

import '../variations.scss';

const AddParameterSecondStepList = ({
  setModalState,
  onClose,
  onSubmit,
  modalState,
}) => (
  <>
    <DialogTitle>{localization.t('labels.newParameter')}</DialogTitle>

    <Divider />

    <DialogContent>
      <Box mb='40px'>
        <Box fontStyle='italic' component='h4' mb={2}>
          Please enter in this text zone all values the paramater can take:
        </Box>

        <Box fontStyle='italic' component='p' mb={2}>
          One value per line.
          <br />
          Written as it would appear for buyers speaking language 'en-US'.
        </Box>

        <TextField
          multiline
          fullWidth
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
      </Box>
    </DialogContent>

    <DialogActions>
      <Button variant="outlined" color='secondary' onClick={onClose}>Cancel</Button>
      <Button
        variant="contained"
        color='primary'
        disabled={!modalState?.field}
        onClick={onSubmit}
      >
        create new parameter
      </Button>
    </DialogActions>
  </>
);

AddParameterSecondStepList.propTypes = {
  setModalState: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  modalState: PropTypes.object,
};

export default AddParameterSecondStepList;
