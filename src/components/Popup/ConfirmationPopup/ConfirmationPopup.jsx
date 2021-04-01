import React, { useState }  from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../localization';

import api from '../../../api';


const ConfirmationPopup = ({ id, currentOrderData }) => {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState({to: currentOrderData.endUser.email, template: "ORDERCONFIRMATION"})


  const sendConfirmationMailAgain = () => {
    api.sendConfirmationMail(id, confirmation).then(() => {
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
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        {localization.t('forms.text.sendConfirmationEmail')}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText color="inherit">
            {localization.t('forms.text.sendConfirmationEmailText')}
          </DialogContentText>
          <TextField
            autoFocus
            value={confirmation.to || ''}
            onChange={(e) => setConfirmation( { ...confirmation, to: e.target.value} )}
            margin="dense"
            id="name"
            label={localization.t('forms.labels.confirmationEmailAddress')}
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {localization.t('forms.buttons.confirmationEmailCancel')}
          </Button>
          <Button onClick={ () => { handleClose(); sendConfirmationMailAgain() }} color="primary">
            {localization.t('forms.buttons.confirmationEmailSend')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmationPopup.propTypes = {
  id: PropTypes.string,
  currentOrderData: PropTypes.object,
};

export default ConfirmationPopup;
