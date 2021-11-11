import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  Divider,
} from '@material-ui/core';

const CustomCard = ({
  title, children, noDivider, extraActions, ...other
}) => (
  <Box
    my={3}
    bgcolor='#fff'
    boxShadow={2}
    height={1}
    p={3}
    {...other}
  >
    <Box display='flex' justifyContent='space-between'>
      <Typography variant='h4'>{title}</Typography>
      {extraActions}
    </Box>

    {title && !noDivider && <Box mt={3}><Divider light /></Box>}

    {children}
  </Box>
);

CustomCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  noDivider: PropTypes.bool,
  extraActions: PropTypes.any,
};

export default CustomCard;
