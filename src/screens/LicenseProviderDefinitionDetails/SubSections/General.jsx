import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import { InputCustom } from '../../../components/Inputs';

const General = ({ curLicenseProvider, setCurLicenseProvider }) => (
  <Grid container>
    <Grid item md={6} sm={12}>
      <Box p={2}>
        <InputCustom
          data-test='name'
          label='name'
          value={curLicenseProvider.name}
          onChangeInput={(e) => setCurLicenseProvider(
            { ...curLicenseProvider, name: e.target.value },
          )}
          isRequired
        />
      </Box>
      <Box p={2}>
        <Typography>{localization.t('labels.status')}</Typography>
        <Box py={2}>
          <RadioGroup
            row
            data-test='status'
            aria-label="status"
            name="status"
            value={curLicenseProvider.status}
            onChange={(e) => setCurLicenseProvider(
              { ...curLicenseProvider, status: e.target.value },
            )}
          >
            <FormControlLabel
              value="Enable"
              control={<Radio color="primary" />}
              label={localization.t('labels.enable')}
            />
            <FormControlLabel
              value="Disable"
              control={<Radio color="primary" />}
              label={localization.t('labels.disable')}
            />
            <FormControlLabel
              value="TestMode"
              control={<Radio color="primary" />}
              label={localization.t('labels.testMode')}
            />
          </RadioGroup>
        </Box>
      </Box>
    </Grid>
    <Grid item md={6} sm={12}>
      <Box p={2}>
        <InputCustom
          data-test='baseUrl'
          label='baseUrl'
          value={curLicenseProvider.baseUrl}
          onChangeInput={(e) => {
            setCurLicenseProvider({ ...curLicenseProvider, baseUrl: e.target.value });
          }}
        />
      </Box>
      <Box p={2}>
        <Typography>{localization.t('labels.format')}</Typography>
        <Box py={2}>
          <RadioGroup
            row
            data-test='format'
            aria-label="format"
            name="format"
            value={curLicenseProvider.bodyType}
            onChange={(e) => setCurLicenseProvider(
              { ...curLicenseProvider, bodyType: e.target.value },
            )}
          >
            <FormControlLabel
              value="json"
              control={<Radio color="primary" />}
              label="json"
            />
            <FormControlLabel
              value="xml"
              control={<Radio color="primary" />}
              label="xml"
            />
          </RadioGroup>
        </Box>
      </Box>
    </Grid>
  </Grid>
);

General.propTypes = {
  curLicenseProvider: PropTypes.object,
  setCurLicenseProvider: PropTypes.func,
};

export default General;
