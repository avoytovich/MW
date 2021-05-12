import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Grid,
} from '@material-ui/core';

import localization from '../../../../localization';
import {
  NumberInput,
  InputCustom,
  SelectWithChip,
  SwitchInput,
} from '../../../../components/Inputs';

const General = ({ currentCustomer, setCurrentCustomer, selectOptions }) => (
  <Box width={1}>
    <Box p={2}>
      <InputCustom
        label='name'
        value={currentCustomer.name}
        onChangeInput={(e) => {
          setCurrentCustomer({
            ...currentCustomer,
            name: e.target.value,
          });
        }}
        idDisabled={!!currentCustomer.id}
      />
    </Box>
    <Box display="flex" flexDirection="row" alignItems="baseline">
      <Box p={2}>
        <Typography color="secondary">
          {localization.t('labels.authenticationRealm')}
        </Typography>
      </Box>
      <Box p={2}>
        <Typography>
          API Secret is attached to identities having clientId = "api-services".
        </Typography>
      </Box>
    </Box>
    <Box display="flex" flexDirection="row" alignItems="baseline">
      <Box p={2}>
        <Typography color="secondary">
          {localization.t('labels.apiSecret')}
        </Typography>
      </Box>
      <Box p={2}>
        <Typography>{currentCustomer.id}</Typography>
      </Box>
    </Box>

    <Box p={2}>
      <InputCustom
        label='realmName'
        value={currentCustomer.iamClient.realmName}
        onChangeInput={(e) => {
          setCurrentCustomer({
            ...currentCustomer,
            iamClient: { ...currentCustomer.iamClient, realmName: e.target.value },
          });
        }}
        idDisabled={!!currentCustomer.id}
      />
    </Box>
    <Grid item md={12}>
      <SwitchInput
        label='status'
        handleChange={(e) => {
          setCurrentCustomer({
            ...currentCustomer,
            status: e.target.checked ? 'RUNNING' : 'TRIAL',
          });
        }}
        isChecked={currentCustomer.status !== 'TRIAL'}
        switchLabel={localization.t(
          `labels.${
            currentCustomer.status !== 'TRIAL' ? 'live' : 'test'
          }`,
        )}
      />
    </Grid>
    <Box p={2}>
      <InputCustom
        label='email'
        value={currentCustomer.email}
        onChangeInput={(e) => {
          setCurrentCustomer({
            ...currentCustomer,
            email: e.target.value,
          });
        }}
        idDisabled={!!currentCustomer.id}
      />
    </Box>
    <Box p={2}>
      <SelectWithChip
        label='fulfillmentTemplates'
        value={currentCustomer.fulfillments}
        selectOptions={selectOptions.fulfillments}
        onChangeSelect={(e) => setCurrentCustomer({
          ...currentCustomer,
          fulfillments: e.target.value,
        })}
        onClickDelIcon={(chip) => {
          const newValue = [...currentCustomer.fulfillments].filter(
            (val) => val !== chip,
          );
          setCurrentCustomer({
            ...currentCustomer,
            fulfillments: newValue,
          });
        }}
      />
    </Box>
    <Box p={2}>
      <SelectWithChip
        label='subscriptionsModels'
        value={currentCustomer.subscriptions}
        selectOptions={selectOptions.subscriptions}
        onChangeSelect={(e) => setCurrentCustomer({
          ...currentCustomer,
          subscriptions: e.target.value,
        })}
        onClickDelIcon={(chip) => {
          const newValue = [...currentCustomer.subscriptions].filter(
            (val) => val !== chip,
          );
          setCurrentCustomer({
            ...currentCustomer,
            subscriptions: newValue,
          });
        }}
      />
    </Box>
    <Box p={2}>
      <NumberInput
        label='cancelPeriod'
        value={currentCustomer.cancelPeriod}
        onChangeInput={(e) => setCurrentCustomer({
          ...currentCustomer,
          cancelPeriod: e.target.value,
        })}
      />
    </Box>
    <Box p={2}>
      <InputCustom
        label='remittableId'
        value={currentCustomer.remittableId}
        onChangeInput={(e) => setCurrentCustomer({
          ...currentCustomer,
          remittableId: e.target.value,
        })}
      />
    </Box>
  </Box>
);

General.propTypes = {
  currentCustomer: PropTypes.object,
  setCurrentCustomer: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default General;
