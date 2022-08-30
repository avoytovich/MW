import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Box,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  Divider,
  DialogActions,
  Button,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import localization from '../../../../localization';

import { NumberInput } from '../../../Inputs';

import EditValueItem from './EditValueItem';

const ValueItem = ({
  index,
  value,
  isLast,
  type,
  curDefValue,
  setCurDefValue,
  setCurDescriptions,
  productDetails,
}) => {
  const [editValue, setEditValue] = useState(false);
  const [rangeFrom, setRangeFrom] = useState(null);
  const [rangeTo, setRangeTo] = useState(null);
  const [newDescription, setNewDescription] = useState(null);

  useEffect(() => {
    if (type === 'RANGE') {
      const [from, to] = value?.description.split('-');

      setRangeFrom(from);
      setRangeTo(to);
    }

    setNewDescription(value);
  }, [value]);

  const updateRangeInput = (val, inputType) => {
    let description;

    if (inputType === 'from') {
      setRangeFrom(val);
      description = `${val}-${rangeTo}`;
    } else {
      setRangeTo(val);
      description = `${rangeFrom}-${val}`;
    }

    setCurDescriptions((c) => {
      const newVarValues = [...c.variableValueDescriptions];

      newVarValues[index] = { ...value, description };

      return ({ ...c, variableValueDescriptions: [...newVarValues] });
    });
  };

  return (
    <Grid container className='value-param-item'>
      <Grid
        display='flex'
        justifyContent='space-between'
        borderBottom={1}
        borderRight={1}
        alignItems='center'
        borderColor='#b9b1b1'
        xs={2}
        p={2}
      >
        {index !== 0 && (
          <Box textAlign='center' width='34px' height='34px'>
            <IconButton
              color='secondary'
              aria-label='clear'
              size='small'
              onClick={() => {
                setCurDescriptions((c) => {
                  const newVarValues = [...c.variableValueDescriptions];

                  [newVarValues[index - 1], newVarValues[index]] = [
                    newVarValues[index], newVarValues[index - 1],
                  ];

                  return ({
                    ...c,
                    variableValueDescriptions: [...newVarValues],
                  });
                });
              }}
            >
              <ArrowUpwardIcon />
            </IconButton>
          </Box>
        )}

        {!isLast && (
          <Box
            width='34px'
            height='34px'
            textAlign='center'
            ml={index === 0 ? 'auto' : 0}
          >
            <IconButton
              color='secondary'
              aria-label='clear'
              size='small'
              onClick={() => {
                setCurDescriptions((c) => {
                  const newVarValues = [...c.variableValueDescriptions];

                  [newVarValues[index], newVarValues[index + 1]] = [
                    newVarValues[index + 1], newVarValues[index],
                  ];

                  return ({
                    ...c,
                    variableValueDescriptions: [...newVarValues],
                  });
                });
              }}
            >
              <ArrowDownwardIcon />
            </IconButton>
          </Box>
        )}
      </Grid>

      <Grid item xs={7} p={2} lineHeight='34px' borderBottom='1px solid #b9b1b1'>
        <Box display='flex'>
          <TextField
            type='text'
            disabled
            value={(value?.localizedValue && value?.localizedValue[productDetails?.fallbackLocale])
              || value?.descValue}
            onChange={() => null}
            fullWidth
            variant='outlined'
          />

          {
            type === 'RANGE' && (
              <>
                <NumberInput
                  label='from'
                  value={rangeFrom}
                  styles={{ margin: '0px 5px' }}
                  onChangeInput={(e) => updateRangeInput(e?.target?.value, 'from')}
                  minMAx={{ min: 1, max: Infinity }}
                />

                <NumberInput
                  label='to'
                  value={rangeTo}
                  onChangeInput={(e) => updateRangeInput(e?.target?.value, 'to')}
                  minMAx={{ min: 1, max: Infinity }}
                />
              </>
            )
          }
        </Box>
      </Grid>

      <Grid
        display='flex'
        justifyContent='flex-end'
        item
        xs={3}
        borderBottom='1px solid #b9b1b1'
        style={{ padding: '0 5px' }}
        className='value-params-actions'
      >
        {curDefValue !== value?.description && (
          <Box textAlign='center' width='75px' m='auto' height='48px'>
            <IconButton
              color='secondary'
              aria-label='clear'
              size='large'
              onClick={() => {
                setCurDescriptions((c) => ({
                  ...c,
                  variableValueDescriptions: [
                    ...c?.variableValueDescriptions
                      .filter((vd) => vd.description !== value?.description),
                  ],
                }));
              }}
            >
              <ClearIcon />
            </IconButton>
          </Box>
        )}

        <Box textAlign='center' width='50px' my='auto' height='48px'>
          <IconButton
            color='secondary'
            aria-label='clear'
            size='large'
            onClick={() => setEditValue(true)}
          >
            <EditIcon />
          </IconButton>
        </Box>

        {
          curDefValue === value?.description ? (
            <Box textAlign='right' width='50px' my='auto' height='48px' className='default-value-item'>
              <IconButton
                color='primary'
                aria-label='clear'
                size='large'
              >
                <StarIcon />
              </IconButton>
            </Box>
          ) : (
            <Box textAlign='center' width='50px' my='auto' height='48px'>
              <IconButton
                color='secondary'
                aria-label='clear'
                size='large'
                onClick={() => setCurDefValue(value?.description)}
              >
                <StarBorderIcon />
              </IconButton>
            </Box>
          )
        }
      </Grid>

      <Dialog
        open={editValue}
        onClose={() => setEditValue(false)}
        PaperProps={{
          style: {
            width: '700px',
            maxWidth: '700px',
            overflowX: 'visible',
          },
        }}
        fullWidth
        closeAfterTransition
      >
        <DialogTitle>Edit value label</DialogTitle>

        <Divider />

        <EditValueItem
          curDescription={newDescription}
          setCurDescriptions={setNewDescription}
          index={index}
          productDetails={productDetails}
        />

        <Divider />

        <DialogActions>
          <Button
            variant="outlined"
            color='secondary'
            onClose={() => setEditValue(false)}
            onClick={() => { setEditValue(false); setNewDescription(value); }}
          >
            {localization.t('labels.cancel')}
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setCurDescriptions((c) => {
                const newVarValues = [...c.variableValueDescriptions];

                newVarValues[index] = { ...newDescription };

                return ({ ...c, variableValueDescriptions: [...newVarValues] });
              });
              setEditValue(false);
            }}
            disabled={JSON.stringify(value) === JSON.stringify(newDescription)}
          >
            {localization.t('labels.save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

ValueItem.propTypes = {
  index: PropTypes.number,
  value: PropTypes.object,
  isLast: PropTypes.bool,
  curDefValue: PropTypes.string,
  setCurDefValue: PropTypes.func,
  setCurDescriptions: PropTypes.func,
  type: PropTypes.string,
  productDetails: PropTypes.object,
};

export default ValueItem;
