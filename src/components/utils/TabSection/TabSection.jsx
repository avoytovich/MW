import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@mui/material';

import localization from '../../../localization';

const TabSection = ({ label, children }) => (
  <Box mb={3} bgcolor="#fff" p={4} boxShadow={2}>
    <Box p={2}>
      <Typography gutterBottom variant="h4">
        {localization.t(`labels.${label}`)}
      </Typography>
    </Box>
    <Grid container justifyContent="center" spacing={1}>
      {children}
    </Grid>
  </Box>
);

TabSection.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

export default TabSection;
