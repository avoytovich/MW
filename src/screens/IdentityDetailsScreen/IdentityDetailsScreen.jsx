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

import localization from '../../localization';
import ProfileDetails from './ProfileDetails';
import RightsDetails from './RightsDetails';
import { useDetailsData } from '../../services/useData';
import { showNotification } from '../../redux/actions/HttpNotifications';
import api from '../../api';

import './identityDetailsScreen.scss';

const IdentityDetailsScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [curTab, setCurTab] = useState(0);
  const [update, setUpdate] = useState(0);
  const { id } = useParams();
  const history = useHistory();

  const [curIdentity, setCurIdentity] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const requests = async () => {
    const res = id !== 'add'
      ? await api.getIdentityById(id)
      : {
        data: {
          email: '',
          firstName: '',
          lastName: '',
          userName: '',
          clientId: '',
          customerId: nxState.selectedCustomer.id,
        },
      };

    return res.data;
  };

  const identity = useDetailsData(setLoading, requests, update);

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

  useEffect(() => {
    setCurIdentity({ ...identity });

    return () => setCurIdentity(null);
  }, [curTab, identity]);

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
        <Tab label='Profile' />
        <Tab label='Rights' disabled={id === 'add'} />
      </Tabs>

      {curTab === 0 && curIdentity && (
        <ProfileDetails
          newIdentity={id === 'add'}
          identity={curIdentity}
          changeIdentity={setCurIdentity}
        />
      )}
      {curTab === 1 && curIdentity && (
        <RightsDetails
          identity={curIdentity}
          initIdentity={identity}
          changeIdentity={setCurIdentity}
        />
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
          Save
        </Button>
      </Zoom>
    </div>
  );
};

export default IdentityDetailsScreen;
