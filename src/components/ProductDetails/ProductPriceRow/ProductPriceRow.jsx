import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  TextField,
  TableCell,
  TableRow,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import localization from '../../../localization';

import {
  SelectCustom,
} from '../../../components/Inputs';

import {
  priceCurrency,
  countryOptions,
} from '../../../services/selectOptions/selectOptions';

const ProductPriceRow = ({
  setProductData,
  currentProductData,
 }) => {

  const [currency, setCurrency] = useState('');
  const [country, setCountry] = useState('');

  const [newRow, setNewRow] = useState(
    {
      value: '',
      msrp: '',
      upSell: '',
      crossSell: '',
      vatIncluded: false,
    },
  );

  const addRow = (e) => {
    const newState = {
      value: '',
      msrp: '',
      upSell: '',
      crossSell: '',
      vatIncluded: false,
    };
    const countryObj = {};

    countryObj[country] = newRow;

    setProductData({
      ...currentProductData,
      prices: {
        ...currentProductData.prices,
        priceByCountryByCurrency: {
          ...currentProductData.prices.priceByCountryByCurrency,
          [currency]: { ...countryObj},
        }
      },
    });

    setCurrency('');
    setCountry('');

    return setNewRow(newState);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setNewRow({
      ...newRow,
      [e.target.name]: value,
    });
  };

  const handleCurrency = (e) => {
    setCurrency(e.target.value);
  }
  const handleCountry = (e) => {
    setCountry(e.target.value);
  }
  const handleCheckbox = (e) => {
    setNewRow({
      ...newRow,
      [e.target.name]: e.target.checked,
    });
  }

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row" style={{minWidth: 180, maxWidth: 180}}>
          <Box>
            <SelectCustom
              label="priceCurrency"
              selectOptions={priceCurrency}
              onChangeSelect={handleCurrency}
            />
          </Box>
        </TableCell>

        <TableCell align="right" width="210px" style={{minWidth: 180, maxWidth: 180}}>
          <Box>
            <SelectCustom
              label="priceCountry"
              selectOptions={countryOptions}
              onChangeSelect={handleCountry}
            />
          </Box>
        </TableCell>

        <TableCell align="right" style={{ minWidth: 100 }}>
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              name="value"
              type="text"
              value={newRow.value}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
        </TableCell>
        <TableCell align="right" style={{ minWidth: 100 }}>
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              name="msrp"
              type="text"
              value={newRow.msrp}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
        </TableCell>
        <TableCell align="right" style={{ minWidth: 100 }}>
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              name="upSell"
              type="text"
              value={newRow.upSell}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
        </TableCell>
        <TableCell align="right" style={{ minWidth: 100 }}>
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              name="crossSell"
              type="text"
              value={newRow.crossSell}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
        </TableCell>
        <TableCell align="right">

          <FormControlLabel
            control={(
              <Checkbox
                checked={newRow.vatIncluded}
                onChange={handleCheckbox}
                name="vatIncluded"
                color="primary"
              />
            )}
          />

        </TableCell>
        <TableCell align="right">
          <Button variant="contained" color="primary" onClick={(i) => addRow(i)}>
            +
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

// PricesSection.propTypes = {
//   setProductData: PropTypes.func,
// };

export default ProductPriceRow;
