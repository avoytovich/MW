import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import Prices from './Prices';
import ImagesBlock from './ImagesBlock';
import MainInfo from './MainInfo';
import './ProductDetails.scss';

const ProductDetails = ({
  setProductData,
  setStoreData,
  productData,
  storeData,
}) => (
  <Box className="detailContainer" display="flex" flexDirection="column">
    <Box>
      <Box display="flex" justify="space-between">
        <Box width="60%" sm={9} className="actionBlockWrapper">
          <MainInfo
            setStoreData={setStoreData}
            setProductData={setProductData}
            productData={productData}
            storeData={storeData}
          />
        </Box>
        <Box
          className="paymentBlock"
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="space-around"
          alignSelf="flex-end"
          pl="10%"
          pb="10%"
        >
          <Prices setProductData={setProductData} productData={productData} />
        </Box>
      </Box>
    </Box>
    <Box>
      {productData?.resources && (
        <ImagesBlock
          productData={productData}
          setProductData={setProductData}
        />
      )}
    </Box>
  </Box>
);

ProductDetails.propTypes = {
  setProductData: PropTypes.func,
  productData: PropTypes.object,
  storeData: PropTypes.object,
  setStoreData: PropTypes.func,
};

export default ProductDetails;
