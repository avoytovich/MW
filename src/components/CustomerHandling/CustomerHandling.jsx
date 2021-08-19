import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import ContactsIcon from '@material-ui/icons/Contacts';
import { setNexwayState } from '../../redux/actions/Account';
import api from '../../api';

import '../../styles/main.scss';

const CustomerHandling = () => {
  const dispatch = useDispatch();
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const accountId = useSelector(({ account: { user } }) => user.customerId);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  useEffect(() => {
    api.getCustomers().then(({ data: { items } }) => {
      setCustomers([...items]);
    });
  }, []);

  useEffect(() => {
    if (search) {
      api
        .getCustomers({ page: 0, filters: `&name=${search}*`, sortParams: 'name' })
        .then(({ data: { items } }) => {
          setCustomers([...items]);
        });
    }
  }, [search]);

  useEffect(() => setSearch(nxState?.selectedCustomer?.name || ''), [nxState]);

  const changeCustomer = async (e, newCustomer) => {
    e.persist();

    const setNewState = async (newItem) => {
      const newState = {
        ...nxState,
        selectedCustomer: { ...newItem, group_type: 'Current' },
      };

      if (nxState?.selectedCustomer?.id !== newItem?.id) {
        if (nxState?.recentCustomers) {
          if (newItem) {
            newState.recentCustomers = [
              ...nxState.recentCustomers.filter((c) => c.id !== newItem.id),
            ];
          }

          if (nxState?.selectedCustomer?.id) {
            newState.recentCustomers.unshift({
              ...nxState.selectedCustomer,
              group_type: 'Recent',
            });
          }

          if (nxState.recentCustomers.length === 4) {
            newState.recentCustomers.pop();
          }
        } else if (nxState?.selectedCustomer?.id) {
          newState.recentCustomers = [
            { ...nxState.selectedCustomer, group_type: 'Recent' },
          ];
        }
      }

      dispatch(setNexwayState(newState));
    };

    setNewState(newCustomer);
  };

  const toFilter = (arr) => {
    const newArr = [...arr];

    if (nxState?.selectedCustomer?.id) {
      newArr.unshift({ ...nxState?.selectedCustomer });
    } else {
      newArr.unshift({ id: accountId, name: accountId, group_type: 'Account' });
    }

    if (search.length < 1) {
      return [{ id: accountId, name: accountId, group_type: 'Account' }];
    }

    return newArr.filter(
      (cust) => cust?.name?.toLowerCase().indexOf(search?.toLowerCase()) >= 0,
    );
  };

  const filteredArr = toFilter(customers);
  const autoOptions = filteredArr.length
    ? [...filteredArr]
    : [{ id: 'none', name: 'No Results' }];

  if (nxState?.recentCustomers) {
    autoOptions.unshift(...nxState.recentCustomers);
  }

  return (
    customers && (
      <Box
        width="100%"
        m="auto"
        mb="20px"
        p="0 3px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className="customers-handling"
      >
        <ContactsIcon color="primary" width="10%" />

        <Autocomplete
          id="customers-select"
          options={autoOptions}
          inputValue={search}
          value={nxState?.selectedCustomer?.id || null}
          getOptionSelected={(option) => option.id === nxState?.selectedCustomer?.id}
          getOptionDisabled={(option) => option.id === 'none'}
          onChange={changeCustomer}
          disableClearable={!search}
          filterOptions={(opts) => opts}
          groupBy={(option) => option.group_type || 'Search'}
          getOptionLabel={(option) => option.name || ''}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label={search?.length ? 'Customer' : 'All Customers'}
              onChange={(e) => {
                e.persist();
                setSearch(e.target.value);
              }}
              name='customer-search'
              placeholder="Search..."
              variant="filled"
            />
          )}
        />
      </Box>
    )
  );
};

export default CustomerHandling;
