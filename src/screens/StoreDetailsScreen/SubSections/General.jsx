import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Grid, Button,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
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
const General = ({ currentStoreData, setCurrentStoreData }) => {
  const countriesOptions = getCountriesOptions();
  const availableLocales = getLanguagesOptions();
  const [open, setOpen] = React.useState(false);
  const [saveModalChecked, setSaveModalChecked] = React.useState(null);
  const [errorMessages, setErrorMessages] = useState(null);

  const handleOpenModal = (e) => {
    setSaveModalChecked(e.target.value);
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const confirmModal = () => {
    setCurrentStoreData({
      ...currentStoreData,
      status: saveModalChecked ? 'ENABLED' : 'DISABLED',
    });
    handleCloseModal();
  };

  return (
    <>
      <Grid item md={12} sm={12}>
        <Box p={2}>
          <Modal
            className='modal'
            open={open}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
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
                  <Button variant="outlined" onClick={handleCloseModal}>Cancel</Button>
                  <Button variant="contained" color="primary" onClick={confirmModal}>Confirm</Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
          <SwitchInput
            label='status'
            handleChange={(e) => {
              !e.target.checked
                ? handleOpenModal(e)
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
            onChangeInput={(e) => setCurrentStoreData({
              ...currentStoreData,
              name: e.target.value,
            })}
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
                  @nexway.com.
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box p={2}>
          <SelectCustom
            label='defaultLanguage'
            isRequired
            value={currentStoreData.defaultLocale}
            selectOptions={availableLocales}
            onChangeSelect={(e) => setCurrentStoreData({
              ...currentStoreData,
              defaultLocale: e.target.value,
            })}
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
          <InputCustom label='gtmId' onChangeInput={() => { }} />
        </Box>
        <Box p={2}>
          <InputCustom label='gtmIdOwnedByNexway' onChangeInput={() => { }} />
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
        <Box p={2}>

          <SwitchInput
            label='allowQuotes'
            handleChange={(e) => {
              setCurrentStoreData({
                ...currentStoreData,
                allowQuotes: e.target.checked,
              });
            }}
            isChecked={currentStoreData.allowQuotes}
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
            onChangeInput={(e) => setCurrentStoreData({
              ...currentStoreData,
              displayName: e.target.value,
            })}
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
              setCurrentStoreData({
                ...currentStoreData,
                routes: res.map((item) => ({
                  hostname: item,
                })),
              });
            }}
          />
        </Box>
        <Box p={2}>
          <SelectWithChip
            label='blockedCountries'
            value={currentStoreData.blackListedCountries}
            selectOptions={countriesOptions}
            onChangeSelect={(e) => setCurrentStoreData({
              ...currentStoreData,
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
        </Box>
        <Box p={2}>
          <SelectWithChip
            label='restrictedCountries'
            value={currentStoreData.restrictedCountries}
            selectOptions={countriesOptions}
            onChangeSelect={(e) => setCurrentStoreData({
              ...currentStoreData,
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
};

export default General;
