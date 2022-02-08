import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';

import SelectCustom from '../../Inputs/SelectCustom';
import { orderCancelAction } from '../../../services/selectOptions/selectOptions';
import localization from '../../../localization';
import api from '../../../api';

const CancelOrderPopup = ({ currentOrderData }) => {
  const [open, setOpen] = useState(false);
  const [cancelOrderReason, setCancelOrderReason] = useState(orderCancelAction[6].id);

  const cancelOrder = () => {
    api
      .cancelOrder(currentOrderData.id, currentOrderData.dbVersion, cancelOrderReason)
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
      <Typography style={{ textAlign: 'center', width: ' 100% ' }} onClick={(e) => { e.stopPropagation(); handleClickOpen(); }}>
        {localization.t('forms.text.cancelOrder')}
      </Typography>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogContent>
          <DialogContentText color='inherit'>
            {localization.t('forms.text.cancelOrderPopupText')}
          </DialogContentText>
          <Box pt={4}>
            <SelectCustom
              selectOptions={orderCancelAction}
              value={cancelOrderReason}
              onChangeSelect={(e) => {
                setCancelOrderReason(e.target.value);
              }}
              label='cancelOrder'
            />

          </Box>
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
