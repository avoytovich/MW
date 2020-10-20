// ToDo: localize texts
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from '@material-ui/core';

import CustomCard from '../../components/utils/CustomCard';
import { usePrivilegesData, useRolesData, useMetaRolesData } from '../../services/useData';

const RightsDetails = ({ initIdentity, identity, changeIdentity }) => {
  const privileges = usePrivilegesData();
  const roles = useRolesData();
  const metaRoles = useMetaRolesData();

  const [curPrivileges, setPriveleges] = useState(null);

  const setupPrivileges = () => {
    const newPrivileges = [];

    const filteredRoles = roles.items.filter((item) => identity?.roleIds?.indexOf(item.id) >= 0);

    filteredRoles.forEach((role) => {
      role.rights.forEach((right) => {
        if (newPrivileges.indexOf(right.serviceName) < 0) {
          newPrivileges.push(right.serviceName);
        }
      });
    });

    setPriveleges(newPrivileges);
  };

  const handleChange = (id, type) => {
    const newIdentity = { ...identity };

    if (!newIdentity[type]) {
      newIdentity[type] = [id];
    } else if (newIdentity[type].indexOf(id) >= 0) {
      newIdentity[type] = newIdentity[type].filter((v) => v !== id);

      if (!newIdentity[type].length && !initIdentity[type]) {
        delete newIdentity[type];
      }
    } else {
      newIdentity[type] = [...newIdentity[type], id];

      const [hasDifferent] = newIdentity[type].filter((v) => initIdentity[type]?.indexOf(v) < 0);
      if (!hasDifferent && newIdentity[type].length === initIdentity[type]?.length) {
        newIdentity[type] = [...initIdentity[type]];
      }
    }

    changeIdentity(newIdentity);
  };

  useEffect(() => {
    if (roles) {
      setupPrivileges();
    }

    return () => setPriveleges(null);
  }, [identity, roles]);

  return (
    <Box display='flex' mx={-3}>
      <CustomCard title='Privileges' width={1 / 3} mx={3}>
        <Box display='flex' flexDirection='column' py={1}>
          {privileges && curPrivileges !== null ? privileges.items.map((privilage) => (
            <FormControlLabel
              key={privilage.id}
              control={(
                <Checkbox
                  name={privilage.serviceName}
                  color='primary'
                  checked={curPrivileges.indexOf(privilage.serviceName) >= 0}
                  disabled
                />
              )}
              label={privilage.serviceName}
            />
          )) : <Box pt={2} display='flex' justifyContent='center'><CircularProgress size={26} /></Box>}
        </Box>
      </CustomCard>

      <CustomCard title='Roles' width={1 / 3} mx={3}>
        <Box display='flex' flexDirection='column' py={1}>
          {roles ? roles.items.map((role) => (
            <FormControlLabel
              key={role.id}
              control={(
                <Checkbox
                  name={role.serviceName}
                  checked={identity?.roleIds?.indexOf(role.id) >= 0}
                  onChange={() => handleChange(role.id, 'roleIds')}
                  color='primary'
                />
              )}
              label={role.name}
            />
          )) : <Box pt={2} display='flex' justifyContent='center'><CircularProgress size={26} /></Box>}
        </Box>
      </CustomCard>

      <CustomCard title='Meta-roles' width={1 / 3} mx={3}>
        <Box display='flex' flexDirection='column' py={1}>
          {metaRoles ? metaRoles.items.map((meta) => (
            <FormControlLabel
              key={meta.id}
              control={(
                <Checkbox
                  name={meta.serviceName}
                  checked={identity?.metaRoleIds?.indexOf(meta.id) >= 0}
                  onChange={() => handleChange(meta.id, 'metaRoleIds')}
                  color='primary'
                />
              )}
              label={meta.name}
            />
          )) : <Box pt={2} display='flex' justifyContent='center'><CircularProgress size={26} /></Box>}
        </Box>
      </CustomCard>
    </Box>
  );
};

RightsDetails.propTypes = {
  identity: PropTypes.object,
  initIdentity: PropTypes.object,
  changeIdentity: PropTypes.func,
};

export default RightsDetails;
