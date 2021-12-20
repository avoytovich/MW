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
} from '@mui/material';

import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChartBlock from './SubSections/ChartBlock';
import InfoItemBlock from './SubSections/InfoItemBlock';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import './dashboardScreen.scss';

const rows = [

];

const DashboardScreen = () => {
  const [chartType, setChartType] = useState('line');
  return (
    <Box className='dashboard' overflow='auto' p='2px'>
      <CustomBreadcrumbs
        sections={['businessAnalysis']}
      />
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
                Last Month
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
                Previous Year
              </MenuItem>
            </TextField>
          </form>
        </Box>
      </Box>

      <Box boxShadow={2} my={4}>
        <Box display='flex' width='100%' borderBottom='1px solid #e2e2e2'>
          <InfoItemBlock
            title='Gross Revenue'
            price='$0'
            previousPrice='$0'
            selected
            change='0'
          />

          <InfoItemBlock
            title='Refunds'
            price='$0.00'
            previousPrice='$0.00'
            change='0'
          />

          <InfoItemBlock
            title='Coupons'
            price='$0'
            previousPrice='$0'
            change='0'
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
            price='$0.00'
            previousPrice='$0.00'
            change='000'
          />

          <InfoItemBlock
            title='Gross Revenue'
            price='$0'
            previousPrice='$0'
            change='0'
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
                  <Typography>Last Month</Typography>
                  <Typography variant='h4'>$0</Typography>
                </Box>
              </Box>

              <Box display='flex'>
                <Box width='18px' height='18px' bgcolor='#ff7133' borderRadius='2px' mr='10px' />
                <Box mt='-3px'>
                  <Typography>Previous Year</Typography>
                  <Typography variant='h4'>$0</Typography>
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

      {/* <Box bgcolor='#fff' boxShadow={2} pb='50px' pt='30px' className='revenue-table'>
        <Box pl='30px'>
          <Typography variant='h4'>Revenue</Typography>
        </Box>

        <TableContainer>
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
                // eslint-disable-next-line
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
      </Box> */}
    </Box>
  );
};

export default DashboardScreen;
