import React, { useState } from 'react';

import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

import ChartBlock from './SubSections/ChartBlock';
import InfoItemBlock from './SubSections/InfoItemBlock';

import TimelineIcon from '@material-ui/icons/Timeline';
import BarChartIcon from '@material-ui/icons/BarChart';

import localization from '../../localization';

import './dashboardScreen.scss';

const rows = [
  { date: '03/31/2019', orders: '0', gross: '$0.00', refunds: '$0.00', coupons: '$0.00', taxes: '$0.00', shipping: '$0.00', notRev: '$0.00' },
  { date: '03/31/2019', orders: '0', gross: '$0.00', refunds: '$0.00', coupons: '$0.00', taxes: '$0.00', shipping: '$0.00', notRev: '$0.00' },
  { date: '03/31/2019', orders: '0', gross: '$0.00', refunds: '$0.00', coupons: '$0.00', taxes: '$0.00', shipping: '$0.00', notRev: '$0.00' }
];

const DashboardScreen = () => {
  const [chartType, setChartType] = useState('line');

  return (
    <Box className='dashboard'>
      <Typography variant='h5'>Business Analysis</Typography>

      <Box width='50%' pb={2}>
        <Typography variant='h6'>Date Range:</Typography>

        <Box display='flex' alignItems='center'>
          <form noValidate>
            <TextField
              fullWidth
              name='endDate'
              variant='outlined'
              value='lastMonth'
              select
            >
              <MenuItem value='lastMonth'>
                Last Month (Feb 1 - 28, 2021)
              </MenuItem>
            </TextField>
          </form>

          <Box mx={3}>vs</Box>

          <form noValidate>
            <TextField
              fullWidth
              name='endDate'
              variant='outlined'
              value='previousYear'
              select
            >
              <MenuItem value='previousYear'>
                Previous Year (Feb 1 - 29, 2020)
              </MenuItem>
            </TextField>
          </form>
        </Box>
      </Box>

      <Box boxShadow={2} my={4}>
        <Box display='flex' width='100%' borderBottom='1px solid #e2e2e2'>
          <InfoItemBlock
            title='Gross Revenue'
            price='$32,502.00'
            previousPrice='$41,927.58'
            selected
            change='-29'
          />

          <InfoItemBlock
            title='Refunds'
            price='$0.00'
            previousPrice='$0.00'
            change='0'
          />

          <InfoItemBlock
            title='Coupons'
            price='$11,178.00'
            previousPrice='$10,004.00'
            change='17'
          />
        </Box>

        <Box display='flex' width='100%'>
          <InfoItemBlock
            title='Taxes'
            price='$0.00'
            previousPrice='$0.00'
            change='0'
          />

          <InfoItemBlock
            title='Shipping'
            price='$15.00'
            previousPrice='$0.00'
            change='1500'
          />

          <InfoItemBlock
            title='Gross Revenue'
            price='$32,502.00'
            previousPrice='$41,927.58'
            change='-29'
          />
        </Box>
      </Box>

      <Box bgcolor='#fff' boxShadow={2} pb='75px' pt='30px' className='chart-block' my={4}>
        <Box pl='30px'>
          <Typography variant='h4'>Cross Revenue</Typography>

          <Box display='flex' className='chart-meta'>
            <Box width='40%' display='flex' justifyContent='space-between'>
              <Box display='flex'>
                <Box width='18px' height='18px' bgcolor='#9ec5ec' borderRadius='2px' mr='10px' />
                <Box mt='-3px'>
                  <Typography>Last Month (Feb 1-28, 2021)</Typography>
                  <Typography variant='h4'>$32,502.00</Typography>
                </Box>
              </Box>

              <Box display='flex'>
                <Box width='18px' height='18px' bgcolor='#ff7133' borderRadius='2px' mr='10px' />
                <Box mt='-3px'>
                  <Typography>Previous Year (Feb 1-29, 2020):</Typography>
                  <Typography variant='h4'>$46,018.00</Typography>
                </Box>
              </Box>
            </Box>

            <Box width='60%' mt='-8px' justifyContent='flex-end' display='flex' pr='30px' className='chart-settings'>
              <TextField
                name='byValue'
                value='byDay'
                className='select-by'
                select
              >
                <MenuItem value='byDay'>
                  By day
                </MenuItem>
              </TextField>

              <TimelineIcon className={chartType === 'line' ? 'active' : ''} onClick={() => setChartType('line')} />
              <BarChartIcon className={chartType === 'bar' ? 'active' : ''} onClick={() => setChartType('bar')} />
            </Box>
          </Box>
        </Box>

        <ChartBlock chartType={chartType} />
      </Box>

      <Box bgcolor='#fff' boxShadow={2} pb='50px' pt='30px' className='revenue-table'>
        <Box pl='30px'>
          <Typography variant='h4'>Revenue</Typography>
        </Box>

        <TableContainer >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Orders</TableCell>
                <TableCell>Gross Revenue</TableCell>
                <TableCell>Refunds</TableCell>
                <TableCell>Coupons</TableCell>
                <TableCell>Taxes</TableCell>
                <TableCell>Shipping</TableCell>
                <TableCell>Net Revenue</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, ind) => (
                <TableRow key={ind}>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell>{row.orders}</TableCell>
                  <TableCell>{row.gross}</TableCell>
                  <TableCell>{row.refunds}</TableCell>
                  <TableCell>{row.coupons}</TableCell>
                  <TableCell>{row.taxes}</TableCell>
                  <TableCell>{row.shipping}</TableCell>
                  <TableCell>{row.notRev}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DashboardScreen;
