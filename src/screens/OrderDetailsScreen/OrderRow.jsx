import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Grid, Box } from '@material-ui/core';
import moment from 'moment';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';
import api from '../../api';

import { shouldDownload, shouldCopy } from './utils';
import './orderDetailsScreen.scss';

const OrderRow = ({ rowData, customerId, creationDate }) => {
  const dispatch = useDispatch();

  const handleGetFile = () => {
    if (customerId) {
      const date = moment(creationDate).format('YYYY-MM-DD');
      api.getTermsAndConditions(customerId, date).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'termsAndConditions.pdf');
        document.body.appendChild(link);
        link.click();
      });
    }
  };
  const makeCopy = (value) => {
    navigator.clipboard.writeText(value).then(() => {
      dispatch(showNotification(localization.t('general.itemHasBeenCopied')));
    });
  };
  return rowData.map((item) => (
    <Grid container className="orderDetailsRow" key={item.key}>
      <Grid item md={6} xs={6}>
        <Box p={2} fontWeight={500}>
          {item.label}
        </Box>
      </Grid>
      <Grid item md={6} xs={6}>
        <Box display="flex">
          {!shouldDownload(item.key) && (
            <Box p={2} className="rowValue">
              {item.value || '-'}
            </Box>
          )}
          <Box p={2}>
            {shouldDownload(item.key) && (
              <GetAppIcon onClick={handleGetFile} color="secondary" />
            )}
            {item.value && shouldCopy(item.key) && (
              <FileCopyIcon
                onClick={() => makeCopy(item.value)}
                color="secondary"
              />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  ));
};
OrderRow.propTypes = {
  rowData: PropTypes.array,
  customerId: PropTypes.string,
  creationDate: PropTypes.number,
};

export default OrderRow;
