import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, TextField, Grid,
} from '@mui/material';
import moment from 'moment';

import { validityPeriod } from '../../../services/selectOptions/selectOptions';
import DateRangePicker from '../../../components/utils/Modals/DateRangePicker';

import localization from '../../../localization';
import { NumberInput, SelectCustom } from '../../../components/Inputs';

const CappingAndLimits = ({
  curDiscount,
  setCurDiscount,
  errors,
}) => {
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
      <Grid container alignItems='center'>
        <Grid item md={3} sm={6}>
          <Box py={2} pl={2}>
            <SelectCustom
              data-test='periodOfValidity'
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
          ) : (
            <Box p={2}>
              <form noValidate>
                <TextField
                  variant='outlined'
                  label={localization.t('labels.endDate')}
                  id="datetime-local"
                  value={curDiscount.endDate
                    ? moment(curDiscount.endDate).format('YYYY-MM-DDTHH:mm')
                    : ''}
                  type="datetime-local"
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
                data-test='maximumUses'
                label='maximumUses'
                value={curDiscount.maxUsages}
                minMAx={{ min: 0, max: 9999, step: 1 }}
                hasError={errors?.cappingAndLimits?.includes('maxUsages')}
                helperText={errors?.cappingAndLimits?.includes('maxUsages') && localization.t('errorNotifications.required')}
                isRequired={curDiscount?.model === 'SINGLE_USE_CODE'}
                onChangeInput={(e) => {
                  setCurDiscount({
                    ...curDiscount,
                    maxUsages: e.target.value,
                  });
                }}
              />
            </Box>
          </Grid>
          <Grid item md={4} sm={12}>
            <Box>
              <NumberInput
                data-test='maximumUsesPerStore'
                label='maximumUsesPerStore'
                value={curDiscount.maxUsePerStore}
                onChangeInput={(e) => setCurDiscount({
                  ...curDiscount,
                  maxUsePerStore: e.target.value,
                })}
                minMAx={{ min: 0, max: 9999, step: 1 }}
              />
            </Box>
          </Grid>
          <Grid item md={4} sm={12}>
            <Box>
              <NumberInput
                data-test='maximumUsesPerEndUser'
                label='maximumUsesPerEndUser'
                value={curDiscount.maxUsePerEndUser}
                onChangeInput={(e) => setCurDiscount({
                  ...curDiscount,
                  maxUsePerEndUser: e.target.value,
                })}
                minMAx={{ min: 0, max: 9999, step: 1 }}
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
  errors: PropTypes.object,
};

export default CappingAndLimits;
