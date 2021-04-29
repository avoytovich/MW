import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Zoom, Button, Tabs, Tab, Breadcrumbs, LinearProgress } from '@material-ui/core';
import SelectCustomerNotification from '../../../components/utils/SelectCustomerNotification';
import {
  addDenialOptions,
  formPrivilegeOptions,
  requiredFields,
  formattingForSending,
} from './utils';
import SectionLayout from '../../../components/SectionLayout';
import CustomBreadcrumbs from '../../../components/utils/CustomBreadcrumbs';
import localization from '../../../localization';
import General from './SubSections/General'
import Clearances from './SubSections/Clearances';
import { showNotification } from '../../../redux/actions/HttpNotifications';
import api from '../../../api';

const RoleDetailScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const [update, setUpdate] = useState(0);
  const [curTab, setCurTab] = useState(0);
  const [role, setRole] = useState(null);
  const [curRole, setCurRole] = useState(null);
  const [selectOptions, setSelectOptions] = useState({
    conditionsOfAvailability: null,
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
      api.getConditionsOfAvailability(),
      api.getPrivileges(),
    ]).then(([conditionsOfAvailabilityOptions, clearancesOptions]) => {
      const clearances = formPrivilegeOptions(
        clearancesOptions.value?.data.items,
      );
      setSelectOptions({
        ...selectOptions,
        conditionsOfAvailability:
          addDenialOptions(conditionsOfAvailabilityOptions.value?.data) || [],
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

  if (id === 'add' && !nxState.selectedCustomer.id)
    return <SelectCustomerNotification />;
  return (
    <div>
      {id !== 'add' && (
        <Box mx={2}>
          <CustomBreadcrumbs
            url='/settings/administration/roles'
            section={localization.t('labels.roles')}
            id={curRole?.id}
          />
        </Box>
      )}
      <Box
        display='flex'
        flexDirection='row'
        mt={2}
        mx={2}
        justifyContent='space-between'
      >
        <Box alignSelf='center'>
          <Typography gutterBottom variant='h3'>
            {id !== 'add'
              ? curRole?.name
              : `${localization.t('general.new')} ${localization.t(
                'labels.role',
              )}`}
          </Typography>
        </Box>
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
      </Box>
      <Box my={2} bgcolor="#fff">
        <Tabs
          value={curTab}
          onChange={(e, newTab) => setCurTab(newTab)}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label={`${localization.t('labels.general')}`} />
          <Tab label={`${localization.t('labels.clearances')}`} />
        </Tabs>
      </Box>
      {curTab === 0 && (
        <SectionLayout label='general'>
          <General
            setCurRole={setCurRole}
            curRole={curRole}
          /></SectionLayout>
      )}
      {curTab === 1 && (
        <SectionLayout label='clearances'>
          <Clearances
            setCurRole={setCurRole}
            curRole={curRole}
            selectOptions={selectOptions}
          />
        </SectionLayout>)}
    </div>
  );
};

export default RoleDetailScreen;
