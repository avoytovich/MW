import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Checkbox, FormControlLabel, Typography, Grid,
} from '@mui/material';

import localization from '../../../localization';
import { checkBoxObj } from '../../CustomerDetailScreen/utils';

const Features = ({ curOnboarding, setCurOnboarding }) => (
  <Grid container>
    {Object.keys(checkBoxObj).map((item) => (
      <Grid item md={4} key={item}>
        <Box pt={2} pl={2}>
          <Typography>{localization.t(`labels.${item}`)}</Typography>
        </Box>
        <Box p={2}>
          {checkBoxObj[item].map((checkParam) => (
            <FormControlLabel
              data-test={checkParam}
              style={{ width: '100%' }}
              key={checkParam}
              control={(
                <Checkbox
                  indeterminate={false}
                  name={checkParam}
                  color="primary"
                  checked={curOnboarding.onboardingProperties.features?.[checkParam]}
                />
              )}
              onChange={(e) => setCurOnboarding(
                {
                  ...curOnboarding,
                  onboardingProperties: {
                    ...curOnboarding.onboardingProperties,
                    features: {
                      ...curOnboarding.onboardingProperties.features,
                      [checkParam]: e.target.checked,
                    },
                  },
                },
              )}
              label={localization.t(`labels.${checkParam}`)}
            />
          ))}
        </Box>

      </Grid>
    ))}
  </Grid>

);
Features.propTypes = {
  curOnboarding: PropTypes.object,
  setCurOnboarding: PropTypes.func,
};

export default Features;
