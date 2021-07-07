import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  Grid,
  TextField,
  Chip,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { email } from '../../../services/helpers/inputValidators';
import localization from '../../../localization';
import { InputCustom, SelectWithChip } from '../../../components/Inputs';

const General = ({ setCurNotification, curNotification, selectOptions }) => {
  const [errorMessages, setErrorMessages] = useState({ email: null });

  return (
    <Grid container>
      <Grid item md={6}>
        <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
          <Box>
            <Typography>{localization.t('labels.status')}</Typography>
          </Box>
          <Box px={2}>
            <FormControlLabel
              data-test='status'
              control={(
                <Switch
                  name="status"
                  onChange={(e) => {
                    setCurNotification({
                      ...curNotification,
                      status: e.target.checked ? 'Active' : 'Inactive',
                    });
                  }}
                  color="primary"
                  checked={curNotification.status === 'Active'}
                />
              )}
              label={localization.t(
                `labels.${
                curNotification.status === 'Active' ? 'enabled' : 'disabled'
                }`,
              )}
            />
          </Box>
        </Box>

      </Grid>
      <Grid item md={6} sm={12}>
        <Box p={2}>
          <InputCustom
            data-test='name'
            label='name'
            value={curNotification.name}
            onChangeInput={(e) => setCurNotification({ ...curNotification, name: e.target.value })}
            isRequired
          />
        </Box>
      </Grid>
      <Grid item md={6} sm={12}>
        <Box p={2}>
          <SelectWithChip
            data-test='events'
            label='events'
            value={curNotification.notificationDefinitionIds}
            selectOptions={selectOptions.events}
            onChangeSelect={(e) => setCurNotification({
              ...curNotification,
              notificationDefinitionIds: e.target.value,
            })}
            onClickDelIcon={(chip) => {
              const newValue = [...curNotification.notificationDefinitionIds].filter(
                (val) => val !== chip,
              );
              setCurNotification({
                ...curNotification,
                notificationDefinitionIds: newValue,
              });
            }}
            isRequired
          />
        </Box>
      </Grid>
      <Grid item md={6} sm={12}>
        <Box p={2}>
          <SelectWithChip
            data-test='targetedCustomers'
            label='targetedCustomers'
            value={curNotification.targetedCustomerIds}
            selectOptions={selectOptions.customers}
            onChangeSelect={(e) => setCurNotification({
              ...curNotification,
              targetedCustomerIds: e.target.value,
            })}
            onClickDelIcon={(chip) => {
              const newValue = [...curNotification.targetedCustomerIds].filter(
                (val) => val !== chip,
              );
              setCurNotification({
                ...curNotification,
                targetedCustomerIds: newValue,
              });
            }}
          />
        </Box>
      </Grid>

      <Grid item md={6} sm={12}>

        <Box display='flex' m={2} pb={2}>
          <div>
            <Typography gutterBottom variant='h5'>
              {localization.t('labels.receiverType')}
            </Typography>

            <Box>
              <RadioGroup
                data-test='receiverType'
                row
                aria-label='receiverType'
                name='receiverType'
                value={curNotification.receiverType}
                onChange={(e) => setCurNotification({
                  ...curNotification,
                  receiverType: e.target.value,
                })}
              >
                <FormControlLabel
                  value='email'
                  control={<Radio color='primary' />}
                  label={localization.t('labels.email')}
                />
                <FormControlLabel
                  value='webhook'
                  control={<Radio color='primary' />}
                  label={localization.t('labels.webhook')}
                />

              </RadioGroup>
            </Box>
          </div>
        </Box>
      </Grid>
      {curNotification.receiverType === 'email'
        && (
          <Grid item md={6} sm={12}>
            <Box p={2}>
              <Autocomplete
                data-test='emailInput'
                onChange={(e, newValue) => {
                  if (curNotification.emails.length > newValue.length) {
                    setCurNotification({
                      ...curNotification,
                      emails: newValue,
                    });
                  } else {
                    const validMail = email({ email: e.target.value });
                    if (!validMail.email) {
                      setErrorMessages({ ...errorMessages, email: null });
                      setCurNotification({
                        ...curNotification,
                        emails: newValue,
                      });
                    } else {
                      setErrorMessages({
                        ...errorMessages,
                        email: validMail.email,
                      });
                    }
                  }
                }}
                value={curNotification.emails}
                multiple
                id='tags-filled'
                options={[]}
                freeSolo
                renderTags={(value, getTagProps) => value.map((option, index) => (
                  <Chip
                    variant='outlined'
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))}
                renderInput={(params) => (
                  <TextField
                    required
                    error={!!errorMessages.email}
                    helperText={errorMessages.email}
                    variant='outlined'
                    {...params}
                    label={localization.t('labels.emailsOneByLine')}
                  />
                )}
              />
            </Box>
          </Grid>
        )}
    </Grid>
  );
};
General.propTypes = {
  curNotification: PropTypes.object,
  setCurNotification: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default General;
