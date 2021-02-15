import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

import localization from '../../localization';

const SectionLayout = ({ label, children }) => (
  <Box my={3} bgcolor="#fff" boxShadow={2} mx={2} width="100%">
    <Box p={4}>
      <Typography gutterBottom variant="h4">
        {localization.t(`labels.${label}`)}
      </Typography>
    </Box>
    <Box display="flex" flexDirection="column" width="90%" pl={2}>
      {children}
    </Box>
  </Box>
);

SectionLayout.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

export default SectionLayout;
