import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
} from '@material-ui/core';
import { getSectionHeader } from '../../services/helpers/sectionHeaders';

const SectionHeader = ({ pathname }) => (
  <Box>
    <Typography variant="h3">{getSectionHeader(pathname)}</Typography>
  </Box>
);

SectionHeader.propTypes = {
  pathname: PropTypes.string,
};

export default SectionHeader;
