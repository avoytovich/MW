import React from 'react';
import moment from 'moment';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Box,
  Typography,
  IconButton,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import { showNotification } from '../../../redux/actions/HttpNotifications';
import '../identityDetailsScreen.scss';

const SecretKeysTable = ({ curIdentity, removeSecretKey }) => {
  const dispatch = useDispatch();
  const makeCopy = (value) => {
    navigator.clipboard.writeText(value).then(() => {
      dispatch(showNotification(localization.t('general.itemHasBeenCopied')));
    });
  };
  return (
    <Box p={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ background: '#eee' }}>
              <TableCell data-test='tableHeader'>{localization.t('labels.secretKey')}</TableCell>
              <TableCell data-test='tableHeader' className='tableCellWithBorder'>{localization.t('labels.createDate')}</TableCell>
              <TableCell data-test='tableHeader' align="center" className='tableCellWithBorder'>{localization.t('labels.deleteSecretKey')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {curIdentity.secretKeys.map((item) => (
              <TableRow key={item.secret} data-test='tableRow'>
                <TableCell data-test='secretCell'>
                  <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Box className='rowValue'><Typography color='primary'>{item.secret}</Typography></Box>
                    <Box pl={1}>
                      <FileCopyIcon
                        onClick={() => makeCopy(item.secret)}
                        color="secondary"
                      />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell data-test='createDateCell' className='tableCellWithBorder'>
                  {moment(item.createDate).format('YYYY/MM/DD kk:mm (Z)')}
                </TableCell>
                <TableCell data-test='clearIconCell' align="center" className='tableCellWithBorder'>
                  <IconButton color='primary' onClick={() => removeSecretKey(item.secret)}>
                    <ClearIcon color='secondary' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

SecretKeysTable.propTypes = {
  curIdentity: PropTypes.object,
  removeSecretKey: PropTypes.func,
};

export default SecretKeysTable;
