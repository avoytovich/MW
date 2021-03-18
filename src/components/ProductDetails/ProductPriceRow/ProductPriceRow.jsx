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

import AddCircleIcon from '@material-ui/icons/AddCircle';

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

  const addRow = () => {
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
          [currency]: { ...currentProductData?.prices?.priceByCountryByCurrency[currency], ...countryObj},
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
      <TableRow className='new-price-row'>
        <TableCell align="center">
          <Box>
            <SelectCustom
              label="priceCurrency"
              value={currency}
              selectOptions={priceCurrency}
              onChangeSelect={handleCurrency}
            />
          </Box>
        </TableCell>

        <TableCell align="center">
          <Box>
            <SelectCustom
              label="priceCountry"
              value={country}
              selectOptions={[{ id: 'default', value: 'default' }, ...countryOptions]}
              onChangeSelect={handleCountry}
            />
          </Box>
        </TableCell>

        <TableCell align="center">
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

        <TableCell align="center">
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

        <TableCell align="center">
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

        <TableCell align="center">
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

        <TableCell align="center" style={{ minWidth: '50px' }}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={newRow.vatIncluded}
                onChange={handleCheckbox}
                name="vatIncluded"
                color="primary"
              />
            )}
            style={{ margin: 0 }}
          />
        </TableCell>

        <TableCell align="center" className='transparent-cell' style={{ minWidth: '50px' }}>
          <Button onClick={addRow} disabled={!country || !currency}>
            <AddCircleIcon color="primary" style={{ opacity: !country || !currency ? 0.5 : 1 }} />
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
