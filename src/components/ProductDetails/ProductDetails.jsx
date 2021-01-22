import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import MainSection from './MainSection';
import SectionLayout from './SectionLayout';
import ImagesBlock from './ImagesBlock';
import FulfillmentSubscriptionSection from './FulfillmentSubscriptionSection';
import GeneralSection from './GeneralSection';
import PricesSection from './PricesSection';

const ProductDetails = ({
  setProductData,
  productData,
  currentProductData,
  selectOptions,
  setInputErrors,
  inputErrors,
}) => (
  <Box display="flex" flexDirection="column">
    <Box display="flex" flexDirection="row">
      <Box width="30%">
        <MainSection
          setProductData={setProductData}
          currentProductData={currentProductData}
        />
        <SectionLayout label="prices">
          <PricesSection
            setProductData={setProductData}
            currentProductData={currentProductData}
          />
        </SectionLayout>
      </Box>
      <Box className="payment" width="60%">
        <SectionLayout label="general">
          <GeneralSection
            inputErrors={inputErrors}
            setInputErrors={setInputErrors}
            productData={productData}
            selectOptions={selectOptions}
            setProductData={setProductData}
            currentProductData={currentProductData}
          />
        </SectionLayout>
        <SectionLayout label="fulfillmentAndSubscription">
          <FulfillmentSubscriptionSection
            selectOptions={selectOptions}
            setProductData={setProductData}
            currentProductData={currentProductData}
          />
        </SectionLayout>
      </Box>
    </Box>

    {currentProductData?.resources && (
      <ImagesBlock
        productData={productData}
        currentProductData={currentProductData}
        setProductData={setProductData}
      />
    )}
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
