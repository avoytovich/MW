import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Tooltip,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

import { NumberInput } from '../../../../Inputs';

import localization from '../../../../../localization';

import '../variations.scss';

const defauldRange = { from: 1, to: 2, label: '' };

const AddParameterSecondStepRange = ({
  onClose, onSubmit, modalState, setModalState,
}) => {
  const [range, setRange] = useState(defauldRange);
  const [parametersList, setParametersList] = useState([]);
  const [max, setMax] = useState(0);

  const minParametersCount = parametersList.length < 2;
  // eslint-disable-next-line
  const findMax = (list) => Math.max.apply(
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

  const toNumber = (number) => (typeof number === 'number' ? number : parseInt(number, 10));

  const handleRangeFrom = (value) => {
    const val = value ? toNumber(value) : '';

    if (val !== '' && val <= max) return;

    val >= range.to
      ? setRange({
        from: val,
        to: val + 1,
      }) : setRange({
        from: val,
        to: range.to,
      });
  };

  const handleRangeTo = (value) => {
    const val = value ? toNumber(value) : '';

    if (val !== '' && val < max + 1) return;

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

  return (
    <>
      <DialogTitle>{localization.t('labels.newParameter')}</DialogTitle>

      <Divider />

      <DialogContent>
        <Box mb='40px'>
          <Box fontStyle='italic' component='h4' mb={2}>
            Please defined at least two ranges and their display strings in language'en-US'.
          </Box>
        </Box>

        <Box mb='20px'>
          {parametersList.map(({ from, to, label }, i) => (
            <Box key={label} display='flex' marginBottom='30px'>
              <Box width='122px' marginRight='20px'>
                <NumberInput
                  label='from'
                  value={from}
                  isDisabled
                  onChangeInput={() => null}
                  minMAx={{ min: 1, max: Infinity }}
                />
              </Box>
              <Box width='122px' marginRight='20px'>
                <NumberInput
                  label='to'
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
                label='from'
                value={range.from}
                onChangeInput={(e) => handleRangeFrom(e.target.value)}
                minMAx={{ min: 1, max: range.from + 1 }}
              />
            </Box>
            <Box width='122px' marginRight='20px'>
              <NumberInput
                label='to'
                value={range.to}
                onChangeInput={(e) => handleRangeTo(e.target.value)}
                minMAx={{ min: range.from + 1, max: Infinity }}
              />
            </Box>
            <Box width='100%' marginRight='10px'>
              <TextField
                label='Display string (en-US)'
                value={range.label}
                type='text'
                onChange={(e) => setRange({
                  from: range.from,
                  to: range.to,
                  label: e.target.value,
                })}
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
        </Box>

        <Box>
          {minParametersCount && (
            <Typography className='infoLabel'>
              {parametersList.length === 1 ? 'One more range to go' : 'Two more ranges to go'}
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color='secondary' onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={minParametersCount}
          color={minParametersCount ? 'secondary' : 'primary'}
          onClick={onSubmit}
        >
          create new parameter
        </Button>
      </DialogActions>
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
