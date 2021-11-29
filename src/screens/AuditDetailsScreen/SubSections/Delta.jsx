import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
} from '@material-ui/core';
import ReactJson from 'react-json-view';

const Delta = ({ audit }) => (
  <Box p={2} boxShadow={2}>
    <ReactJson
      src={audit.what.delta}
      name={false}
      displayDataTypes={false}
      collapseStringsAfterLength={100}
      defaultValue=''
      sortKeys
      collapsed
      iconStyle='square'
      theme={{
        base00: 'rgba(255, 255, 255, 1)',
        base01: 'rgba(206, 200, 197, 1)',
        base02: 'rgba(71, 145, 219, 1)',
        base03: 'rgba(206, 200, 197, 1)',
        base04: 'rgba(206, 200, 197, 1)',
        base05: 'rgba(71, 145, 219, 1)',
        base06: 'rgba(206, 200, 197, 1)',
        base07: 'rgba(0, 0, 0, 1)',
        base08: 'rgba(71, 145, 219, 1)',
        base09: 'rgba(255, 0, 0, 1)',
        base0A: 'rgba(0, 0, 0, 1)',
        base0B: 'rgba(71, 145, 219, 1)',
        base0C: 'rgba(71, 145, 219, 1)',
        base0D: 'rgba(71, 145, 219, 1)',
        base0E: 'rgba(71, 145, 219, 1)',
        base0F: 'rgba(71, 145, 219, 1)',
      }}
    />
  </Box>
);

Delta.propTypes = {
  audit: PropTypes.object,
};

export default Delta;
