// ToDo: consider making a common layout for such type of settings screens
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Typography,
  Box,
  TextField,
  LinearProgress,
  Zoom,
  Button,
  Tabs,
  Tab,
} from '@material-ui/core';

import api from '../../api';
import { showNotification } from '../../redux/actions/HttpNotifications';
import CustomCard from '../../components/utils/CustomCard';
import localization from '../../localization';

import './myAccountScreen.scss';

const MyAccountScreen = () => {
  const dispatch = useDispatch();
  const [identity, setIdentity] = useState(null);
  const [curIdentity, setCurIdentity] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const account = useSelector(({ account: { user } }) => user);
  
  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCurIdentity({ ...identity, [name]: value });
  };

  const saveIdentity = () => {
    api.updateIdentityById(account.sub, curIdentity).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      setIdentity(curIdentity);
    });
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curIdentity) !== JSON.stringify(identity));

    return () => setHasChanges(false);
  }, [curIdentity, identity]);

  useEffect(() => {
    api
      .getIdentityById(account.sub)
      .then(({ data }) => {
        setIdentity(data);
        setCurIdentity(data);
      });
  }, []);

  if (curIdentity === null) return <LinearProgress />;

  return (
    <div className='my-account-screen'>
      <Tabs
        value={0}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="My Account" />
      </Tabs>

      <Zoom in={hasChanges}>
        <Button
          id="save-account-button"
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={saveIdentity}
        >
          Save
        </Button>
      </Zoom>

      <CustomCard title='Basic Profile'>
        <Box display='flex' py={5} pb={2}>
          <TextField
            fullWidth
            label='First Name'
            name='firstName'
            type='text'
            value={curIdentity.firstName}
            onChange={handleChange}
            variant='outlined'
          />

          <TextField
            fullWidth
            label='Last Name'
            name='lastName'
            type='text'
            value={curIdentity.lastName}
            onChange={handleChange}
            variant='outlined'
          />
        </Box>

        <Box display='flex' pb={2}>
          <TextField
            fullWidth
            label='Email'
            name='email'
            type='text'
            value={curIdentity.email}
            onChange={handleChange}
            variant='outlined'
          />

          <TextField
            fullWidth
            label='User Name'
            name='userName'
            type='text'
            value={curIdentity.userName}
            onChange={handleChange}
            variant='outlined'
            disabled
          />
        </Box>
      </CustomCard>

      <CustomCard title='Configuration'>
        <Box display='flex' py={5} pb={2}>
          <TextField
            fullWidth
            label='Stores'
            name='stores'
            type='text'
            placeholder='Stores list'
            // value={account.given_name}
            // onChange={handleChange}
            variant='outlined'
            InputLabelProps={{
              shrink: true,
            }}
            helperText='Please specify the stores you manage'
          />

          <TextField
            fullWidth
            label='Catalogs & products'
            name='catalogs'
            type='text'
            placeholder='Catalogs and/or products'
            // value={account.family_name}
            // onChange={handleChange}
            variant='outlined'
            InputLabelProps={{
              shrink: true,
            }}
            helperText='Please specify the catalogs you manage'
          />
        </Box>
      </CustomCard>
    </div>
  );
};

export default MyAccountScreen;
