import React, { useState } from 'react';
import {
  Box,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import { urlIsValid } from '../../../services/helpers/inputValidators';
import { InputCustom } from '../../../components/Inputs';

const OAuthConfiguration = ({ setCurNotification, curNotification }) => {
  const [errorMessages, setErrorMessages] = useState(null);
  return (
    <Grid container>
      <Grid item md={6}>
        <Box p={2}>
          <InputCustom
            data-test='clientID'
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
            data-test='clientSecret'
            label='clientSecret'
            value={
              curNotification.httpClientConfiguration.clientCredentialOauth2Config.clientSecret
            }
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
            data-test='tokenURL'
            hasError={!!errorMessages}
            helperText={errorMessages}
            label='tokenURL'
            value={curNotification.httpClientConfiguration.clientCredentialOauth2Config.tokenUrl}
            onChangeInput={(e) => {
              const validUrl = urlIsValid(e.target.value);
              if (!validUrl && e.target.value) {
                setErrorMessages(localization.t('errorNotifications.invalidUrl'));
              } else {
                setErrorMessages(null);
              }
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
            data-test='scopesOneByLine'
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
};

OAuthConfiguration.propTypes = {
  curNotification: PropTypes.object,
  setCurNotification: PropTypes.func,
};

export default OAuthConfiguration;
