// ToDo: add localization
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from '@material-ui/core';

import moment from 'moment';
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './dateRangePicker.scss';

const DateRangePicker = ({ values, handleChange }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [initiator, setInitiator] = useState('start');

  const showDatePicker = (trigger) => {
    setInitiator(trigger);
    setModalOpened(true);
  };

  const changeRangeFocus = ([, end]) => setInitiator(end ? 'end' : 'start');

  const changeRange = ({ selection }) => {
    const { startDate } = selection;
    setModalOpened(false);

    if (initiator === 'start') {
      const endDate = moment(startDate).isAfter(values.endDate) ? startDate : values.endDate;
      handleChange({ startDate, endDate });
    } else {
      handleChange(selection);
    }
  };

  return (
    <>
      {
        values.startDate && (
          <Box mx={2} pb={2} className='date-range-selected'>
            <Typography gutterBottom variant='h5'>Date range:</Typography>
            {'Between '}
            <Typography className='date-value' color='primary' variant='h6' onClick={() => showDatePicker('start')}>
              {moment(values.startDate).format('ll')}
            </Typography>
            {' and '}
            <Typography className='date-value' color='primary' variant='h6' onClick={() => showDatePicker('end')}>
              {moment(values.endDate).format('ll')}
            </Typography>
          </Box>
        )
      }

      {
        modalOpened && initiator && (
          <Dialog onClose={() => setModalOpened(false)} aria-labelledby='date-range-dialog-title' open={modalOpened}>
            <DialogTitle id='date-range-dialog-title' disableTypography>
              <Typography variant='h4'>Select range</Typography>
            </DialogTitle>

            <DialogContent dividers>
              <DateRange
                ranges={[values]}
                focusedRange={initiator === 'start' ? [0, 0] : [0, 1]}
                onRangeFocusChange={changeRangeFocus}
                onChange={changeRange}
              />
            </DialogContent>
          </Dialog>
        )
      }
    </>
  );
};

DateRangePicker.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
};

export default DateRangePicker;
