import React from 'react';
import moment from 'moment';
import {
  LinearProgress,
  Grid,
  Typography,
  Box,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import { InputCustom } from '../../../components/Inputs';

const General = ({ curIdentity, setCurIdentity }) => (
  curIdentity === null
    ? <LinearProgress />
    : (
      <>
        <Box display="flex" flexDirection="row" alignItems="baseline">
          <Box p={2}>
            <Typography color="secondary">
              {localization.t('labels.status')}
            </Typography>
          </Box>
          <Box p={2}>
            <FormControlLabel
              control={(
                <Switch
                  name="status"
                  onChange={(e) => {
                    setCurIdentity({
                      ...curIdentity,
                      inactive: !e.target.checked,
                    });
                  }}
                  color="primary"
                  checked={!curIdentity.inactive}
                />
              )}
              label={localization.t(
                `labels.${curIdentity.inactive === false ? 'enabled' : 'disabled'}`,
              )}
            />
          </Box>
        </Box>
        <Grid container>
          <Grid item md={4} sm={12}>
            <Box pt={4} pl={2}>
              <Typography color="secondary">{localization.t('labels.createDate')}</Typography>
            </Box>
            <Box p={2}>
              <Typography>{moment(curIdentity.createDate).format('YYYY/MM/DD kk:mm (Z)')}</Typography>
            </Box>
          </Grid>
          <Grid item md={4} sm={12}>
            <Box pt={4} pl={2}>
              <Typography color="secondary">{localization.t('labels.lastUpdate')}</Typography>
            </Box>
            <Box p={2}>
              <Typography>{moment(curIdentity.updateDate).format('YYYY/MM/DD kk:mm (Z)')}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box pt={3} px={2}>
          <Typography color="secondary">
            {localization.t('labels.type')}
          </Typography>
        </Box>
        <Box p={2}>
          <Typography>
            The type of identity is choosen at creation and cannot be modified afterwards.
            Choose "User" to declare a human agent, and "Application"
            to obtain credentials for your bots accessing Monetize services.
          </Typography>
        </Box>
        <Box p={2}>
          <RadioGroup
            row
            aria-label='Type'
            name='Type'
            value='User'
            onChange={() => { }}
          >
            <FormControlLabel
              value='User'
              control={<Radio color='primary' />}
              label={localization.t('labels.user')}
            />
            <FormControlLabel
              value='Application'
              control={<Radio color='primary' />}
              label={localization.t('labels.application')}
            />

          </RadioGroup>
        </Box>
        <Box p={2} mt={3} width='70%'>
          <InputCustom
            label='contactEmailAddress'
            value={curIdentity.email}
            onChangeInput={(e) => setCurIdentity({ ...curIdentity, email: e.target.value })}
            isRequired
          />
        </Box>

      </>
    )
);

General.propTypes = {
  curIdentity: PropTypes.object,
  setCurIdentity: PropTypes.func,
};

export default General;
