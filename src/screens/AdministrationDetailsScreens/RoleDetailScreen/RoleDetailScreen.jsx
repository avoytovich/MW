import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress, Zoom, Button } from '@material-ui/core';

import SelectCustomerNotification from '../../../components/utils/SelectCustomerNotification';
import ClearancesInputs from './ClearancesInputs';
import {
  addDenialOptions,
  formPrivilegeOptions,
  requiredFields,
  formattingForSending,
} from './utils';
import localization from '../../../localization';
import { SelectWithChip, InputCustom } from '../../../components/Inputs';
import { showNotification } from '../../../redux/actions/HttpNotifications';
import api from '../../../api';

const RoleDetailScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [update, setUpdate] = useState(0);

  const [role, setRole] = useState(null);
  const [curRole, setCurRole] = useState(null);
  const [selectOptions, setSelectOptions] = useState({
    conditionsOfAvailabilty: null,
    privileges: null,
    serviceNames: null,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const handleSave = () => {
    const objToSend = formattingForSending(curRole);
    if (id === 'add') {
      api.addNewRole(objToSend).then((res) => {
        const location = res.headers.location.split('/');
        const id = location[location.length - 1];
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        history.push(`/settings/administration/metaRoles/${id}`);
        setUpdate((u) => u + 1);
      });
    } else {
      api.updateRoleById(id, objToSend).then(() => {
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        setUpdate((u) => u + 1);
      });
    }
  };

  useEffect(() => {
    let role;
    if (id === 'add') {
      role = Promise.resolve({
        data: { customerId: nxState.selectedCustomer.id },
      });
    } else {
      role = api.getRoleById(id);
    }
    role.then(({ data }) => {
      const checkedRole = requiredFields(data);
      setRole(JSON.parse(JSON.stringify(checkedRole)));
      setCurRole(JSON.parse(JSON.stringify(checkedRole)));
    });
    Promise.allSettled([
      api.getConditionsOfAvailabilty(),
      api.getPrivileges(),
    ]).then(([ConditionsOfAvailabiltyOptions, clearancesOptions]) => {
      const clearances = formPrivilegeOptions(
        clearancesOptions.value?.data.items,
      );
      setSelectOptions({
        ...selectOptions,
        conditionsOfAvailabilty:
          addDenialOptions(ConditionsOfAvailabiltyOptions.value?.data) || [],
        privileges: clearances.privileges || [],
        serviceNames: clearances.serviceNames || [],
      });
    });
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curRole) !== JSON.stringify(role));

    return () => setHasChanges(false);
  }, [curRole]);

  if (curRole === null) return <LinearProgress />;

  if (id === 'add' && !nxState.selectedCustomer.id) return <SelectCustomerNotification />;
  return (
    <div>
      <Zoom in={hasChanges}>
        <Button
          disabled={!curRole.name}
          id='save-role-button'
          color='primary'
          size='large'
          type='submit'
          variant='contained'
          onClick={handleSave}
        >
          {localization.t('general.save')}
        </Button>
      </Zoom>
      <InputCustom
        label='reasonForCurrentChange'
        value={curRole.reason}
        onChangeInput={(e) => setCurRole({ ...curRole, reason: e.target.value })}
      />
      <InputCustom
        label='name'
        value={curRole.name}
        onChangeInput={(e) => setCurRole({ ...curRole, name: e.target.value })}
        isRequired
      />
      <InputCustom
        label='description'
        isMultiline
        value={curRole.description}
        onChangeInput={(e) => setCurRole({ ...curRole, description: e.target.value })}
      />
      <SelectWithChip
        label='conditionsOfAvailabilty'
        value={curRole.availabilityConditions}
        selectOptions={selectOptions.conditionsOfAvailabilty}
        onChangeSelect={(e) => setCurRole({
          ...curRole,
          availabilityConditions: e.target.value,
        })}
        onClickDelIcon={(chip) => {
          const newValue = [...curRole.availabilityConditions].filter(
            (val) => val !== chip,
          );
          setCurRole({
            ...curRole,
            availabilityConditions: newValue,
          });
        }}
      />
      <ClearancesInputs
        setCurRole={setCurRole}
        curRole={curRole}
        selectOptions={selectOptions}
      />
    </div>
  );
};

export default RoleDetailScreen;
