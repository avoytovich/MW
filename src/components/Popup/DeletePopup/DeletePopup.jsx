import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton,
} from '@mui/material';

import {
  Delete as DeleteIcon,
} from '@mui/icons-material';

import PropTypes from 'prop-types';
import localization from '../../../localization';

import '../../TableComponent/TableComponent.scss';

const DeletePopup = ({
  id,
  deleteFunc,
  deleteIcon,
  title,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {
        deleteIcon ? (
          <IconButton
            color='secondary'
            onClick={handleClickOpen}
          >
            {deleteIcon}
          </IconButton>
        ) : <DeleteIcon className="deleteIcon icons" onClick={handleClickOpen} />
      }

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText color="inherit">
            {title || localization.t('labels.areYouSureYouWantToDeleteTheStore')}
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
    </>
  );
};

DeletePopup.propTypes = {
  id: PropTypes.string,
  deleteFunc: PropTypes.func,
  deleteIcon: PropTypes.any,
  title: PropTypes.string,
};

export default DeletePopup;
