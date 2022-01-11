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
  LinearProgress,
} from '@mui/material';

import Refresh from '@mui/icons-material/Refresh';

import PaginationComponent from '../../components/PaginationComponent';
import PriceNumberFormat from '../../components/PriceNumberFormat';

import parentPaths from '../../services/paths';

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
  const [isLoading, setLoading] = useState(false);

  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const findOrders = () => {
    if (bin || l4) {
      setLoading(true);
      setError(false);

      const dataToSend = {
        size: rowsPerPage,
        page: curPage,
        date: date ? moment(date).format('YYYY-MM-DD') : null,
        customer: nxState?.selectedCustomer?.name,
        currency,
        amount,
      };

      if (bin) {
        dataToSend.bin = bin;
      }

      if (l4) {
        dataToSend.l4 = l4;
      }

      api
        .getOrdersByCard(dataToSend)
        .then(({ data: { items, totalPages: total } }) => {
          setResults(items);
          setTotalPages(total);
        })
        .finally(() => {
          setTimeout(() => setLoading(false), 300);
        });
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    (bin || l4) && findOrders();
  }, [curPage, rowsPerPage]);

  useEffect(() => {
    if (open) {
      setResults(null);
      setBin('');
      setL4('');
      setCurPage(1);
      setTotalPages(1);
      setRowsPerPage(10);
      setAmount('');
      setCurrency('');
      setDate(null);
    }
  }, [open]);

  const TableComponent = () => {
    if (isLoading) return <LinearProgress style={{ margin: '20px' }} />;

    return (
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
                  onClick={() => window.open(`${parentPaths.orderlist}/${order.orderNumber.slice(0, -1)}`, '_blank')}
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
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='lg'>
      <DialogTitle id='filters-dialog-title'>
        <Typography variant='h5' component='span'>{localization.t('forms.headers.findByCC')}</Typography>
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
              error={hasError && !bin && !l4}
              name='cardBin'
              value={bin}
              inputProps={{ maxLength: 6 }}
              onChange={(e) => setBin(e.target.value.replace(/[^0-9]/g, ''))}
              label={localization.t('labels.cardBin')}
              variant='outlined'
            />
          </Box>

          <Box mr={2} minWidth='180px'>
            <TextField
              value={l4}
              inputProps={{ maxLength: 4 }}
              error={hasError && !l4 && !bin}
              onChange={(e) => setL4(e.target.value.replace(/[^0-9]/g, ''))}
              name='lastDigits'
              label={localization.t('labels.last4Digits')}
              variant='outlined'
            />
          </Box>

          <Box minWidth='180px' display='flex' alignItems='center'>
            <TextField
              name='date'
              value={date ? moment(date).format('YYYY-MM-DD') : ''}
              label={localization.t('labels.date')}
              type='date'
              variant='outlined'
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setDate(moment(e.target.value).valueOf())}
            />

            <Button
              style={{ minWidth: '36px', height: '36px', margin: '0 5px' }}
              onClick={() => setDate(null)}
            >
              <Refresh color='secondary' />
            </Button>
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
            propCurrentPage={curPage}
            propSetCurrentPage={setCurPage}
            totalPages={totalPages}
          />
        </Box>

        {(results?.length > 0 || isLoading) && <TableComponent />}
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
