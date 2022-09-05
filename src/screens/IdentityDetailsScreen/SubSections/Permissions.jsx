import React from 'react';
import {
  LinearProgress,
  Box,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import { SelectWithChip, AutocompleteWithChips } from '../../../components/Inputs';

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
            <AutocompleteWithChips
              data-test='managedCustomers'
              label='managedCustomers'
              arrayValue={curIdentity.authorizedCustomerIds}
              selectOptions={selectOptions.customers}
              onChange={(newValue) => setCurIdentity({
                ...curIdentity,
                authorizedCustomerIds: newValue,
              })}
            />
          </Box>
          <Box p={2}>
            <SelectWithChip
              data-test='roles'
              label='roles'
              value={curIdentity.roleIds}
              selectOptions={selectOptions.roles}
              onChangeSelect={(e) => {
                setCurIdentity({
                  ...curIdentity,
                  roleIds: e.target.value,
                });
              }}
              onClickDelIcon={(chip) => {
                const newValue = [...curIdentity.roleIds].filter(
                  (val) => val !== chip,
                );
                setCurIdentity({
                  ...curIdentity,
                  roleIds: newValue,
                });
              }}
            />
          </Box>
          <Box p={2}>
            <SelectWithChip
              data-test='metaRoles'
              label='metaRoles'
              value={curIdentity.metaRoleIds}
              selectOptions={selectOptions.metaRoles}
              onChangeSelect={(e) => {
                setCurIdentity({
                  ...curIdentity,
                  metaRoleIds: e.target.value,
                });
              }}
              onClickDelIcon={(chip) => {
                const newValue = [...curIdentity.metaRoleIds].filter(
                  (val) => val !== chip,
                );
                setCurIdentity({
                  ...curIdentity,
                  metaRoleIds: newValue,
                });
              }}
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
