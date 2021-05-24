import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Typography,
  InputBase,
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import './Inputs.scss';

const PlusMinusInput = ({
  value, handleUpdate, maxNumber, minNumber = 0, step = 1,
}) => {
  const [inputValue, setInputValue] = useState(value || 0);
  const notification = maxNumber ? `Value should be from ${minNumber} to ${maxNumber}` : `Value should be bigger than ${minNumber}`;

  const checkInputValue = () => {
    if (inputValue < minNumber) {
      setInputValue(minNumber);
    } else {
      handleUpdate(inputValue);
    }
  };

  const handleChangeInput = (e) => {
    let newValue;
    if (e.type === 'change') {
      newValue = Number(e.target.value);
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(newValue) && (newValue <= maxNumber || !maxNumber)) {
        setInputValue(newValue);
      }
    } else {
      newValue = e;
      setInputValue(newValue);
      handleUpdate(newValue);
    }
  };

  return (
    <>
      <Box display='flex' border={1} borderColor='#b9b1b1' borderRadius="borderRadius" width='150px' height='50px' justifyContent='space-between' alignItems='center'>
        <Box borderRight={1} style={{ borderColor: '#b9b1b1' }}>
          <IconButton disabled={inputValue === minNumber} onClick={() => handleChangeInput(inputValue - step)}><Remove color='secondary' /></IconButton>
        </Box>
        <Box>
          <InputBase
            inputProps={{ style: { textAlign: 'center' } }}
            margin='dense'
            onBlur={checkInputValue}
            value={inputValue}
            onChange={handleChangeInput}
          />
        </Box>
        <Box borderLeft={1} borderColor='#b9b1b1'>
          <IconButton disabled={inputValue === maxNumber} onClick={() => handleChangeInput(inputValue + step)}><Add color='secondary' /></IconButton>
        </Box>
      </Box>
      <Typography variant="caption" color='secondary'>{notification}</Typography>
    </>
  );
};

PlusMinusInput.propTypes = {
  value: PropTypes.number,
  handleUpdate: PropTypes.func,
  minNumber: PropTypes.number,
  maxNumber: PropTypes.number,
  step: PropTypes.number,
};

export default PlusMinusInput;
