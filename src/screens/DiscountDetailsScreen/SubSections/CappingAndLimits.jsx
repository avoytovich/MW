import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, TextField, Grid,
} from '@material-ui/core';
import moment from 'moment';

import { validityPeriod } from '../../../services/selectOptions/selectOptions';
import DateRangePicker from '../../../components/utils/Modals/DateRangePicker';

import localization from '../../../localization';
import { NumberInput, SelectCustom } from '../../../components/Inputs';

const CappingAndLimits = ({ curDiscount, setCurDiscount }) => {
  const [validPeriod, setValidPeriod] = useState('between');

  useEffect(() => {
    if (validPeriod === 'before') {
      const newDiscount = { ...curDiscount };
      delete newDiscount.startDate;
      setCurDiscount(newDiscount);
    }
  }, [validPeriod]);

  useEffect(() => {
    setValidPeriod(curDiscount.startDate ? 'between' : 'before');
  }, []);

  const selectionRange = {
    startDate: curDiscount?.startDate
      ? new Date(curDiscount?.startDate)
      : new Date(),
    endDate: new Date(curDiscount?.endDate),
    key: 'selection',
  };

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges;
    setCurDiscount({
      ...curDiscount,
      startDate: moment(startDate).valueOf(),
      endDate: moment(endDate).valueOf(),
    });
  };
  return (
    <>
      <Grid item md={12} xs={12}>
        <Box p={2}>
          <Typography>{localization.t('labels.periodOfValidity')}</Typography>
        </Box>
      </Grid>
      <Grid container alignItems="center">
        <Grid item md={3} sm={6}>
          <Box py={2} pl={2}>
            <SelectCustom
              label="periodOfValidity"
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
          ) : (
            <Box p={2}>
              <form noValidate>
                <TextField
                  fullWidth
                  name="endDate"
                  value={
                    curDiscount.endDate
                      ? moment(curDiscount.endDate).format('YYYY-MM-DDTHH:mm')
                      : ''
                  }
                  label={localization.t('labels.endDate')}
                  type="datetime-local"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    setCurDiscount({
                      ...curDiscount,
                      endDate: e.target.value,
                    });
                  }}
                />
              </form>
            </Box>
          )}
        </Grid>
      </Grid>
      <Box width={1} p={2}>
        <Grid container spacing={2}>
          <Grid item md={4} sm={12}>
            <Box>
              <NumberInput
                label="maximumUses"
                value={curDiscount.maxUsages}
                onChangeInput={(e) => setCurDiscount({ ...curDiscount, maxUsages: e.target.value })}
                minMAx={{ min: 1, max: 9999, step: 1 }}
              />
            </Box>
          </Grid>
          <Grid item md={4} sm={12}>
            <Box>
              <NumberInput
                label="maximumUsesPerStore"
                value={curDiscount.maxUsePerStore}
                onChangeInput={(e) => setCurDiscount({
                  ...curDiscount,
                  maxUsePerStore: e.target.value,
                })}
                minMAx={{ min: 1, max: 9999, step: 1 }}
              />
            </Box>
          </Grid>
          <Grid item md={4} sm={12}>
            <Box>
              <NumberInput
                label="maximumUsesPerEndUser"
                value={curDiscount.maxUsePerEndUser}
                onChangeInput={(e) => setCurDiscount({
                  ...curDiscount,
                  maxUsePerEndUser: e.target.value,
                })}
                minMAx={{ min: 1, max: 9999, step: 1 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

CappingAndLimits.propTypes = {
  curDiscount: PropTypes.object,
  setCurDiscount: PropTypes.func,
};

export default CappingAndLimits;
