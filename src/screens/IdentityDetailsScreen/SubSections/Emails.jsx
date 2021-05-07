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
import { useDispatch } from 'react-redux';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PropTypes from 'prop-types';
import { showNotification } from '../../../redux/actions/HttpNotifications';
import localization from '../../../localization';
import '../identityDetailsScreen.scss';

const Emails = ({ curIdentity }) => {
  const dispatch = useDispatch();
  const makeCopy = (value) => {
    navigator.clipboard.writeText(value).then(() => {
      dispatch(showNotification(localization.t('general.itemHasBeenCopied')));
    });
  };
  if (curIdentity === null) return <LinearProgress />;

  return curIdentity.emails ? (
    <Box p={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ background: '#eee' }}>
              <TableCell>{localization.t('labels.id')}</TableCell>
              <TableCell className='tableCellWithBorder'>{localization.t('labels.emailId')}</TableCell>
              <TableCell className='tableCellWithBorder'>{localization.t('labels.createDate')}</TableCell>
              <TableCell className='tableCellWithBorder'>{localization.t('labels.type')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {curIdentity.emails.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Box className='rowValue'><Typography color='primary'>{item.id}</Typography></Box>
                    <Box pl={1}>
                      <FileCopyIcon
                        onClick={() => makeCopy(item.id)}
                        color="secondary"
                      />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell className='tableCellWithBorder'>
                  {item.emailId}
                </TableCell>
                <TableCell className='tableCellWithBorder'>
                  {moment(item.createDate).format('YYYY/MM/DD kk:mm (Z)')}
                </TableCell>
                <TableCell className='tableCellWithBorder'>
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
      <Typography>
        {localization.t('general.noResourcesMatchCriteria')}
      </Typography>
    </Box>
  );
};

Emails.propTypes = {
  curIdentity: PropTypes.object,
};

export default Emails;
