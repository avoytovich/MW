import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { SelectWithDeleteIcon } from '../../components/Inputs';

import parentPaths from '../../services/paths';
import localization from '../../localization';
import api from '../../api';

const CloneTemplatePopup = ({ data, open, handleClose }) => {
  const history = useHistory();
  const [selectedCustomer, setSelectedCustomer] = useState(data?.customerId);
  const [selectedStore, setSelectedStore] = useState(null);
  const [search, setSearch] = useState(data?.customer);
  const [customers, setCustomers] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (search) {
      api
        .getCustomers({ page: 0, filters: `&name=${search}*`, sortParams: 'name' })
        .then(({ data: { items } }) => {
          setCustomers([...items]);
        });
    }
  }, [search]);

  useEffect(() => {
    if (!selectedCustomer) {
      setSelectedStore(null);
      setStores([]);
    } else {
      api
        .getSellingStoreOptions(selectedCustomer)
        .then(({ data: { items } }) => {
          setStores([...items.filter((it) => it?.id !== data?.storeId)]);
        });
    }
  }, [selectedCustomer]);

  const makeClone = () => {
    const cloneData = {
      templateDefinitionId: data?.nexwayDefinition || data.id,
      toCustomerId: selectedCustomer,
    };

    if (selectedStore) {
      cloneData.toStoreId = selectedStore;
    }

    api
      .cloneEmailTemplate(cloneData)
      .then(({ data: _data }) => {
        toast(localization.t('general.templateCloned'));
        history.push(`${parentPaths.emailbuilder}/${_data.id}`);
      });
  };

  const autoOptions = customers.length ? [...customers] : [{ id: 'none', name: 'No Results' }];

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <Box display='flex' height='52px' p='15px' alignItems='center' minWidth='500px'>
        <FileCopyOutlinedIcon color='secondary' />

        <Typography variant='h5' style={{ marginLeft: '10px', fontWeight: '400' }}>
          {localization.t('labels.cloneTemplate')}
          &nbsp;
        </Typography>
        <Typography variant='h5'>{`"${data?.name}"`}</Typography>
      </Box>

      <DialogContent dividers style={{ padding: '34px' }}>
        <Autocomplete
          id="customers-select"
          options={autoOptions}
          inputValue={search}
          value={selectedCustomer || ''}
          getOptionSelected={(option) => option.id === selectedCustomer}
          getOptionDisabled={(option) => option.id === 'none'}
          onChange={(e, newCustomer) => {
            e.persist();
            setSelectedCustomer(newCustomer?.id || '');
            setSearch(newCustomer?.name || '');
          }}
          disableClearable={!search}
          filterOptions={(opts) => opts}
          groupBy={(option) => option.group_type || 'Search'}
          getOptionLabel={(option) => option.name || ''}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label='Customer owning the new template'
              onChange={(e) => {
                e.persist();
                setSearch(e.target.value);
              }}
              name='customer-clone-search'
              placeholder="Search..."
              variant="outlined"
            />
          )}
        />

        <Box mt={2} mb={0}>
          <SelectWithDeleteIcon
            label="storeForTemplate"
            value={selectedStore}
            selectOptions={stores}
            isDisabled={!selectedCustomer}
            onChangeSelect={(e) => setSelectedStore(e.target.value)}
            onClickDelIcon={() => setSelectedStore(null)}
          />

          <Typography variant='h6' color='secondary' style={{ fontWeight: 400, fontStyle: 'italic', paddingLeft: '10px' }}>
            {localization.t('labels.leaveUnset')}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions style={{ justifyContent: 'space-between' }}>
        <Button onClick={handleClose}>{localization.t('forms.buttons.cancel')}</Button>

        <Button
          onClick={() => { makeClone(); handleClose(); }}
          disabled={!selectedCustomer}
          variant='contained'
          color='primary'
        >
          {localization.t('forms.buttons.clone')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CloneTemplatePopup.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default CloneTemplatePopup;
