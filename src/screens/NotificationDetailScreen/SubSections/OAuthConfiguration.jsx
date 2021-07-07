import React from 'react';
import {
  Box,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { InputCustom } from '../../../components/Inputs';

const OAuthConfiguration = ({ setCurNotification, curNotification }) => (
  <Grid container>
    <Grid item md={6}>
      <Box p={2}>
        <InputCustom
          label='clientID'
          value={curNotification.httpClientConfiguration.clientCredentialOauth2Config.clientId}
          onChangeInput={(e) => {
            setCurNotification({
              ...curNotification,
              httpClientConfiguration: {
                ...curNotification.httpClientConfiguration,
                clientCredentialOauth2Config: {
                  ...curNotification.httpClientConfiguration.clientCredentialOauth2Config,
                  clientId: e.target.value,
                },
              },
            });
          }}
        />
      </Box>
    </Grid>
    <Grid item md={6}>
      <Box p={2}>
        <InputCustom
          label='clientSecret'
          value={curNotification.httpClientConfiguration.clientCredentialOauth2Config.clientSecret}
          onChangeInput={(e) => {
            setCurNotification({
              ...curNotification,
              httpClientConfiguration: {
                ...curNotification.httpClientConfiguration,
                clientCredentialOauth2Config: {
                  ...curNotification.httpClientConfiguration.clientCredentialOauth2Config,
                  clientSecret: e.target.value,
                },
              },
            });
          }}
        />
      </Box>
    </Grid>
    <Grid item md={6}>
      <Box p={2}>
        <InputCustom
          label='tokenURL'
          value={curNotification.httpClientConfiguration.clientCredentialOauth2Config.tokenUrl}
          onChangeInput={(e) => {
            setCurNotification({
              ...curNotification,
              httpClientConfiguration: {
                ...curNotification.httpClientConfiguration,
                clientCredentialOauth2Config: {
                  ...curNotification.httpClientConfiguration.clientCredentialOauth2Config,
                  tokenUrl: e.target.value,
                },
              },
            });
          }}
        />
      </Box>
    </Grid>
    <Grid item md={6}>
      <Box p={2}>
        <InputCustom
          label='scopesOneByLine'
          value={curNotification.httpClientConfiguration.clientCredentialOauth2Config.scopes.join('\r\n')}
          onChangeInput={(e) => {
            let res = [];
            if (e.target.value) {
              res = e.target.value.split(/\r?\n/);
            }
            setCurNotification({
              ...curNotification,
              httpClientConfiguration: {
                ...curNotification.httpClientConfiguration,
                clientCredentialOauth2Config: {
                  ...curNotification.httpClientConfiguration.clientCredentialOauth2Config,
                  scopes: res,
                },
              },
            });
          }}
          isMultiline
        />
      </Box>
    </Grid>
  </Grid>
);

OAuthConfiguration.propTypes = {
  curNotification: PropTypes.object,
  setCurNotification: PropTypes.func,
};

export default OAuthConfiguration;
