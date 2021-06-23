import React, { useState } from 'react';
import {
  Box,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../localization';

import { urlIsValid } from '../../../services/helpers/inputValidators';
import { InputCustom } from '../../../components/Inputs';

const HttpHeaders = ({ setCurNotification, curNotification }) => {
  const [errorMessages, setErrorMessages] = useState(null);
  return (
    <Grid container>
      <Grid item md={12}>
        <Box p={2}>
          <InputCustom
            hasError={!!errorMessages}
            label='url'
            value={curNotification.url}
            onChangeInput={(e) => {
              const validUrl = urlIsValid(e.target.value);
              if (!validUrl) {
                setErrorMessages(localization.t('errorNotifications.invalidUrl'));
              } else {
                setErrorMessages(null);
              }
              setCurNotification({ ...curNotification, url: e.target.value });
            }}
            isRequired

            helperText={errorMessages}
          />
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box p={2}>
          <InputCustom
            label='contentTypeOneByLine'
            value={curNotification.httpClientConfiguration.httpHeaders['Content-Type'].join('\r\n')}
            onChangeInput={(e) => {
              let res = [];
              if (e.target.value) {
                res = e.target.value.split(/\r?\n/);
              }
              setCurNotification({
                ...curNotification,
                httpClientConfiguration: {
                  ...curNotification.httpClientConfiguration,
                  httpHeaders: { ...curNotification.httpClientConfiguration.httpHeaders, 'Content-Type': res },
                },
              });
            }}
            isMultiline
          />
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box p={2}>
          <InputCustom
            label='versionOneByLine'
            value={curNotification.httpClientConfiguration.httpHeaders.Version.join('\r\n')}
            onChangeInput={(e) => {
              let res = [];
              if (e.target.value) {
                res = e.target.value.split(/\r?\n/);
              }
              setCurNotification({
                ...curNotification,
                httpClientConfiguration: {
                  ...curNotification.httpClientConfiguration,
                  httpHeaders: {
                    ...curNotification.httpClientConfiguration.httpHeaders,
                    Version: res,
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

HttpHeaders.propTypes = {
  curNotification: PropTypes.object,
  setCurNotification: PropTypes.func,
};

export default HttpHeaders;
