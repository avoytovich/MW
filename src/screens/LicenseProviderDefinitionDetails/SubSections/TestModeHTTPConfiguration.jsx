/* eslint-disable max-len */
import React from 'react';
import {
  Box,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import { InputCustom } from '../../../components/Inputs';

const TestModeHTTPConfiguration = ({ curLicenseProvider, setCurLicenseProvider }) => (
  <Grid container>
    <Grid item md={12} sm={12}>
      <Box p={2}>
        <InputCustom
          data-test='baseUrlTest'
          label='baseUrlTest'
          isMultiline
          value={curLicenseProvider.testModeParameters.baseUrl}
          onChangeInput={(e) => {
            setCurLicenseProvider({
              ...curLicenseProvider,
              testModeParameters: {
                ...curLicenseProvider.testModeParameters,
                baseUrl: e.target.value,
              },
            });
          }}
        />
      </Box>
    </Grid>
    <Grid item md={6} sm={12}>
      <Box p={2}><Typography>{localization.t('labels.httpHeaders')}</Typography></Box>
      <Box p={2}>
        <InputCustom
          data-test='contentTypeOneByLine'
          label='contentTypeOneByLine'
          value={curLicenseProvider.testModeParameters.httpClientConfiguration.httpHeaders['Content-Type'].join('\r\n')}
          onChangeInput={(e) => {
            let res = [];
            if (e.target.value) {
              res = e.target.value.split(/\r?\n/);
            }
            setCurLicenseProvider({
              ...curLicenseProvider,
              testModeParameters:
              {
                ...curLicenseProvider.testModeParameters,
                httpClientConfiguration: {
                  ...curLicenseProvider.testModeParameters.httpClientConfiguration,
                  httpHeaders: {
                    ...curLicenseProvider.testModeParameters.httpClientConfiguration.httpHeaders, 'Content-Type': res,
                  },
                },
              },
            });
          }}
          isMultiline
        />
      </Box>
      <Box p={2}>
        <InputCustom
          data-test='versionOneByLine'
          label='versionOneByLine'
          value={curLicenseProvider.testModeParameters.httpClientConfiguration.httpHeaders.Version.join('\r\n')}
          onChangeInput={(e) => {
            let res = [];
            if (e.target.value) {
              res = e.target.value.split(/\r?\n/);
            }
            setCurLicenseProvider({
              ...curLicenseProvider,
              testModeParameters:
              {
                ...curLicenseProvider.testModeParameters,
                httpClientConfiguration: {
                  ...curLicenseProvider.testModeParameters.httpClientConfiguration,
                  httpHeaders: {
                    ...curLicenseProvider.testModeParameters.httpClientConfiguration.httpHeaders,
                    Version: res,
                  },
                },
              },
            });
          }}
        />
      </Box>
      <Box p={2}>
        <Typography>{localization.t('labels.tlsAuthMode')}</Typography>
        <Box py={2}>
          <RadioGroup
            row
            data-test='tlsAuthMode'
            aria-label="tlsAuthMode"
            name="tlsAuthMode"
            value={curLicenseProvider.testModeParameters.httpClientConfiguration.tlsConfiguration.tlsAuthMode}
            onChange={(e) => setCurLicenseProvider(
              {
                ...curLicenseProvider,
                testModeParameters:
                {
                  ...curLicenseProvider.testModeParameters,
                  httpClientConfiguration: {
                    ...curLicenseProvider.testModeParameters.httpClientConfiguration,
                    tlsConfiguration: {
                      ...curLicenseProvider.testModeParameters.httpClientConfiguration.tlsConfiguration,
                      tlsAuthMode: e.target.value,
                    },
                  },
                },
              },
            )}
          >
            <FormControlLabel
              value="none"
              control={<Radio color="primary" />}
              label={localization.t('labels.none')}
            />
            <FormControlLabel
              value="client"
              control={<Radio color="primary" />}
              label={localization.t('labels.client')}
            />
            <FormControlLabel
              value="server"
              control={<Radio color="primary" />}
              label={localization.t('labels.server')}
            />
          </RadioGroup>
        </Box>
      </Box>
      {(curLicenseProvider.testModeParameters.httpClientConfiguration.tlsConfiguration.tlsAuthMode !== 'none' && curLicenseProvider.testModeParameters.httpClientConfiguration.tlsConfiguration.tlsAuthMode !== '')
        && (
          <>
            {curLicenseProvider.testModeParameters.httpClientConfiguration.tlsConfiguration.tlsAuthMode === 'client'
              && (
                <Box p={2}>
                  <InputCustom
                    data-test='clientCertificates'
                    label='clientCertificates'
                    isMultiline
                    value={curLicenseProvider.testModeParameters.httpClientConfiguration.tlsConfiguration.clientCertificates}
                    onChangeInput={(e) => {
                      setCurLicenseProvider({
                        ...curLicenseProvider,
                        testModeParameters:
                        {
                          ...curLicenseProvider.testModeParameters,
                          httpClientConfiguration: {
                            ...curLicenseProvider.testModeParameters.httpClientConfiguration,
                            tlsConfiguration: {
                              ...curLicenseProvider.testModeParameters.httpClientConfiguration.tlsConfiguration,
                              clientCertificates: e.target.value,
                            },
                          },
                        },
                      });
                    }}
                  />
                </Box>
              )}
            <Box p={2}>
              <InputCustom
                data-test='privateKey'
                label='privateKey'
                isMultiline
                value={curLicenseProvider.testModeParameters.httpClientConfiguration.tlsConfiguration.privateKey}
                onChangeInput={(e) => {
                  setCurLicenseProvider({
                    ...curLicenseProvider,
                    testModeParameters:
                    {
                      ...curLicenseProvider.testModeParameters,
                      httpClientConfiguration: {
                        ...curLicenseProvider.testModeParameters.httpClientConfiguration,
                        tlsConfiguration: {
                          ...curLicenseProvider.testModeParameters.httpClientConfiguration.tlsConfiguration,
                          privateKey: e.target.value,
                        },
                      },
                    },
                  });
                }}
              />
            </Box>
            <Box p={2}>
              <InputCustom
                data-test='caCertificate'
                label='caCertificate'
                isMultiline
                value={curLicenseProvider.testModeParameters.httpClientConfiguration.tlsConfiguration.serverCACertificates}
                onChangeInput={(e) => {
                  setCurLicenseProvider({
                    ...curLicenseProvider,
                    testModeParameters:
                    {
                      ...curLicenseProvider.testModeParameters,
                      httpClientConfiguration: {
                        ...curLicenseProvider.testModeParameters.httpClientConfiguration,
                        tlsConfiguration: {
                          ...curLicenseProvider.testModeParameters.httpClientConfiguration.tlsConfiguration,
                          serverCACertificates: e.target.value,
                        },
                      },
                    },
                  });
                }}
              />
            </Box>
          </>
        )}
    </Grid>
    <Grid item md={6} sm={12}>
      <Box p={2}><Typography>{localization.t('labels.aAuth2_0Configuration')}</Typography></Box>
      <Box p={2}>
        <InputCustom
          data-test='clientId'
          label='clientId'
          isMultiline
          value={curLicenseProvider.testModeParameters.httpClientConfiguration.clientCredentialOauth2Config.clientId}
          onChangeInput={(e) => {
            setCurLicenseProvider({
              ...curLicenseProvider,
              testModeParameters:
              {
                ...curLicenseProvider.testModeParameters,
                httpClientConfiguration: {
                  ...curLicenseProvider.testModeParameters.httpClientConfiguration,
                  clientCredentialOauth2Config: {
                    ...curLicenseProvider.testModeParameters.httpClientConfiguration.clientCredentialOauth2Config,
                    clientId: e.target.value,
                  },
                },
              },
            });
          }}
        />
      </Box>
      <Box p={2}>
        <InputCustom
          data-test='clientSecret'
          label='clientSecret'
          isMultiline
          value={curLicenseProvider.testModeParameters.httpClientConfiguration.clientCredentialOauth2Config.clientSecret}
          onChangeInput={(e) => {
            setCurLicenseProvider({
              ...curLicenseProvider,
              testModeParameters:
              {
                ...curLicenseProvider.testModeParameters,
                httpClientConfiguration: {
                  ...curLicenseProvider.testModeParameters.httpClientConfiguration,
                  clientCredentialOauth2Config: {
                    ...curLicenseProvider.testModeParameters.httpClientConfiguration.clientCredentialOauth2Config,
                    clientSecret: e.target.value,
                  },
                },
              },
            });
          }}
        />
      </Box>
      <Box p={2}>
        <InputCustom
          data-test='tokenUrl'
          label='tokenUrl'
          isMultiline
          value={curLicenseProvider.testModeParameters.httpClientConfiguration.clientCredentialOauth2Config.tokenUrl}
          onChangeInput={(e) => {
            setCurLicenseProvider({
              ...curLicenseProvider,
              testModeParameters:
              {
                ...curLicenseProvider.testModeParameters,
                httpClientConfiguration: {
                  ...curLicenseProvider.testModeParameters.httpClientConfiguration,
                  clientCredentialOauth2Config: {
                    ...curLicenseProvider.testModeParameters.httpClientConfiguration.clientCredentialOauth2Config,
                    tokenUrl: e.target.value,
                  },
                },
              },
            });
          }}
        />
      </Box>
      <Box p={2}>
        <InputCustom
          data-test='scopesOneByLine'
          label='scopesOneByLine'
          isMultiline
          value={curLicenseProvider.testModeParameters.httpClientConfiguration.clientCredentialOauth2Config.scopes.join('\r\n')}
          onChangeInput={(e) => {
            let res = [];
            if (e.target.value) {
              res = e.target.value.split(/\r?\n/);
            }
            setCurLicenseProvider({
              ...curLicenseProvider,
              testModeParameters:
              {
                ...curLicenseProvider.testModeParameters,
                httpClientConfiguration: {
                  ...curLicenseProvider.testModeParameters.httpClientConfiguration,
                  clientCredentialOauth2Config: {
                    ...curLicenseProvider.testModeParameters.httpClientConfiguration.clientCredentialOauth2Config,
                    scopes: res,
                  },
                },
              },
            });
          }}
        />
      </Box>
    </Grid>
  </Grid>
);

TestModeHTTPConfiguration.propTypes = {
  curLicenseProvider: PropTypes.object,
  setCurLicenseProvider: PropTypes.func,
};

export default TestModeHTTPConfiguration;
