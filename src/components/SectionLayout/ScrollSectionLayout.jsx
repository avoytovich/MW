import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

import localization from '../../localization';

const ScrollSectionLayout = ({
  label,
  children,
  wrapperWidth = '100%',
  contentWidth = '100%',
  dataTest = '',
  sectionRef,
  setSelectedSection,
  selectedSection,
}) => (
  <Box
    data-test={dataTest}
    mb={3}
    bgcolor='#fff'
    boxShadow={2}
    width={wrapperWidth}
    pb={4}
    position='relative'
    id={sectionRef?.section}
    ref={sectionRef?.ref}
    onMouseOver={() => {
      if (selectedSection !== sectionRef?.section) { setSelectedSection(sectionRef?.section); }
    }}
  >
    <Box p={4}>
      <Typography gutterBottom variant='h4'>
        {localization.t(`labels.${sectionRef?.section || label}`)}
      </Typography>
    </Box>
    <Box display='flex' flexDirection='column' width={contentWidth} px={2} height='100%'>
      {children}
    </Box>
  </Box>
);

ScrollSectionLayout.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  wrapperWidth: PropTypes.string,
  contentWidth: PropTypes.string,
  dataTest: PropTypes.string,
  sectionRef: PropTypes.object,
  setSelectedSection: PropTypes.func,
  selectedSection: PropTypes.string,
};

export default ScrollSectionLayout;
