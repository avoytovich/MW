import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import { toast } from 'react-toastify';

import SelectCustom from '../../Inputs/SelectCustom';
import { orderCancelAction } from '../../../services/selectOptions/selectOptions';
import localization from '../../../localization';
import api from '../../../api';

const CancelOrderPopup = ({ currentOrderData }) => {
  const [open, setOpen] = useState(false);
  const [cancelOrderReason, setCancelOrderReason] = useState('');

  const cancelOrder = () => {
    api
      .cancelOrder(currentOrderData.id, cancelOrderReason)
      .then(() => toast(localization.t('general.updatesHaveBeenSaved')));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button fullWidth display='flex' color='inherit' onClick={(e) => { e.stopPropagation(); handleClickOpen(); }}>
        {localization.t('forms.text.cancelOrder')}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogContent>
          <DialogContentText color='inherit'>
            {localization.t('forms.text.cancelOrderPopupText')}
          </DialogContentText>

          <SelectCustom
            selectOptions={orderCancelAction}
            value={cancelOrderReason}
            onChangeSelect={(e) => {
              setCancelOrderReason(e.target.value);
            }}
            label='cancelOrder'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            {localization.t('forms.buttons.resyncPaymentsNo')}
          </Button>
          <Button
            onClick={() => {
              handleClose();
              cancelOrder();
            }}
            color='primary'
          >
            {localization.t('forms.buttons.resyncPaymentsConfirmed')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

CancelOrderPopup.propTypes = {
  currentOrderData: PropTypes.object,
};

export default CancelOrderPopup;
