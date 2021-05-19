import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from '@material-ui/core';

import { InputCustom } from '../../../Inputs';

import '../variations.scss';

const AddParameterFirstStep = ({
  setStep,
  setModalState,
  onClose,
  modalState,
}) => {
  const [value, setValue] = useState('LIST');

  return (
    <>
      <ClearIcon onClick={onClose} className="closeModal" />

      <Typography variant="h2" className="header">
        New Parameter
      </Typography>
      <Typography variant="h4" className="title">
        First pick a name for this new parameter. This name will be used in
        price functions definitions.
      </Typography>
      <Typography variant="h6" className="label">
        Allowed: alphanumeric characters and underscore
      </Typography>
      <InputCustom
        // label="some"
        onChangeInput={(e) => setModalState({
          ...modalState,
          field: e.target.value,
        })}
        isRequired
      />
      <Typography variant="h4" className="title">
        Give a display string for this parameter, in language 'en-US'.
      </Typography>
      <Typography variant="h6" className="label">
        The label dasplayed to the buyer when ferering to this parameter
      </Typography>
      <InputCustom
        // label="some"
        onChangeInput={(e) => setModalState({ ...modalState, label: e.target.value })}
      />
      <Typography variant="h4" className="title">
        Now choose the type of the parameter:
      </Typography>
      <RadioGroup
        aria-label="type"
        name="type"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <Box>
          <FormControlLabel
            className="radio"
            value="LIST"
            control={
              <Radio color={value === 'LIST' ? 'primary' : 'secondary'} />
            }
            label="LIST"
          />
          <Typography variant="h6" className="radioLabel">
            Buyer will select a value amongst a set of predefined values. For
            instance (s)he could select a tee-shirt size amongst
            {' '}
            {('S', 'M', 'L', 'XL')}
          </Typography>
        </Box>
        <Box>
          <FormControlLabel
            className="radio"
            value="RANGE"
            control={
              <Radio color={value === 'RANGE' ? 'primary' : 'secondary'} />
            }
            label="RANGE"
          />
          <Typography variant="h6" className="radioLabel">
            Buyer will select a range amongst a set of predefined ranges. For
            instance (s)he could select a number of licenses amongst
            {' '}
            {('1-10 license(s)', '11-50 licenses', '51-100 licenses')}
          </Typography>
        </Box>
      </RadioGroup>
      <Box display="flex" justifyContent="flex-end" marginTop="40px">
        <Button variant="outlined" color="secondary" onClick={onClose}>
          cancel
        </Button>
        <Box marginLeft="20px">
          <Button
            variant="contained"
            color="primary"
            disabled={!modalState?.field}
            onClick={() => {
              setModalState({ ...modalState, type: value });
              setStep(value);
            }}
          >
            continue
          </Button>
        </Box>
      </Box>
    </>
  );
};

AddParameterFirstStep.propTypes = {
  setStep: PropTypes.func,
  setModalState: PropTypes.func,
  onClose: PropTypes.func,
  modalState: PropTypes.object,
};

export default AddParameterFirstStep;
