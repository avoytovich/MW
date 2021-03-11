import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core';
import {
  availableLocales,
  installmentOptions,
  countryOptions,
} from '../../../services/selectOptions/selectOptions';

import localization from '../../../localization';
import {
  InputCustom,
  SelectCustom,
  SelectWithChip,
  SwitchInput,
  CheckboxInput,
} from '../../../components/Inputs';

const checkBoxObj = [
  { name: 'RESELLER_AUTHENTICATION_REQUIRED', label: 'resellerAuthentication' },
  { name: 'BUYER_AUTHENTICATION_REQUIRED', label: 'buyerAuthentication' },
  { name: 'AUTHENTICATION_NOT_REQUIRED', label: 'noAuthentication' },
];
const General = ({ currentStoreData, setCurrentStoreData }) => (
  <>
    <Grid item md={12}>
      <SwitchInput
        label="status"
        handleChange={(e) => {
          setCurrentStoreData({
            ...currentStoreData,
            status: e.target.checked ? 'ENABLED' : 'DISABLED',
          });
        }}
        isChecked={currentStoreData.status === 'ENABLED'}
        switchLabel={localization.t(
          `labels.${
            currentStoreData.status === 'ENABLED' ? 'enabled' : 'disabled'
          }`,
        )}
      />
    </Grid>
    <Grid item md={6} sm={12}>
      <Box p={2}>
        <InputCustom
          isRequired
          label="name"
          value={currentStoreData.name}
          onChangeInput={(e) => setCurrentStoreData({
            ...currentStoreData,
            name: e.target.value,
          })}
        />
      </Box>
      <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
        <Box>
          <Typography>
            {localization.t('labels.overrideEmailSender')}
          </Typography>
        </Box>
        <Box minWidth="92px" maxWidth="92px">
          <TextField
            fullWidth
            variant="outlined"
            disabled
            value="noreply."
            type="text"
            InputProps={{
              form: { autocomplete: 'off' },
            }}
          />
        </Box>

        <Box>
          <InputCustom
            label="senderName"
            value={currentStoreData.emailSenderOverride}
            onChangeInput={(e) => setCurrentStoreData({
              ...currentStoreData,
              emailSenderOverride: e.target.value,
            })}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            variant="outlined"
            disabled
            value="@nexway.com."
            type="text"
            InputProps={{
              form: { autocomplete: 'off' },
            }}
          />
        </Box>
      </Box>
      <Box p={2}>
        <SelectCustom
          label="defaultLanguage"
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
          label="saleLanguages"
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
      <SwitchInput
        label="allowInstallments"
        handleChange={(e) => {
          setCurrentStoreData({
            ...currentStoreData,
            allowInstallments: e.target.checked,
          });
        }}
        isChecked={currentStoreData.allowInstallments}
      />
      <Box p={2}>
        <SelectWithChip
          isDisabled={!currentStoreData.allowInstallments}
          label="installmentOptions"
          value={currentStoreData.installmentOptions}
          selectOptions={installmentOptions}
          onChangeSelect={(e) => setCurrentStoreData({
            ...currentStoreData,
            installmentOptions: e.target.value,
          })}
          onClickDelIcon={(chip) => {
            const newValue = [...currentStoreData.installmentOptions].filter(
              (val) => val !== chip,
            );
            setCurrentStoreData({
              ...currentStoreData,
              installmentOptions: newValue,
            });
          }}
        />
      </Box>
      <Box p={2}>
        <InputCustom label="gtmId" onChangeInput={() => {}} />
      </Box>
      <Box p={2}>
        <InputCustom label="gtmIdOwnedByNexway" onChangeInput={() => {}} />
      </Box>
      <SwitchInput
        label="forceEndUserCreation"
        handleChange={() => {}}
        isChecked={currentStoreData.forceEndUserCreation}
      />
      <SwitchInput
        label="promoteOneClickPayment"
        handleChange={(e) => {
          setCurrentStoreData({
            ...currentStoreData,
            promoteOneClickPayment: e.target.checked,
          });
        }}
        isChecked={currentStoreData.promoteOneClickPayment}
      />
      <SwitchInput
        label="displayProductDeliveryOnCheckoutConfirmation"
        handleChange={(e) => {
          setCurrentStoreData({
            ...currentStoreData,
            allowOrderDetailsOnCheckoutConfirmation: e.target.checked,
          });
        }}
        isChecked={currentStoreData.allowOrderDetailsOnCheckoutConfirmation}
      />
      <SwitchInput
        label="enableRecipientCode"
        handleChange={(e) => {
          setCurrentStoreData({
            ...currentStoreData,
            recipientCodeMandatory: e.target.checked,
          });
        }}
        isChecked={currentStoreData.recipientCodeMandatory}
      />
      <SwitchInput
        label="allowQuotes"
        handleChange={(e) => {
          setCurrentStoreData({
            ...currentStoreData,
            allowQuotes: e.target.checked,
          });
        }}
        isChecked={currentStoreData.allowQuotes}
      />
      <CheckboxInput
        currentStoreData={currentStoreData}
        checkBoxData={checkBoxObj}
        label="eligibleEndUserTypes"
        setCurrentStoreData={setCurrentStoreData}
      />
    </Grid>
    <Grid item md={6} sm={12}>
      <Box p={2}>
        <InputCustom
          isRequired
          label="displayName"
          value={currentStoreData.displayName}
          onChangeInput={(e) => setCurrentStoreData({
            ...currentStoreData,
            displayName: e.target.value,
          })}
        />
      </Box>
      <Box p={2}>
        <InputCustom
          label="storeWebsite"
          value={currentStoreData.storeWebsite}
          onChangeInput={(e) => setCurrentStoreData({
            ...currentStoreData,
            storeWebsite: e.target.value,
          })}
        />
      </Box>
      <Box p={2}>
        <InputCustom
          isRequired
          isMultiline
          label="routes"
          // value={currentStoreData.routes}
          onChangeInput={(e) => setCurrentStoreData({
            ...currentStoreData,
            routes: e.target.value,
          })}
        />
      </Box>
      <Box p={2}>
        <SelectWithChip
          label="blockedCountries"
          value={currentStoreData.blackListedCountries}
          selectOptions={countryOptions}
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
          label="restrictedCountries"
          value={currentStoreData.restrictedCountries}
          selectOptions={countryOptions}
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
      <SwitchInput
        label="useGeoIpToForceEnduserCountry"
        handleChange={(e) => {
          setCurrentStoreData({
            ...currentStoreData,
            forceGeoipLocalization: e.target.checked,
          });
        }}
        isChecked={currentStoreData.forceGeoipLocalization}
        switchLabel={localization.t(
          `labels.${
            currentStoreData.forceGeoipLocalization ? 'enabled' : 'disabled'
          }`,
        )}
      />
      <Box p={2}>
        <SelectCustom
          label="fallbackCartCountry"
          value={currentStoreData.fallbackCartCountry}
          selectOptions={countryOptions}
          onChangeSelect={(e) => setCurrentStoreData({
            ...currentStoreData,
            fallbackCartCountry: e.target.value,
          })}
        />
      </Box>
      <Box p={2}>
        <InputCustom
          isMultiline
          label="externalContextGenerationParamsOnePerLine"
          // value={currentStoreData.externalContextGenerationParams}
          onChangeInput={(e) => setCurrentStoreData({
            ...currentStoreData,
            externalContextGenerationParams: e.target.value,
          })}
        />
      </Box>
      <Box p={2}>
        <InputCustom
          onChangeInput={(e) => setCurrentStoreData({
            ...currentStoreData,
            externalContextAlias: e.target.value,
          })}
          label="externalContextAlias"
          value={currentStoreData.externalContextAlias}
        />
      </Box>
    </Grid>
  </>
);

General.propTypes = {
  currentStoreData: PropTypes.object,
  setCurrentStoreData: PropTypes.func,
};

export default General;
