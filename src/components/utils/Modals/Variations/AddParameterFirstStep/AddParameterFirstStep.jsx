import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import localization from '../../../../../localization';

import { InputCustom } from '../../../../Inputs';

import '../variations.scss';

const AddParameterFirstStep = ({
  setStep, setModalState, onClose, modalState,
}) => {
  const [value, setValue] = useState('LIST');

  return (
    <>
      <DialogTitle>{localization.t('labels.newParameter')}</DialogTitle>

      <Divider />

      <DialogContent>
        <Box mb='40px'>
          <Box fontStyle='italic' component='h4' mb={2}>{localization.t('forms.messages.newParamFirstTip')}</Box>

          <Box fontStyle='italic' component='p' mb={2}>{localization.t('forms.messages.newParamFirstExtraTip')}</Box>

          <InputCustom
            value={modalState?.field || ''}
            label='parameterName'
            onChangeInput={(e) => setModalState({
              ...modalState,
              field: e.target.value,
            })}
            isRequired
          />
        </Box>

        <Box mb='40px'>
          <Box fontStyle='italic' component='h4' mb={2}>{localization.t('forms.messages.newParamSecondTip')}</Box>

          <Box fontStyle='italic' component='p' mb={2}>{localization.t('forms.messages.newParamSecondExtraTip')}</Box>

          <InputCustom
            value={modalState?.label || ''}
            label='displayString'
            onChangeInput={(e) => setModalState({ ...modalState, label: e.target.value })}
          />
        </Box>

        <Box mb='40px'>
          <Box fontStyle='italic' component='h4' mb={2}>{localization.t('forms.messages.newParamThirdTip')}</Box>

          <RadioGroup
            aria-label='type'
            name='type'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            <Box mb='15px'>
              <FormControlLabel
                className='radio'
                value='LIST'
                control={<Radio color={value === 'LIST' ? 'primary' : 'secondary'} />}
                label='LIST'
              />
              <Typography variant='h6' className='radioLabel'>
                Buyer will select a value amongst a set of predefined values.
                For instance (s)he could select a tee-shirt size amongst
                {' { "S", "M", "L", "XL" } '}
              </Typography>
            </Box>
            <Box>
              <FormControlLabel
                className='radio'
                value='RANGE'
                control={<Radio color={value === 'RANGE' ? 'primary' : 'secondary'} />}
                label='RANGE'
              />
              <Typography variant='h6' className='radioLabel'>
                Buyer will select a range amongst a set of predefined ranges.
                For instance (s)he could select a number of licenses amongst
                {' { "1-10 license(s)", "11-50 licenses", "51-100 licenses" } '}
              </Typography>
            </Box>
          </RadioGroup>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color='secondary' onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color='primary'
          disabled={!modalState?.field}
          onClick={() => {
            setModalState({ ...modalState, type: value });
            setStep(value);
          }}
        >
          continue
        </Button>
      </DialogActions>
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
