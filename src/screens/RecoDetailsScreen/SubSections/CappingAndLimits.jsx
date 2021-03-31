import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Box,
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';

import DateRangePicker from '../../../components/utils/Modals/DateRangePicker';
import CustomCard from '../../../components/utils/CustomCard';
import { SelectCustom } from '../../../components/Inputs';
import localization from '../../../localization';

const validityPeriod = [
  { id: 'after', value: 'after' },
  { id: 'before', value: 'before' },
  { id: 'between', value: 'between' },
];

const CappingAndLimits = ({ curReco, setCurReco }) => {
  const [validPeriod, setValidPeriod] = useState('between');

  useEffect(() => {
    if(validPeriod === 'between') return;

    const newReco = { ...curReco };

    if (validPeriod === 'before') {
      delete newReco.startDate;
    } else if (validPeriod === 'after') {
      delete newReco.endDate;
    }

    setCurReco(newReco);
  }, [validPeriod]);

  useEffect(() => {
    let curVariant = 'between';
  
    if (curReco.startDate && curReco.endDate) {
      curVariant = 'between';
    } else if (curReco.startDate) {
      curVariant = 'after';
    } else if (curReco.endDate) {
      curVariant = 'before';
    }

    setValidPeriod(curVariant);
  }, []);

  const selectionRange = {
    startDate: curReco?.startDate ? new Date(curReco?.startDate) : new Date(),
    endDate: curReco?.endDate ? new Date(curReco?.endDate) : new Date(),
    key: 'selection',
  };

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges;

    setCurReco({
      ...curReco,
      startDate: moment(startDate).valueOf(),
      endDate: moment(endDate).valueOf(),
    });
  };

  return (
    <CustomCard>
      <Grid item md={12} xs={12}>
        <Box p={2}>
          <Typography variant='h5'>{localization.t('labels.periodOfValidity')}</Typography>
        </Box>
      </Grid>

      <Grid container alignItems="center">
        <Grid item md={3} sm={6}>
          <Box py={2} pl={2}>
            <SelectCustom
              label='periodOfValidity'
              onChangeSelect={(e) => setValidPeriod(e.target.value)}
              selectOptions={validityPeriod}
              value={validPeriod}
            />
          </Box>
        </Grid>

        <Grid item md={4} sm={6}>
          {validPeriod === 'between' ? (
            <Box p={2}>
              <DateRangePicker
                values={selectionRange}
                handleChange={handleSelect}
              />
            </Box>
          ) : validPeriod === 'after' ? (
            <Box p={2}>
              <form noValidate>
                <TextField
                  fullWidth
                  name='startDate'
                  value={
                    curReco.startDate
                      ? moment(curReco.startDate).format('YYYY-MM-DD')
                      : ''
                  }
                  label={localization.t('labels.startDate')}
                  type='date'
                  variant='outlined'
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setCurReco({ ...curReco, startDate: moment(e.target.value).valueOf() })}
                />
              </form>
            </Box>
          ) : (
            <Box p={2}>
              <form noValidate>
                <TextField
                  fullWidth
                  name='endDate'
                  value={
                    curReco.endDate
                      ? moment(curReco.endDate).format('YYYY-MM-DD')
                      : ''
                  }
                  label={localization.t('labels.endDate')}
                  type='date'
                  variant='outlined'
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setCurReco({ ...curReco, endDate: moment(e.target.value).valueOf() })}
                />
              </form>
            </Box>
          )}
        </Grid>
      </Grid>
    </CustomCard>
  );
};

CappingAndLimits.propTypes = {
  curReco: PropTypes.object,
  setCurReco: PropTypes.func,
};

export default CappingAndLimits;
