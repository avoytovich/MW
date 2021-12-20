import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Checkbox,
} from '@mui/material';

import moment from 'moment';

import ClearIcon from '@mui/icons-material/Clear';

import PriceNumberFormat from '../../../components/PriceNumberFormat';

import ProductPriceRow from '../ProductPriceRow';

import InheritanceField from '../InheritanceField';
import { SelectCustom, SelectWithDeleteIcon } from '../../../components/Inputs';

import { priceCurrency } from '../../../services/selectOptions/selectOptions';
import { checkValue } from '../../../services/helpers/dataStructuring';

import api from '../../../api';

const Prices = ({
  selectOptions,
  currentProductData,
  setProductData,
  setSaveDisabled,
  parentId,
}) => {
  const [prices, setPrices] = useState([]);
  const [scheduledPrices, setScheduledPrices] = useState([]);
  const [needDefault, setNeedDefault] = useState(null);

  const priceByCountryByCurrency = checkValue(
    currentProductData?.prices,
    currentProductData?.prices?.state,
  )?.priceByCountryByCurrency;

  const pricesList = Object.keys(priceByCountryByCurrency || {});

  useEffect(() => {
    const pricesData = priceByCountryByCurrency;

    if (pricesData) {
      const pricesArr = [];

      Object.entries(pricesData).forEach(([key, val]) => {
        // eslint-disable-next-line
        Object.entries(val).map(([k, v]) => {
          pricesArr.push({
            currency: key,
            country: k,
            price: `${v.value}`,
            vatIncluded: v.vatIncluded,
          });
        });
      });

      const needsDefault = pricesList.filter((it) => !priceByCountryByCurrency[it].default);

      if (needsDefault.length) {
        setSaveDisabled(true);
      } else {
        setSaveDisabled(false);
      }

      setNeedDefault(needsDefault.length ? needsDefault : false);
      setPrices([...pricesArr]);
    }
  }, [currentProductData.prices]);

  useEffect(() => {
    api
      .getPricesByProductId(parentId || currentProductData.id)
      .then(({ data }) => setScheduledPrices(data?.items || []));

    return () => setScheduledPrices([]);
  }, []);

  const deleteRow = (item) => {
    const pricesData = { ...priceByCountryByCurrency };

    if (Object.keys(pricesData[item.currency]).length > 1) {
      delete pricesData[item.currency][item.country];
    } else {
      delete pricesData[item.currency];
    }

    setProductData((c) => ({
      ...c,
      prices: c.prices?.state
        ? {
          ...c.prices,
          value: {
            ...c.prices.value,
            priceByCountryByCurrency: pricesData,
          },
          defaultCurrency:
            c?.prices?.defaultCurrency === item.currency ? null : c.prices.defaultCurrency,
        }
        : {
          ...c.prices,
          priceByCountryByCurrency: pricesData,
          defaultCurrency:
            c?.prices?.defaultCurrency === item.currency ? null : c.prices.defaultCurrency,
        },
    }));
  };

  return (
    <>
      <Box px={2} className='product-prices'>
        <Box width={245} mb={4}>
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
              selectOptions={[...priceCurrency.filter((pr) => pricesList.includes(pr.id))]}
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

        <TableContainer component={Paper}>
          <InheritanceField
            field='prices'
            onChange={setProductData}
            value={currentProductData?.prices}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <></>
          </InheritanceField>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow style={{ background: '#eee' }}>
                <TableCell align='center'>Country</TableCell>
                <TableCell align='center'>Currency</TableCell>
                <TableCell align='center'>Price</TableCell>
                <TableCell align='center'>MSRP</TableCell>
                <TableCell align='center'>Upsell price</TableCell>
                <TableCell align='center'>Cross-sell price</TableCell>
                <TableCell align='center'>VAT included</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {prices.map((pr) => (
                <TableRow key={pr.currency + pr.country}>
                  <TableCell align='center'>{pr.country || '-'}</TableCell>
                  <TableCell align='center'>{pr.currency || '-'}</TableCell>
                  <TableCell align='center'>
                    {<PriceNumberFormat number={pr.price} currency={pr.currency} /> || '-'}
                  </TableCell>
                  <TableCell align='center'>{pr.msrp || '-'}</TableCell>
                  <TableCell align='center'>{pr.upSell || '-'}</TableCell>
                  <TableCell align='center'>{pr.crossSell || '-'}</TableCell>
                  <TableCell align='center' style={{ minWidth: '120px', padding: 0 }}>
                    <Checkbox
                      disabled
                      checked={pr.vatIncluded}
                      name='checkedB'
                      color='primary'
                    />
                  </TableCell>
                  <TableCell align='center' className='transparent-cell'>
                    <Button
                      disabled={currentProductData?.prices?.state === 'inherits'}
                      onClick={() => deleteRow(pr)}
                    >
                      <ClearIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {currentProductData?.prices?.state !== 'inherits' && (
                <ProductPriceRow
                  setProductData={setProductData}
                  currentProductData={currentProductData}
                  parentId={parentId}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {needDefault && needDefault.length > 0 && (
        <Box p={2}>
          <Typography variant='h5' style={{ color: '#fd8e8d', fontStyle: 'italic' }}>
            {`You have to provide a default value for ${needDefault.join(', ')}`}
          </Typography>
        </Box>
      )}

      {scheduledPrices.length > 0 && (
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
                        {price.id}
                      </TableCell>
                      <TableCell align='center'>-</TableCell>
                      <TableCell align='center'>
                        {price.startDate ? moment(price.startDate).format('ll') : '-'}
                      </TableCell>
                      <TableCell align='center'>
                        {price.endDate ? moment(price.endDate).format('ll') : '-'}
                      </TableCell>
                      <TableCell align='center'>{price.country || 'default'}</TableCell>
                      <TableCell align='center'>{price.currency}</TableCell>
                      <TableCell align='center'>{price.value}</TableCell>
                      <TableCell align='center'>-</TableCell>
                      <TableCell align='center'>-</TableCell>
                      <TableCell align='center'>-</TableCell>
                      <TableCell align='center'>{price.vatIncluded ? 'YES' : 'NO'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box p={2} mt={2} width='50%'>
            <InheritanceField
              field='priceFunction'
              onChange={setProductData}
              value={currentProductData.priceFunction}
              selectOptions={selectOptions.priceFunctions || []}
              parentId={parentId}
              currentProductData={currentProductData}
            >
              <SelectWithDeleteIcon
                label='priceFunction'
                value={currentProductData.priceFunction}
                selectOptions={selectOptions.priceFunctions || []}
                onChangeSelect={(e) => {
                  setProductData({
                    ...currentProductData,
                    priceFunction: e.target.value,
                  });
                }}
                onClickDelIcon={() => {
                  setProductData({
                    ...currentProductData,
                    priceFunction: '',
                  });
                }}
              />
            </InheritanceField>
          </Box>
        </>
      )}
    </>
  );
};
Prices.propTypes = {
  selectOptions: PropTypes.object,
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  parentId: PropTypes.string,
  setSaveDisabled: PropTypes.func,
};

export default Prices;
