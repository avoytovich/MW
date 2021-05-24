import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  LinearProgress,
  Tabs,
  Tab,
  Button,
  Zoom,
  Box,
  Typography,
} from '@material-ui/core';
import General from './SubSections/General';
import Identification from './SubSections/Identification';
import Permissions from './SubSections/Permissions';
import Emails from './SubSections/Emails';
import localization from '../../localization';

import { structureSelectOptions, identityRequiredFields } from '../../services/helpers/dataStructuring';
import { showNotification } from '../../redux/actions/HttpNotifications';
import api from '../../api';
import SectionLayout from '../../components/SectionLayout';
import './identityDetailsScreen.scss';

const IdentityDetailsScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [curTab, setCurTab] = useState(0);
  const [update, setUpdate] = useState(0);
  const { id } = useParams();
  const history = useHistory();

  const [selectOptions, setSelectOptions] = useState({
    roles: null,
    metaRoles: null,
    customers: null,
  });
  const [curIdentity, setCurIdentity] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [identityType, setIdentityType] = useState('user');
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    const identityData = id !== 'add'
      ? api.getIdentityById(id)
      : Promise.resolve({
        data: {
          customerId: nxState.selectedCustomer.id,
        },
      });
    identityData.then(({ data }) => {
      if (!isCancelled) {
        const checkedIdentity = identityRequiredFields(data);
        setIdentity({ ...checkedIdentity });
        setCurIdentity({ ...checkedIdentity });
        setLoading(false);
        if (data.clientId) {
          setIdentityType('application');
        }
      }
      if (id !== 'add') {
        Promise.allSettled([
          api.getRoleById(`usableForIdentity/${id}`),
          api.getMetaRoles(0, `&customerId=${data.customerId}`),
          api.getCustomers(),
        ]).then(([rolesOptions, metaRolesOptions, customersOptions]) => {
          setSelectOptions({
            ...selectOptions,
            roles: structureSelectOptions(rolesOptions.value?.data.items, 'name') || [],
            metaRoles: structureSelectOptions(metaRolesOptions.value?.data.items, 'name') || [],
            customers: structureSelectOptions(customersOptions.value?.data.items, 'name') || [],
          });
        });
      }
    })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => { isCancelled = true; };
  }, [update]);

  const addSecretKey = () => {
    api.addNewSecretKeyToIdentity(id).then(() => {
      dispatch(
        showNotification(localization.t('general.keyHasBeenAdded')),
      );
      setUpdate((u) => u + 1);
    });
  };
  const removeSecretKey = (secret) => api.deleteIdentitySecretKeyById(id, secret).then(() => {
    dispatch(
      showNotification(localization.t('general.keyHasBeenRemoved')),
    );
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
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        history.push(`/settings/identities/${identityId}`);
        setUpdate((u) => u + 1);
      });
    } else {
      api.updateIdentityById(id, filterBlankKeys).then(() => {
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        setUpdate((u) => u + 1);
      });
    }
  };
  useEffect(() => {
    setHasChanges(JSON.stringify(curIdentity) !== JSON.stringify(identity));

    return () => setHasChanges(false);
  }, [curIdentity]);

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
