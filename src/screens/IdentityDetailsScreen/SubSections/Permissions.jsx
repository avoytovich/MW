import React from 'react';
import {
  LinearProgress,
  Box,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import { AutocompleteMultiple, AutocompleteWithChips } from '../../../components/Inputs';
import api from '../../../api';
import { structureSelectOptions } from '../../../services/helpers/dataStructuring';

const Permissions = ({ curIdentity, setCurIdentity, selectOptions }) => {
  if (curIdentity === null) return <LinearProgress />;

  return (
    !curIdentity?.id
      ? (
        <Box p={2}>
          <Typography>
            {localization.t('tooltips.permissionsCanBeDefinedAfterTheCreationOfTheIdentity')}
          </Typography>
        </Box>
      )
      : (
        <>
          <Box p={2}>
            <Typography>
              {localization.t('general.listOfIdentityCustomers')}
            </Typography>
          </Box>
          <Box p={2}>
            <AutocompleteMultiple
              data-test='managedCustomers'
              label='managedCustomers'
              arrayValue={curIdentity.authorizedCustomerIds}
              selectOptions={selectOptions.customers}
              onChange={(newValue) => setCurIdentity({
                ...curIdentity,
                authorizedCustomerIds: newValue,
              })}
              getAdditionalOptions={(searchValue) => Promise.allSettled([
                api.getCustomerById(searchValue.trim()),
                api.getCustomers({ filters: `&name=*${searchValue}*` }),
              ])
                .then(([idSearch, nameSearch]) => {
                  const res = idSearch.value?.data?.id
                    ? [idSearch.value?.data] : nameSearch.value?.data?.items;
                  return structureSelectOptions({ options: res, optionValue: 'name', adIddToValue: true });
                })}
              getMultipleOptions={(searchValue) => {
                const ids = searchValue.map((item) => `id=${item.trim()}`);
                return api.getCustomersByIds(ids.join('&'))
                  .then(({ data }) => structureSelectOptions({ options: data.items, optionValue: 'name', adIddToValue: true }));
              }}
            />
          </Box>
          <Box p={2}>
            <AutocompleteWithChips
              arrayTypeValue
              data-test='roles'
              label='roles'
              arrayValue={curIdentity.roleIds}
              selectOptions={selectOptions.roles}
              onChange={(newValue) => setCurIdentity({
                ...curIdentity,
                roleIds: newValue,
              })}
            />
          </Box>
          <Box p={2}>
            <AutocompleteWithChips
              arrayTypeValue
              data-test='metaRoles'
              label='metaRoles'
              arrayValue={curIdentity.metaRoleIds}
              selectOptions={selectOptions.metaRoles}
              onChange={(newValue) => setCurIdentity({
                ...curIdentity,
                metaRoleIds: newValue,
              })}
            />
          </Box>
        </>
      )
  );
};
Permissions.propTypes = {
  curIdentity: PropTypes.object,
  setCurIdentity: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default Permissions;
