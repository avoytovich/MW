import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  Grid,
} from '@mui/material';
import PropTypes from 'prop-types';
import { structureSelectOptions } from '../../../services/helpers/dataStructuring';
import { email, urlIsValid } from '../../../services/helpers/inputValidators';
import localization from '../../../localization';
import { InputCustom, AutocompleteWithChips } from '../../../components/Inputs';
import api from '../../../api';

const General = ({
  setCurNotification,
  curNotification,
  selectOptions,
  errorMessages,
  setErrorMessages,
}) => (
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
              `labels.${curNotification.status === 'Active' ? 'enabled' : 'disabled'
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
        <AutocompleteWithChips
          data-test='events'
          label='events'
          arrayTypeValue
          arrayValue={curNotification.notificationDefinitionIds}
          selectOptions={selectOptions.events || []}
          onChange={(newValue) => setCurNotification({
            ...curNotification,
            notificationDefinitionIds: newValue,
          })}
        />
      </Box>
    </Grid>
    <Grid item md={6} sm={12}>
      <Box p={2}>
        <AutocompleteWithChips
          getAdditionalOptions={(searchValue) => Promise.allSettled([
            api.getCustomerById(searchValue),
            api.getCustomers({ filters: `&name=*${searchValue}*` })])
            .then(([idSearch, nameSearch]) => {
              const res = idSearch.value?.data
                ? [idSearch.value?.data] : nameSearch.value?.data?.items;
              return structureSelectOptions({ options: res, optionValue: 'name' });
            })}
          data-test='targetedCustomers'
          label='targetedCustomers'
          arrayTypeValue
          arrayValue={curNotification.targetedCustomerIds}
          selectOptions={selectOptions.customers || []}
          onChange={(newValue) => setCurNotification({
            ...curNotification,
            targetedCustomerIds: newValue,
          })}
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
    <Grid item md={6} sm={12}>
      {curNotification.receiverType === 'email'
        ? (
          <Box p={2}>
            <InputCustom
              hasError={!!errorMessages?.email}
              helperText={errorMessages?.email}
              data-test='emailInput'
              isMultiline
              label="emailsOneByLine"
              value={curNotification.emails?.join('\r\n')}
              onChangeInput={(e) => {
                let res = [];
                if (e.target.value) {
                  res = e.target.value.split(/\r?\n/);
                }
                let validMail = null;
                res.forEach((element) => {
                  const isNotValid = email({ email: element });
                  if (isNotValid.email && element !== '') {
                    validMail = isNotValid.email;
                  }
                });
                if (!validMail) {
                  const newErrors = { ...errorMessages };
                  delete newErrors.email;
                  setErrorMessages(newErrors);
                } else {
                  setErrorMessages({
                    ...errorMessages,
                    email: validMail,
                  });
                }
                setCurNotification({
                  ...curNotification,
                  emails: res,
                });
              }}
            />
          </Box>
        ) : (
          <Box p={2}>
            <InputCustom
              hasError={!!errorMessages?.url}
              label='url'
              data-test='urlInput'
              value={curNotification.url}
              onChangeInput={(e) => {
                const validUrl = urlIsValid(e.target.value);
                if (!validUrl) {
                  setErrorMessages(({ ...errorMessages, url: localization.t('errorNotifications.invalidUrl') }));
                } else {
                  const newErrors = { ...errorMessages };
                  delete newErrors.url;
                  setErrorMessages(newErrors);
                }
                setCurNotification({ ...curNotification, url: e.target.value });
              }}
              isRequired
              helperText={errorMessages?.url}
            />
          </Box>
        )}
    </Grid>
  </Grid>
);

General.propTypes = {
  curNotification: PropTypes.object,
  setCurNotification: PropTypes.func,
  selectOptions: PropTypes.object,
  errorMessages: PropTypes.object,
  setErrorMessages: PropTypes.func,
};

export default General;
