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
import localization from '../../localization';

import CustomCard from '../../components/utils/CustomCard';

const ProfileDetails = ({ identity, changeIdentity, newIdentity }) => {
  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    changeIdentity({ ...identity, [name]: value });
  };

  return (
    <>
      <CustomCard title="Basic Profile">
        <Box display="flex" py={5} pb={2}>
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label={localization.t('labels.firstName')}
              name="firstName"
              type="text"
              value={identity.firstName}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label={localization.t('labels.lastName')}
              name="lastName"
              type="text"
              value={identity.lastName}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
        </Box>

        <Box display="flex" pb={2}>
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              required
              label={localization.t('labels.email')}
              name="email"
              type="text"
              value={identity.email}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
          <Box px={1} width=" 100%">
            <TextField
              required
              fullWidth
              label={localization.t('labels.userName')}
              name="userName"
              type="text"
              value={identity.userName}
              onChange={handleChange}
              variant="outlined"
              disabled={!newIdentity}
            />
          </Box>
        </Box>
      </CustomCard>

      <CustomCard title="Configuration">
        <Box py={3}>
          {!newIdentity && (
            <>
              <Typography gutterBottom variant="h5">
                {localization.t('labels.status')}
              </Typography>

              <Box display="flex" alignItems="center" ml="-10px">
                <Switch
                  color="primary"
                  checked={!identity.inactive}
                  onChange={() =>
                    changeIdentity({
                      ...identity,
                      inactive: !identity.inactive,
                    })
                  }
                  name="status"
                />

                <Typography>
                  {identity.inactive
                    ? localization.t('labels.disabled')
                    : localization.t('labels.enabled')}
                </Typography>
              </Box>
            </>
          )}
        </Box>

        <Box pb={3}>
          <Typography gutterBottom variant="h5">
            {localization.t('labels.type')}
          </Typography>

          <Box display="flex" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox name="user" color="primary" checked disabled />
              }
              label={localization.t('labels.user')}
            />

            <FormControlLabel
              control={<Checkbox name="application" color="primary" disabled />}
              label={localization.t('labels.application')}
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
