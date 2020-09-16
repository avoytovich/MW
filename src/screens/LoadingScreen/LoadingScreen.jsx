import React from 'react';
import { Box, LinearProgress } from '@material-ui/core';

const LoadingScreen = () => (
  <Box width={400}>
    <LinearProgress />
  </Box>
);

export default LoadingScreen;
