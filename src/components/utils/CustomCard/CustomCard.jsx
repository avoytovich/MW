import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  Divider,
} from '@material-ui/core';

const CustomCard = ({ title, children, ...other }) => (
  <Box
    my={3}
    bgcolor='#fff'
    boxShadow={2}
    height={1}
    p={3}
    {...other}
  >
    <Typography gutterBottom variant='h4'>{title}</Typography>

    <Divider light />

    {children}
  </Box>
);

CustomCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default CustomCard;
