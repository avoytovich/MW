import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Grid,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  DialogContentText,
  Dialog,
  DialogContent,
  Switch,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { getCountriesOptions, getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import { urlIsValid } from '../../../services/helpers/inputValidators';

import localization from '../../../localization';
import {
  InputCustom,
  SwitchInput,
  AutocompleteCustom,
  AutocompleteWithChips,
} from '../../../components/Inputs';
import CheckboxInput from './CheckboxInput';

import '../storeDetailsScreen.scss';

const checkBoxObj = [
  { name: 'RESELLER_AUTHENTICATION_REQUIRED', label: 'resellerAuthentication' },
  { name: 'BUYER_AUTHENTICATION_REQUIRED', label: 'buyerAuthentication' },
  { name: 'AUTHENTICATION_NOT_REQUIRED', label: 'noAuthentication' },
];

const General = ({
  currentStoreData,
  setCurrentStoreData,
  customer,
  setErrors,
  errors,
  myRef,
}) => {
  const countriesOptions = getCountriesOptions();
  const availableLocales = getLanguagesOptions();
  const [open, setOpen] = useState(false);
  const [countrySelection, setCountrySelection] = useState('blocked');
  const [errorMessages, setErrorMessages] = useState(null);

  const defaultBlacklisted = currentStoreData?.blackListedCountries || [];
  const [selectedCountries, setSelectedCountries] = useState([...defaultBlacklisted]);

  const confirmModal = () => {
    setCurrentStoreData({
      ...currentStoreData,
      status: 'DISABLED',
    });
    setOpen(false);
  };

  const handleUpdateGtm = (key, newValue) => {
    if (/^GTM[A-Z0-9]*$/.test(newValue)) {
      const newErrors = { ...errors };
      delete newErrors[key];
      setErrors({ ...newErrors });
    } else {
      setErrors({ ...errors, [key]: true });
    }
    if (newValue === '') {
      const newData = { ...currentStoreData };
      delete newData[key];
      setCurrentStoreData({
        ...newData,
      });
      const newErrors = { ...errors };
      delete newErrors[key];
      setErrors({ ...newErrors });
    } else {
      setCurrentStoreData({
        ...currentStoreData,
        [key]: newValue,
      });
    }
  };

  const withValidation = (target) => {
    if (target.name !== 'senderName') {
      if (!target.value) {
        setErrors({
          ...errors,
          general: {
            ...errors?.general,
            [target.name]: true,
          },
        });
      } else {
        setErrors({
          ...errors,
          general: {
            ...errors?.general,
            [target.name]: false,
          },
        });
      }
    } else {
      const isValidSenderName = () => target.value.startsWith(`${customer?.iamClient?.realmName}-`)
        || target.value === customer?.iamClient?.realmName;
      setErrors({
        ...errors,
        general: {
          ...errors?.senderName,
          [target.name]: !isValidSenderName(),
        },
      });
    }
  };

  const withValidationInputCustom = (target) => {
    if (target.name !== 'senderName') {
      withValidation(target);
      setCurrentStoreData({
        ...currentStoreData,
        [target.name]: target.value,
      });
    } else {
      withValidation(target);
      setCurrentStoreData({
        ...currentStoreData,
        emailSenderOverride: target.value,
      });
    }
  };

  const withValidationSelectCustom = (target, options = {}) => {
    withValidation(target);
    setCurrentStoreData({
      ...currentStoreData,
      [target.name]: target.value,
      ...options,
    });
  };

  useEffect(() => {
    if (countrySelection === 'blocked' && selectedCountries?.length !== defaultBlacklisted?.length) {
      setSelectedCountries([...defaultBlacklisted]);
    }
  }, [currentStoreData?.blackListedCountries]);

  useEffect(() => {
    const checkedSelected = selectedCountries || [];
    const checkedDefault = defaultBlacklisted || [];

    const newCountries = countrySelection === 'blocked' ? [...checkedSelected]
      : [...countriesOptions.map((l) => l.id).filter((c) => checkedSelected?.indexOf(c) < 0)];

    const [hasChanges] = newCountries
      ? newCountries?.filter((itm) => checkedDefault?.indexOf(itm) < 0) : [];

    const [hasReverseChanges] = checkedDefault?.length
      ? checkedDefault?.filter((itm) => newCountries?.indexOf(itm) < 0) : [];

    if (hasChanges || hasReverseChanges) {
      setCurrentStoreData({
        ...currentStoreData,
        blackListedCountries: [...newCountries],
      });
    }
  }, [selectedCountries]);

  useEffect(() => {
    const checkedDefault = defaultBlacklisted || [];

    if (!countriesOptions?.length && checkedDefault?.length) return;

    if (countrySelection === 'blocked') {
      const newCountries = checkedDefault?.length ? countriesOptions
        ?.map((l) => l.id)
        .filter((c) => checkedDefault?.indexOf(c) >= 0) : [];

      setSelectedCountries([...newCountries]);
    } else {
      const newCountries = checkedDefault?.length ? countriesOptions
        .map((l) => l.id)
        .filter((c) => checkedDefault?.indexOf(c) < 0)
        : countriesOptions.map((l) => l.id);

      setSelectedCountries([...newCountries]);
    }
  }, [countrySelection]);

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
            <Dialog open={open} aria-labelledby='form-dialog-title'>
              <DialogContent>
                <DialogContentText variant="h4" color="textPrimary" pt={2}>
                  {localization.t('general.disableStore')}
                </DialogContentText>
                <Box display='flex' justifyContent='space-around' pt={4} pb={2}>
                  <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button variant="contained" color="primary" onClick={confirmModal}>Confirm</Button>
                </Box>
              </DialogContent>
            </Dialog>
          </Modal>
          <Box display='flex' flexDirection='row' alignItems='baseline' width='50%'>
            <Box>
              <Typography color='secondary'>
                {`${localization.t(
                  'labels.status',
                )} *`}
              </Typography>
            </Box>
            <Box p={2}>
              <FormControlLabel
                control={(
                  <Switch
                    name="status"
                    onChange={(e) => {
                      !e.target.checked
                        ? setOpen(true)
                        : setCurrentStoreData({
                          ...currentStoreData,
                          status: e.target.checked ? 'ENABLED' : 'DISABLED',
                        });
                    }}
                    color={currentStoreData.status === 'ENABLED' ? 'success' : 'primary'}
                    checked={currentStoreData.status === 'ENABLED'}
                  />
                )}
                label={localization.t(
                  `labels.${currentStoreData.status === 'ENABLED' ? 'enabled' : 'disabled'
                  }`,
                )}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item md={6} sm={12} ref={myRef}>
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
                    onChangeInput={(e) => withValidationInputCustom(e.target)}
                    // For EmailSenderOverride
                    // hasError={!!errors?.general?.senderName
                    //   || (!currentStoreData?.emailSenderOverride.startsWith(`${customer?.iamClient?.realmName}-`)
                    //     && (currentStoreData?.emailSenderOverride !== customer?.iamClient?.realmName)
                    //   )}
                    // helperText={(errors?.general?.senderName
                    //   || (!currentStoreData?.emailSenderOverride.startsWith(`${customer?.iamClient?.realmName}-`)
                    //     && (
                    //       currentStoreData?.emailSenderOverride !== customer?.iamClient?.realmName
                    //     )))
                    //   && (`${localization.t('errorNotifications.senderNameExactly')}
                    //     "${customer?.iamClient?.realmName}" ${localization.t('errorNotifications.senderNameStartWith')}
                    //     "${customer?.iamClient?.realmName}-" ${localization.t('errorNotifications.senderNameEnd')}`)}
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
          <AutocompleteCustom
            optionLabelKey='value'
            label="defaultLanguage"
            isRequired
            onSelect={(newValue) => withValidationSelectCustom({
              name: 'defaultLocale',
              value: newValue,
            })}
            selectOptions={availableLocales || []}
            curValue={currentStoreData.defaultLocale}
            error={!!errors?.general?.defaultLocale}
            helperText={errors?.general?.defaultLocale && localization.t('errorNotifications.required')}
          />
        </Box>
        <Box p={2}>
          <AutocompleteWithChips
            label='saleLanguages'
            arrayTypeValue
            arrayValue={currentStoreData.saleLocales}
            selectOptions={availableLocales}
            onChange={(newValue) => setCurrentStoreData({
              ...currentStoreData,
              saleLocales: newValue,
            })}
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
      </Grid>
      <Grid item md={12} sm={12}>
        <Box p={2} height={74} alignItems='center' display='flex'>
          <Typography variant='h4'>{localization.t('labels.allowedBlockedCountries')}</Typography>

          <Button
            variant='outlined'
            color='primary'
            style={{ marginLeft: '15px' }}
            onClick={() => setSelectedCountries(countriesOptions.map((l) => l.id))}
          >
            {localization.t('labels.selectAll')}
          </Button>

          <Button
            variant='outlined'
            color='primary'
            style={{ marginLeft: '15px' }}
            onClick={() => setSelectedCountries([])}
          >
            {localization.t('labels.removeAll')}
          </Button>
        </Box>

        <Box p={2}>
          <RadioGroup
            row
            value={countrySelection}
            onChange={(e) => setCountrySelection(e.target.value)}
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
          <AutocompleteWithChips
            arrayTypeValue
            label={countrySelection === 'blocked' ? 'blockedCountries' : 'allowedCountries'}
            arrayValue={selectedCountries}
            selectOptions={countriesOptions || []}
            onChange={(newValue) => setSelectedCountries(newValue)}
          />
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
          <AutocompleteCustom
            optionLabelKey='value'
            label="fallbackCartCountry"
            isRequired
            onSelect={(newValue) => setCurrentStoreData({
              ...currentStoreData,
              fallbackCartCountry: newValue,
            })}
            selectOptions={countriesOptions}
            curValue={currentStoreData.fallbackCartCountry}
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
  customer: PropTypes.object,
  myRef: PropTypes.object,
};

export default General;
