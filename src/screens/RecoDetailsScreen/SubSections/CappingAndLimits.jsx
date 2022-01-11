/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Box,
  Typography,
  Grid,
  TextField,
} from '@mui/material';

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
  const [errorMessages, setErrorMessages] = useState({ endDate: null });

  const onChangeEndDate = (e) => {
    const isFuture = new Date() < new Date(e.target.value);
    if (isFuture) {
      setErrorMessages({
        ...errorMessages,
        endDate: null,
      });
      setCurReco({
        ...curReco,
        errors: { endDate: false },
        endDate: moment(e.target.value).valueOf(),
      });
    } else {
      setErrorMessages({
        ...errorMessages,
        endDate: localization.t('labels.validationEndDate'),
      });
      setCurReco({
        ...curReco,
        errors: { endDate: true },
        endDate: moment(e.target.value).valueOf(),
      });
    }
  };

  useEffect(() => {
    if (validPeriod === 'between') return;

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

  return (
    <CustomCard mt={0}>
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
          <Box p={2}>
            {validPeriod === 'after' && (
              <Box>
                <TextField
                  fullWidth
                  name="startDate"
                  value={curReco.startDate ? moment(curReco.startDate).format('YYYY-MM-DDTHH:mm') : ''}
                  label={localization.t('labels.startDate')}
                  type="datetime-local"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setCurReco({
                    ...curReco,
                    startDate: moment(e.target.value).valueOf(),
                  })}
                />
              </Box>
            )}
            {validPeriod === 'between' && (
              <Box>
                <TextField
                  fullWidth
                  name="startDate"
                  value={curReco.startDate ? moment(curReco.startDate).format('YYYY-MM-DDTHH:mm') : ''}
                  label={localization.t('labels.startDate')}
                  type="datetime-local"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setCurReco({
                    ...curReco,
                    startDate: moment(e.target.value).valueOf(),
                  })}
                />
                <Box pt={2}>
                  <TextField
                    fullWidth
                    name="endDate"
                    value={curReco.endDate ? moment(curReco.endDate).format('YYYY-MM-DDTHH:mm') : ''}
                    label={localization.t('labels.endDate')}
                    type="datetime-local"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => onChangeEndDate(e)}
                    error={!!errorMessages.endDate}
                    helperText={errorMessages.endDate}
                  />
                </Box>
              </Box>
            )}
            {validPeriod === 'before' && (
              <Box>
                <TextField
                  fullWidth
                  name="endDate"
                  value={curReco.endDate ? moment(curReco.endDate).format('YYYY-MM-DDTHH:mm') : ''}
                  label={localization.t('labels.endDate')}
                  type="datetime-local"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => onChangeEndDate(e)}
                  error={!!errorMessages.endDate}
                  helperText={errorMessages.endDate}
                />
              </Box>
            )}
          </Box>
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
