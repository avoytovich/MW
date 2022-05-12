import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Box,
  IconButton,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const ValueItem = ({
  index,
  value,
  isLast,
  curDefValue,
  setCurDefValue,
  setCurDescriptions,
}) => (
  <Grid container className='value-param-item'>
    <Grid
      display='flex'
      justifyContent='space-between'
      borderBottom={1}
      borderRight={1}
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

    <Grid item xs={8} p={2} lineHeight='34px' borderBottom='1px solid #b9b1b1'>
      {value?.descValue}
    </Grid>

    <Grid
      display='flex'
      justifyContent='space-between'
      item
      xs={2}
      borderBottom='1px solid #b9b1b1'
      style={{
        padding: '0 5px',
      }}
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

      {
        curDefValue === value?.description ? (
          <Box textAlign='right' width='95px' m='auto' height='48px' className='default-value-item'>
            <IconButton
              color='primary'
              aria-label='clear'
              size='large'
            >
              <StarIcon />
            </IconButton>
          </Box>
        ) : (
          <Box textAlign='center' width='75px' m='auto' height='48px'>
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
  </Grid>
);

ValueItem.propTypes = {
  index: PropTypes.number,
  value: PropTypes.object,
  isLast: PropTypes.bool,
  curDefValue: PropTypes.string,
  setCurDefValue: PropTypes.func,
  setCurDescriptions: PropTypes.func,
};

export default ValueItem;
