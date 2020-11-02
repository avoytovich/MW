import React, { useState } from 'react';
import {
  Box,
  Typography,
  Zoom,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import localization from '../../../localization';
import formatDate from '../../../services/dateFormatting';
import { status, storeNames } from '../../../services/selectOptions';
import './MainInfo.scss';

const MainInfo = ({ orderData, setOrderData, customer }) => {
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);
  const handleDeleteBlock = () => {
    const newData = {
      ...orderData,
    };
    setOrderData(newData);
  };

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
              <Select
                disabled={!editable}
                value={orderData.status}
                onChange={(e) => setOrderData({ ...orderData, status: e.target.value })}
              >
                {status.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
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
              <TextField
                disabled={!editable}
                fullWidth
                multiple
                // onChange={(e) => {
                //   const newArray = [...storeData.routes];
                //   newArray[0] = { ...newArray[0], hostname: e.target.value };
                //   setStoreData({ ...storeData, routes: newArray });
                // }}
                type="text"
                value={orderData.lineItems[0]?.amount}
                inputProps={{ form: { autocomplete: 'off' } }}
              />
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
            <Select
              disabled={!editable}
              value={orderData.store.name}
              // onChange={(e) =>
              //   setStoreData({ ...storeData, defaultLocale: e.target.value })
              // }
            >
              {storeNames.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
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
            <Select
              disabled={!editable}
              value={orderData.processingEvent[0]?.metadata?.paymentId}
              // onChange={(e) =>
              //   setStoreData({ ...storeData, defaultLocale: e.target.value })
              // }
            >
              {storeNames.map((option) => (
                <MenuItem key={option.id} value={option.id}>
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
              {localization.t('labels.fulfillment')}
            </Typography>
          </Box>
          <Box width="60%">
            <Select
              disabled={!editable}
              value={orderData?.lineItems[0]?.fulfillmentProcessingStatus}
              // onChange={}
            >
              {status.map((option) => (
                <MenuItem key={option.id} value={option.id}>
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
              {localization.t('labels.paymentStatus')}
            </Typography>
          </Box>
          <Box width="60%">
            <Select
              disabled={!editable}
              value={orderData.payment?.status}
              // onChange={}
            >
              {status.map((option) => (
                <MenuItem key={option.id} value={option.id}>
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
              {localization.t('labels.subscription')}
            </Typography>
          </Box>
          <Box width="60%">
            <TextField
              disabled={!editable}
              fullWidth
              // onChange={}
              type="text"
              value={orderData.lineItems[0]?.subscriptionProcessingStatus}
              inputProps={{ form: { autocomplete: 'off' } }}
            />
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
            <TextField
              disabled={!editable}
              fullWidth
              // onChange={}
              type="text"
              value={orderData.lastUpdateReason}
              inputProps={{ form: { autocomplete: 'off' } }}
            />
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
              {orderData.emails
                && formatDate(
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
            <TextField
              disabled={!editable}
              fullWidth
              // onChange={}
              type="text"
              value={orderData.endUser?.company?.companyName}
              inputProps={{ form: { autocomplete: 'off' } }}
            />
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
            <TextField
              disabled={!editable}
              fullWidth
              // onChange={}
              type="text"
              value={orderData.endUser?.streetAddress}
              inputProps={{ form: { autocomplete: 'off' } }}
            />
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
            <TextField
              disabled={!editable}
              fullWidth
              // onChange={}
              type="text"
              value={orderData.endUser?.zipCode}
              inputProps={{ form: { autocomplete: 'off' } }}
            />
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
            <TextField
              disabled={!editable}
              fullWidth
              // onChange={}
              type="text"
              value={orderData.endUser?.country}
              inputProps={{ form: { autocomplete: 'off' } }}
            />
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
            <TextField
              disabled={!editable}
              fullWidth
              // onChange={}
              type="text"
              value={orderData.payment?.transactionId}
              inputProps={{ form: { autocomplete: 'off' } }}
            />
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
            <TextField
              disabled={!editable}
              fullWidth
              // onChange={}
              type="text"
              value={orderData.maxPaymentsParts}
              inputProps={{ form: { autocomplete: 'off' } }}
            />
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
            <TextField
              disabled={!editable}
              fullWidth
              // onChange={}
              type="text"
              value={orderData.paymentDeadline}
              inputProps={{ form: { autocomplete: 'off' } }}
            />
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
      <Zoom in={editable}>
        <Box className="actionBlock">
          <DeleteIcon
            color="primary"
            onClick={handleDeleteBlock}
            className="deleteIcon icons"
          />
        </Box>
      </Zoom>
    </Box>
  );
};
MainInfo.propTypes = {
  orderData: PropTypes.object,
  customer: PropTypes.string,
  setOrderData: PropTypes.func,
};

export default MainInfo;
