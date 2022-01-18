import React, { useState } from 'react';
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, Typography, Box,
} from '@mui/material';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import localization from '../../../localization';

import api from '../../../api';

const ConfirmationPopup = ({
  currentOrderData,
  template,
  popupLabel,
}) => {
  const label = localization.t(`forms.text.${popupLabel}`);
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState({
    to: currentOrderData?.endUser.email,
    template,
  });

  const sendConfirmationMailAgain = () => {
    api
      .sendConfirmationMail(currentOrderData.id, confirmation)
      .then(() => toast(localization.t('general.updatesHaveBeenSaved')));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography color="inherit" onClick={handleClickOpen}>
        {localization.t(`forms.text.${popupLabel}`)}
      </Typography>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText color="inherit">
            {`${label} ${localization.t('general.onTheFollowingEmailAddress')}`}
          </DialogContentText>
          <Box pt={4}>
            <TextField
              autoFocus
              value={confirmation.to || ''}
              onChange={(e) => setConfirmation({ ...confirmation, to: e.target.value })}
              size='small'
              id="name"
              type="email"
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {localization.t('forms.buttons.confirmationEmailCancel')}
          </Button>
          <Button onClick={() => { handleClose(); sendConfirmationMailAgain(); }} color="primary">
            {localization.t('forms.buttons.confirmationEmailSend')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmationPopup.propTypes = {
  currentOrderData: PropTypes.object,
  template: PropTypes.string,
  popupLabel: PropTypes.string,
};

export default ConfirmationPopup;
