import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from '@material-ui/core';

import SectionLayout from '../../../components/SectionLayout';

const defaultLocale = 'en-US';

const SubProductVariations = ({
  setProductData,
  setProductDetails,
  currentProductData,
  productVariations: {
    variations,
    bundledProducts: [],
  },
  productDetails,
}) => {
  console.log('VARIATIONS', variations);
  console.log('CURRENT_DATA', currentProductData);
  return (
    <Box display="flex">
      <SectionLayout label="bundledProducts" contentWidth="100%"></SectionLayout>
      <SectionLayout label="variationParameters" width="100%">
        <Box display="flex" flexDirection="column">
          {variations?.availableVariables?.map(
            ({ field, fieldValue, localizedValue, value }) => {
              return (
                <Box display="flex" alignItems="center" key={field}>
                  <Typography>{field}</Typography>
                  <RadioGroup
                    aria-label="type"
                    name="type"
                    value={fieldValue}
                    onChange={(e) => {
                      setProductData({
                        ...currentProductData,
                        [field]: e.target.value,
                      });
                      console.log('E', e.target.value);
                    }}
                  >
                    <Box display="flex">
                      {value.map((item) => {
                        return (
                          <FormControlLabel
                            key={item}
                            className="radio"
                            value={item}
                            control={<Radio color="primary" />}
                            label={`${item} ${localizedValue[item][defaultLocale]}`}
                          />
                        );
                      })}
                    </Box>
                  </RadioGroup>
                </Box>
              );
            },
          )}
        </Box>
      </SectionLayout>
    </Box>
  );
};

SubProductVariations.propTypes = {
  setProductData: PropTypes.func,
  setProductDetails: PropTypes.func,
  currentProductData: PropTypes.object,
  productVariations: PropTypes.shape({
    bundledProducts: PropTypes.array,
    variations: PropTypes.object,
  }),
  productDetails: PropTypes.object,
};

export default SubProductVariations;
