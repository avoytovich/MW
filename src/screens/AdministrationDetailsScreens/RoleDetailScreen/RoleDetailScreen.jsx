import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Typography,
  Box,
  Zoom,
  Button,
  Tabs,
  Tab,
  LinearProgress,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import SelectCustomerNotification from '../../../components/utils/SelectCustomerNotification';
import {
  formattingForSending,
} from './utils';
import useRoleDetailsData from '../../../services/useData/useRoleDetailsData';
import SectionLayout from '../../../components/SectionLayout';
import CustomBreadcrumbs from '../../../components/utils/CustomBreadcrumbs';
import localization from '../../../localization';
import General from './SubSections/General';
import Clearances from './SubSections/Clearances';
import api from '../../../api';

const RoleDetailScreen = () => {
  const { id } = useParams();
  const [curTab, setCurTab] = useState(0);
  const history = useHistory();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    hasChanges,
    setUpdate,
    curRole,
    setCurRole,
    selectOptions,
  } = useRoleDetailsData(id, nxState);

  const handleSave = () => {
    const objToSend = formattingForSending(curRole);
    if (id === 'add') {
      api.addNewRole(objToSend).then((res) => {
        const location = res.headers.location.split('/');
        const newId = location[location.length - 1];
        toast(localization.t('general.updatesHaveBeenSaved'));
        history.push(`/settings/administration/roles/${newId}`);
        setUpdate((u) => u + 1);
      });
    } else {
      api
        .updateRoleById(id, objToSend)
        .then(() => {
          toast(localization.t('general.updatesHaveBeenSaved'));
          setUpdate((u) => u + 1);
        });
    }
  };

  if (curRole === null) return <LinearProgress />;

  if (id === 'add' && !nxState.selectedCustomer.id) return <SelectCustomerNotification />;
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
          />
        </SectionLayout>
      )}
      {curTab === 1 && (
        <SectionLayout label='clearances'>
          <Clearances
            setCurRole={setCurRole}
            curRole={curRole}
            selectOptions={selectOptions}
          />
        </SectionLayout>
      )}
    </div>
  );
};

export default RoleDetailScreen;
