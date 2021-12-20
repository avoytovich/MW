/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Box,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';

import { toast } from 'react-toastify';

import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import api from '../../api';
import localization from '../../localization';
import CartDetailsScreenView from './CartDetailsScreenView';

import { tabLabelsView } from './utils';

const CartDetailsScreen = () => {
  const [detailsData, setDetailsData] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [curTab, setCurTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const handleClose = () => setAnchorEl(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const sendByEmail = () => api.sendByEmailByCartId(id)
    .then((data) => {
      if ([200, 201].includes(data.status)) return toast(localization.t('general.sendByEmailByCartIdSuccessed'));
      return toast.error(localization.t('general.sendByEmailByCartIdFailure'));
    })
    .catch((err) => toast.error(localization.t('general.sendByEmailByCartIdFailure')));

  useEffect(() => {
    setLoading(true);
    api.getCartById(id)
      .then((data) => {
        setDetailsData(data.data);
        api.getCustomerById(data.data.customerId)
          .then((res) => setCustomer(res.data));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={`${localization.t('labels.cart')} ${localization.t('labels.id')} ${detailsData?.id}`}
      isLoading={isLoading}
      curParentPath={parentPaths.carts}
      curData={detailsData}
      tabs={{
        curTab,
        setCurTab,
        tabLabels: tabLabelsView,
      }}
      extraActions={(
        <Box display='flex' flexDirection='row' justifyContent='flex-end'>
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
              <MenuItem onClick={sendByEmail}>
                <Button color="inherit" fullWidth>{localization.t('forms.buttons.sendByEmail')}</Button>
              </MenuItem>
              <MenuItem onClick={() => {}}>
                <Button color="inherit" fullWidth disabled>{localization.t('forms.buttons.generateQuote')}</Button>
              </MenuItem>
              <MenuItem onClick={() => {}}>
                <Button
                  color="inherit"
                  target='_blank'
                  href={`https://dev-kasperskyfrance-default.staging.nexway.build/checkout/add?cartid=${id}&layout=default&layoutname=default`}
                  fullWidth
                >
                  {localization.t('forms.buttons.checkout')}
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      )}
      noTabsMargin
    >
      <CartDetailsScreenView
        detailsData={detailsData}
        customer={customer}
        curTab={curTab}
      />
    </DetailPageWrapper>
  );
};

export default CartDetailsScreen;
