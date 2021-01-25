import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { NumberInput } from '../Inputs';
import localization from '../../../localization';

const PricesSection = ({ setProductData, currentProductData }) => (
  <>
    <NumberInput
      label="totalPrice"
      value={
        currentProductData?.prices?.priceByCountryByCurrency?.[
          currentProductData?.prices?.defaultCurrency
        ]?.default?.value
      }
      onChangeInput={(e) => {
        const defCur = currentProductData.prices.defaultCurrency;
        setProductData({
          ...currentProductData,
          prices: {
            ...currentProductData.prices,
            priceByCountryByCurrency: {
              ...currentProductData.prices.priceByCountryByCurrency,
              [defCur]: {
                ...currentProductData.prices.priceByCountryByCurrency[defCur],
                default: {
                  ...currentProductData.prices.priceByCountryByCurrency[defCur]
                    .default,
                  value: e.target.value,
                },
              },
            },
          },
        });
      }}
      minMAx={{ min: 0 }}
    />
    <NumberInput
      label="total"
      value={
        currentProductData.prices.priceByCountryByCurrency[
          currentProductData.prices.defaultCurrency
        ].default.value
      }
      onChangeInput={(e) => {
        const defCur = currentProductData.prices.defaultCurrency;
        setProductData({
          ...currentProductData,
          prices: {
            ...currentProductData.prices,
            priceByCountryByCurrency: {
              ...currentProductData.prices.priceByCountryByCurrency,
              [defCur]: {
                ...currentProductData.prices.priceByCountryByCurrency[defCur],
                default: {
                  ...currentProductData.prices.priceByCountryByCurrency[defCur]
                    .default,
                  value: e.target.value,
                },
              },
            },
          },
        });
      }}
      minMAx={{ min: 0 }}
    />
    <Box display="flex" flexDirection="row" my={3} alignItems="baseline">
      <Box width="30%">
        <Typography color="secondary" gutterBottom variant="body2">
          {localization.t('labels.currency')}
        </Typography>
      </Box>
      <Box>
        <Typography color="secondary" gutterBottom variant="body2">
          {Object.keys(
            currentProductData?.prices?.priceByCountryByCurrency,
          ).join(', ')}
        </Typography>
      </Box>
    </Box>
  </>
);

PricesSection.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
};

export default PricesSection;
