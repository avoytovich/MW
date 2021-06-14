import React from 'react';
import {
  LinearProgress,
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import { InputCustom } from '../../../components/Inputs';
import SecretKeysTable from './SecretKeysTable';

const Identification = ({
  curIdentity, setCurIdentity, identityType, addSecretKey, removeSecretKey,
}) => {
  if (curIdentity === null) return <LinearProgress />;

  return identityType === 'user' ? (
    <Box width='70%'>
      <Box p={2}>
        <InputCustom
          data-test='userName'
          isRequired
          idDisabled={!!curIdentity.id}
          label='userName'
          value={curIdentity.userName}
          onChangeInput={(e) => setCurIdentity({ ...curIdentity, userName: e.target.value })}
        />
      </Box>
      <Box p={2}>
        <InputCustom
          data-test='firstName'
          label='firstName'
          value={curIdentity.firstName}
          onChangeInput={(e) => setCurIdentity({ ...curIdentity, firstName: e.target.value })}
        />
      </Box>
      <Box p={2}>
        <InputCustom
          data-test='lastName'
          label='lastName'
          value={curIdentity.lastName}
          onChangeInput={(e) => setCurIdentity({ ...curIdentity, lastName: e.target.value })}
        />
      </Box>
    </Box>
  ) : (
    <>
      <Box p={2}>
        <InputCustom
          data-test='clientId'
          label='clientId'
          value={curIdentity.clientId}
          onChangeInput={(e) => setCurIdentity({ ...curIdentity, clientId: e.target.value })}
        />
      </Box>
      {curIdentity.id
          && (
            <>
              <Box px={2} pt={3}>
                <Typography color="secondary">
                  {localization.t('labels.secretKeys')}
                </Typography>
              </Box>
              <Box px={2} pb={3}>
                <Typography>{localization.t('general.maxNumberOfSecretKeys')}</Typography>
              </Box>
              {curIdentity.secretKeys.length > 0
                && (
                  <SecretKeysTable
                    removeSecretKey={removeSecretKey}
                    curIdentity={curIdentity}
                  />
                )}
              <Box p={2}>
                <Button
                  data-test='addSecretButton'
                  disabled={curIdentity.secretKeys.length > 4}
                  onClick={addSecretKey}
                  variant="outlined"
                  color='primary'
                >
                  {`${localization.t('labels.add')} ${localization.t('labels.secret')}`}
                </Button>
              </Box>
            </>
          )}
    </>
  );
};

Identification.propTypes = {
  curIdentity: PropTypes.object,
  setCurIdentity: PropTypes.func,
  identityType: PropTypes.string,
  addSecretKey: PropTypes.func,
  removeSecretKey: PropTypes.func,
};

export default Identification;
