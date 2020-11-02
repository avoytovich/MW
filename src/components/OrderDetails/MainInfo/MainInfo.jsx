import React from 'react';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import formatDate from '../../../services/dateFormatting';
import './MainInfo.scss';

const MainInfo = ({ orderData, customer }) => (
  <Box
    pb={5}
    pl={7}
    display="flex"
    flexDirection="column"
    className="mainContainer"
  >
    <Box
      pb={10}
      justifyContent="space-between"
      display="flex"
      flexDirection="row"
      alignItems="flex-end"
    >
      <Box
        className="mainRow"
        pb={20}
        pt={7}
        display="flex"
        flexDirection="column"
      >
        <Box>
          <Typography variant="h1">{orderData.id}</Typography>
        </Box>
        <Box>
          <Typography variant="h1">{customer}</Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        className="mainRow"
        flexDirection="column"
        flexWrap="nowrap"
      >
        <Box
          width="100%"
          flexWrap="nowrap"
          className="odd"
          display="flex"
          flexDirection="row"
        >
          <Box width="40%" pr={4} pt="7px" pl="4px">
            <Typography color="secondary" variant="body2">
              {localization.t('labels.status')}
            </Typography>
          </Box>
          <Box width="60%">
            <Typography color="secondary" variant="body2">
              {orderData.status}
            </Typography>
          </Box>
        </Box>
        <Box
          width="100%"
          flexWrap="nowrap"
          className="odd"
          display="flex"
          flexDirection="row"
        >
          <Box width="40%" pr={4} pt="7px" pl="4px">
            <Typography color="secondary" variant="body2">
              {localization.t('labels.amount')}
            </Typography>
          </Box>
          <Box width="60%">
            <Typography>{orderData.lineItems[0]?.amount}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      pb={5}
      justifyContent="space-between"
    >
      <Box
        width="100%"
        flexWrap="nowrap"
        className="even"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.store')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography>{orderData.store.name}</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="even"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.paymentID')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography>
            {orderData.processingEvent[0]?.metadata?.paymentId}
          </Typography>
        </Box>
      </Box>

      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.fulfillment')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography>
            {orderData?.lineItems[0]?.fulfillmentProcessingStatus}
          </Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.paymentStatus')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography>{orderData.payment?.status}</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.subscription')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography>
            {orderData.lineItems[0]?.subscriptionProcessingStatus}
          </Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.creationDate')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography color="secondary" variant="body2">
            {formatDate(orderData.createDate)}
          </Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.lastUpdate')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography color="secondary" variant="body2">
            {formatDate(orderData.updateDate)}
          </Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.updateReason')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography>{orderData.lastUpdateReason}</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.emailDate')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography color="secondary" variant="body2">
            {orderData.emails &&
              formatDate(
                orderData.emails[orderData?.emails?.length - 1].createDate,
              )}
          </Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.invoiceDate')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography color="secondary" variant="body2">
            {formatDate(orderData.invoice?.date)}
          </Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.companyName')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography>{orderData.endUser?.company?.companyName}</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.address')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography>{orderData.endUser?.streetAddress}</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.zipCode')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography>{orderData.endUser?.zipCode}</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.country')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography>{orderData.endUser?.country}</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.transactionID')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography>{orderData.payment?.transactionId}</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.installments')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography>{orderData.maxPaymentsParts}</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        flexWrap="nowrap"
        className="odd"
        display="flex"
        flexDirection="row"
      >
        <Box width="40%" pr={4} pt="7px" pl="4px">
          <Typography color="secondary" variant="body2">
            {localization.t('labels.paymentDeadline')}
          </Typography>
        </Box>
        <Box width="60%">
          <Typography>{orderData.paymentDeadline}</Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

MainInfo.propTypes = {
  orderData: PropTypes.object,
  customer: PropTypes.string,
};

export default MainInfo;
