import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Divider,
  Typography,
} from '@material-ui/core';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import localization from '../../../../localization';

const DATE_VARIANTS = ['unlimited', 'after', 'before', 'between'];

const DateSubFilter = ({ filter, config, setConfig }) => {
  useEffect(() => {
    const newConfig = { ...config };

    if (!newConfig[filter.id]) {
      newConfig[filter.id] = { variant: 'unlimited', type: 'date', label: filter.label };
      setConfig(newConfig);
    }
  }, []);

  const curVariant = config[filter.id]?.variant || 'unlimited';
  const curDate = config[filter.id]?.date || null;
  const curDateEnd = config[filter.id]?.dateEnd || null;

  const [isOpen, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(moment(date).add(1, 'day'));
  const [variant, setVariant] = useState(curVariant);

  const applyFilter = () => {
    const newConfig = { ...config, [filter.id]: { variant, type: 'date', label: filter.label } };

    if (variant !== 'unlimited') {
      newConfig[filter.id].date = date;
    }

    if (variant === 'between') {
      newConfig[filter.id].dateEnd = dateEnd;
    }

    setOpen(false);
    setConfig({ ...newConfig });
  };

  const setInit = () => {
    setOpen(false);

    setTimeout(() => {
      setVariant(curVariant);
      setDate(curDate || new Date());
      setDateEnd(curDateEnd || new Date());
    }, 300);
  };

  return (
    <>
      <Button color='primary' onClick={() => setOpen(true)}>
        {curVariant}
        {curDate && (
          <Typography color='textPrimary' variant='h6' style={{ marginLeft: 10 }}>
            {moment(curDate).format('MM/DD/YYYY')}
            {curDateEnd && ` - ${moment(curDateEnd).format('MM/DD/YYYY')}`}
          </Typography>
        )}
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        aria-labelledby='date-sub-filters'
      >
        <DialogTitle id='date-sub-filters'>
          {DATE_VARIANTS.map((v) => (
            <Button
              key={v}
              color={variant === v ? 'primary' : 'inherit'}
              onClick={() => setVariant(v)}
            >
              {v}
            </Button>
          ))}
        </DialogTitle>

        {variant !== 'unlimited' && (
          <DialogContent style={{ marginBottom: 20 }}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid container direction='column' justify='center' alignItems='center'>
                <KeyboardDatePicker
                  autoOk
                  disableToolbar
                  inputVariant='outlined'
                  label={`Date ${variant === 'between' ? 'start' : variant}`}
                  format='MM/DD/YYYY'
                  value={date}
                  onChange={(date_) => setDate(moment(date_).toISOString())}
                />

                {variant === 'between' && (
                  <KeyboardDatePicker
                    style={{ marginTop: 20 }}
                    autoOk
                    disableToolbar
                    inputVariant='outlined'
                    label='Date end'
                    format='MM/DD/YYYY'
                    value={dateEnd}
                    minDate={moment(date).add(1, 'day')}
                    minDateMessage='End date should not be before start date'
                    onChange={(date_) => setDateEnd(moment(date_).toISOString())}
                  />
                )}
              </Grid>
            </MuiPickersUtilsProvider>
          </DialogContent>
        )}

        <Divider />

        <DialogActions>
          <Button color='secondary' onClick={setInit}>
            {localization.t('forms.buttons.cancel')}
          </Button>

          <Button
            color='primary'
            disabled={variant === 'between' && moment(date).add(1, 'day').isAfter(dateEnd, 'day')}
            onClick={applyFilter}
          >
            {localization.t('forms.buttons.apply')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DateSubFilter.propTypes = {
  filter: PropTypes.object,
  config: PropTypes.object,
  setConfig: PropTypes.func,
};

export default DateSubFilter;
