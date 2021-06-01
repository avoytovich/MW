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

const General = ({
  curIdentity,
  setCurIdentity,
  identityType,
  setIdentityType,
}) => (
  curIdentity === null
    ? <LinearProgress />
    : (
      <>
        {curIdentity.id && (
        <>
          <Box display="flex" flexDirection="row" alignItems="baseline">
            <Box p={2}>
              <Typography color="secondary">
                {localization.t('labels.status')}
              </Typography>
            </Box>
            <Box p={2}>
              <FormControlLabel
                data-test='status'
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
                <Typography data-test='createDate'>{moment(curIdentity.createDate).format('YYYY/MM/DD kk:mm (Z)')}</Typography>
              </Box>
            </Grid>
            <Grid item md={4} sm={12}>
              <Box pt={4} pl={2}>
                <Typography color="secondary">{localization.t('labels.lastUpdate')}</Typography>
              </Box>
              <Box p={2}>
                <Typography data-test='updateDate'>{moment(curIdentity.updateDate).format('YYYY/MM/DD kk:mm (Z)')}</Typography>
              </Box>
            </Grid>
          </Grid>
        </>
        )}
        <Box pt={3} px={2}>
          <Typography color="secondary">
            {localization.t('labels.type')}
          </Typography>
        </Box>
        <Box p={2}>
          <Typography>
            {localization.t('general.typeOfIdentity')}
          </Typography>
        </Box>
        <Box p={2}>
          <RadioGroup
            row
            data-test='type'
            aria-label='Type'
            name='Type'
            value={identityType}
            onChange={(e) => setIdentityType(e.target.value)}
          >
            <FormControlLabel
              data-test='user'
              value='user'
              disabled={!!curIdentity.id}
              control={<Radio color='primary' />}
              label={localization.t('labels.user')}
            />
            <FormControlLabel
              data-test='application'
              disabled={!!curIdentity.id}
              value='application'
              control={<Radio color='primary' />}
              label={localization.t('labels.application')}
            />

          </RadioGroup>
        </Box>
        <Box p={2} mt={3} width='70%'>
          <InputCustom
            data-test='contactEmailAddress'
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
  identityType: PropTypes.string,
  setIdentityType: PropTypes.func,
};

export default General;
