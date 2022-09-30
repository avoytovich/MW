/* eslint-disable no-lonely-if */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { toast } from 'react-toastify';
import moment from 'moment';
import PricesTable from './PricesTable';
import InheritanceField from '../InheritanceField';
import { SelectCustom, SelectWithDeleteIcon, AutocompleteCustom } from '../../../components/Inputs';
import { getCurrency } from '../../../services/selectOptions/selectOptions';
import { checkValue } from '../../../services/helpers/dataStructuring';
import parentPaths from '../../../services/paths';
import localization from '../../../localization';

import api from '../../../api';

import './prices.scss';

const Prices = ({
  myRef,
  selectOptions,
  productData,
  currentProductData,
  setProductData,
  setPriceTableError,
  parentId,
  priceTableError,
  digitsErrors,
  setDigitsErrors,
  errors,
  setErrors,
}) => {
  const [scheduledPrices, setScheduledPrices] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let prices;
    if (currentProductData.priceByCountryByCurrency.value) {
      if (Object.keys(currentProductData.priceByCountryByCurrency.value).length
        && currentProductData.prices.value.defaultCurrency
        && !Object.keys(currentProductData.priceByCountryByCurrency.value)
          .includes(currentProductData.prices.value.defaultCurrency)) {
        prices = { ...currentProductData.prices, value: { ...currentProductData.prices.value, defaultCurrency: '' } };
      }
    } else {
      if (Object.keys(currentProductData.priceByCountryByCurrency).length
        && currentProductData.prices.defaultCurrency
        && !Object.keys(currentProductData.priceByCountryByCurrency)
          .includes(currentProductData.prices.defaultCurrency)) {
        prices = { ...currentProductData.prices, defaultCurrency: '' };
      }
    }
    if (prices) {
      setProductData({ ...currentProductData, prices });
    }
  }, [currentProductData]);

  useEffect(() => {
    api
      .getPricesByProductId(currentProductData.id)
      .then(({ data }) => setScheduledPrices(data?.items || []));
    return () => setScheduledPrices([]);
  }, []);

  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };
  const defCurrencyOptions = () => {
    const selectedCurrency = !currentProductData.priceByCountryByCurrency.state
      ? Object.keys(currentProductData.priceByCountryByCurrency).map((it) => it)
      : Object.keys(currentProductData.priceByCountryByCurrency.value).map((it) => it);

    return getCurrency().filter((el) => selectedCurrency.includes(el.id)) || [];
  };
  return (
    <>
      <Box px={2} className='product-prices' mb={2} ref={myRef}>
        <TableContainer component={Paper}>
          <InheritanceField
            additionalField='prices'
            field='priceByCountryByCurrency'
            onChange={setProductData}
            additionalValue={currentProductData?.prices}
            value={currentProductData?.priceByCountryByCurrency}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <></>
          </InheritanceField>

          <PricesTable
            digitsErrors={digitsErrors}
            setDigitsErrors={setDigitsErrors}
            priceTableError={priceTableError}
            setPriceTableError={setPriceTableError}
            productData={checkValue(productData?.priceByCountryByCurrency)}
            selectOptions={selectOptions}
            currentProductData={currentProductData}
            setProductData={setProductData}
            priceByCountryByCurrency={checkValue(currentProductData?.priceByCountryByCurrency)}
            errors={errors}
            setErrors={setErrors}
          />
        </TableContainer>
      </Box>
      {((!currentProductData?.priceByCountryByCurrency?.value
        && Object.keys(currentProductData?.priceByCountryByCurrency)?.length > 0)
        || (currentProductData?.priceByCountryByCurrency?.value
          && Object.keys(currentProductData?.priceByCountryByCurrency.value)?.length > 0))
        && (
          <Box width={300} pt={4} px={2}>
            <InheritanceField
              field='defaultCurrency'
              onChange={setProductData}
              value={currentProductData?.prices}
              parentId={parentId}
              currentProductData={currentProductData}
            >
              <SelectCustom
                label='defaultCurrency'
                value={currentProductData?.prices?.defaultCurrency}
                selectOptions={defCurrencyOptions()}
                onChangeSelect={(e) => {
                  setProductData({
                    ...currentProductData,
                    prices: {
                      ...currentProductData.prices,
                      defaultCurrency: e.target.value,
                    },
                  });
                }}
              />
            </InheritanceField>
          </Box>
        )}

      <Box width={300} p={2} pt={4}>
        <InheritanceField
          field='priceFunction'
          onChange={setProductData}
          value={currentProductData.priceFunction}
          selectOptions={selectOptions.priceFunctions || []}
          parentId={parentId}
          currentProductData={currentProductData}
        >
          <AutocompleteCustom
            optionLabelKey='value'
            label="priceFunction"
            onSelect={(newValue) => setProductData({
              ...currentProductData,
              priceFunction: newValue,
            })}
            selectOptions={selectOptions?.priceFunctions || []}
            curValue={checkValue(currentProductData.priceFunction)}
          />
        </InheritanceField>
      </Box>

      {
        scheduledPrices.length > 0 && (
          <>
            <Box mt={3} px={2}>
              <Typography variant='h6'>Date range</Typography>
              <Typography>
                The following table represents values set with the new price service, you can
                click on each ID to navigate and mange them.
              </Typography>
            </Box>

            <Box mt={3} px={2} className='product-prices'>
              <TableContainer component={Paper}>
                <Table aria-label='simple table'>
                  <TableHead>
                    <TableRow style={{ background: '#eee' }}>
                      <TableCell>Price</TableCell>
                      <TableCell align='center'>Marketing Campaign</TableCell>
                      <TableCell align='center'>Starts at</TableCell>
                      <TableCell align='center'>Ends at</TableCell>
                      <TableCell align='center'>Counrty</TableCell>
                      <TableCell align='center'>Currency</TableCell>
                      <TableCell align='center'>Value</TableCell>
                      <TableCell align='center'>MSRP</TableCell>
                      <TableCell align='center'>Upsell price</TableCell>
                      <TableCell align='center'>Cross-sell price</TableCell>
                      <TableCell align='center'>VAT included</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {scheduledPrices.map((price) => (
                      <TableRow
                        key={price.id}
                        className={
                          !price.endDate || moment().isBefore(price.endDate) ? '' : 'outdated'
                        }
                      >
                        <TableCell component='th' scope='row'>
                          <Box className="price">
                            <Typography variant='subtitle1'>
                              <span
                                className="price-value"
                                onClick={() => history.push(`${parentPaths.pricemodels.pricesTab}/${price.id}`)}
                              >
                                {price.id}
                              </span>
                            </Typography>
                            <FileCopyIcon
                              onClick={() => makeCopy(price.id)}
                              color="secondary"
                            />
                          </Box>
                        </TableCell>
                        <TableCell align='center'>-</TableCell>
                        <TableCell align='center'>
                          {price.startDate ? moment(price.startDate).format('ll') : '-'}
                        </TableCell>
                        <TableCell align='center'>
                          {price.endDate ? moment(price.endDate).format('ll') : '-'}
                        </TableCell>
                        <TableCell align='center'>{price.country || 'default'}</TableCell>
                        <TableCell align='center'>{price.currency || '-'}</TableCell>
                        <TableCell align='center'>{price.value || '-'}</TableCell>
                        <TableCell align='center'>{price.msrp || '-'}</TableCell>
                        <TableCell align='center'>{price.upSell || '-'}</TableCell>
                        <TableCell align='center'>{price.crossSell || '-'}</TableCell>
                        <TableCell align='center'>{price.vatIncluded ? 'YES' : 'NO'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )
      }
    </>
  );
};

Prices.propTypes = {
  selectOptions: PropTypes.object,
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  parentId: PropTypes.string,
  productData: PropTypes.object,
  setPriceTableError: PropTypes.func,
  priceTableError: PropTypes.array,
  digitsErrors: PropTypes.object,
  setDigitsErrors: PropTypes.func,
  myRef: PropTypes.object,
  errors: PropTypes.object,
  setErrors: PropTypes.func,
};

export default Prices;
