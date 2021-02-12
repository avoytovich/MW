import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Divider,
  DialogActions,
} from '@material-ui/core';

import CustomCard from '../../../components/utils/CustomCard';
import localization from '../../../localization';

const DATE_VARIANTS = ['unlimited', 'after', 'before', 'between'];

const CappingAndLimits = ({ curReco, setCurReco }) => {
  const curDate = curReco.startDate || new Date();
  const curDateEnd = curReco.endDate || moment(curDate).add(1, 'day');
  let curVariant = 'unlimited';

  if (curReco.startDate && curReco.endDate) {
    curVariant = 'between';
  } else if (curReco.startDate) {
    curVariant = 'after';
  } else if (curReco.endDate) {
    curVariant = 'before';
  }

  const [variant, setVariant] = useState(curVariant);
  const [date, setDate] = useState(curDate);
  const [dateEnd, setDateEnd] = useState(curDateEnd);
  const [modalOpen, setModalOpen] = useState(false);

  const applyDate = () => {
    const newReco = { ...curReco };

    delete newReco.startDate;
    delete newReco.endDate;

    if (variant === 'between') {
      newReco.startDate = moment(date).valueOf();
      newReco.endDate = moment(dateEnd).valueOf();
    } else if (variant === 'after') {
      newReco.startDate = moment(date).toISOString();
    } else if (variant === 'before') {
      newReco.endDate = moment(dateEnd).toISOString();
    }

    setModalOpen(false);
    setCurReco(newReco);
  };

  const setInit = () => {
    setModalOpen(false);

    setTimeout(() => {
      setVariant(curVariant);
      setDate(curDate || new Date());
      setDateEnd(curDateEnd || new Date());
    }, 300);
  };

  return (
    <>
      <CustomCard title='Capping and limits'>
        <Box display="flex" mx={2} pt={2} alignItems='center'>
          <Typography variant='h5'>Period of validity:</Typography>

          <Button color='primary' onClick={() => setModalOpen(true)} style={{ marginLeft: 15 }}>
            {variant}
            {variant !== 'unlimited' && (
              <Typography variant='h6' style={{ marginLeft: 10 }}>
                {moment(curDate).format('MM/DD/YYYY')}
                {variant === 'between' && ` - ${moment(curDateEnd).format('MM/DD/YYYY')}`}
              </Typography>
            )}
          </Button>
        </Box>
      </CustomCard>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
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
            onClick={applyDate}
          >
            {localization.t('forms.buttons.apply')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

CappingAndLimits.propTypes = {
  curReco: PropTypes.object,
  setCurReco: PropTypes.func,
};

export default CappingAndLimits;
