import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  LinearProgress,
  Tabs,
  Tab,
  Button,
  Zoom,
  Box,
  Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import General from './SubSections/General';
import Identification from './SubSections/Identification';
import Permissions from './SubSections/Permissions';
import Emails from './SubSections/Emails';
import localization from '../../localization';
import useIdentityDetails from '../../services/useData/useIdentityDetails';
import api from '../../api';
import parentPaths from '../../services/paths';
import SectionLayout from '../../components/SectionLayout';
import './identityDetailsScreen.scss';

const IdentityDetailsScreen = () => {
  const [curTab, setCurTab] = useState(0);
  const { id } = useParams();
  const history = useHistory();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    setUpdate,
    curIdentity,
    isLoading,
    identityType,
    setIdentityType,
    setCurIdentity,
    hasChanges,
    selectOptions,
  } = useIdentityDetails(id, nxState);

  const addSecretKey = () => {
    api.addNewSecretKeyToIdentity(id).then(() => {
      toast(localization.t('general.keyHasBeenAdded'));
      setUpdate((u) => u + 1);
    });
  };
  const removeSecretKey = (secret) => api.deleteIdentitySecretKeyById(id, secret).then(() => {
    toast(localization.t('general.keyHasBeenRemoved'));
    setUpdate((u) => u + 1);
  });
  const saveIdentity = () => {
    const filterBlankKeys = { ...curIdentity };
    Object.keys(filterBlankKeys).forEach((key) => {
      if (!filterBlankKeys[key]) {
        delete filterBlankKeys[key];
      }
    });
    if (id === 'add') {
      api.addNewIdentity(filterBlankKeys).then((res) => {
        const location = res.headers.location.split('/');
        const identityId = location[location.length - 1];
        toast(localization.t('general.updatesHaveBeenSaved'));
        history.push(`${parentPaths.users}/${identityId}`);
        setUpdate((u) => u + 1);
      });
    } else {
      api.updateIdentityById(id, filterBlankKeys).then(() => {
        toast(localization.t('general.updatesHaveBeenSaved'));
        setUpdate((u) => u + 1);
      });
    }
  };

  if (isLoading) return <LinearProgress />;

  if (id === 'add' && !nxState.selectedCustomer.id) {
    return (
      <Box textAlign='center'>
        <Typography gutterBottom variant='h4'>
          {localization.t('general.noCustomer')}
        </Typography>
        <Typography gutterBottom variant='h5'>
          {localization.t('general.selectCustomer')}
        </Typography>
      </Box>
    );
  }

  return (
    <div className='identity-details-screen'>
      <Tabs
        data-test='tabs'
        value={curTab}
        onChange={(e, newTab) => setCurTab(newTab)}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label='General' />
        <Tab label='Identification' />
        <Tab label='Permissions' disabled={id === 'add'} />
        <Tab label='Emails' disabled={id === 'add'} />
      </Tabs>

      {curTab === 0 && curIdentity && (
        <SectionLayout label='general'>
          <General
            identityType={identityType}
            setIdentityType={setIdentityType}
            curIdentity={curIdentity}
            setCurIdentity={setCurIdentity}
          />
        </SectionLayout>
      )}
      {curTab === 1 && curIdentity && (
        <SectionLayout label='identification'>
          <Identification
            addSecretKey={addSecretKey}
            identityType={identityType}
            curIdentity={curIdentity}
            setCurIdentity={setCurIdentity}
            removeSecretKey={removeSecretKey}
          />
        </SectionLayout>
      )}
      {curTab === 2 && curIdentity && (
        <SectionLayout label='permissions'>
          <Permissions
            curIdentity={curIdentity}
            setCurIdentity={setCurIdentity}
            selectOptions={selectOptions}
          />
        </SectionLayout>
      )}
      {curTab === 3 && curIdentity && (
        <SectionLayout label='emails'>
          <Emails curIdentity={curIdentity} />
        </SectionLayout>
      )}
      <Zoom in={hasChanges}>
        <Button
          disabled={
            !curIdentity.email
            || (!curIdentity.userName && !curIdentity.clientId)
          }
          id='save-identity-button'
          color='primary'
          size='large'
          type='submit'
          variant='contained'
          onClick={saveIdentity}
        >
          {localization.t('general.save')}
        </Button>
      </Zoom>
    </div>
  );
};

export default IdentityDetailsScreen;
