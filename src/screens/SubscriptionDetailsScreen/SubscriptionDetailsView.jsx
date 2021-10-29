/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';

import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import localization from '../../localization';

import './subscriptionDetailsScreen.scss';

const SubscriptionDetailsView = ({ subscription, customerName }) => {
  const generated = {
    general: [
      { label: localization.t('labels.subscriptionId'), value: subscription.id, copy: true },
      { label: localization.t('labels.customer'), value: customerName, copy: true },
      { label: localization.t('labels.creationDate'), value: moment(subscription.createDate).format('YYYY-MM-DD') },
      { label: localization.t('labels.lastUpdate'), value: moment(subscription.updateDate).format('YYYY-MM-DD') },
      { label: localization.t('labels.subscriptionName'), value: subscription.name },
      { label: localization.t('labels.storeId'), value: subscription.storeId, copy: true },
      { label: localization.t('labels.productId'), value: subscription?.products[0]?.lineItemId },
    ],
    lifecycle: [
      { label: localization.t('labels.lifecycleId'), value: subscription?.lifecycle?.id, copy: true },
      { label: localization.t('labels.status'), value: subscription?.lifecycle?.status },
      { label: localization.t('labels.modelId'), value: subscription?.lifecycle?.modelId, copy: true },
      { label: localization.t('labels.creationDate'), value: moment(subscription?.lifecycle?.creationDate).format('YYYY-MM-DD') },
      { label: localization.t('labels.anniversaryDate'), value: moment(subscription?.lifecycle?.anniversaryDate).format('YYYY-MM-DD') },
      { label: localization.t('labels.paymentDeadline'), value: moment(subscription?.lifecycle?.paymentDeadline).format('YYYY-MM-DD') },
      { label: localization.t('labels.numDaysBeforeAnniversary'), value: subscription?.lifecycle?.daysBeforeAnniversary },
      { label: localization.t('labels.nextBillingDate'), value: moment(subscription?.lifecycle?.nextBillingDate).format('YYYY-MM-DD') },
    ],
  };

  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  const RowItem = ({ it }) => (
    <Grid container className='subsDetailsRow'>
      <Grid item md={6} xs={6}>
        <Box p={2} fontWeight={500}>{it.label}</Box>
      </Grid>

      <Grid item md={6} xs={6}>
        <Box display="flex" alignItems='center'>
          <Box p={2} className="rowValue">{it.value}</Box>
          {it.copy && <Box px={2}><FileCopyIcon onClick={() => makeCopy(it.value)} style={{ marginLeft: '5px' }} color="secondary" /></Box>}
        </Box>
      </Grid>
    </Grid>
  );

  return (
    <div className="subscription-details-screen">
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Box my={3} bgcolor='#fff' boxShadow={2} height='100%'>
            <Box py={3} pl={2}>
              <Typography gutterBottom variant='h4'>
                {localization.t('labels.general')}
              </Typography>
            </Box>

            {generated.general.map((it) => <RowItem it={it} key={`${it.label}general`} />)}
          </Box>
        </Grid>

        <Grid item md={6} xs={12}>
          <Box my={3} bgcolor='#fff' boxShadow={2} height='100%'>
            <Box py={3} pl={2}>
              <Typography gutterBottom variant='h4'>
                {localization.t('labels.lifecycle')}
              </Typography>
            </Box>

            {generated.lifecycle.map((it) => <RowItem it={it} key={`${it.label}lifecycle`} />)}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
SubscriptionDetailsView.propTypes = {
  subscription: PropTypes.object,
  customerName: PropTypes.string,
};
export default SubscriptionDetailsView;
