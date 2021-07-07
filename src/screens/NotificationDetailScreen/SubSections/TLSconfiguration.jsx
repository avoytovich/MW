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

const TLSconfiguration = ({ setCurNotification, curNotification }) => (
  <Grid container>
    <Grid item md={12}>
      <Box display='flex' m={2} pb={2}>
        <div>
          <Typography gutterBottom variant='h5'>
            {localization.t('labels.TLSAuthMode')}
          </Typography>
          <Box>
            <RadioGroup
              row
              aria-label='tlsAuthMode'
              name='tlsAuthMode'
              value={curNotification.httpClientConfiguration.tlsConfiguration.tlsAuthMode}
              onChange={(e) => setCurNotification({
                ...curNotification,
                httpClientConfiguration: {
                  ...curNotification.httpClientConfiguration,
                  tlsConfiguration: {
                    ...curNotification.httpClientConfiguration.tlsConfiguration,
                    tlsAuthMode: e.target.value,
                  },
                },
              })}
            >
              <FormControlLabel
                value='none'
                control={<Radio color='primary' />}
                label={localization.t('labels.none')}
              />
              <FormControlLabel
                value='client'
                control={<Radio color='primary' />}
                label={localization.t('labels.client')}
              />
              <FormControlLabel
                value='server'
                control={<Radio color='primary' />}
                label={localization.t('labels.server')}
              />
            </RadioGroup>
          </Box>
        </div>
      </Box>
    </Grid>
    <Grid item md={10}>
      {curNotification.httpClientConfiguration.tlsConfiguration.tlsAuthMode && curNotification.httpClientConfiguration.tlsConfiguration.tlsAuthMode !== 'none' && (
        <>
          {curNotification.httpClientConfiguration.tlsConfiguration.tlsAuthMode === 'client' && (
            <Box p={2}>
              <InputCustom
                rowsMax={4}
                label='clientCertificates'
                value={curNotification.httpClientConfiguration.tlsConfiguration.clientCertificates}
                onChangeInput={(e) => {
                  setCurNotification({
                    ...curNotification,
                    httpClientConfiguration: {
                      ...curNotification.httpClientConfiguration,
                      tlsConfiguration: {
                        ...curNotification.httpClientConfiguration.tlsConfiguration,
                        clientCertificates: e.target.value,
                      },
                    },
                  });
                }}
                isMultiline
              />
            </Box>
          )}
          <Box p={2}>
            <InputCustom
              rowsMax={4}
              label='privateKey'
              value={curNotification.httpClientConfiguration.tlsConfiguration.privateKey}
              onChangeInput={(e) => {
                setCurNotification({
                  ...curNotification,
                  httpClientConfiguration: {
                    ...curNotification.httpClientConfiguration,
                    tlsConfiguration: {
                      ...curNotification.httpClientConfiguration.tlsConfiguration,
                      privateKey: e.target.value,
                    },
                  },
                });
              }}
              isMultiline
            />
          </Box>
          <Box p={2}>
            <InputCustom
              rowsMax={4}
              label='cACertificate'
              value={curNotification.httpClientConfiguration.tlsConfiguration.serverCACertificates}
              onChangeInput={(e) => {
                setCurNotification({
                  ...curNotification,
                  httpClientConfiguration: {
                    ...curNotification.httpClientConfiguration,
                    tlsConfiguration: {
                      ...curNotification.httpClientConfiguration.tlsConfiguration,
                      serverCACertificates: e.target.value,
                    },
                  },
                });
              }}
              isMultiline
            />
          </Box>
        </>
      )}
    </Grid>
  </Grid>
);

TLSconfiguration.propTypes = {
  curNotification: PropTypes.object,
  setCurNotification: PropTypes.func,
};

export default TLSconfiguration;
