import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

import localization from '../../localization';

const SectionLayout = ({
  label,
  children,
  wrapperWidth = '100%',
  contentWidth = '100%',
  dataTest = '',
}) => (
  <Box data-test={dataTest} my={3} bgcolor='#fff' boxShadow={2} width={wrapperWidth} pb={4}>
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
