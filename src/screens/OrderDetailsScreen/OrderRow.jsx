import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import GetAppIcon from '@mui/icons-material/GetApp';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Grid, Box } from '@mui/material';
import moment from 'moment';

import parentPaths from '../../services/paths';
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

  const renderId = (item) => {
    switch (item.label) {
      case 'ID':
        return (
          <Link to={`${parentPaths.endusers}/${item.value}`}>
            {item.value}
          </Link>
        );
      default:
        return (
          item.value || '-'
        );
    }
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
                {item.external
                  ? (
                    <a href={item.external} target='_blank' rel='noreferrer'>
                      {item.value || '-'}
                    </a>
                  ) : renderId(item)}
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
