import React, { useState } from 'react';
import {
  Button, Box, Dialog, DialogActions, DialogContent, DialogContentText,
} from '@material-ui/core';

import {
  Delete as DeleteIcon,
} from '@material-ui/icons';

import PropTypes from 'prop-types';
import localization from '../../../localization';

import '../../TableComponent/TableComponent.scss';

const DeletePopup = ({ id, deleteFunc }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <Box color="inherit" onClick={handleClickOpen}>
        <DeleteIcon className="deleteIcon icons" />
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText color="inherit">
            {localization.t('labels.areYouSureYouWantToDeleteTheStore')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {localization.t('labels.cancel')}
          </Button>
          <Button onClick={() => { handleClose(); deleteFunc(id); }} color="primary">
            {localization.t('labels.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeletePopup.propTypes = {
  id: PropTypes.string,
  deleteFunc: PropTypes.func,
};

export default DeletePopup;
