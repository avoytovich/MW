import React from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import {
  Grid, Box, Typography,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import moment from 'moment';
import localization from '../../localization';

import './notificationHistoryDetailsScreen.scss';
import CustomCard from '../../components/utils/CustomCard';

const NotificationHistoryDetailsView = ({ customer, notificationHistory, customerName }) => {
  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  const mapStructure = [
    {
      label: 'customer',
      field: customer?.name || '-',
    },
    {
      label: 'notification_history_id',
      field: notificationHistory?.id || '-',
    },
    {
      label: 'processingDate',
      field: moment(notificationHistory?.processingDate).format('D MMM YYYY') || '-',
    },
    {
      label: 'status',
      field: notificationHistory?.status || '-',
    },
    {
      label: 'processedEvent',
      field: notificationHistory?.notificationDefinitionId || '-',
    },
    {
      label: 'receiverEmail',
      field: notificationHistory?.emails || '-',
    },
    {
      label: 'email_body',
      field: notificationHistory?.mailBody || '-',
    },
    {
      label: 'receiverUrl',
      field: notificationHistory?.url || '-',
    },
    {
      label: 'webHook',
      field: notificationHistory?.webHookResponse || '-',
    },
    {
      label: 'webhook_success_payload',
      field: notificationHistory?.webHookPayload || '-',
    },
    {
      label: 'webhook_errors',
      field: notificationHistory?.webHookErrors || '-',
    },
  ];

  const renderCustomer = (data) => (
    <>
      <Grid item md={3} xs={12}>
        <Typography variant='h6'>
          {localization.t(`labels.${data.label}`)}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12}>
        <Box className="customer">
          <Typography variant='subtitle1'>
            {`${data.field}, `}
            <span
              className="customer-value"
              onClick={() => history.push(`/settings/administration/customers/${notificationHistory.customerId}`)} // ToDo: should be replaced with new customer route
            >
              {customerName}
            </span>
          </Typography>
          <FileCopyIcon
            onClick={() => makeCopy(notificationHistory.customerId)}
            color="secondary"
          />
        </Box>
      </Grid>
    </>
  );

  const renderNotificationHistoryId = (data) => (
    <>
      <Grid item md={3} xs={12}>
        <Typography variant='h6'>
          {localization.t(`labels.${data.label}`)}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12}>
        <Box className="notification-history-id">
          <Typography variant='subtitle1' className="history-id-value">
            {data.field}
          </Typography>
          <FileCopyIcon
            onClick={() => makeCopy(data.field)}
            color="secondary"
          />
        </Box>
      </Grid>
    </>
  );

  const renderDefault = (each) => (
    <>
      <Grid item md={3} xs={12}>
        <Typography variant='h6'>
          {localization.t(`labels.${each.label}`)}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12}>
        <Box>
          <Typography variant='subtitle1'>
            {each.field}
          </Typography>
        </Box>
      </Grid>
    </>
  );

  const renderFields = (each) => {
    switch (each.label) {
      case 'customer':
        return renderCustomer(each);
      case 'notification_history_id':
        return renderNotificationHistoryId(each);
      default:
        return renderDefault(each);
    }
  };

  return (
    <CustomCard width={1} mt={0}>
      <Grid container className="wrapper-notification-history">
        {mapStructure.map((each) => (
          <Grid container key={each.label}>
            {renderFields(each)}
          </Grid>
        ))}
      </Grid>
    </CustomCard>
  );
};
NotificationHistoryDetailsView.propTypes = {
  customer: PropTypes.object,
  notificationHistory: PropTypes.object,
  customerName: PropTypes.string,
};
export default NotificationHistoryDetailsView;
