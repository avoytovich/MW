import React from 'react';
import moment from 'moment';
import {
  LinearProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Box,
  Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import '../identityDetailsScreen.scss';

const Emails = ({ curIdentity }) => {
  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };
  if (curIdentity === null) return <LinearProgress />;

  return curIdentity.emails ? (
    <Box p={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ background: '#eee' }}>
              <TableCell data-test='tableHeader'>{localization.t('labels.id')}</TableCell>
              <TableCell data-test='tableHeader' className='tableCellWithBorder'>{localization.t('labels.emailId')}</TableCell>
              <TableCell data-test='tableHeader' className='tableCellWithBorder'>{localization.t('labels.createDate')}</TableCell>
              <TableCell data-test='tableHeader' className='tableCellWithBorder'>{localization.t('labels.type')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {curIdentity.emails.map((item) => (
              <TableRow data-test='tableRow' key={item.id}>
                <TableCell>
                  <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Box className='rowValue'><Typography data-test='idCell' color='primary'>{item.id}</Typography></Box>
                    <Box pl={1}>
                      <FileCopyIcon
                        onClick={() => makeCopy(item.id)}
                        style={{ marginLeft: '5px' }}
                        color="secondary"
                      />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell data-test='emailIdCell' className='tableCellWithBorder'>
                  {item.emailId}
                </TableCell>
                <TableCell data-test='createDateCell' className='tableCellWithBorder'>
                  {moment(item.createDate).format('YYYY/MM/DD kk:mm (Z)')}
                </TableCell>
                <TableCell data-test='typeCell' className='tableCellWithBorder'>
                  {item.type}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  ) : (
    <Box textAlign='center'>
      <Typography data-test='noResourcesMatchCriteria'>
        {localization.t('general.noResourcesMatchCriteria')}
      </Typography>
    </Box>
  );
};

Emails.propTypes = {
  curIdentity: PropTypes.object,
};

export default Emails;
