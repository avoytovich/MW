import React from 'react';
import {
  LinearProgress,
  Typography,
  Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import { SelectWithChip } from '../../../components/Inputs';

const Permissions = ({ curIdentity, setCurIdentity, selectOptions }) => (
  curIdentity === null
    ? <LinearProgress />
    : (
      <>
        <Box p={2}>
          <Typography>
            This is the list of customers this identity is allowed to manage,
            in addition to the customer owning this identity.
          </Typography>
        </Box>
      </>
    )
);

Permissions.propTypes = {
  curIdentity: PropTypes.object,
  setCurIdentity: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default Permissions;
