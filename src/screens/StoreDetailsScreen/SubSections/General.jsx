import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Grid,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { getCountriesOptions, getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import { urlIsValid } from '../../../services/helpers/inputValidators';

import localization from '../../../localization';
import {
  InputCustom,
  SelectCustom,
  SelectWithChip,
  SwitchInput,
} from '../../../components/Inputs';
import CheckboxInput from './CheckboxInput';

import '../storeDetailsScreen.scss';

const checkBoxObj = [
  { name: 'RESELLER_AUTHENTICATION_REQUIRED', label: 'resellerAuthentication' },
  { name: 'BUYER_AUTHENTICATION_REQUIRED', label: 'buyerAuthentication' },
  { name: 'AUTHENTICATION_NOT_REQUIRED', label: 'noAuthentication' },
];
const General = ({
  currentStoreData, setCurrentStoreData, setErrors, errors,
}) => {
  const countriesOptions = getCountriesOptions();
  const availableLocales = getLanguagesOptions();
  const [open, setOpen] = useState(false);
  const [countrySelection, setCountrySelection] = useState(currentStoreData.restrictedCountries.length ? 'allowed' : 'blocked');
  const [errorMessages, setErrorMessages] = useState(null);

  const confirmModal = () => {
    setCurrentStoreData({
      ...currentStoreData,
      status: 'DISABLED',
    });
    setOpen(false);
  };

  const selectAllCountries = () => {
    setCurrentStoreData({
      ...currentStoreData,
      [countrySelection === 'blocked' ? 'blackListedCountries' : 'restrictedCountries']: countriesOptions.map((l) => l.id),
    });
  };

  const removeAllCountries = () => {
    setCurrentStoreData({
      ...currentStoreData,
      [countrySelection === 'blocked' ? 'blackListedCountries' : 'restrictedCountries']: [],
    });
  };

  const handleUpdateGtm = (key, newValue) => {
    if (/^GTM[A-Z0-9]*$/.test(newValue)) {
      const newErrors = { ...errors };
      delete newErrors[key];
      setErrors({ ...newErrors });
    } else {
      setErrors({ ...errors, [key]: true });
    }
    setCurrentStoreData({
      ...currentStoreData,
      [key]: newValue,
    });
  };

  const withValidation = (target) => {
    if (!target.value) {
      setErrors({
        ...errors,
        general: {
          ...errors?.general,
          [target.name]: true,
        },
      });
    } else {
      setErrors({});
    }
  };

  const withValidationInputCustom = (target) => {
    withValidation(target);
    setCurrentStoreData({
      ...currentStoreData,
      [target.name]: target.value,
    });
  };

  const withValidationSelectCustom = (target, options) => {
    withValidation(target);
    setCurrentStoreData({
      ...currentStoreData,
      [target.name]: target.value,
      options,
    });
  };

  return (
    <>
      <Grid item md={12} sm={12}>
        <Box p={2}>
          <Modal
            className='modal'
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box className='paper'>
                <Typography variant="h4" color="textPrimary">
                  {localization.t('general.disableStore')}
                </Typography>
                <Box display='flex' justifyContent='space-around' pt={4}>
                  <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button variant="contained" color="primary" onClick={confirmModal}>Confirm</Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
          <SwitchInput
            label='status'
            handleChange={(e) => {
              !e.target.checked
                ? setOpen(true)
                : setCurrentStoreData({
                  ...currentStoreData,
                  status: e.target.checked ? 'ENABLED' : 'DISABLED',
                });
            }}
            isChecked={currentStoreData.status === 'ENABLED'}
            switchLabel={localization.t(
              `labels.${currentStoreData.status === 'ENABLED' ? 'enabled' : 'disabled'
              }`,
            )}
          />
        </Box>
      </Grid>
      <Grid item md={6} sm={12}>
        <Box p={2}>
          <InputCustom
            isRequired
            label='name'
            value={currentStoreData.name}
            onChangeInput={(e) => withValidationInputCustom(e.target)}
            hasError={!!errors?.general?.name}
            helperText={errors?.general?.name && localization.t('errorNotifications.required')}
          />
        </Box>
        <Box p={2}>
          <Grid container alignItems='center'>
            <Grid item lg={3} md={12} sm={12}>
              <Typography>
                {localization.t('labels.overrideEmailSender')}
              </Typography>
            </Grid>
            <Grid item lg={9} md={12} sm={12}>
              <Box display='flex' flexDirection='row' justifyContent='flex-end'>
                <Button variant='contained' disabled>
                  noreply.
                </Button>
                <Box px={1} width='70%'>
                  <InputCustom
                    label='senderName'
                    value={currentStoreData.emailSenderOverride}
                    onChangeInput={(e) => setCurrentStoreData({
                      ...currentStoreData,
                      emailSenderOverride: e.target.value,
                    })}
                  />
                </Box>
                <Button variant='contained' disabled>
                  @nexway.com
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box p={2}>
          <SelectCustom
            label='defaultLanguage'
            isRequired
            name='defaultLocale'
            value={currentStoreData.defaultLocale}
            selectOptions={availableLocales}
            onChangeSelect={(e) => {
              const thankYouDesc = { ...currentStoreData.thankYouDesc };
              if (currentStoreData.defaultLocale !== e.target.value && currentStoreData.thankYouDesc[currentStoreData.defaultLocale] === '') {
                delete thankYouDesc[currentStoreData.defaultLocale];
              } else if (currentStoreData.defaultLocale !== e.target.value
                && currentStoreData.thankYouDesc[currentStoreData.defaultLocale]
                && !thankYouDesc[e.target.value]) {
                thankYouDesc[e.target.value] = '';
              }
              withValidationSelectCustom(e.target, thankYouDesc);
            }}
            hasError={!!errors?.general?.defaultLocale}
            helperText={errors?.general?.defaultLocale && localization.t('errorNotifications.required')}
          />
        </Box>
        <Box p={2}>
          <SelectWithChip
            label='saleLanguages'
            value={currentStoreData.saleLocales}
            selectOptions={availableLocales}
            onChangeSelect={(e) => setCurrentStoreData({
              ...currentStoreData,
              saleLocales: e.target.value,
            })}
            onClickDelIcon={(chip) => {
              const newValue = [...currentStoreData.saleLocales].filter(
                (val) => val !== chip,
              );
              setCurrentStoreData({
                ...currentStoreData,
                saleLocales: newValue,
              });
            }}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            label='gtmId'
            hasError={!!errors.gtmId}
            helperText={errors.gtmId ? localization.t('errorNotifications.googleTagManagerIdShouldContains') : ''}
            value={currentStoreData.gtmId}
            onChangeInput={(e) => handleUpdateGtm('gtmId', e.target.value)}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            hasError={!!errors.nexwayGtmId}
            helperText={errors.nexwayGtmId ? localization.t('errorNotifications.googleTagManagerIdShouldContains') : ''}
            label='gtmIdOwnedByNexway'
            value={currentStoreData.nexwayGtmId}
            onChangeInput={(e) => handleUpdateGtm('nexwayGtmId', e.target.value)}
          />
        </Box>
        <Box p={2}>
          <SwitchInput
            label='forceEndUserCreation'
            handleChange={() => { }}
            isChecked={currentStoreData.forceEndUserCreation}
          />
        </Box>
        <Box p={2}>
          <SwitchInput
            label='displayProductDeliveryOnCheckoutConfirmation'
            handleChange={(e) => {
              setCurrentStoreData({
                ...currentStoreData,
                allowOrderDetailsOnCheckoutConfirmation: e.target.checked,
              });
            }}
            isChecked={currentStoreData.allowOrderDetailsOnCheckoutConfirmation}
          />
        </Box>
        <Box p={2}>
          <SwitchInput
            label='enableRecipientCode'
            handleChange={(e) => {
              setCurrentStoreData({
                ...currentStoreData,
                recipientCodeMandatory: e.target.checked,
              });
            }}
            isChecked={currentStoreData.recipientCodeMandatory}
          />
        </Box>
        <CheckboxInput
          currentStoreData={currentStoreData}
          checkBoxData={checkBoxObj}
          label='eligibleEndUserTypes'
          setCurrentStoreData={setCurrentStoreData}
        />
      </Grid>
      <Grid item md={6} sm={12}>
        <Box p={2}>
          <InputCustom
            isRequired
            label='displayName'
            value={currentStoreData.displayName}
            onChangeInput={(e) => withValidationInputCustom(e.target)}
            hasError={!!errors?.general?.displayName}
            helperText={errors?.general?.displayName && localization.t('errorNotifications.required')}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            label='storeWebsite'
            hasError={!!errorMessages}
            helperText={errorMessages}
            value={currentStoreData.storeWebsite}
            onChangeInput={(e) => {
              const validUrl = urlIsValid(e.target.value);
              if (!validUrl && e.target.value) {
                setErrorMessages(localization.t('errorNotifications.invalidUrl'));
              } else {
                setErrorMessages(null);
              }
              setCurrentStoreData({
                ...currentStoreData,
                storeWebsite: e.target.value,
              });
            }}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            isRequired
            isMultiline
            label='routes'
            value={currentStoreData.routes
              .map((item) => item.hostname)
              .join('\r\n')}
            onChangeInput={(e) => {
              let res = [];
              if (e.target.value) {
                res = e.target.value.split(/\r?\n/);
              }
              withValidation(e.target);
              setCurrentStoreData({
                ...currentStoreData,
                routes: res.map((item) => ({
                  hostname: item,
                })),
              });
            }}
            hasError={!!errors?.general?.routes}
            helperText={errors?.general?.routes && localization.t('errorNotifications.required')}
          />
        </Box>
        <Box p={2}>
          <SwitchInput
            label='allowSubscriptionUpgrade'
            handleChange={(e) => {
              setCurrentStoreData({
                ...currentStoreData,
                allowSubscriptionUpgrade: e.target.checked,
              });
            }}
            isChecked={currentStoreData.allowSubscriptionUpgrade}
          />
        </Box>
        <Box p={2} height={74} alignItems='center' display='flex'>
          <Typography variant='h4'>{localization.t('labels.allowedBlockedCountries')}</Typography>

          <Button variant='outlined' color='primary' style={{ marginLeft: '15px' }} onClick={selectAllCountries}>
            {localization.t('labels.selectAll')}
          </Button>
          <Button variant='outlined' color='primary' style={{ marginLeft: '15px' }} onClick={removeAllCountries}>
            {localization.t('labels.removeAll')}
          </Button>
        </Box>

        <Box p={2}>
          <RadioGroup
            row
            value={countrySelection}
            onChange={(e) => {
              setCountrySelection(e.target.value);
              setCurrentStoreData({
                ...currentStoreData,
                [e.target.value === 'blocked' ? 'blackListedCountries' : 'restrictedCountries']: [],
              });
            }}
          >
            <FormControlLabel
              value='blocked'
              control={<Radio color="primary" />}
              label={localization.t('labels.blocked')}
            />

            <FormControlLabel
              value='allowed'
              control={<Radio color="primary" />}
              label={localization.t('labels.allowed')}
            />
          </RadioGroup>
        </Box>

        <Box p={2}>
          {
            countrySelection === 'blocked' ? (
              <SelectWithChip
                label='blockedCountries'
                value={currentStoreData.blackListedCountries}
                selectOptions={countriesOptions}
                onChangeSelect={(e) => setCurrentStoreData({
                  ...currentStoreData,
                  restrictedCountries: [],
                  blackListedCountries: e.target.value,
                })}
                onClickDelIcon={(chip) => {
                  const newValue = [...currentStoreData.blackListedCountries].filter(
                    (val) => val !== chip,
                  );
                  setCurrentStoreData({
                    ...currentStoreData,
                    blackListedCountries: newValue,
                  });
                }}
              />
            ) : (
              <SelectWithChip
                label='allowedCountries'
                value={currentStoreData.restrictedCountries}
                selectOptions={countriesOptions}
                onChangeSelect={(e) => setCurrentStoreData({
                  ...currentStoreData,
                  blackListedCountries: [],
                  restrictedCountries: e.target.value,
                })}
                onClickDelIcon={(chip) => {
                  const newValue = [...currentStoreData.restrictedCountries].filter(
                    (val) => val !== chip,
                  );
                  setCurrentStoreData({
                    ...currentStoreData,
                    restrictedCountries: newValue,
                  });
                }}
              />
            )
          }
        </Box>
        <Box p={2}>
          <SwitchInput
            label='useGeoIpToForceEnduserCountry'
            handleChange={(e) => {
              setCurrentStoreData({
                ...currentStoreData,
                forceGeoipLocalization: e.target.checked,
              });
            }}
            isChecked={currentStoreData.forceGeoipLocalization}
            switchLabel={localization.t(
              `labels.${currentStoreData.forceGeoipLocalization ? 'enabled' : 'disabled'
              }`,
            )}
          />
        </Box>
        <Box p={2}>
          <SelectCustom
            label='fallbackCartCountry'
            value={currentStoreData.fallbackCartCountry}
            selectOptions={countriesOptions}
            onChangeSelect={(e) => setCurrentStoreData({
              ...currentStoreData,
              fallbackCartCountry: e.target.value,
            })}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            helperText={
              currentStoreData.externalContextAlias
                && !!currentStoreData.externalContextGenerationParams.length
                ? 'Context should be only one '
                : null
            }
            isMultiline
            label='externalContextGenerationParamsOnePerLine'
            value={currentStoreData.externalContextGenerationParams.join('\r\n')}
            onChangeInput={(e) => {
              let res = [];
              if (e.target.value) {
                res = e.target.value.split(/\r?\n/);
              }
              setCurrentStoreData({
                ...currentStoreData,
                externalContextGenerationParams: res,
              });
            }}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            helperText={
              currentStoreData.externalContextAlias
                && !!currentStoreData.externalContextGenerationParams.length
                ? 'Context should be only one '
                : null
            }
            onChangeInput={(e) => setCurrentStoreData({
              ...currentStoreData,
              externalContextAlias: e.target.value,
            })}
            label='externalContextAlias'
            value={currentStoreData.externalContextAlias}
          />
        </Box>
      </Grid>
    </>
  );
};

General.propTypes = {
  currentStoreData: PropTypes.object,
  setCurrentStoreData: PropTypes.func,
  setErrors: PropTypes.func,
  errors: PropTypes.object,
};

export default General;
