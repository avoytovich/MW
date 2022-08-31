import React, { useState, useEffect, useRef } from 'react';
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
  FormHelperText,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import { createKey, handleFilterOptions, validateNumberInput } from '../utils';
import { getCountriesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import { getCurrency } from '../../../services/selectOptions/selectOptions';

import { SelectWithChip, SelectCustom, NumberInput } from '../../../components/Inputs';
// import './ClearancesInputs.scss';

const PricesTable = ({
  currentProductData,
  setProductData,
  priceByCountryByCurrency,
  productData,
  setPriceTableError,
  priceTableError,
  digitsErrors,
  setDigitsErrors,
  errors,
  setErrors,
}) => {
  const currencyOptions = getCurrency();
  const countryOptions = getCountriesOptions();
  const [variation, setVariation] = useState('');
  const [newCurrency, setNewCurrency] = useState('');
  const [upd, setUpd] = useState(0);
  const [lastAddedKey, setLastAddedKey] = useState('');
  const priceTableRef = useRef({});

  const checkIfAllChecked = (data) => {
    const allItems = [];
    Object.keys(data).forEach((it) => { allItems.push(...data[it]); });
    const allCheckedItems = allItems.filter((el) => el.vatIncluded);
    return allCheckedItems.length === allItems.length;
  };

  const [checkAll, setCheckAll] = useState(checkIfAllChecked(priceByCountryByCurrency));
  const handleSetProductData = (newData) => {
    Object.keys(newData).forEach((countryKey) => {
      const defaultCountry = newData[countryKey].find((it) => it.countries.includes('default'));
      if (!defaultCountry && !priceTableError.includes(countryKey)) {
        setPriceTableError((er) => [...er, countryKey]);
      } else if (defaultCountry && priceTableError.includes(countryKey)) {
        const newErr = priceTableError.filter((i) => i !== countryKey);
        setPriceTableError(newErr);
      }
    });

    setCheckAll(checkIfAllChecked(newData));

    let prices = { ...currentProductData.prices };

    if (variation) {
      if (!Object.keys(newData).length || (Object.keys(priceByCountryByCurrency).length
        && currentProductData.prices.value.defaultCurrency
        && !Object.keys(priceByCountryByCurrency)
          .includes(currentProductData.prices.value.defaultCurrency))) {
        prices = { ...currentProductData.prices, value: { ...currentProductData.prices.value, defaultCurrency: '' } };
      }

      if (!currentProductData?.prices.value.defaultCurrency
        && Object.keys(prices.value.priceByCountryByCurrency).indexOf(Object.keys(newData)[0]) < 0
        && Object.keys(newData)?.length === 1) {
        [prices.value.defaultCurrency] = Object.keys(newData);
      }

      setProductData({
        ...currentProductData,
        prices: {
          ...prices,
          value: {
            ...prices.value,
            priceByCountryByCurrency: newData,
          },
        },
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

      if (!Object.keys(newData).length) {
        prices.defaultCurrency = '';
      }

      if (!currentProductData?.prices.defaultCurrency
        && Object.keys(prices.priceByCountryByCurrency).indexOf(Object.keys(newData)[0]) < 0
        && Object.keys(newData)?.length === 1) {
        [prices.defaultCurrency] = Object.keys(newData);
      }

      setProductData({
        ...currentProductData,
        prices: {
          ...prices,
          priceByCountryByCurrency: newData,
        },
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
  const handleRemove = (key, index, itemKey) => {
    if (priceTableError.includes(itemKey)) {
      const newErrors = priceTableError.filter(
        (element) => element !== itemKey,
      );
      setPriceTableError(newErrors);
    }
    if (digitsErrors[itemKey]) {
      const errorsObj = { ...digitsErrors };
      delete errorsObj[itemKey];
      setDigitsErrors(errorsObj);
    }
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
    newArray[index][inputName] = e.target.value !== '' ? Number(e.target.value) : e.target.value;
    handleSetProductData({ ...priceByCountryByCurrency, [langName]: newArray });
  };

  const withValidation = (target) => {
    if (!target.value) {
      setErrors({
        ...errors,
        prices: {
          ...errors?.prices,
          [target.name]: true,
        },
      });
    } else {
      setErrors({
        ...errors,
        prices: {
          ...errors?.prices,
          [target.name]: false,
        },
      });
    }
  };

  const withValidationSelectCustom = (target, options = {}) => {
    withValidation(target);
    setNewCurrency(target.value);
  };

  const withValidationInputCustom = (e, el, item, index) => {
    if (e.target.name === 'price') {
      withValidation(e.target);
      const currentDigits = currencyOptions.filter(
        (option) => option.id === el,
      )?.[0].digits;
      if (!e.target.value || e.target.value === '0' || (e.target.value.includes('.') && e.target.value.split('.')?.[1]?.length > currentDigits)) {
        if (!priceTableError.includes(item.key)) {
          setPriceTableError((er) => [...er, item.key]);
        }
      } else if (priceTableError.includes(item.key)) {
        const newErrors = priceTableError.filter(
          (element) => element !== item.key,
        );
        setPriceTableError(newErrors);
      }

      if (e.target.value.includes('.') && e.target.value.split('.')?.[1]?.length > currentDigits) {
        const newError = {
          value: e.target.value, digits: currentDigits, currency: el,
        };
        setDigitsErrors((er) => ({ ...er, [item.key]: newError }));
      } else if (digitsErrors[item.key]) {
        const errorsObj = { ...digitsErrors };
        delete errorsObj[item.key];
        setDigitsErrors(errorsObj);
      }
      handleUpdate(e, 'value', el, index);
    }
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
      const key = createKey(currentProductData, newCurrency);
      const newObj = {
        key,
        countries: priceByCountryByCurrency[newCurrency] ? [] : ['default'],
        value: '',
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
      setPriceTableError((er) => [...er, key]);
      setLastAddedKey(key);
      handleSetProductData({
        ...priceByCountryByCurrency, [newCurrency]: newArray,
      });
      setUpd((u) => u + 1);
    }

    return () => setNewCurrency('');
  }, [newCurrency]);
  useEffect(() => {
    priceTableRef.current[lastAddedKey]?.focus();
  }, [upd]);

  return (
    <>
      <Box width='25%' pb={3}>
        <SelectCustom
          name='currency'
          isDisabled={variation === 'inherits'}
          label='currency'
          value={newCurrency}
          selectOptions={currencyOptions}
          onChangeSelect={(e) => withValidationSelectCustom(e.target)}
          hasError={!!errors?.prices?.currency}
          helperText={errors?.prices?.currency && localization.t('errorNotifications.required')}
        />
      </Box>
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
                          style={priceTableError.includes(el) ? {
                            color: '#ff6341',
                          } : {}}
                        >
                          {el}
                          {priceTableError.includes(el) && (
                            <Box style={{
                              fontSize: '12px',
                              fontStyle: 'italic',
                              textAlign: 'center',

                            }}
                            >
                              {localization.t('errorNotifications.defaultPriceIsRequired')}

                            </Box>
                          )}
                        </TableCell>
                      )}
                      <TableCell className='tableCellWithBorder'>
                        <SelectWithChip
                          isDisabled={variation === 'inherits'}
                          label='country'
                          value={item.countries}
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
                            if (chip === 'default') {
                              setPriceTableError([...priceTableError, el]);
                            }
                            handleSetProductData({
                              ...priceByCountryByCurrency, [el]: newArray,
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell width="10%" className='tableCellWithBorder'>
                        <NumberInput
                          name='price'
                          isRequired
                          hasError={!item.value || priceTableError.includes(item.key)}
                          inputRefFunc={(element) => {
                            if (!item.value) {
                              priceTableRef.current[item.key] = element;
                            } else {
                              delete priceTableRef.current[item.key];
                            }
                          }}

                          hasChanges={validateNumberInput(
                            item.value, productData?.[el]?.[index]?.value,
                          )}
                          isDisabled={variation === 'inherits'}
                          minMAx={{ min: 0 }}
                          label='price'
                          value={item.value}
                          onChangeInput={(e) => withValidationInputCustom(e, el, item, index)}
                        />
                      </TableCell>
                      <TableCell width="10%" className='tableCellWithBorder'>
                        <NumberInput
                          hasChanges={validateNumberInput(
                            item.msrp, productData?.[el]?.[index]?.msrp,
                          )}
                          isDisabled={variation === 'inherits'}
                          label='msrp'
                          minMAx={{ min: 0 }}
                          value={item.msrp}
                          onChangeInput={(e) => handleUpdate(e, 'msrp', el, index)}
                        />
                      </TableCell>
                      <TableCell width="10%" className='tableCellWithBorder'>
                        <NumberInput
                          hasChanges={validateNumberInput(
                            item.upSell, productData?.[el]?.[index]?.upSell,
                          )}
                          isDisabled={variation === 'inherits'}
                          label='upsellPrice'
                          minMAx={{ min: 0 }}
                          value={item.upSell}
                          onChangeInput={(e) => handleUpdate(e, 'upSell', el, index)}
                        />
                      </TableCell>
                      <TableCell width="10%" className='tableCellWithBorder'>
                        <NumberInput
                          hasChanges={validateNumberInput(
                            item.crossSell, productData?.[el]?.[index]?.crossSell,
                          )}
                          isDisabled={variation === 'inherits'}
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
                        <Box>
                          <IconButton
                            disabled={variation === 'inherits'}
                            color='secondary'
                            onClick={() => handleRemove(el, index, item.key)}
                            size='large'
                          >
                            <ClearIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      {Object.keys(digitsErrors).length > 0 && (
        <Box p={2}>
          {Object.keys(digitsErrors).map((error) => <FormHelperText error>{`Price ${digitsErrors[error].value} for currency ${digitsErrors[error].currency} do not respect the number of decimal digits for this currency (${digitsErrors[error].digits} decimal digits)`}</FormHelperText>)}
        </Box>
      )}
    </>
  );
};

PricesTable.propTypes = {
  currentProductData: PropTypes.object,
  setProductData: PropTypes.func,
  priceByCountryByCurrency: PropTypes.object,
  productData: PropTypes.object,
  setPriceTableError: PropTypes.func,
  priceTableError: PropTypes.array,
  digitsErrors: PropTypes.object,
  setDigitsErrors: PropTypes.func,
  errors: PropTypes.object,
  setErrors: PropTypes.func,
};

export default PricesTable;
