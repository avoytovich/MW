import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Box, Zoom, TextField, Typography,
} from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

import localization from '../../../localization';

import './Prices.scss';

const Prices = ({ setProductData, currentProductData, productData }) => {
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);

  const handleDeleteBlock = () => {
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
              value: 0,
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    setEditable(false);
  }, [productData]);

  return (
    <Box
      onMouseOver={() => setHoverBlock(true)}
      onMouseLeave={() => setHoverBlock(false)}
      className="paymentItem actionBlockWrapper"
      alignSelf="center"
    >
      <Zoom in={hoverBlock && !editable}>
        <Box className="actionBlock">
          <EditIcon
            data-test="editIcon"
            color="primary"
            className="editIcon icons"
            onClick={() => setEditable(true)}
          />
        </Box>
      </Zoom>
      <Zoom in={editable}>
        <Box className="actionBlock">
          <DeleteIcon
            color="primary"
            onClick={handleDeleteBlock}
            className="deleteIcon icons"
          />
        </Box>
      </Zoom>
      <Box my={2} display="flex" flexDirection="column" flexWrap="wrap">
        <Box p={3}>
          <Box
            width="100%"
            flexWrap="nowrap"
            display="flex"
            flexDirection="row"
          >
            <Box width="40%" pr={4} pt="7px" pl="4px">
              <Typography color="secondary" variant="body2">
                {localization.t('labels.totalPrice')}
              </Typography>
            </Box>
            <Box width="60%">
              <TextField
                name="totalPrice"
                InputProps={{
                  inputProps: { min: 0 },
                  disableUnderline: true,
                  form: { autocomplete: 'off' },
                }}
                disabled={!editable}
                fullWidth
                onChange={(e) => {
                  const defCur = currentProductData.prices.defaultCurrency;
                  setProductData({
                    ...currentProductData,
                    prices: {
                      ...currentProductData.prices,
                      priceByCountryByCurrency: {
                        ...currentProductData.prices.priceByCountryByCurrency,
                        [defCur]: {
                          ...currentProductData.prices.priceByCountryByCurrency[
                            defCur
                          ],
                          default: {
                            ...currentProductData.prices
                              .priceByCountryByCurrency[defCur].default,
                            value: e.target.value,
                          },
                        },
                      },
                    },
                  });
                }}
                type="number"
                value={
                  currentProductData?.prices?.priceByCountryByCurrency?.[
                    currentProductData?.prices?.defaultCurrency
                  ]?.default?.value
                }
              />
            </Box>
          </Box>
          <Box
            width="100%"
            flexWrap="nowrap"
            display="flex"
            flexDirection="row"
          >
            <Box width="40%" pr={4} pt="7px" pl="4px">
              <Typography color="secondary" variant="body2">
                {localization.t('labels.total')}
              </Typography>
            </Box>
            <Box width="60%">
              <TextField
                name="total"
                InputProps={{
                  inputProps: { min: 0 },
                  disableUnderline: true,
                  form: { autocomplete: 'off' },
                }}
                disabled={!editable}
                fullWidth
                onChange={(e) => {
                  const defCur = currentProductData.prices.defaultCurrency;
                  setProductData({
                    ...currentProductData,
                    prices: {
                      ...currentProductData.prices,
                      priceByCountryByCurrency: {
                        ...currentProductData.prices.priceByCountryByCurrency,
                        [defCur]: {
                          ...currentProductData.prices.priceByCountryByCurrency[
                            defCur
                          ],
                          default: {
                            ...currentProductData.prices
                              .priceByCountryByCurrency[defCur].default,
                            value: e.target.value,
                          },
                        },
                      },
                    },
                  });
                }}
                type="number"
                value={
                  currentProductData.prices.priceByCountryByCurrency[
                    currentProductData.prices.defaultCurrency
                  ].default.value
                }
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Prices.propTypes = {
  currentProductData: PropTypes.object,
  setProductData: PropTypes.func,
  productData: PropTypes.object,
};

export default Prices;
