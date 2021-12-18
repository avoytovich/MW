import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Chip,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Tabs,
  Tab,
} from '@material-ui/core';

import { toast } from 'react-toastify';
import localization from '../../localization';
import api from '../../api';
import { tabLabels } from './utils';
import Products from './SubSections/Products';
import Events from './SubSections/Events';
import StripedDetailSection from '../../components/StripedDetailSection';
import ConfirmationPopup from '../../components/Popup/ConfirmationPopup/index';
import CancelOrderPopup from '../../components/Popup/CancelOrderPopup/index';
import { emptyValue } from '../../services/useData/tableMarkups/orderDetails';

import './orderDetailsScreen.scss';

const OrderDetailsView = ({
  orderData,
  currentOrderData,
  customer,
  orderRows,
  id,
}) => {
  const [curTab, setCurTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const resyncPayment = () => {
    api
      .resyncPayments(currentOrderData.id)
      .then(() => toast(localization.t('general.updatesHaveBeenSaved')));
  };

  return (
    <>
      <Box position='sticky' top='90px' bgcolor='#f9f9f9' zIndex='2'>
        <Box display='flex' flexDirection='row' justifyContent='space-between'>
          <Box display='flex' flexDirection='column'>
            <Box display='flex' alignItems='center'>
              {customer && (
                <>
                  <Box p={2}>
                    <Typography variant='body2' gutterBottom>
                      {customer.name}
                    </Typography>
                  </Box>
                  <Chip
                    label={customer.status === 'RUNNING' ? 'LIVE' : 'TEST'}
                    style={{
                      backgroundColor:
                        customer.status === 'RUNNING' ? '#99de90' : '',
                      color: '#fff',
                    }}
                  />
                </>
              )}
            </Box>
          </Box>

          <Box display='flex' alignItems='flex-end'>
            <Button
              aria-haspopup='true'
              variant='contained'
              color='primary'
              aria-controls='checkoutMenu'
              onClick={handleClick}
              size='large'
            >
              {localization.t('forms.buttons.actions')}
            </Button>
            <Menu
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem><ConfirmationPopup currentOrderData={currentOrderData} id={id} /></MenuItem>
              <MenuItem onClick={resyncPayment}>
                <Button color="inherit" fullWidth>{localization.t('forms.buttons.resyncPayments')}</Button>
              </MenuItem>
              <MenuItem><CancelOrderPopup currentOrderData={currentOrderData} id={id} /></MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
      <Box my={2} bgcolor='#fff'>
        <Tabs
          value={curTab}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            setCurTab(newValue);
          }}
          aria-label='disabled tabs example'
        >
          {tabLabels.map((tab) => (
            <Tab key={tab} label={localization.t(`labels.${tab}`)} />
          ))}
        </Tabs>
      </Box>
      {curTab === 0
        && (
          <StripedDetailSection
            emptyValue={emptyValue}
            xsValue={12}
            mdValue={4}
            sectionsData={orderRows}
          />
        )}
      {curTab === 1 && <Products orderData={orderData} />}
      {curTab === 2 && <Events orderData={orderData} />}
    </>
  );
};
OrderDetailsView.propTypes = {
  orderData: PropTypes.object,
  currentOrderData: PropTypes.object,
  customer: PropTypes.object,
  orderRows: PropTypes.object,
  id: PropTypes.string,
};
export default OrderDetailsView;
