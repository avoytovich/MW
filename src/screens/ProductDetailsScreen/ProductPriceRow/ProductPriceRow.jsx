import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  TextField,
  TableCell,
  TableRow,
  Checkbox,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';

import { SelectCustom } from '../../../components/Inputs';
import { getCountriesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import { priceCurrency } from '../../../services/selectOptions/selectOptions';

const ProductPriceRow = ({
  setProductData,
  currentProductData,
  parentId,
  editingRow,
  setEditingRow,
}) => {
  const [currency, setCurrency] = useState(editingRow?.currency || '');
  const [country, setCountry] = useState(editingRow?.country || '');
  const countryOptions = getCountriesOptions();
  const [newRow, setNewRow] = useState({
    value: editingRow?.value || '',
    msrp: (editingRow && editingRow?.msrp !== '-') ? editingRow?.msrp : '',
    upSell: (editingRow && editingRow?.upSell !== '-') ? editingRow?.upSell : '',
    crossSell: (editingRow && editingRow?.crossSell !== '-') ? editingRow?.crossSell : '',
    vatIncluded: editingRow?.vatIncluded || false,
  });

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
      prices: parentId
        ? {
          ...currentProductData?.prices,
          value: {
            ...currentProductData.prices.value,
            priceByCountryByCurrency: {
              ...currentProductData.prices.value.priceByCountryByCurrency,
              [currency]: {
                ...currentProductData?.prices?.priceByCountryByCurrency?.value[currency],
                ...countryObj,
              },
            },
          },
        }
        : {
          ...currentProductData.prices,
          priceByCountryByCurrency: {
            ...currentProductData.prices.priceByCountryByCurrency,
            [currency]: {
              ...currentProductData?.prices?.priceByCountryByCurrency[currency],
              ...countryObj,
            },
          },
        },
    });

    setCurrency('');
    setCountry('');

    editingRow && setEditingRow(false);

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
  };
  const handleCountry = (e) => {
    setCountry(e.target.value);
  };
  const handleCheckbox = (e) => {
    setNewRow({
      ...newRow,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <>
      <TableRow className='new-price-row'>
        <TableCell align='center'>
          <Box>
            <SelectCustom
              label='priceCountry'
              value={country}
              selectOptions={[{ id: 'default', value: 'default' }, ...countryOptions]}
              onChangeSelect={handleCountry}
              isDisabled={!!editingRow}
            />
          </Box>
        </TableCell>

        <TableCell align='center'>
          <Box>
            <SelectCustom
              label='priceCurrency'
              value={currency}
              selectOptions={priceCurrency}
              onChangeSelect={handleCurrency}
              isDisabled={!!editingRow}
            />
          </Box>
        </TableCell>

        <TableCell align='center'>
          <Box px={1} width=' 100%'>
            <TextField
              fullWidth
              name='value'
              type='text'
              value={newRow.value}
              onChange={handleChange}
              variant='outlined'
            />
          </Box>
        </TableCell>

        <TableCell align='center'>
          <Box px={1} width=' 100%'>
            <TextField
              fullWidth
              name='msrp'
              type='text'
              value={newRow.msrp}
              onChange={handleChange}
              variant='outlined'
            />
          </Box>
        </TableCell>

        <TableCell align='center'>
          <Box px={1} width=' 100%'>
            <TextField
              fullWidth
              name='upSell'
              type='text'
              value={newRow.upSell}
              onChange={handleChange}
              variant='outlined'
            />
          </Box>
        </TableCell>

        <TableCell align='center'>
          <Box px={1} width=' 100%'>
            <TextField
              fullWidth
              name='crossSell'
              type='text'
              value={newRow.crossSell}
              onChange={handleChange}
              variant='outlined'
            />
          </Box>
        </TableCell>

        <TableCell align='center' style={{ minWidth: '50px' }}>
          <Checkbox
            checked={newRow.vatIncluded}
            onChange={handleCheckbox}
            name='vatIncluded'
            color='primary'
          />
        </TableCell>

        <TableCell align='center' className='transparent-cell' style={{ minWidth: '50px' }}>
          {
            editingRow ? (
              <Button className='edit-button' onClick={addRow}><SaveIcon /></Button>
            ) : (
              <Button onClick={addRow} disabled={!country || !currency}>
                <AddCircleIcon
                  color='primary'
                  style={{ opacity: !country || !currency ? 0.5 : 1 }}
                />
              </Button>
            )
          }
        </TableCell>
      </TableRow>
    </>
  );
};

ProductPriceRow.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  parentId: PropTypes.string,
  editingRow: PropTypes.object,
  setEditingRow: PropTypes.func,
};

export default ProductPriceRow;
