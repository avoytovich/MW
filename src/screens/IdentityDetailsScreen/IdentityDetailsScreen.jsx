// ToDo: localize texts
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  LinearProgress,
  Tabs,
  Tab,
  Button,
  Zoom,
} from '@material-ui/core';

import ProfileDetails from './ProfileDetails';
import RightsDetails from './RightsDetails';
import { useIdentityDetailsData } from '../../services/useData';
import { showNotification } from '../../redux/actions/HttpNotifications';
import api from '../../api';

import './identityDetailsScreen.scss';

const IdentityDetailsScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [curTab, setCurTab] = useState(0);
  const [update, setUpdate] = useState(0);

  const { id } = useParams();
  const identity = useIdentityDetailsData(id, setLoading, update);
  const [curIdentity, setCurIdentity] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const saveIdentity = () => {
    api
      .updateIdentityById(id, curIdentity)
      .then(() => {
        dispatch(showNotification('Updates have been saved!'));
        setUpdate((u) => u + 1);
      });
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

  return (
    <div className='identity-details-screen'>
      <Tabs
        value={curTab}
        onChange={(e, newTab) => { setCurTab(newTab); }}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label='Profile' />
        <Tab label='Rights' />
      </Tabs>

      {curTab === 0 && curIdentity
        && <ProfileDetails identity={curIdentity} changeIdentity={setCurIdentity} />}

      {curTab === 1 && curIdentity && (
        <RightsDetails
          identity={curIdentity}
          initIdentity={identity}
          changeIdentity={setCurIdentity}
        />
      )}

      <Zoom in={hasChanges}>
        <Button
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
