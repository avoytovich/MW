import React from 'react';

import moment from 'moment';
import PropTypes from 'prop-types';

import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Grid,
  TextField,
} from '@mui/material';
import { validPeriodOptions } from './utils';
import localization from '../../localization';
import { InputCustom, NumberInput, SelectCustom } from '../../components/Inputs';

const AbandonedCartDetailsView = ({
  setCurAbandonedCart, curAbandonedCart, hasError, setHasError, testing,
}) => (

  <Box my={3} bgcolor='#fff' boxShadow={2} width='100%' pb={4}>
    <Box display='flex' flexDirection='column' width='100%' px={2}>
      <Box display="flex" p={2} pt={4} flexDirection="row" alignItems="baseline">
        <Box>
          <Typography color='secondary'>
            {`${localization.t(
              'labels.status',
            )} *`}
          </Typography>
        </Box>
        <Box px={2}>
          <FormControlLabel
            data-test='status'
            control={(
              <Switch
                name="status"
                onChange={(e) => {
                  setCurAbandonedCart({
                    ...curAbandonedCart,
                    status: e.target.checked ? 'Active' : 'Inactive',
                  });
                }}
                color={curAbandonedCart.status === 'Active' ? 'success' : 'primary'}
                checked={curAbandonedCart.status === 'Active'}
              />
            )}
            label={localization.t(
              `labels.${curAbandonedCart.status === 'Active' ? 'enabled' : 'disabled'
              }`,
            )}
          />
        </Box>
      </Box>
      <Box p={2} width='60%'>
        <InputCustom
          testing={testing}
          data-test='name'
          label='name'
          value={curAbandonedCart.name}
          onChangeInput={(e) => setCurAbandonedCart(
            { ...curAbandonedCart, name: e.target.value },
          )}
          isRequired
        />
      </Box>
      <Grid container alignItems='center'>
        <Grid item md={3} sm={6}>
          <Box p={2}>
            <SelectCustom
              testing={testing}
              data-test='date'
              label='date'
              value={curAbandonedCart.validPeriod}
              selectOptions={validPeriodOptions}
              onChangeSelect={(e) => setCurAbandonedCart(
                { ...curAbandonedCart, validPeriod: e.target.value },
              )}
              isRequired
            />
          </Box>
        </Grid>
        {curAbandonedCart.validPeriod !== 'unlimited'
          && (
            <Grid item>
              {curAbandonedCart.validPeriod === 'between'
                && (
                  <Box
                    p={2}
                    display='flex'
                    alignItems='center'
                    flexDirection='row'
                  >
                    <form noValidate>
                      <TextField
                        data-test='betweenStartDate'
                        fullWidth
                        name={curAbandonedCart.validPeriod === 'startDate'}
                        value={moment(curAbandonedCart.startDate).format('YYYY-MM-DDTHH:mm')}
                        label={localization.t('labels.startDate')}
                        type='datetime-local'
                        variant='outlined'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setCurAbandonedCart({
                            ...curAbandonedCart, startDate: e.target.value,
                          });
                        }}
                      />
                    </form>
                    <Box px={2}>{localization.t('general.and')}</Box>
                    <form noValidate>
                      <TextField
                        data-test='betweenEndDate'
                        fullWidth
                        name='betweenEndDate'
                        value={moment(curAbandonedCart.endDate).format('YYYY-MM-DDTHH:mm')}
                        label={localization.t('labels.endDate')}
                        type='datetime-local'
                        variant='outlined'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setCurAbandonedCart({ ...curAbandonedCart, endDate: e.target.value });
                        }}
                      />
                    </form>
                  </Box>
                )}
              {(curAbandonedCart.validPeriod === 'after' || curAbandonedCart.validPeriod === 'before')
                && (
                  <Box p={2}>
                    <form noValidate>
                      <TextField
                        data-test={curAbandonedCart.validPeriod === 'after' ? 'startDate' : 'endDate'}
                        fullWidth
                        name={curAbandonedCart.validPeriod === 'after' ? 'startDate' : 'endDate'}
                        value={moment(curAbandonedCart.validPeriod === 'after' ? curAbandonedCart.startDate : curAbandonedCart.endDate).format('YYYY-MM-DDTHH:mm')}
                        label={curAbandonedCart.validPeriod === 'after' ? localization.t('labels.startDate') : localization.t('labels.endDate')}
                        type='datetime-local'
                        variant='outlined'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          const key = curAbandonedCart.validPeriod === 'after' ? 'startDate' : 'endDate';
                          setCurAbandonedCart({ ...curAbandonedCart, [key]: e.target.value });
                        }}
                      />
                    </form>
                  </Box>
                )}
            </Grid>
          )}
      </Grid>
      <Box p={2} width='60%'>
        <NumberInput
          data-test='delayMn'
          hasError={hasError}
          helperText={hasError ? 'Delay must be a positive number of minutes less of equal to 10,080 s after the enduser email is captured.' : ''}
          minMAx={{ min: 1, max: 10080 }}
          label='delayMn'
          value={curAbandonedCart.delay}
          onChangeInput={(e) => {
            if (e.target.value > 10080 || e.target.value < 1) {
              setHasError(true);
            } else {
              setHasError(false);
            }
            setCurAbandonedCart(
              { ...curAbandonedCart, delay: e.target.value },
            );
          }}
          isRequired
        />
      </Box>
    </Box>
  </Box>
);
AbandonedCartDetailsView.propTypes = {
  setCurAbandonedCart: PropTypes.func,
  curAbandonedCart: PropTypes.object,
  hasError: PropTypes.bool,
  setHasError: PropTypes.func,
  testing: PropTypes.bool,
};

export default AbandonedCartDetailsView;
