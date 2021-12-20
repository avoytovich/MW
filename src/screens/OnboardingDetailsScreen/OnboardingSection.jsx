import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@mui/material';

import localization from '../../localization';

const OnboardingSection = ({ label, children }) => (
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

OnboardingSection.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

export default OnboardingSection;
