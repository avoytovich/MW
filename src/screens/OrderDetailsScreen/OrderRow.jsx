import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Grid, Box } from '@material-ui/core';
import moment from 'moment';
import localization from '../../localization';
import api from '../../api';

import { shouldDownload, shouldCopy } from './utils';
import './orderDetailsScreen.scss';

const OrderRow = ({
  rowData, customerId, creationDate, curLanguage,
}) => {
  const { id } = useParams();

  const downloadPdf = (data) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${id}.invoice.pdf`);
    document.body.appendChild(link);
    link.click();
  };

  const dowloadTermsAndConditions = (data) => {
    if (customerId) {
      const date = moment(creationDate).format('YYYY-MM-DD');
      api.getTermsAndConditions(customerId, curLanguage, date)
        .then((response) => {
          downloadPdf(response.data, data.label);
        });
    }
  };

  const downloadInvoice = (data) => (
    api.getInvoicePdfById(data.value)
      .then((response) => downloadPdf(response.data))
  );

  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
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
            item.key === 'invoiceId' ? (
              <Box p={2} className="rowValue download" onClick={() => downloadInvoice(item)}>
                {item.value || '-'}
              </Box>
            ) : (
              <Box p={2} className="rowValue">
                {item.external ? (
                  <a href={item.external} target='_blank' rel='noreferrer'>
                    {item.value || '-'}
                  </a>
                ) : (item.value || '-')}
              </Box>
            )
          )}
          <Box p={2}>
            {shouldDownload(item.key) && (
              <GetAppIcon onClick={() => dowloadTermsAndConditions(item)} color="secondary" />
            )}
            {item.value && shouldCopy(item.key) && (
              <FileCopyIcon
                onClick={() => makeCopy(item.value)}
                style={{ marginLeft: '5px' }}
                color="secondary"
                className="copyIcon"
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
  curLanguage: PropTypes.string,
};

export default OrderRow;
