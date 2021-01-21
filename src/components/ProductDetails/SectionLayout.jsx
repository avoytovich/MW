import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Divider } from '@material-ui/core';

import localization from '../../localization';

const SectionLayout = ({ label, children }) => (
  <Box my={3} bgcolor="#fff" boxShadow={2} p={3} mx={2}>
    <Typography gutterBottom variant="h4">
      {localization.t(`labels.${label}`)}
    </Typography>
    <Divider light />
    <Box display="flex" flexDirection="column">
      {children}
    </Box>
  </Box>
);

SectionLayout.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

export default SectionLayout;
