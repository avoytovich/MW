import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment';

import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core';

import PaginationComponent from '../../components/PaginationComponent';
import PriceNumberFormat from '../../components/PriceNumberFormat';

import localization from '../../localization';
import api from '../../api';

const selectOptions = ['10', '50', '100', '200'];

const FindByCC = ({ open, onClose }) => {
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [bin, setBin] = useState('');
  const [l4, setL4] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [results, setResults] = useState(null);
  const [date, setDate] = useState(null);
  const [hasError, setError] = useState(false);

  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const findOrders = () => {
    if (bin && l4) {
      setError(false);

      api
        .getOrdersByCard({
          size: rowsPerPage,
          page: curPage,
          bin,
          l4,
          date: date ? moment(date).format('YYYY-MM-DD') : null,
          customer: nxState?.selectedCustomer?.name,
          currency,
          amount,
        }).then(({ data: { items, totalPages: total } }) => {
          setResults(items);
          setTotalPages(total);
        });
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    bin && l4 && findOrders();
  }, [curPage, rowsPerPage]);

  const TableComponent = () => (
    <Box my={4}>
      <TableContainer component={Paper}>
        <Table className='table' aria-label='simple table'>
          <TableHead>
            <TableRow style={{ background: '#eee' }}>
              <TableCell align='center'>Customer</TableCell>
              <TableCell align='center'>Create date</TableCell>
              <TableCell align='center'>Order ID</TableCell>
              <TableCell align='center'>End user</TableCell>
              <TableCell align='center'>Product</TableCell>
              <TableCell align='center'>Amount</TableCell>
              <TableCell align='center'>Currency</TableCell>
              <TableCell align='center'>Email</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {results.map((order) => (
              <TableRow
                key={order.orderNumber}
                onClick={() => window.open(`/overview/orders/${order.orderNumber.slice(0, -1)}`, '_blank')}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{order.seller || '-'}</TableCell>
                <TableCell align='center'>{order.Transaction_Date || '-'}</TableCell>
                <TableCell align='center'>{order.orderNumber.slice(0, -1) || '-'}</TableCell>
                <TableCell align='center'>
                  {`${order.customerFirstName} ${order.customerLastName}`}
                </TableCell>
                <TableCell>{order.products[0]?.name || '-'}</TableCell>
                <TableCell align='center'>
                  {<PriceNumberFormat number={order.products[0]?.amount} currency={order.Transaction_Currency} /> || '-'}
                </TableCell>
                <TableCell align='center'>{order.Transaction_Currency || '-'}</TableCell>
                <TableCell>{order.customerEmail || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} style={{ maxWidth: 800 }}>
      <DialogTitle id='filters-dialog-title' disableTypography>
        <Typography variant='h5'>{localization.t('forms.headers.findByCC')}</Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          <Typography>{localization.t('forms.headers.findByCCDesc')}</Typography>
        </Box>

        <Box>
          <Typography>{localization.t('forms.headers.findByCCNote')}</Typography>
        </Box>

        <Box
          my={4}
          display='flex'
          component='form'
          autoComplete='off'
        >
          <Box mr={2} minWidth='180px'>
            <TextField
              required
              error={hasError && !bin}
              name='cardBin'
              value={bin}
              inputProps={{ maxLength: 6 }}
              onChange={(e) => setBin(e.target.value)}
              label={localization.t('labels.cardBin')}
              variant='outlined'
            />
          </Box>

          <Box mr={2} minWidth='180px'>
            <TextField
              required
              value={l4}
              inputProps={{ maxLength: 4 }}
              error={hasError && !l4}
              onChange={(e) => setL4(e.target.value)}
              name='lastDigits'
              label={localization.t('labels.last4Digits')}
              variant='outlined'
            />
          </Box>

          <Box mr={2} minWidth='180px'>
            <TextField
              name='date'
              value={date ? moment(date).format('YYYY-MM-DD') : ''}
              label={localization.t('labels.date')}
              type='date'
              variant='outlined'
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setDate(moment(e.target.value).valueOf())}
            />
          </Box>

          <Box mr={2} minWidth='180px'>
            <TextField
              name='amount'
              label={localization.t('labels.amount')}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              variant='outlined'
            />
          </Box>

          <Box mr={2} minWidth='180px'>
            <TextField
              name='currency'
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              label={localization.t('labels.currency')}
              variant='outlined'
            />
          </Box>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Box display='flex' alignItems='center'>
            <Typography variant="subtitle2">{localization.t('general.rowsPerPage')}</Typography>

            <Box px={2}>
              <TextField
                select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(e.target.value)}
              >
                {selectOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          <PaginationComponent
            currentPage={curPage}
            updatePage={setCurPage}
            totalPages={totalPages}
          />
        </Box>

        {results?.length > 0 && <TableComponent />}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          {localization.t('forms.buttons.close')}
        </Button>

        <Button
          aria-label='by-card-search-button'
          onClick={findOrders}
          color='primary'
        >
          {localization.t('forms.buttons.search')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FindByCC;

FindByCC.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
