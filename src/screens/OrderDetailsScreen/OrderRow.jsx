import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Grid, Box } from '@material-ui/core';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';

import { shouldDownload, shouldCopy } from './utils';
import './orderDetailsScreen.scss';

const OrderRow = ({ rowData }) => {
  const dispatch = useDispatch();

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
          <Box p={2} className="rowValue">
            {item.value || '-'}
          </Box>
          {item.value && (
            <Box p={2}>
              {shouldDownload(item.key) && <GetAppIcon color="secondary" />}
              {shouldCopy(item.key) && (
                <FileCopyIcon
                  onClick={() => makeCopy(item.value)}
                  color="secondary"
                />
              )}
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  ));
};
OrderRow.propTypes = {
  rowData: PropTypes.array,
};

export default OrderRow;
