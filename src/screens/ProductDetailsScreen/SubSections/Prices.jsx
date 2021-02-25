import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
} from '@material-ui/core';

const Prices = ({
  props,
}) => {
  const [rows, setRows] = useState([
    {
      currency: 'AED (UAE Dirham)',
      country: 'default',
      price: 'AED 200',
      msrp: '-',
      upsellPrice: '-',
      crossSellPrice: '-',
      vatIncluded: 'vat',
    },
  ]);
  const [input, setInput] = useState('');

  const [state, setState] = useState({
    currency: '',
    country: '',
    price: '',
    msrp: '',
    upsellPrice: '',
    crossSellPrice: '',
    vatIncluded: '',
  });

  const handleChange = (evt) => {
    console.log('evt.target', evt.target);
    const { value } = evt.target;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const addRow = (e) => {
    const newState = {
      currency: '',
      country: '',
      price: '',
      msrp: '',
      upsellPrice: '',
      crossSellPrice: '',
      vatIncluded: '',
    };
    setRows((rows) => [...rows, state]);
    return setState(newState);
  };

  const deleteRow = (e) => {
    const arrayCopy = rows.filter((row) => row !== e);
    setRows(arrayCopy);
  };

  const handleChangeInput = (event) => {
    const { name } = event.target;
    setInput({
      ...input,
      [name]: event.target.value,
    });
  };

  return (
    <>
      <Box>
        <Box width={200} pb={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-age-native-simple">Default currency</InputLabel>
            <Select
              native
              value={input.age}
              onChange={handleChangeInput}
              displayEmpty
              label="Default currency"
            >
              <option aria-label="None" value="" />
              <option value="AED">AED</option>
              <option value="-">-</option>
            </Select>
          </FormControl>
        </Box>
        <TableContainer component={Paper}>
          <Table className='table' aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Currency</TableCell>
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
              {rows.map((row) => (
                <TableRow key={row.currency}>
                  <TableCell component="th" scope="row">
                    {row.currency}
                  </TableCell>
                  <TableCell align="center">{row.country}</TableCell>
                  <TableCell align="center">{row.price || '-'}</TableCell>
                  <TableCell align="center">{row.msrp || '-'}</TableCell>
                  <TableCell align="center">{row.upsellPrice || '-'}</TableCell>
                  <TableCell align="center">{row.crossSellPrice || '-'}</TableCell>
                  <TableCell align="center">{row.vatIncluded || '-'}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color='primary' onClick={() => deleteRow(row)}>
                      -
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell component="th" scope="row" width="210px">
                  <FormControl fullWidth>
                    <Select
                      name="currency"
                      value={state.currency}
                      onChange={handleChange}
                    >
                      <MenuItem value='AED (UAE Dirham)'>AED (UAE Dirham)</MenuItem>
                      <MenuItem value="ARS (Argentine Peso)">ARS (Argentine Peso)</MenuItem>
                      <MenuItem value="CAD (Canadian Dollar)">CAD (Canadian Dollar)</MenuItem>
                      <MenuItem value="COP (Colombian Peso )">COP (Colombian Peso)</MenuItem>
                      <MenuItem value="EUR">EUR (Euro)</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell align="right" width="210px">
                  <FormControl fullWidth>
                    <Select
                      name="country"
                      value={state.country}
                      onChange={handleChange}
                    >
                      <MenuItem value="AD (Andora)">AD (Andora)</MenuItem>
                      <MenuItem value="AF (Afghanistan)">AF (Afghanistan)</MenuItem>
                      <MenuItem value="AM (Armenia)">AF (Afghanistan)</MenuItem>
                      <MenuItem value="BR (Brazil)">AF (Afghanistan)</MenuItem>
                      <MenuItem value="ES (Spain)">AF (Afghanistan)</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell align="right">
                  <Box px={1} width=" 100%">
                    <TextField
                      fullWidth
                      name="price"
                      type="text"
                      value={state.price}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box px={1} width=" 100%">
                    <TextField
                      fullWidth
                      name="msrp"
                      type="text"
                      value={state.msrp}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box px={1} width=" 100%">
                    <TextField
                      fullWidth
                      name="upsellPrice"
                      type="text"
                      value={state.upsellPrice}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box px={1} width=" 100%">
                    <TextField
                      fullWidth
                      name="crossSellPrice"
                      type="text"
                      value={state.crossSellPrice}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box px={1} width=" 100%">
                    <TextField
                      fullWidth
                      name="vatIncluded"
                      type="text"
                      value={state.vatIncluded}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={(i) => addRow(i)}>
                    +
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mt={3}>
        <Typography variant="h6">
          Date range
        </Typography>
        <Typography>
          The following table represents values set with the new price service, you can click on each ID to navigate and mange them.
        </Typography>
      </Box>

      <Box mt={3}>
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
