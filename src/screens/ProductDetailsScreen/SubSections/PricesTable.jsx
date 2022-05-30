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

const PricesTable = ({
  currentProductData, setProductData, priceByCountryByCurrency, productData,
}) => {
  const countryOptions = getCountriesOptions();
  const [variation, setVariation] = useState('');
  const [newCurrency, setNewCurrency] = useState('');

  const checkIfAllChecked = (data) => {
    const allItems = [];
    Object.keys(data).forEach((it) => { allItems.push(...data[it]); });
    const allCheckedItems = allItems.filter((el) => el.vatIncluded);
    return allCheckedItems.length === allItems.length;
  };

  const [checkAll, setCheckAll] = useState(checkIfAllChecked(priceByCountryByCurrency));
  const handleSetProductData = (newData) => {
    setCheckAll(checkIfAllChecked(newData));
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

  const handleCheckAll = (e) => {
    const newData = { ...priceByCountryByCurrency };
    Object.keys(newData).forEach((it) => {
      const newArray = newData[it].map((el) => ({ ...el, vatIncluded: e.target.checked }));
      newData[it] = newArray;
    });
    setCheckAll(e.target.checked);
    handleSetProductData(newData);
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
    newArray[index][inputName] = e.target.value !== '' ? Number(e.target.value) : '';
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
                  <TableCell align='center'><Box pb='42px'>{localization.t('labels.currency')}</Box></TableCell>
                  <TableCell align='center'><Box pb='42px'>{localization.t('labels.country')}</Box></TableCell>
                  <TableCell align='center'><Box pb='42px'>{localization.t('labels.price')}</Box></TableCell>
                  <TableCell align='center'><Box pb='42px'>{localization.t('labels.msrp')}</Box></TableCell>
                  <TableCell align='center'>
                    <Box pb='42px'>{localization.t('labels.upsellPrice')}</Box>
                  </TableCell>
                  <TableCell align='center'>
                    <Box pb='42px'>
                      {localization.t('labels.crossSellPrice')}
                    </Box>
                  </TableCell>
                  <TableCell align='center'>
                    <Box display='flex' flexDirection='column'>
                      {localization.t('labels.vatIncluded')}
                      <Checkbox
                        disabled={variation === 'inherits'}
                        checked={checkAll}
                        onChange={handleCheckAll}
                        name='vatIncluded'
                        color='primary'
                      />
                    </Box>
                  </TableCell>
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
                          hasBeenChanged={item.value !== productData?.[el]?.[index]?.value}
                          isDisabled={variation === 'inherits'}
                          minMAx={{ min: 0 }}
                          label='price'
                          value={item.value}
                          onChangeInput={(e) => handleUpdate(e, 'value', el, index)}
                        />

                      </TableCell>
                      <TableCell width="10%" className='tableCellWithBorder'>
                        <NumberInput
                          hasBeenChanged={item.msrp !== productData?.[el]?.[index]?.msrp}
                          isDisabled={variation === 'inherits'}
                          label='msrp'
                          minMAx={{ min: 0 }}
                          value={item.msrp}
                          onChangeInput={(e) => handleUpdate(e, 'msrp', el, index)}
                        />
                      </TableCell>
                      <TableCell width="10%" className='tableCellWithBorder'>
                        <NumberInput
                          hasBeenChanged={item.upSell !== productData?.[el]?.[index]?.upSell}
                          isDisabled={variation === 'inherits'}
                          label='upsellPrice'
                          minMAx={{ min: 0 }}
                          value={item.upSell}
                          onChangeInput={(e) => handleUpdate(e, 'upSell', el, index)}
                        />
                      </TableCell>
                      <TableCell width="10%" className='tableCellWithBorder'>
                        <NumberInput
                          isDisabled={variation === 'inherits'}
                          hasBeenChanged={item.crossSell !== productData?.[el]?.[index]?.crossSell}
                          minMAx={{ min: 0 }}
                          label='crossSellPrice'
                          value={item.crossSell}
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
      <Box width='25%' p={3}>
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
  productData: PropTypes.object,
};

export default PricesTable;
