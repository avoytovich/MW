// ToDo: make a common solutions for table items actions (delete, edit, copy-url)
import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  DialogTitle,
  DialogContent,
  FormGroup,
  Typography,
  Grid,
  Divider,
  Box,
} from '@mui/material';

import {
  Edit as EditIcon,
  AddCircle as AddIcon,
  Delete as DeleteIcon,
  FileCopy as FileCopyIcon,
} from '@mui/icons-material';

import { toast } from 'react-toastify';

import localization from '../../../../localization';

import api from '../../../../api';

import './tableItems.scss';

const TableItems = ({
  values = [],
  avail = [],
  type,
  removeItem,
  addItem,
  noDelete,
}) => {
  const history = useHistory();

  const getItemUrl = (id) => {
    const itemType = type === 'parentProducts' ? 'products' : type;
    return `/overview/${itemType}/${id}`;
  };

  const deleteItem = (item) => {
    const onSuccess = () => {
      removeItem(item.id, type);
      toast(localization.t('general.hasBeenSuccessfullyDeleted'));
    };

    if (noDelete) {
      removeItem(item);
    } else if (type === 'products') {
      api.deleteProductById(item.id).then(onSuccess);
    } else if (type === 'stores') {
      api.deleteStoreById(item.id).then(onSuccess);
    }
  };

  const goToDetails = (id) => {
    const url = getItemUrl(id);
    history.push(url);
  };

  const copyUrl = (id) => {
    const url = window.location.origin + getItemUrl(id);

    navigator.clipboard.writeText(url)
      .then(() => toast(localization.t('general.itemURLHasBeenCopied')));
  };

  return (
    <div className="table-items-modal">
      <DialogTitle id="table-items-dialog-title">
        <Typography variant="h4" component='span'>{type}</Typography>
      </DialogTitle>

      <DialogContent dividers>
        <FormGroup style={{ flexWrap: 'nowrap' }}>
          {values.length > 0 ? (
            values.map((value) => (
              <Box px={2} key={value.id} className="table-item-row">
                <Grid container>
                  <Grid container item xs={6} alignItems="center">
                    <Typography>{value.name}</Typography>
                  </Grid>

                  <Grid
                    container
                    item
                    xs={6}
                    justifyContent="flex-end"
                    alignItems="center"
                    className="action-items"
                  >
                    <Box my={2}>
                      <DeleteIcon
                        className="deleteIcon icons"
                        onClick={() => deleteItem(value)}
                      />
                      {value.name !== 'Was removed' && (
                        <>
                          <EditIcon
                            className="editIcon icons"
                            onClick={() => goToDetails(value.id)}
                          />
                          <FileCopyIcon
                            className="copyIcon icons"
                            style={{ marginLeft: '5px' }}
                            onClick={() => copyUrl(value.id)}
                          />
                        </>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))
          ) : (
            <Typography>{localization.t('general.noResults')}</Typography>
          )}

          {avail.length > 0 && (
            <>
              <Divider width="100%" />
              {avail.map((value) => (
                <Box px={2} key={value.id} className="table-item-row">
                  <Grid container>
                    <Grid container item xs={6} alignItems="center">
                      <Typography>{value.name}</Typography>
                    </Grid>

                    <Grid
                      container
                      item
                      xs={6}
                      justifyContent="flex-end"
                      alignItems="center"
                      className="action-items"
                    >
                      <Box my={2}>
                        <AddIcon
                          className="addIcon icons"
                          onClick={() => addItem(value)}
                        />
                        <EditIcon
                          className="editIcon icons"
                          onClick={() => goToDetails(value.id)}
                        />
                        <FileCopyIcon
                          className="copyIcon icons"
                          style={{ marginLeft: '5px' }}
                          onClick={() => copyUrl(value.id)}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </>
          )}
        </FormGroup>
      </DialogContent>
    </div>
  );
};

TableItems.propTypes = {
  values: PropTypes.array,
  avail: PropTypes.array,
  type: PropTypes.string,
  removeItem: PropTypes.func,
  addItem: PropTypes.func,
  noDelete: PropTypes.bool,
};

export default TableItems;
