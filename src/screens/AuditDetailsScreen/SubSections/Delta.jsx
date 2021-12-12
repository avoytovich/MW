import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import JsonEditor from '../../../components/JsonEditor';

const Delta = ({ audit }) => (
  <Box p={2} boxShadow={2}>
    <JsonEditor
      isReadOnly
      currentData={JSON.stringify(audit.what.delta, 0, 4)}
    />
  </Box>
);

Delta.propTypes = {
  audit: PropTypes.object,
};

export default Delta;
