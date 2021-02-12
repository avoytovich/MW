import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Box, TextField } from '@material-ui/core';
import localization from '../../localization';
import DateRangePicker from '../../components/utils/Modals/DateRangePicker';

import { validityPeriod } from '../../services/selectOptions/selectOptions';
import CustomCard from '../../components/utils/CustomCard';
import { NumberInput, SelectCustom } from '../../components/Inputs';
import './discountDetailsScreen.scss';

const CappingAndLimitsSection = ({ curDiscount, setCurDiscount }) => {
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
    <CustomCard title="Capping And Limits">
      <Box display="flex" alignItems="center" pt={3}>
        <Box px={1} width=" 100%">
          <SelectCustom
            label="periodOfValidity"
            onChangeSelect={(e) => setValidPeriod(e.target.value)}
            selectOptions={validityPeriod}
            value={validPeriod}
          />
        </Box>
        {validPeriod === 'between' && (
          <Box px={1} width=" 100%">
            <DateRangePicker
              values={selectionRange}
              handleChange={handleSelect}
            />
          </Box>
        )}
        {validPeriod === 'before' && (
          <Box px={1} width=" 100%">
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
      </Box>
      <Box px={1} width=" 100%">
        <NumberInput
          label="maximumUses"
          value={curDiscount.maxUsages}
          onChangeInput={(e) => setCurDiscount({ ...curDiscount, maxUsages: e.target.value })}
          minMAx={{ min: 1, max: 9999 }}
        />
      </Box>
      <Box px={1} width=" 100%">
        <NumberInput
          label="maximumUsesPerStore"
          value={curDiscount.maxUsePerStore}
          onChangeInput={(e) => setCurDiscount({ ...curDiscount, maxUsePerStore: e.target.value })}
          minMAx={{ min: 1, max: 9999 }}
        />
      </Box>
      <Box px={1} width=" 100%">
        <NumberInput
          label="maximumUsesPerEndUser"
          value={curDiscount.maxUsePerEndUser}
          onChangeInput={(e) => setCurDiscount({
            ...curDiscount,
            maxUsePerEndUser: e.target.value,
          })}
          minMAx={{ min: 1, max: 9999 }}
        />
      </Box>
    </CustomCard>
  );
};

CappingAndLimitsSection.propTypes = {
  curDiscount: PropTypes.object,
  setCurDiscount: PropTypes.func,
};
export default CappingAndLimitsSection;
