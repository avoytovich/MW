import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Grid, Box, LinearProgress, Typography,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import moment from 'moment';

import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import { getCustomerName } from '../../services/helpers/customersHelper';
import localization from '../../localization';
import api from '../../api';

import './notificationHistoryDetailsScreen.scss';

const NotificationHistoryDetailsScreen = () => {
  const [customerName, setCustomerName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notificationHistory, setNotificationHistory] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (notificationHistory?.customerId) {
      getCustomerName(notificationHistory?.customerId).then((name) => setCustomerName(name));
    }
  }, []);

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

  useEffect(() => {
    setLoading(true);
    api.getNotificationHistoryById(id)
      .then((data) => {
        setNotificationHistory(data.data);
        api.getCustomerById(data.data.customerId)
          .then((res) => setCustomer(res.data));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

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

  if (loading) return <LinearProgress />;
  return (
    <Grid container spacing={2} className="wrapper-notification-history">
      <Box display='flex' flexDirection='column'>
        <Box mx={2}>
          <CustomBreadcrumbs
            url='/settings/notifications/notification-history'
            section={localization.t('general.notification')}
            id={id}
          />
        </Box>
        <Box py={2} mt={3}>
          <Typography gutterBottom variant='h3'>
            {`${localization.t('labels.notification')} # ${id}`}
          </Typography>
        </Box>
      </Box>
      {mapStructure.map((each) => (
        <Grid container spacing={2} key={each.label}>
          {renderFields(each)}
        </Grid>
      ))}
    </Grid>
  );
};

export default NotificationHistoryDetailsScreen;
