// ToDo: localize texts
import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Box,
  TextField,
  Switch,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import CustomCard from '../../components/utils/CustomCard';

const ProfileDetails = ({ identity, changeIdentity }) => {
  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    changeIdentity({ ...identity, [name]: value });
  };

  return (
    <>
      <CustomCard title='Basic Profile'>
        <Box display='flex' py={5} pb={2}>
          <TextField
            fullWidth
            label='First Name'
            name='firstName'
            type='text'
            value={identity.firstName}
            onChange={handleChange}
            variant='outlined'
          />

          <TextField
            fullWidth
            label='Last Name'
            name='lastName'
            type='text'
            value={identity.lastName}
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
            value={identity.email}
            onChange={handleChange}
            variant='outlined'
          />

          <TextField
            fullWidth
            label='User Name'
            name='userName'
            type='text'
            value={identity.userName}
            onChange={handleChange}
            variant='outlined'
            disabled
          />
        </Box>
      </CustomCard>

      <CustomCard title='Configuration'>
        <Box py={3}>
          <Typography gutterBottom variant='h5'>Status</Typography>

          <Box display='flex' alignItems='center' ml='-10px'>
            <Switch
              color='primary'
              checked={!identity.inactive}
              onChange={() => changeIdentity({ ...identity, inactive: !identity.inactive })}
              name='status'
            />

            <Typography>
              {identity.inactive ? 'Disabled' : 'Enabled'}
            </Typography>
          </Box>
        </Box>

        <Box pb={3}>
          <Typography gutterBottom variant='h5'>Type</Typography>

          <Box display='flex' alignItems='center'>
            <FormControlLabel
              control={<Checkbox name='user' color='primary' checked disabled />}
              label='User'
            />

            <FormControlLabel
              control={<Checkbox name='application' color='primary' disabled />}
              label='Application'
            />
          </Box>
        </Box>
      </CustomCard>
    </>
  );
};

ProfileDetails.propTypes = {
  identity: PropTypes.object,
  changeIdentity: PropTypes.func,
};

export default ProfileDetails;
