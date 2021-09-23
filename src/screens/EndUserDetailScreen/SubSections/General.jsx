import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  Switch,
} from '@material-ui/core';

import {
  FileCopy as FileCopyIcon,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { makeCopy } from '../utils';
import api from '../../../api';

import localization from '../../../localization';
import { InputCustom, SelectCustom } from '../../../components/Inputs';

const General = ({
  curEndUser, setCurEndUser, selectOptions, invalidVatNumber, setInvalidVatNumber, scope, consent,
}) => {
  const handleCheckVatNumber = (value) => {
    if (value !== '') {
      const VatNumberValidation = api.vatNumberCheck(value, curEndUser.country);
      VatNumberValidation.then(() => {
        setInvalidVatNumber('');
      });
      VatNumberValidation.catch(() => {
        setInvalidVatNumber(localization.t('errorNotifications.invalidVatNumber'));
      });
    } else {
      setInvalidVatNumber('');
    }
  };
  return (
    <Grid container>
      <Grid item md={6}>
        <Box display="flex" px={2} py={1} flexDirection="row" alignItems="baseline">
          <Box>
            <Typography variant='h5'>{localization.t('labels.status')}</Typography>
          </Box>
          <Box px={2}>
            <FormControlLabel
              data-test='status'
              control={(
                <Switch
                  name="status"
                  onChange={(e) => {
                    setCurEndUser({
                      ...curEndUser,
                      status: e.target.checked ? 'ENABLED' : 'DISABLED',
                    });
                  }}
                  color="primary"
                  checked={curEndUser.status === 'ENABLED'}
                />
              )}
              label={localization.t(
                `labels.${curEndUser.status === 'ENABLED' ? 'enabled' : 'disabled'
                }`,
              )}
            />
          </Box>
        </Box>
        <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
          <Box width='30%'>
            <Typography variant='h5'>{localization.t('labels.сustomer')}</Typography>
          </Box>
          <Box>
            <Typography>{curEndUser.customerId}</Typography>
          </Box>
          <Box px={2} alignSelf='center'>
            <FileCopyIcon color='secondary' onClick={() => makeCopy(curEndUser.customerId)} />
          </Box>
        </Box>
        <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
          <Box width='30%'>
            <Typography variant='h5'>{localization.t('labels.endUserId')}</Typography>
          </Box>
          <Box>
            <Typography>{curEndUser.enduserId}</Typography>
          </Box>
          <Box px={2} alignSelf='center'>
            <FileCopyIcon color='secondary' onClick={() => makeCopy(curEndUser.enduserId)} />
          </Box>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
          <Box width='30%'>
            <Typography variant='h5'>{localization.t('labels.account')}</Typography>
          </Box>
          <Box>
            <Typography>{curEndUser.accountCreated ? 'created' : 'not created'}</Typography>
          </Box>
        </Box>
        <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
          <Box width='30%'>
            <Typography variant='h5'>{localization.t('labels.consentStatus')}</Typography>
          </Box>
          <Box>
            <Typography>{consent ? '' : localization.t('errorNotifications.hasNotGivenConsent')}</Typography>
          </Box>
        </Box>
        <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
          <Box width='30%'>
            <Typography variant='h5'>{localization.t('labels.country')}</Typography>
          </Box>
          <Box>
            <Typography>{curEndUser.country}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid container alignItems='center'>
        <Grid item md={6}>
          <Box display='flex' flexDirection='column' m={2} pb={2}>
            <Typography gutterBottom variant='h5'>
              {localization.t('labels.type')}
            </Typography>

            <Box>
              <RadioGroup
                data-test='type'
                row
                aria-label='type'
                name='type'
                value={curEndUser.type}
                onChange={(e) => setCurEndUser({
                  ...curEndUser,
                  type: e.target.value,
                })}
              >
                <FormControlLabel
                  value='BUYER'
                  disabled={scope === 'resellers'}
                  control={<Radio color='primary' />}
                  label={localization.t('labels.buyer')}
                />
                <FormControlLabel
                  disabled={scope !== 'resellers'}
                  value='RESELLER_NOT_APPROVED'
                  control={<Radio color='primary' />}
                  label={localization.t('labels.applyingReseller')}
                />
                <FormControlLabel
                  value='RESELLER'
                  disabled={scope !== 'resellers'}
                  control={<Radio color='primary' />}
                  label={localization.t('labels.approvedReseller')}
                />
                <FormControlLabel
                  disabled={scope !== 'resellers'}
                  value='RESELLER_DECLINED'
                  control={<Radio color='primary' />}
                  label={localization.t('labels.declinedReseller')}
                />
              </RadioGroup>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box p={2}>
            <InputCustom
              label='phone'
              value={curEndUser.phone}
              onChangeInput={(e) => setCurEndUser({
                ...curEndUser,
                phone: e.target.value,
              })}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid item md={6}>
        <Box p={2}>
          <SelectCustom
            label='group'
            value={curEndUser.groupId}
            selectOptions={selectOptions.groups}
            onChangeSelect={(e) => setCurEndUser({
              ...curEndUser,
              groupId: e.target.value,
            })}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            label='companyName'
            value={curEndUser.company.companyName}
            onChangeInput={(e) => {
              if (e.target.value === '') {
                setCurEndUser({
                  ...curEndUser,
                  company: { companyName: '', vatNumber: '' },
                });
              } else {
                setCurEndUser({
                  ...curEndUser,
                  company: { ...curEndUser.company, companyName: e.target.value },
                });
              }
            }}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            hasError={!!invalidVatNumber}
            helperText={invalidVatNumber}
            label='vatNumber'
            isDisabled={curEndUser.company.companyName === ''}
            value={curEndUser.company.vatNumber}
            onChangeInput={(e) => {
              setCurEndUser({
                ...curEndUser,
                company: { ...curEndUser.company, vatNumber: e.target.value },
              });
              handleCheckVatNumber(e.target.value);
            }}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            isRequired
            label='firstName'
            value={curEndUser.firstName}
            onChangeInput={(e) => setCurEndUser({
              ...curEndUser,
              firstName: e.target.value,
            })}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            isRequired
            label='lastName'
            value={curEndUser.lastName}
            onChangeInput={(e) => setCurEndUser({
              ...curEndUser,
              lastName: e.target.value,
            })}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            label='login'
            value={curEndUser.login}
            onChangeInput={(e) => setCurEndUser({
              ...curEndUser,
              login: e.target.value,
            })}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            label='emailAddress'
            value={curEndUser.email}
            onChangeInput={(e) => setCurEndUser({
              ...curEndUser,
              email: e.target.value,
            })}
          />
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box p={2}>
          <InputCustom
            label='zip'
            value={curEndUser.zipCode}
            onChangeInput={(e) => setCurEndUser({
              ...curEndUser,
              zipCode: e.target.value,
            })}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            label='city'
            isRequired
            value={curEndUser.city}
            onChangeInput={(e) => setCurEndUser({
              ...curEndUser,
              city: e.target.value,
            })}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            label='streetAddress'
            value={curEndUser.streetAddress}
            onChangeInput={(e) => setCurEndUser({
              ...curEndUser,
              streetAddress: e.target.value,
            })}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            label='taxOffice'
            value={curEndUser.taxOffice}
            onChangeInput={(e) => setCurEndUser({
              ...curEndUser,
              taxOffice: e.target.value,
            })}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
General.propTypes = {
  invalidVatNumber: PropTypes.string,
  curEndUser: PropTypes.object,
  setCurEndUser: PropTypes.func,
  selectOptions: PropTypes.object,
  setInvalidVatNumber: PropTypes.func,
  scope: PropTypes.string,
  consent: PropTypes.array,
};

export default General;
