import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { toast } from 'react-toastify';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import {
  Box,
} from '@mui/material';
import localization from '../../../localization';

const General = ({ audit }) => {
  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  return (
    <>
      <Box display='flex'>
        <Box p={2} fontWeight={500} width='20%'>
          {localization.t('labels.auditItemId')}
        </Box>
        <Box display="flex">
          <Box p={2} className="rowValue">
            {audit.id}
          </Box>
          <Box p={2}>
            <FileCopyIcon
              onClick={() => makeCopy(audit.id)}
              style={{ marginLeft: '5px' }}
              color="secondary"
              className="actionIcon"
            />
          </Box>
        </Box>
      </Box>
      <Box display='flex'>
        <Box p={2} fontWeight={500} width='20%'>
          {localization.t('labels.date')}
        </Box>
        <Box display="flex">
          <Box p={2} className="rowValue">
            {moment(audit.createDate).format('D MMM YYYY')}
          </Box>
        </Box>
      </Box>
      <Box display='flex'>
        <Box p={2} fontWeight={500} width='20%'>
          {localization.t('labels.reasonOfOperation')}
        </Box>
        <Box p={2} className="rowValue">
          {audit.why?.reason || '-'}
        </Box>
      </Box>
    </ >
  );
};

General.propTypes = {
  audit: PropTypes.object,
};

export default General;
