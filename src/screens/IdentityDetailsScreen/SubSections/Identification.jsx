import React from 'react';
import {
  LinearProgress,
  Typography,
  Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import { InputCustom } from '../../../components/Inputs';

const Identification = ({ curIdentity, setCurIdentity }) => (
  curIdentity === null
    ? <LinearProgress />
    : (
      <>
        <Box display="flex" flexDirection="row" alignItems="baseline">
          <Box p={2}>
            <Typography color="secondary">
              {localization.t('labels.userName')}
            </Typography>
          </Box>
          <Box p={2}>
            <Typography>
              {curIdentity.userName}
            </Typography>
          </Box>
        </Box>
        <Box p={2} width='70%'>
          <InputCustom
            label='firsName'
            value={curIdentity.firstName}
            onChangeInput={(e) => setCurIdentity({ ...curIdentity, firstName: e.target.value })}
          />
        </Box>
        <Box p={2} width='70%'>
          <InputCustom
            label='lastName'
            value={curIdentity.lastName}
            onChangeInput={(e) => setCurIdentity({ ...curIdentity, lastName: e.target.value })}
          />
        </Box>
      </>
    )
);

Identification.propTypes = {
  curIdentity: PropTypes.object,
  setCurIdentity: PropTypes.func,
};

export default Identification;
