import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, TextField, IconButton, Button, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

import { NumberInput } from '../../../../Inputs';

import '../variations.scss';

const defauldRange = { from: 1, to: 2, label: '' };

const AddParameterSecondStepRange = ({ onClose, onSubmit, modalState, setModalState }) => {
  const [range, setRange] = useState(defauldRange);
  const [parametersList, setParametersList] = useState([]);
  const [max, setMax] = useState(0);

  const minParametersCount = parametersList.length < 2;
  // eslint-disable-next-line
  const findMax = (list) =>
    Math.max.apply(
      Math,
      list.map(({ to }) => to),
    );

  const handleRemoveParamether = (index) => {
    const newParametersList = parametersList.slice(0, index);
    const newMax = findMax(newParametersList);
    setRange({ from: newMax + 1, to: newMax + 2, label: '' });
    setParametersList(newParametersList);
    setModalState({
      ...modalState,
      rangesList: newParametersList,
    });
    !newParametersList.length && setRange(defauldRange) && setMax(0);
  };

  const handleRangeFrom = (value) => {
    const val = toNumber(value);
    if (val <= max) return;
    val >= range.to
      ? setRange({
          from: val,
          to: val + 1,
        })
      : setRange({
          from: val,
          to: range.to,
        });
  };

  const handleRangeTo = (value) => {
    const val = toNumber(value);

    if (val < max + 1) return;
    setRange({
      from: range.from,
      to: val,
    });
  };

  const handleAddParameterRow = () => {
    setParametersList([
      ...parametersList,
      { from: range.from, to: range.to, label: range.label },
    ]);
    setRange({ from: range.to + 1, to: range.to + 2, label: '' });
    const newMax = findMax([
      ...parametersList,
      { from: range.from, to: range.to, label: range.label },
    ]);
    setMax(newMax);
    setModalState({
      ...modalState,
      rangesList: [...parametersList, { from: range.from, to: range.to, label: range.label }],
    });
  };

  const toNumber = (number) => (typeof number === 'number' ? number : parseInt(number));
  return (
    <>
      <Typography variant='h2' className='header'>
        New Parameter
      </Typography>
      <Typography variant='h4' className='title'>
        Please defined at least two ranges and their display strings in language'en-US'.
      </Typography>
      <Box display='flex' marginTop='10px' marginBottom='30px'>
        <Box width='122px' marginRight='20px'>
          <Typography variant='h4'>From</Typography>
        </Box>
        <Box width='122px' marginRight='20px'>
          <Typography variant='h4'>To</Typography>
        </Box>
        <Box width='100%' marginRight='10px'>
          <Typography variant='h4'>Display string (en-US)</Typography>
        </Box>
      </Box>
      {parametersList.map(({ from, to, label }, i) => (
        <Box key={label} display='flex' marginBottom='30px'>
          <Box width='122px' marginRight='20px'>
            <NumberInput
              value={from}
              isDisabled
              onChangeInput={() => null}
              minMAx={{ min: 1, max: Infinity }}
            />
          </Box>
          <Box width='122px' marginRight='20px'>
            <NumberInput
              value={to}
              isDisabled
              onChangeInput={() => null}
              minMAx={{ min: 2, max: Infinity }}
            />
          </Box>
          <Box width='100%' marginRight='10px'>
            <TextField
              type='text'
              disabled
              value={label}
              onChange={() => null}
              fullWidth
              variant='outlined'
            />
          </Box>
          <Box>
            <IconButton
              color='secondary'
              aria-label='remove'
              onClick={() => handleRemoveParamether(i)}
              size='large'
            >
              <Tooltip disableInteractive title='Remove this and below'>
                <ClearIcon size='medium' color='secondary' />
              </Tooltip>
            </IconButton>
          </Box>
        </Box>
      ))}
      <Box display='flex'>
        <Box width='122px' marginRight='20px'>
          <NumberInput
            value={range.from}
            onChangeInput={(e) => handleRangeFrom(e.target.value)}
            minMAx={{ min: 1, max: range.from + 1 }}
          />
        </Box>
        <Box width='122px' marginRight='20px'>
          <NumberInput
            value={range.to}
            onChangeInput={(e) => handleRangeTo(e.target.value)}
            minMAx={{ min: range.from + 1, max: Infinity }}
          />
        </Box>
        <Box width='100%' marginRight='10px'>
          <TextField
            name=''
            value={range.label}
            type='text'
            onChange={(e) =>
              setRange({
                from: range.from,
                to: range.to,
                label: e.target.value,
              })
            }
            fullWidth
            variant='outlined'
          />
        </Box>
        <Box>
          <IconButton
            aria-label='add to shopping cart'
            disabled={!range.label}
            onClick={handleAddParameterRow}
            size='large'
          >
            <AddCircleOutlineIcon
              size='medium'
              color={!range.label ? 'secondary' : 'primary'}
            />
          </IconButton>
        </Box>
      </Box>
      {minParametersCount && (
        <Typography className='infoLabel'>Two more ranges to go</Typography>
      )}
      <Box display='flex' justifyContent='flex-end' marginTop='40px'>
        <Button variant='outlined' color='secondary' onClick={onClose}>
          cancel
        </Button>
        <Box marginLeft='20px'>
          <Button
            variant='contained'
            disabled={minParametersCount}
            color={minParametersCount ? 'secondary' : 'primary'}
            onClick={onSubmit}
          >
            create new parameter
          </Button>
        </Box>
      </Box>
    </>
  );
};

AddParameterSecondStepRange.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  modalState: PropTypes.object,
  setModalState: PropTypes.func,
};

export default AddParameterSecondStepRange;
