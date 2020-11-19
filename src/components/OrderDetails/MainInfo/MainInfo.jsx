// ToDo: move out and reuse common blocks for procuts/stores/orders details

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Box, Typography, Select, MenuItem, Zoom,
} from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';

import { orderDetailStatus } from '../../../services/selectOptions/selectOptions';
import formatDate from '../../../services/dateFormatting';

import localization from '../../../localization';

import './MainInfo.scss';

const MainInfo = ({
  currentOrderData,
  customer,
  setCurrentOrderData,
  orderData,
}) => {
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);

  useEffect(() => {
    setEditable(false);
  }, [orderData]);
  return (
    <Box
      pb={5}
      pl={7}
      display="flex"
      flexDirection="column"
      className="mainContainer"
      onMouseOver={() => setHoverBlock(true)}
      onMouseLeave={() => setHoverBlock(false)}
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
            <Typography variant="h1">{currentOrderData.id}</Typography>
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
              <Select
                disabled={!editable}
                value={currentOrderData.status}
                disableUnderline
                onChange={(e) => setCurrentOrderData({
                  ...currentOrderData,
                  status: e.target.value,
                })}
              >
                <MenuItem value=" ">
                  <em />
                </MenuItem>
                {orderDetailStatus.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
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
              <Typography>{currentOrderData.lineItems[0]?.amount}</Typography>
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
            <Typography>{currentOrderData.store.name}</Typography>
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
              {currentOrderData.processingEvent[0]?.metadata?.paymentId}
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
              {currentOrderData?.lineItems[0]?.fulfillmentProcessingStatus}
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
            <Typography>{currentOrderData.payment?.status}</Typography>
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
              {currentOrderData.lineItems[0]?.subscriptionProcessingStatus}
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
              {formatDate(currentOrderData.createDate)}
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
              {formatDate(currentOrderData.updateDate)}
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
            <Typography>{currentOrderData.lastUpdateReason}</Typography>
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
              {currentOrderData.emails
                && formatDate(
                  currentOrderData.emails[currentOrderData?.emails?.length - 1]
                    .createDate,
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
              {formatDate(currentOrderData.invoice?.date)}
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
            <Typography>
              {currentOrderData.endUser?.company?.companyName}
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
              {localization.t('labels.address')}
            </Typography>
          </Box>
          <Box width="60%">
            <Typography>{currentOrderData.endUser?.streetAddress}</Typography>
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
            <Typography>{currentOrderData.endUser?.zipCode}</Typography>
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
            <Typography>{currentOrderData.endUser?.country}</Typography>
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
            <Typography>{currentOrderData.payment?.transactionId}</Typography>
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
            <Typography>{currentOrderData.maxPaymentsParts}</Typography>
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
            <Typography>{currentOrderData.paymentDeadline}</Typography>
          </Box>
        </Box>
      </Box>
      <Zoom in={hoverBlock && !editable}>
        <Box className="actionBlock">
          <EditIcon
            color="primary"
            className="editIcon icons"
            onClick={() => setEditable(true)}
          />
        </Box>
      </Zoom>
    </Box>
  );
};

MainInfo.propTypes = {
  setCurrentOrderData: PropTypes.func,
  currentOrderData: PropTypes.object,
  customer: PropTypes.string,
  orderData: PropTypes.object,
};

export default MainInfo;
