import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Checkbox,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import { createKey, handleFilterOptions } from '../utils';
import { getCountriesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import { priceCurrency } from '../../../services/selectOptions/selectOptions';

import { SelectWithChip, SelectCustom, NumberInput } from '../../../components/Inputs';
// import './ClearancesInputs.scss';

const PricesTable = ({ currentProductData, setProductData, priceByCountryByCurrency }) => {
  const countryOptions = getCountriesOptions();
  const [variation, setVariation] = useState('');
  const [newCurrency, setNewCurrency] = useState('');
  const handleSetProductData = (newData) => {
    let prices = { ...currentProductData.prices };
    if (variation) {
      if (Object.keys(priceByCountryByCurrency).length
        && currentProductData.prices.value.defaultCurrency
        && !Object.keys(priceByCountryByCurrency)
          .includes(currentProductData.prices.value.defaultCurrency)) {
        prices = { ...currentProductData.prices, value: { ...currentProductData.prices.value, defaultCurrency: '' } };
      }
      setProductData({
        ...currentProductData,
        prices,
        priceByCountryByCurrency: {
          ...currentProductData.priceByCountryByCurrency,
          value: newData,
        },
      });
    } else {
      if (Object.keys(priceByCountryByCurrency).length
        && currentProductData.prices.defaultCurrency
        && !Object.keys(priceByCountryByCurrency)
          .includes(currentProductData.prices.defaultCurrency)) {
        prices = { ...currentProductData.prices, defaultCurrency: '' };
      }
      setProductData({
        ...currentProductData,
        prices,
        priceByCountryByCurrency: newData,
      });
    }
  };
  const handleRemove = (key, index) => {
    const newPrices = { ...priceByCountryByCurrency };
    if (priceByCountryByCurrency[key].length < 2) {
      delete newPrices[key];
    } else {
      newPrices[key].splice(index, 1);
    }
    handleSetProductData(newPrices);
  };
  const handleUpdate = (e, inputName, langName, index) => {
    const newArray = [...priceByCountryByCurrency[langName]];
    newArray[index][inputName] = e.target.value;
    handleSetProductData({ ...priceByCountryByCurrency, [langName]: newArray });
  };
  useEffect(() => {
    if (currentProductData?.priceByCountryByCurrency.state) {
      setVariation(currentProductData?.priceByCountryByCurrency.state);
    }
    return () => setVariation('');
  }, [currentProductData]);
  useEffect(() => {
    if (newCurrency !== '') {
      let newArray = [];
      const newObj = {
        key: createKey(currentProductData, newCurrency),
        countries: priceByCountryByCurrency[newCurrency] ? [] : ['default'],
        value: '1',
        crossSell: '',
        msrp: '',
        upSell: '',
        vatIncluded: false,
      };
      if (priceByCountryByCurrency[newCurrency]) {
        newArray = [...priceByCountryByCurrency[newCurrency], newObj];
      } else {
        newArray = [newObj];
      }
      handleSetProductData({
        ...priceByCountryByCurrency, [newCurrency]: newArray,
      });
    }
    return () => setNewCurrency('');
  }, [newCurrency]);

  return (
    <>
      {Object.keys(priceByCountryByCurrency)?.length > 0
        && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ background: '#eee' }}>
                  <TableCell align='center'>{localization.t('labels.currency')}</TableCell>
                  <TableCell align='center'>{localization.t('labels.country')}</TableCell>
                  <TableCell align='center'>{localization.t('labels.price')}</TableCell>
                  <TableCell align='center'>{localization.t('labels.msrp')}</TableCell>
                  <TableCell align='center'>{localization.t('labels.upsellPrice')}</TableCell>
                  <TableCell align='center'>{localization.t('labels.crossSellPrice')}</TableCell>
                  <TableCell align='center'>{localization.t('labels.vatIncluded')}</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(priceByCountryByCurrency).map((el) => (
                  priceByCountryByCurrency[el].map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <TableRow data-test='tableRow' data-index={index} key={`${el}_${index}`}>
                      {index === 0 && (
                        <TableCell
                          align='center'
                          component="th"
                          rowSpan={priceByCountryByCurrency[el].length}
                          scope="row"
                          id={el}
                        >
                          {el}
                        </TableCell>
                      )}
                      <TableCell className='tableCellWithBorder'>
                        <SelectWithChip
                          isDisabled={variation === 'inherits'}
                          label='country'
                          value={item.countries}
                          noDeletableChipId='default'
                          selectOptions={handleFilterOptions(
                            countryOptions,
                            priceByCountryByCurrency[el],
                            item.countries,
                          ) || []}
                          onChangeSelect={(e) => {
                            const newArray = [...priceByCountryByCurrency[el]];
                            newArray[index].countries = e.target.value;
                            handleSetProductData({
                              ...priceByCountryByCurrency, [el]: newArray,
                            });
                          }}
                          onClickDelIcon={(chip) => {
                            const newArray = [...priceByCountryByCurrency[el]];
                            const newValue = [...newArray[index].countries].filter(
                              (val) => val !== chip,
                            );
                            newArray[index].countries = newValue;
                            handleSetProductData({
                              ...priceByCountryByCurrency, [el]: newArray,
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell width="10%" className='tableCellWithBorder'>
                        <NumberInput
                          isDisabled={variation === 'inherits'}
                          minMAx={{ min: 1 }}
                          label='price'
                          value={item.value}
                          onChangeInput={(e) => handleUpdate(e, 'value', el, index)}
                        />

                      </TableCell>
                      <TableCell width="10%" className='tableCellWithBorder'>
                        <NumberInput
                          isDisabled={variation === 'inherits'}
                          label='msrp'
                          minMAx={{ min: 1 }}
                          value={item.msrp || ''}
                          onChangeInput={(e) => handleUpdate(e, 'msrp', el, index)}
                        />
                      </TableCell>
                      <TableCell width="10%" className='tableCellWithBorder'>
                        <NumberInput
                          isDisabled={variation === 'inherits'}
                          label='upsellPrice'
                          minMAx={{ min: 1 }}
                          value={item.upSell || ''}
                          onChangeInput={(e) => handleUpdate(e, 'upSell', el, index)}
                        />
                      </TableCell>
                      <TableCell width="10%" className='tableCellWithBorder'>
                        <NumberInput
                          isDisabled={variation === 'inherits'}

                          minMAx={{ min: 1 }}
                          label='crossSellPrice'
                          value={item.crossSell || ''}
                          onChangeInput={(e) => handleUpdate(e, 'crossSell', el, index)}
                        />
                      </TableCell>
                      <TableCell width="5%" className='tableCellWithBorder' align='center'>
                        <Checkbox
                          disabled={variation === 'inherits'}
                          checked={item.vatIncluded}
                          onChange={(e) => {
                            const newArray = [...priceByCountryByCurrency[el]];
                            newArray[index].vatIncluded = e.target.checked;
                            handleSetProductData({
                              ...priceByCountryByCurrency, [el]: newArray,
                            });
                          }}
                          name='vatIncluded'
                          color='primary'
                        />
                      </TableCell>
                      <TableCell width="5%" align="right">
                        {((priceByCountryByCurrency?.[el].length > 1
                          && !priceByCountryByCurrency?.[el][index]?.countries?.includes('default'))
                          || priceByCountryByCurrency?.[el].length === 1)
                          && (
                            <Box>
                              <IconButton
                                disabled={variation === 'inherits'}

                                color='secondary'
                                onClick={() => handleRemove(el, index)}
                                size='large'
                              >
                                <ClearIcon />
                              </IconButton>
                            </Box>
                          )}
                      </TableCell>
                    </TableRow>
                  ))
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      <Box py={3} width='25%'>
        <SelectCustom
          isDisabled={variation === 'inherits'}
          label='currency'
          value={newCurrency}
          selectOptions={priceCurrency}
          onChangeSelect={(e) => setNewCurrency(e.target.value)}
        />
      </Box>
    </>
  );
};

PricesTable.propTypes = {
  currentProductData: PropTypes.object,
  setProductData: PropTypes.func,
  priceByCountryByCurrency: PropTypes.object,
};

export default PricesTable;
