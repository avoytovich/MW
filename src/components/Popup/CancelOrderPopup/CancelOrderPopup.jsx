import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import SelectCustom from './../../../components/Inputs/SelectCustom';
import { orderCancelAction } from '../../../services/selectOptions/selectOptions';
import PropTypes from 'prop-types';


const CancelOrderPopup = ({ props }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button fullWidth display="flex" justifyContent="flex-start" color="inherit" onClick={handleClickOpen}>
        Cancel Order
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText color="inherit">
            Are you sure you want to cancel Order, and refund payment to the end-user ?
          </DialogContentText>

          <SelectCustom
            selectOptions={orderCancelAction}
            label={'cancelOrder'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleClose} color="primary">
            Yes, confirmed
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
