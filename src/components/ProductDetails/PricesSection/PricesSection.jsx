import React from 'react';
import PropTypes from 'prop-types';
import { NumberInput } from '../Inputs';

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
  </>
);

PricesSection.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
};

export default PricesSection;
