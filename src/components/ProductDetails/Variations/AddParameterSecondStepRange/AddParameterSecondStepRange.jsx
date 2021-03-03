import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ClearIcon from '@material-ui/icons/Clear';

import { NumberInput } from '../../../Inputs';

import '../variations.scss';

const AddParameterSecondStepRange = ({
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
      Please defined at least two ranges and their display strings in
      language'en-US'.
    </Typography>
    <Box display="flex" marginTop="10px" marginBottom="30px">
      <Box width="122px" marginRight="20px">
        <Typography variant="h4">From</Typography>
      </Box>
      <Box width="122px" marginRight="20px">
        <Typography variant="h4">To</Typography>
      </Box>
      <Box width="100%" marginRight="10px">
        <Typography variant="h4">Display string (en-US)</Typography>
      </Box>
    </Box>
    <Box display="flex">
      <Box width="122px" marginRight="20px">
        <NumberInput
          // value={1}
          onChangeInput={(e) => null}
          minMAx={{ min: 1, max: 11 }}
        />
      </Box>
      <Box width="122px" marginRight="20px">
        <NumberInput
          // value={2}
          onChangeInput={(e) => null}
          minMAx={{ min: 2, max: 11 }}
        />
      </Box>
      <Box width="100%" marginRight="10px">
        <TextField
          name=""
          type="text"
          onChange={() => null}
          fullWidth
          variant="outlined"
        />
      </Box>
      <Box>
        <IconButton
          color="primary"
          // color={selectedBundledProduct ? 'primary' : 'secondary'}
          aria-label="add to shopping cart"
          // disabled={!selectedBundledProduct}
          onClick={() => null}
        >
          <AddCircleOutlineIcon size="medium" color="primary" />
        </IconButton>
      </Box>
    </Box>
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

AddParameterSecondStepRange.propTypes = {
  setModalState: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  modalState: PropTypes.object,
};

export default AddParameterSecondStepRange;
