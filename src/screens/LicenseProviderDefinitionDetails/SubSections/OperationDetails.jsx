/* eslint-disable max-len */
import React from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../localization';

import { InputCustom } from '../../../components/Inputs';

const OperationDetails = ({ curLicenseProvider, setCurLicenseProvider }) => (
  <Grid container>
    <Grid item md={6} sm={12}>
      <Box p={2}>
        <InputCustom
          data-test='urlComplement'
          label='urlComplement'
          isMultiline
          value={curLicenseProvider.operationDefinitions.fallback.urlComplement}
          onChangeInput={(e) => {
            setCurLicenseProvider({
              ...curLicenseProvider,
              operationDefinitions: {
                ...curLicenseProvider.operationDefinitions,
                fallback: {
                  ...curLicenseProvider.operationDefinitions.fallback,
                  urlComplement: e.target.value,
                },
              },
            });
          }}
        />
      </Box>
      <Box p={2}>
        <InputCustom
          data-test='bodyTemplate'
          label='bodyTemplate'
          isMultiline
          value={curLicenseProvider.operationDefinitions.fallback.bodyTemplate}
          onChangeInput={(e) => {
            setCurLicenseProvider({
              ...curLicenseProvider,
              operationDefinitions: {
                ...curLicenseProvider.operationDefinitions,
                fallback: {
                  ...curLicenseProvider.operationDefinitions.fallback,
                  bodyTemplate: e.target.value,
                },
              },
            });
          }}
        />
      </Box>
    </Grid>
    <Grid item md={6} sm={12}>
      <Box p={2}>
        <InputCustom
          data-test='contentType'
          label='contentType'
          value={curLicenseProvider.operationDefinitions.fallback.httpHeaders['Content-Type'].join('\r\n')}
          onChangeInput={(e) => {
            let res = [];
            if (e.target.value) {
              res = e.target.value.split(/\r?\n/);
            }
            setCurLicenseProvider({
              ...curLicenseProvider,
              operationDefinitions: {
                ...curLicenseProvider.operationDefinitions,
                fallback: {
                  ...curLicenseProvider.operationDefinitions.fallback,
                  httpHeaders: { ...curLicenseProvider.operationDefinitions.fallback.httpHeaders, 'Content-Type': res },
                },
              },
            });
          }}
          isMultiline
        />
      </Box>
      <Box p={2}>
        <InputCustom
          data-test='errorMessage'
          isMultiline
          label='errorStatusCodesOnePerLine'
          value={curLicenseProvider.permanentErrorsDefinition.httpStatusCodes.join('\r\n')}
          onChangeInput={(e) => {
            let res = [];
            if (e.target.value) {
              res = e.target.value.split(/\r?\n/);
            }
            setCurLicenseProvider({
              ...curLicenseProvider,
              permanentErrorsDefinition: {
                ...curLicenseProvider.permanentErrorsDefinition,
                httpStatusCodes: res,
              },
            });
          }}
        />
      </Box>
    </Grid>

    {curLicenseProvider.bodyType !== 'json' && (
      <>
        <Grid item md={12}>
          <Box p={2}><Typography>{localization.t('labels.responsePaths')}</Typography></Box>
        </Grid>
        <Grid item md={6} sm={12}>
          <Box p={2}>
            <InputCustom
              data-test='bodyTemplate'
              label='activationCode'
              value={curLicenseProvider.operationDefinitions.fallback.responsePaths.activationCode.path}
              onChangeInput={(e) => {
                setCurLicenseProvider({
                  ...curLicenseProvider,
                  operationDefinitions: {
                    ...curLicenseProvider.operationDefinitions,
                    fallback: {
                      ...curLicenseProvider.operationDefinitions.fallback,
                      responsePaths: {
                        ...curLicenseProvider.operationDefinitions.fallback.responsePaths,
                        activationCode: {
                          ...curLicenseProvider.operationDefinitions.fallback.responsePaths.activationCode,
                          path: e.target.value,
                        },
                      },
                    },
                  },
                });
              }}
            />
          </Box>
          <Box p={2}>
            <InputCustom
              data-test='bodyTemplate'
              label='conversionTemplate'
              value={curLicenseProvider.operationDefinitions.fallback.responsePaths.activationCode.conversionTemplate}
              onChangeInput={(e) => {
                setCurLicenseProvider({
                  ...curLicenseProvider,
                  operationDefinitions: {
                    ...curLicenseProvider.operationDefinitions,
                    fallback: {
                      ...curLicenseProvider.operationDefinitions.fallback,
                      responsePaths: {
                        ...curLicenseProvider.operationDefinitions.fallback.responsePaths,
                        activationCode: {
                          ...curLicenseProvider.operationDefinitions.fallback.responsePaths.activationCode, conversionTemplate: e.target.value,
                        },
                      },
                    },
                  },
                });
              }}
            />
          </Box>
          <Box p={2}>
            <InputCustom
              data-test='downloadExpireDate'
              label='downloadExpireDate'
              value={curLicenseProvider.operationDefinitions.fallback.responsePaths.downloadExpireDate.path}
              onChangeInput={(e) => {
                setCurLicenseProvider({
                  ...curLicenseProvider,
                  operationDefinitions: {
                    ...curLicenseProvider.operationDefinitions,
                    fallback: {
                      ...curLicenseProvider.operationDefinitions.fallback,
                      responsePaths: {
                        ...curLicenseProvider.operationDefinitions.fallback.responsePaths,
                        downloadExpireDate: {
                          ...curLicenseProvider.operationDefinitions.fallback.responsePaths.downloadExpireDate,
                          path: e.target.value,
                        },
                      },
                    },
                  },
                });
              }}
            />
          </Box>
        </Grid>
        <Grid item md={6} sm={12}>
          <Box p={2}>
            <InputCustom
              data-test='downloadUrl'
              label='downloadUrl'
              value={curLicenseProvider.operationDefinitions.fallback.responsePaths.downloadURI.path}
              onChangeInput={(e) => {
                setCurLicenseProvider({
                  ...curLicenseProvider,
                  operationDefinitions: {
                    ...curLicenseProvider.operationDefinitions,
                    fallback: {
                      ...curLicenseProvider.operationDefinitions.fallback,
                      responsePaths: {
                        ...curLicenseProvider.operationDefinitions.fallback.responsePaths,
                        downloadURI: {
                          ...curLicenseProvider.operationDefinitions.fallback.responsePaths.downloadURI,
                          path: e.target.value,
                        },
                      },
                    },
                  },
                });
              }}
            />
          </Box>
          <Box p={2}>
            <InputCustom
              data-test='errorMessage'
              label='errorMessage'
              value={curLicenseProvider.operationDefinitions.fallback.responsePaths.errorMessage.path}
              onChangeInput={(e) => {
                setCurLicenseProvider({
                  ...curLicenseProvider,
                  operationDefinitions: {
                    ...curLicenseProvider.operationDefinitions,
                    fallback: {
                      ...curLicenseProvider.operationDefinitions.fallback,
                      responsePaths: {
                        ...curLicenseProvider.operationDefinitions.fallback.responsePaths,
                        errorMessage: {
                          ...curLicenseProvider.operationDefinitions.fallback.responsePaths.errorMessage,
                          path: e.target.value,
                        },
                      },
                    },
                  },
                });
              }}
            />
          </Box>
        </Grid>
      </>
    )}

  </Grid>
);

OperationDetails.propTypes = {
  curLicenseProvider: PropTypes.object,
  setCurLicenseProvider: PropTypes.func,
};

export default OperationDetails;
