import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Grid, Link,
} from '@mui/material';
import { FileCopy } from '@mui/icons-material';
import { toast } from 'react-toastify';

import localization from '../../../localization';
import {
  NumberInput,
  InputCustom,
  SelectWithChip,
  SwitchInput,
} from '../../../components/Inputs';

const General = ({ currentCustomer, setCurrentCustomer, selectOptions }) => {
  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };
  return (
    <Grid container>
      <Grid item md={12}>
        {currentCustomer.id
          && (
            <Box p={2}>
              <SwitchInput
                data-test='status'
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
            </Box>
          )}
      </Grid>
      <Grid item md={6}>
        <Box p={2}>
          <InputCustom
            data-test='customerName'
            label='customerName'
            value={currentCustomer.name}
            onChangeInput={(e) => {
              setCurrentCustomer({
                ...currentCustomer,
                name: e.target.value,
              });
            }}
            isDisabled={!!currentCustomer.id}
          />
        </Box>
        {currentCustomer.id
          && (
            <Box p={2}>
              <Box pb={1}>
                <Typography color="secondary">
                  {localization.t('labels.authenticationRealm')}
                </Typography>
              </Box>
              <Box display='flex'>
                <Link href={`/realms/${currentCustomer.id}`}>
                  <Typography color='primary'>{currentCustomer.id}</Typography>
                </Link>
                <Box px={1}><FileCopy color='secondary' onClick={() => makeCopy(currentCustomer.id)} /></Box>
              </Box>
            </Box>
          )}
        {!currentCustomer.id
          && (
            <Box p={2}>
              <InputCustom
                data-test='realmName'
                label='realmName'
                value={currentCustomer.iamClient.realmName}
                onChangeInput={(e) => {
                  setCurrentCustomer({
                    ...currentCustomer,
                    iamClient: { ...currentCustomer.iamClient, realmName: e.target.value },
                  });
                }}
              />
            </Box>
          )}
        {currentCustomer.id && currentCustomer.iamClient.realmName
          && (
            <Box p={2}>
              <Box pb={1}>
                <Typography color="secondary">
                  {localization.t('labels.realmName')}
                </Typography>
              </Box>
              <Box display='flex'>
                <Typography data-test='customerId'>{currentCustomer.iamClient.realmName}</Typography>
                <Box px={1}><FileCopy color='secondary' onClick={() => makeCopy(currentCustomer.iamClient.realmName)} /></Box>
              </Box>
            </Box>
          )}
        <Box p={2}>
          <Box pb={1}>
            <Typography color="secondary">
              {localization.t('labels.apiSecret')}
            </Typography>
          </Box>
          <Typography>
            API Secret is attached to
            {' '}
            <Link href="/settings/identities">identities</Link>
            {' '}
            having clientId = "api-services"
          </Typography>
        </Box>
        <Box p={2}>
          <InputCustom
            data-test='email'
            isDisabled={!!currentCustomer.id}
            label='email'
            value={currentCustomer.email}
            onChangeInput={(e) => {
              setCurrentCustomer({
                ...currentCustomer,
                email: e.target.value,
              });
            }}
          />
        </Box>
      </Grid>
      {currentCustomer.id && (
        <Grid item md={6}>
          <Box p={2}>
            <SelectWithChip
              data-test='fulfillmentTemplates'
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
              data-test='subscriptionsModels'
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
              data-test='cancelPeriod'
              label='cancelPeriod'
              minMAx={{ min: 0 }}
              value={currentCustomer.cancelPeriod}
              onChangeInput={(e) => setCurrentCustomer({
                ...currentCustomer,
                cancelPeriod: e.target.value,
              })}
            />
          </Box>
          <Box p={2}>
            <SwitchInput
              data-test='createEndUserWithoutSubscription'
              label='createEndUserWithoutSubscription'
              handleChange={(e) => {
                setCurrentCustomer({
                  ...currentCustomer,
                  createEndUserWithoutSubscription: e.target.checked,
                });
              }}
              isChecked={currentCustomer.createEndUserWithoutSubscription}
            />
          </Box>
          <Box p={2}>
            <InputCustom
              data-test='remittableId'
              label='remittableId'
              value={currentCustomer.remittableId}
              onChangeInput={(e) => setCurrentCustomer({
                ...currentCustomer,
                remittableId: e.target.value,
              })}
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

General.propTypes = {
  currentCustomer: PropTypes.object,
  setCurrentCustomer: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default General;
