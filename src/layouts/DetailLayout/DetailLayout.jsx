import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Box } from '@mui/material';
import { FolderOpen } from '@mui/icons-material';

import ProductDetails from '../../components/ProductDetails';
import StoreDetails from '../../components/StoreDetails';

import './DetailLayout.scss';

const DetailLayout = ({ data }) => (
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

    {data.header === 'Product' && <ProductDetails data={data} />}
    {data.header === 'Store' && <StoreDetails data={data} />}
  </>
);

DetailLayout.propTypes = {
  data: PropTypes.object,
};

export default DetailLayout;
