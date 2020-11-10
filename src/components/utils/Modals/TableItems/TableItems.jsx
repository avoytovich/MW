// ToDo: make a common solutions for table items actions (delete, edit, copy-url)
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  DialogTitle,
  DialogContent,
  FormGroup,
  Typography,
  Grid,
  Box,
} from '@material-ui/core';

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as FileCopyIcon,
} from '@material-ui/icons';

import localization from '../../../../localization';

import api from '../../../../api';
import { showNotification } from '../../../../redux/actions/HttpNotifications';

import './tableItems.scss';

const TableItems = ({ values = [], type, removeItem }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getItemUrl = (id) => `/overview/${type}/${id}`;

  const deleteItem = (id) => {
    const onSuccess = () => {
      removeItem(id, type);
      dispatch(showNotification(localization.t('general.hasBeenSuccessfullyDeleted')));
    };

    if(type === 'products') {
      api.deleteProductById(id).then(onSuccess);
    } else if(type === 'stores') {
      api.deleteStoreById(id).then(onSuccess);
    }
  };

  const goToDetails = (id) => {
    const url = getItemUrl(id);

    history.push(url);
  };

  const copyUrl = (id) => {
    const url = window.location.origin + getItemUrl(id);

    navigator.clipboard.writeText(url).then(() => {
      dispatch(showNotification(localization.t('general.itemURLHasBeenCopied')));
    });
  };

  return (
    <div className='table-items-modal'>
      <DialogTitle id='table-items-dialog-title' disableTypography>
        <Typography variant='h4'>{type}</Typography>
      </DialogTitle>

      <DialogContent dividers>
        <FormGroup style={{ flexWrap: 'nowrap' }}>
          {
            values.length > 0 ? values.map((value) => (
              <Box px={2} key={value.id} className='table-item-row'>
                <Grid container>
                  <Grid container item xs={6} alignItems='center'>
                    <Typography>{value.name}</Typography>
                  </Grid>

                  <Grid container item xs={6} justify='flex-end' alignItems='center' className='action-items'>
                    <Box my={2}>
                      <DeleteIcon className="deleteIcon icons" onClick={() => deleteItem(value.id)} />
                      <EditIcon className="editIcon icons" onClick={() => goToDetails(value.id)} />
                      <FileCopyIcon className="copyIcon icons" onClick={() => copyUrl(value.id)} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )) : (
              <Typography>{localization.t('general.noResults')}</Typography>
            )
          }
        </FormGroup>
      </DialogContent>
    </div>
  );
};

TableItems.propTypes = {
  values: PropTypes.array,
  type: PropTypes.string,
};

export default TableItems;
