import React from 'react';
import { useHistory } from 'react-router';

import PropTypes from 'prop-types';

import {
  Typography,
  Box,
} from '@material-ui/core';

const CustomBreadcrumbs = ({ section, url, id }) => {
  const history = useHistory();

  return (
    <Box display='flex' flexDirection='row' pb={2}>
      <Typography
        component='div'
        color='primary'
        onClick={() => url && history.push(url)}
        style={{ cursor: 'pointer' }}
      >
        <Box fontWeight={500}>{`${section} /`}</Box>
      </Typography>

      <Typography component='div' color='secondary'>
        <Box fontWeight={500}>&nbsp;{id}</Box>
      </Typography>
    </Box>
  );
};

CustomBreadcrumbs.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.string,
};

export default CustomBreadcrumbs;
