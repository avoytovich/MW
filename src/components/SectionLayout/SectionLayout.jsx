import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

import localization from '../../localization';

const SectionLayout = ({
  label,
  children,
  wrapperWidth = '100%',
  contentWidth = '100%',
  dataTest = '',
}) => (
  <Box
    data-test={dataTest}
    mb={3}
    bgcolor='#fff'
    boxShadow={2}
    width={wrapperWidth}
    pb={4}
    position='relative'
  >
    <Box p={4}>
      <Typography gutterBottom variant='h4'>
        {localization.t(`labels.${label}`)}
      </Typography>
    </Box>
    <Box display='flex' flexDirection='column' width={contentWidth} px={2}>
      {children}
    </Box>
  </Box>
);

SectionLayout.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  wrapperWidth: PropTypes.string,
  contentWidth: PropTypes.string,
  dataTest: PropTypes.string,
};

export default SectionLayout;
