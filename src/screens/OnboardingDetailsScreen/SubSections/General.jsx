import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Button,
  Grid,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { toast } from 'react-toastify';

import localization from '../../../localization';
import parentPaths from '../../../services/paths';
import {
  InputCustom,
} from '../../../components/Inputs';
import api from '../../../api';

const General = ({
  id,
  customer,
  curOnboarding,
  setCurOnboarding,
  onboarding,
}) => {
  const history = useHistory();

  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  const statusApproving = (
    <FormControlLabel
      data-test='status'
      control={(
        <Switch
          name="status"
          onChange={(e) => {
            setCurOnboarding({
              ...curOnboarding,
              status: e.target.checked ? 'APPROVED' : 'DECLINED',
            });
          }}
          color="primary"
          checked={curOnboarding.status === 'APPROVED'}
        />
      )}
      label={localization.t(
        `labels.${curOnboarding.status === 'APPROVED' ? 'approved' : 'declined'
        }`,
      )}
    />
  );

  const statusApproved = (
    <FormControlLabel
      data-test='status'
      control={(
        <Switch
          name="status"
          disabled={onboarding.status === 'APPROVED'}
          onChange={(e) => (
            ['APPROVING', 'DECLINED'].includes(onboarding.status)
              ? setCurOnboarding({
                ...curOnboarding,
                status: e.target.checked ? 'APPROVED' : 'DECLINED',
              }) : null
          )}
          color="primary"
          checked={curOnboarding.status === 'APPROVED'}
        />
      )}
      label={localization.t(
        `labels.${curOnboarding.status === 'APPROVED' ? 'approved' : 'declined'
        }`,
      )}
    />
  );

  const statusApprovedInError = localization.t('labels.approvedInError');

  const statusWaitingEmailValidation = (
    <Box display='flex' alignItems="baseline">
      <Box>
        {localization.t('labels.waitingEmailValidation')}
      </Box>
      <Box pl={2}>
        <Button
          id='resend-email-button'
          color='primary'
          size='large'
          variant='contained'
          onClick={
            () => {
              api
                .sendConfirmationMailOnboarding(curOnboarding.id, { reason: curOnboarding.id })
                .then(() => toast(localization.t('general.resendEmail')));
            }
          }
        >
          {localization.t('general.resendEmail')}
        </Button>
      </Box>
    </Box>
  );

  const statusDeclined = (
    <FormControlLabel
      data-test='status'
      control={(
        <Switch
          name="status"
          onChange={(e) => {
            setCurOnboarding({
              ...curOnboarding,
              status: e.target.checked ? 'APPROVED' : 'DECLINED',
            });
          }}
          color="primary"
          checked={curOnboarding.status === 'APPROVED'}
        />
      )}
      label={localization.t(
        `labels.${curOnboarding.status === 'APPROVED' ? 'approved' : 'declined'
        }`,
      )}
    />
  );

  const renderStatus = () => {
    switch (curOnboarding.status) {
      case 'APPROVING':
        return statusApproving;
      case 'WAITING_EMAIL_VALIDATION':
        return statusWaitingEmailValidation;
      case 'APPROVED':
        return statusApproved;
      case 'APPROVED_IN_ERROR':
        return statusApprovedInError;
      case 'DECLINED':
        return statusDeclined;
      default:
        return statusApproved;
    }
  };

  const renderTextField = (field) => (
    <Box display="flex" pl={2} alignItems="baseline">
      <Grid item md={3} sm={12}>
        <Box>
          <Typography variant='h6'>{localization.t(`labels.${field}`)}</Typography>
        </Box>
      </Grid>
      <Grid item md={9} sm={12}>
        <Box className={`onboarding-${field}`}>
          <Typography variant='subtitle1' className={`onboarding-${field}-value`}>
            {curOnboarding?.[field]}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );

  const renderTimeField = (field) => (
    <Box display="flex" pl={2} alignItems="baseline">
      <Grid item md={3} sm={12}>
        <Box>
          <Typography variant='h6'>{localization.t(`labels.${field}`)}</Typography>
        </Box>
      </Grid>
      <Grid item md={9} sm={12}>
        <Box className={`onboarding-${field}`}>
          <Typography variant='subtitle1' className={`onboarding-${field}-value`}>
            {moment(curOnboarding?.[field]).format('YYYY/MM/DD kk:mm (Z)') || '-'}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );

  const renderSwitchField = (field) => (
    <Box display="flex" pl={2} alignItems="baseline">
      <Grid item md={3} sm={12}>
        <Box>
          <Typography variant='h6'>{localization.t(`labels.${field}`)}</Typography>
        </Box>
      </Grid>
      <Grid item md={9} sm={12}>
        <Box className={`onboarding-${field}`}>
          <Typography variant='subtitle1' className={`onboarding-${field}-value`}>
            <FormControlLabel
              data-test={field}
              control={(
                <Switch
                  name={field}
                  onChange={(e) => {
                    setCurOnboarding({
                      ...curOnboarding,
                      onboardingProperties: {
                        ...curOnboarding.onboardingProperties,
                        [field]: !!e.target.checked,
                      },
                    });
                  }}
                  color="primary"
                  checked={curOnboarding.onboardingProperties[field]}
                />
              )}
              label={curOnboarding.onboardingProperties[field]
                ? localization.t('labels.yes') : localization.t('labels.no')}
            />
          </Typography>
        </Box>
      </Grid>
    </Box>
  );

  const renderCheckoutField = (field) => (
    <Box p={2}>
      <InputCustom
        label={`themeRefCheckout${field}`}
        value={curOnboarding.onboardingProperties?.designs?.checkout?.themeRef[field]}
        onChangeInput={(e) => setCurOnboarding({
          ...curOnboarding,
          onboardingProperties: {
            ...curOnboarding.onboardingProperties,
            designs: {
              ...curOnboarding.onboardingProperties?.designs,
              checkout: {
                ...curOnboarding.onboardingProperties?.designs?.checkout,
                themeRef: {
                  ...curOnboarding.onboardingProperties?.designs?.checkout?.themeRef,
                  [field]: e.target.value,
                },
              },
            },
          },
        })}
      />
    </Box>
  );

  const renderEndUserPortalField = (field) => (
    <Box p={2}>
      <InputCustom
        label={`themeRefEndUserPortal${field}`}
        value={curOnboarding.onboardingProperties?.designs?.endUserPortal?.themeRef[field]}
        onChangeInput={(e) => setCurOnboarding({
          ...curOnboarding,
          onboardingProperties: {
            ...curOnboarding.onboardingProperties,
            designs: {
              ...curOnboarding.onboardingProperties?.designs,
              endUserPortal: {
                ...curOnboarding.onboardingProperties?.designs?.endUserPortal,
                themeRef: {
                  ...curOnboarding.onboardingProperties?.designs?.endUserPortal?.themeRef,
                  [field]: e.target.value,
                },
              },
            },
          },
        })}
      />
    </Box>
  );

  return (
    <Grid item md={12} sm={12} className='wrapper-onboarding-general' container>
      <Grid item md={6} sm={12}>
        <Box display="flex" pl={2} alignItems="baseline">
          <Grid item md={3} sm={12}>
            <Box>
              <Typography variant='h6'>{localization.t('labels.id')}</Typography>
            </Box>
          </Grid>
          <Grid item md={9} sm={12}>
            <Box className="onboarding-id" display="flex">
              <Box>
                <Typography variant='subtitle1' className="onboarding-id-value">
                  {id}
                </Typography>
              </Box>
              <Box pl={2}>
                <FileCopyIcon
                  onClick={() => makeCopy(id)}
                  color="secondary"
                />
              </Box>
            </Box>
          </Grid>
        </Box>
        <Box display="flex" pl={2} alignItems="baseline">
          <Grid item md={3} sm={12}>
            <Box>
              <Typography variant='h6'>{localization.t('labels.customer')}</Typography>
            </Box>
          </Grid>
          <Grid item md={9} sm={12}>
            <Box className="onboarding-customer" display="flex">
              <Box>
                <Typography variant='subtitle1' className="onboarding-customer-value">
                  {customer && (
                    <span
                      className="customer-value"
                      onClick={() => history.push(`${parentPaths.customers}/${curOnboarding.customerId}`)}
                    >
                      {customer.name}
                    </span>
                  )}
                </Typography>
              </Box>
              <Box pl={2}>
                <FileCopyIcon
                  onClick={() => makeCopy(customer.name)}
                  color="secondary"
                />
              </Box>
            </Box>
          </Grid>
        </Box>
        <Box display="flex" pl={2} alignItems="baseline">
          <Grid item md={3} sm={12}>
            <Box>
              <Typography variant='h6'>{localization.t('labels.status')}</Typography>
            </Box>
          </Grid>
          <Grid item md={9} sm={12}>
            <Box className="onboarding-status" display="flex">
              <Typography variant='subtitle1' className="onboarding-status-value">
                {renderStatus()}
              </Typography>
            </Box>
          </Grid>
        </Box>
        {renderTimeField('creationDate')}
        {renderTimeField('lastUpdate')}
        {renderTextField('companyName')}
        {renderTextField('firstName')}
        {renderTextField('lastName')}
        {renderTextField('email')}
        {renderSwitchField('createStore')}
        {renderSwitchField('usingLicenseKeyProvider')}
        {renderSwitchField('withFulfillmentSample')}
      </Grid>
      <Grid item md={6} sm={12}>
        {renderCheckoutField('name')}
        {renderCheckoutField('customerId')}
        {renderEndUserPortalField('name')}
        {renderEndUserPortalField('customerId')}
      </Grid>
    </Grid>
  );
};

General.propTypes = {
  id: PropTypes.string,
  customer: PropTypes.object,
  curOnboarding: PropTypes.object,
  setCurOnboarding: PropTypes.func,
  onboarding: PropTypes.object,
};

export default General;
