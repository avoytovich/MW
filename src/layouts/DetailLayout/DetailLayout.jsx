import React, { useState } from 'react';
import { Grid, Typography, Box, Zoom, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { FolderOpen } from '@material-ui/icons';
import './DetailLayout.scss';
import StoreDetails from '../../components/StoreDetails';

const DetailLayout = ({ data }) => {
  const [hasChanges, setHasChanges] = useState(false);

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box>
          <FolderOpen color="secondary" />
        </Box>
        <Box>
          <Typography component="div" color="primary">
            <Box fontWeight={500}>{data.header}</Box>
          </Typography>
        </Box>
      </Box>
      <StoreDetails data={data} />
    </>
  );
};
DetailLayout.propTypes = {
  data: PropTypes.object,
};

export default DetailLayout;
