import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Zoom, Button, Tabs, Tab, Breadcrumbs } from '@material-ui/core';
import CustomBreadcrumbs from '../../../components/utils/CustomBreadcrumbs';
import SectionLayout from '../../../components/SectionLayout';

import SelectCustomerNotification from '../../../components/utils/SelectCustomerNotification';
import { requiredFields, structureSelectOptions } from './utils';
import localization from '../../../localization';
import { showNotification } from '../../../redux/actions/HttpNotifications';
import api from '../../../api';
import General from './SubSections/General'
import Clearances from './SubSections/Clearances';

const MetaRoleDetailScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);
  const [update, setUpdate] = useState(0);

  const [metaRole, setMetaRole] = useState(null);
  const [curMetaRole, setCurMetaRole] = useState(null);
  const [selectOptions, setSelectOptions] = useState({
    roles: null,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const handleSave = () => {
    if (id === 'add') {
      api.addNewMetaRole(curMetaRole).then((res) => {
        const location = res.headers.location.split('/');
        const id = location[location.length - 1];
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        history.push(`/settings/administration/metaRoles/${id}`);
        setUpdate((u) => u + 1);
      });
    } else {
      api.updateMetaRoleById(id, curMetaRole).then(() => {
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        setUpdate((u) => u + 1);
      });
    }
  };

  useEffect(() => {
    let metaRole;
    if (id === 'add') {
      metaRole = Promise.resolve({
        data: { customerId: nxState.selectedCustomer.id },
      });
    } else {
      metaRole = api.getMetaRoleById(id);
    }
    metaRole.then(({ data }) => {
      const checkedMetaRole = requiredFields(data);
      setMetaRole(JSON.parse(JSON.stringify(checkedMetaRole)));
      setCurMetaRole(JSON.parse(JSON.stringify(checkedMetaRole)));
    });
    api.getRoles().then(({ data }) => setSelectOptions({
      ...selectOptions,
      roles: structureSelectOptions(data.items) || [],
    }));
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curMetaRole) !== JSON.stringify(metaRole));

    return () => setHasChanges(false);
  }, [curMetaRole]);

  if (id === 'add' && !nxState.selectedCustomer.id)
    return <SelectCustomerNotification />;

  return (

    <div>
      {id !== 'add' && (
        <Box mx={2}>
          <CustomBreadcrumbs
            url='/settings/administration/metaRoles'
            section={localization.t('labels.metaRoles')}
            id={curMetaRole?.id}
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
              ? metaRole?.name
              : `${localization.t('general.new')} ${localization.t(
                'labels.metaRole',
              )}`}
          </Typography>

        </Box>
        <Zoom in={hasChanges}>
          <Button
            disabled={!curMetaRole?.name}
            id='save-metaRole-button'
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
      <Box ml={2} pb={2}>
        <Breadcrumbs color='secondary' aria-label='breadcrumb'>
          <Typography color='primary'>
            {localization.t('labels.customerId')}
          </Typography>
          <Typography color='secondary'>
            {curMetaRole?.customerId}
          </Typography>
        </Breadcrumbs>
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
        < SectionLayout label='general'>
          <General
            setCurMetaRole={setCurMetaRole}
            curMetaRole={curMetaRole}
          /></SectionLayout>
      )}
      {curTab === 1 && (
        < SectionLayout label='clearances'>
          <Clearances
            setCurMetaRole={setCurMetaRole}
            curMetaRole={curMetaRole}
            selectOptions={selectOptions}
          />
        </ SectionLayout>)}
    </div>
  );
};

export default MetaRoleDetailScreen;
