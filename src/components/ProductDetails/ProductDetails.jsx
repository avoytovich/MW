import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import Prices from './Prices';
import ImagesBlock from './ImagesBlock';
import MainInfo from './MainInfo';

import './ProductDetails.scss';

const ProductDetails = ({
  setProductData,
  productData,
  currentProductData,
  selectOptions,
  setInputErrors,
  inputErrors,
}) => (
  <Box className="detailContainer" display="flex" flexDirection="column">
    <Box>
      <Box display="flex" justify="space-between">
        <Box width="60%" sm={9} className="actionBlockWrapper">
          <MainInfo
            inputErrors={inputErrors}
            setInputErrors={setInputErrors}
            productData={productData}
            selectOptions={selectOptions}
            setProductData={setProductData}
            currentProductData={currentProductData}
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
          <Prices
            productData={productData}
            setProductData={setProductData}
            currentProductData={currentProductData}
          />
        </Box>
      </Box>
    </Box>
    <Box>
      {currentProductData?.resources && (
        <ImagesBlock
          productData={productData}
          currentProductData={currentProductData}
          setProductData={setProductData}
        />
      )}
    </Box>
  </Box>
);

ProductDetails.propTypes = {
  setProductData: PropTypes.func,
  productData: PropTypes.object,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
  inputErrors: PropTypes.object,
  setInputErrors: PropTypes.func,
};

export default ProductDetails;
