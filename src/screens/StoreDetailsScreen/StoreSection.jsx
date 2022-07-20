import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@mui/material';

import localization from '../../localization';

const StoreSection = ({
  label, myRef, children,
}) => (
  <Box mb={3} bgcolor="#fff" p={4} boxShadow={2}>
    <Box p={2}>
      <Typography gutterBottom variant="h4" id={label} ref={myRef}>
        {localization.t(`labels.${label}`)}
      </Typography>
    </Box>
    <Grid container justifyContent="center" spacing={1}>
      {children}
    </Grid>
  </Box>
);
StoreSection.propTypes = {
  label: PropTypes.string,
  myRef: PropTypes.object,
  children: PropTypes.node,
};

export default StoreSection;
