import React, { useState } from 'react';
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
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import ProductPriceRow from '../../../components/ProductDetails/ProductPriceRow';

import {
  SelectCustom,
} from '../../../components/Inputs';

import {
  defaultCurrency,
} from '../../../services/selectOptions/selectOptions';

const Prices = ({
  currentProductData,
  selectOptions,
  setProductData,
  productData,
}) => {
  const test = currentProductData.prices.priceByCountryByCurrency;

  const arr = [];

  // const deleteRow = (e) => {

  //   const raw = currentProductData.prices.priceByCountryByCurrency;

  //   const allowed = [Object.keys(e)];
  //   const all = [Object.keys(currentProductData.prices.priceByCountryByCurrency)];

  //   const filtered = allowed.reduce((obj, key) => ({ ...obj, [key]: raw[key] }), {});

    // const arrayCopy = rows.filter((row) => row !== e);
    // setRows(arrayCopy);
  // };

  Object.keys(test).map((key) => {
    const value = test[key];
    const checkFiledsCount = Object.keys(value).length > 1;

    if (checkFiledsCount === false) {
      const obj = {};
      obj[key] = value;
      arr.push(obj);
    } else {
      const usd = key;
      Object.keys(value).map((key) => {
        const key1 = {};
        const key2 = {};

        key2[key] = value[key];
        key1[usd] = key2;
        arr.push(key1);
      });
    }

    return key;
  });

  // console.log('test', currentProductData);
  return (
    <>
      <Box px={2}>
        <Box width={200} pb={3}>
          {/* <Box>

            <SelectCustom
              label='defaultCurrency'
              value={currentProductData.prices.defaultCurrency}
              selectOptions={defaultCurrency}
              onChangeSelect={(e) => {
                console.log('e.target.value', e.target.value);
                setProductData({
                  ...currentProductData,
                  prices: {
                    ...currentProductData.prices,
                    defaultCurrency: e.target.value,
                  },
                });
              }}
            />

          </Box> */}
        </Box>

        <TableContainer component={Paper}>
          <Table className='table' aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Currency</TableCell>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">MSRP</TableCell>
                <TableCell align="center">Upsell price</TableCell>
                <TableCell align="center">Cross-sell price</TableCell>
                <TableCell align="center">VAT included</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {arr.map((key, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {Object.keys(key)}
                  </TableCell>
                  <TableCell align="center">
                    {Object.keys(Object.values(key)[0]).[0] || '-'}
                  </TableCell>
                  <TableCell align="center">
                    {Object.values(Object.values(key)[0]).[0].value || '-'}
                  </TableCell>
                  <TableCell align="center">
                    {Object.values(Object.values(key)[0]).[0].msrp || '-'}
                  </TableCell>
                  <TableCell align="center">
                    {Object.values(Object.values(key)[0]).[0].upSell || '-'}
                  </TableCell>
                  <TableCell align="center">
                    {Object.values(Object.values(key)[0]).[0].crossSell || '-'}
                  </TableCell>
                  <TableCell align="center">
                    <FormControlLabel
                      control={(
                        <Checkbox
                          disabled
                          checked={Object.values(Object.values(key)[0]).[0].vatIncluded}
                          name="checkedB"
                          color="primary"
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color='primary' onClick={() => deleteRow(key)}>
                      -
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
                <ProductPriceRow
                  setProductData={setProductData}
                  currentProductData={currentProductData}
                />
            </TableBody>

          </Table>
        </TableContainer>
      </Box>

      <Box mt={3} px={2}>
        <Typography variant="h6">
          Date range
        </Typography>
        <Typography>
          The following table represents values set with the new price service, you can click on each ID to navigate and mange them.
        </Typography>
      </Box>

      <Box mt={3} px={2}>
        <TableContainer component={Paper}>
          <Table className='table' aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell align="center">Marketing Campaign</TableCell>
                <TableCell align="center">Starts at</TableCell>
                <TableCell align="center">Ends at</TableCell>
                <TableCell align="center">Counrty</TableCell>
                <TableCell align="center">Currency</TableCell>
                <TableCell align="center">Value</TableCell>
                <TableCell align="center">MSRP</TableCell>
                <TableCell align="center">Upsell price</TableCell>
                <TableCell align="center">Cross-sell price</TableCell>
                <TableCell align="center">VAT included</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  c3569f1e-4caa...
                </TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">	2021/02/02 10:57 +02:00 (EET)</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">default</TableCell>
                <TableCell align="center">AED</TableCell>
                <TableCell align="center">AED 200.00</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">NO</TableCell>
              </TableRow>
              <TableRow />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
Prices.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
  inputErrors: PropTypes.object,
  setInputErrors: PropTypes.func,
};

export default Prices;
