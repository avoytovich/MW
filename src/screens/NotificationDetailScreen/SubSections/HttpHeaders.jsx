import React from 'react';
import {
  Box,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { InputCustom } from '../../../components/Inputs';

const HttpHeaders = ({ setCurNotification, curNotification }) => (
  <Grid container>
    <Grid item md={6}>
      <Box p={2}>
        <InputCustom
          data-test='contentTypeOneByLine'
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
          data-test='versionOneByLine'
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

HttpHeaders.propTypes = {
  curNotification: PropTypes.object,
  setCurNotification: PropTypes.func,
};

export default HttpHeaders;
