import React, { useState }  from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import SelectCustom from './../../../components/Inputs/SelectCustom';
import { orderCancelAction } from '../../../services/selectOptions/selectOptions';
import localization from '../../../localization';
import api from '../../../api';

import PropTypes from 'prop-types';


const CancelOrderPopup = ({ currentOrderData, id }) => {
  const [open, setOpen] = useState(false);
  const [cancelOrderReason, setCancelOrderReason] = useState('');

  const cancelOrder = () => {
    api.cancelOrder(currentOrderData.id, cancelOrderReason).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button fullWidth display="flex" color="inherit" onClick={handleClickOpen}>
        {localization.t('forms.text.cancelOrder')}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText color="inherit">
            {localization.t('forms.text.cancelOrderPopupText')}
          </DialogContentText>

          <SelectCustom
            selectOptions={orderCancelAction}
            value={cancelOrderReason}
            onChangeSelect={(e) => {
              setCancelOrderReason(e.target.value)
            }}
            label={'cancelOrder'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {localization.t('forms.buttons.resyncPaymentsNo')}
          </Button>
          <Button onClick={ () => { handleClose(); cancelOrder() }} color="primary">
            {localization.t('forms.buttons.resyncPaymentsConfirmed')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Popup.propTypes = {
//   children: PropTypes.func,
//   text: PropTypes.string,
// };

export default CancelOrderPopup;
