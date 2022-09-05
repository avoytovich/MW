import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import localization from '../../../localization';
import {
  InputCustom,
  SelectWithChip,
  SwitchInput,
  PlusMinusInput,
  AutocompleteWithChips,
} from '../../../components/Inputs';
import '../CustomerDetailScreen.scss';

const PaymentServiceConfiguration = ({ currentCustomer, setCurrentCustomer, selectOptions }) => (
  <Grid container spacing={1}>
    <Grid item md={6}>
      <Box p={2}>
        <SwitchInput
          data-test='promoteOneClickPayment'
          label='promoteOneClickPayment'
          handleChange={(e) => {
            setCurrentCustomer({
              ...currentCustomer,
              promoteOneClickPayment: e.target.checked,
            });
          }}
          isChecked={currentCustomer.promoteOneClickPayment}
        />
      </Box>
      <Box p={2}>
        <InputCustom
          data-test='paymentVendor'
          label='paymentVendor'
          value={currentCustomer.paymentVendor}
          onChangeInput={(e) => {
            setCurrentCustomer({
              ...currentCustomer,
              paymentVendor: e.target.value,
            });
          }}
        />
      </Box>
      <Box p={2}>
        <Grid container alignItems='center'>
          <Grid item md={5}>
            <Typography color="secondary">
              {localization.t('labels.maxPaymentsParts')}
            </Typography>
          </Grid>
          <Grid item md={7}>
            <PlusMinusInput
              data-test='maxPaymentsParts'
              value={currentCustomer?.paymentServiceConfiguration?.maxPaymentsParts}
              handleUpdate={(value) => setCurrentCustomer({
                ...currentCustomer,
                paymentServiceConfiguration: {
                  ...currentCustomer.paymentServiceConfiguration,
                  maxPaymentsParts: value,
                },
              })}
              maxNumber={4}
              minNumber={1}
            />
          </Grid>
        </Grid>
      </Box>
      <Box p={2}>
        <Grid container alignItems='center'>
          <Grid item md={5}>
            <Typography color="secondary">
              {localization.t('labels.minPaymentAmountInPercent')}
            </Typography>
          </Grid>
          <Grid item md={7}>
            <PlusMinusInput
              data-test='minPaymentAmountInPercent'
              value={currentCustomer?.paymentServiceConfiguration?.minPaymentAmountInPercent}
              handleUpdate={(value) => setCurrentCustomer({
                ...currentCustomer,
                paymentServiceConfiguration: {
                  ...currentCustomer.paymentServiceConfiguration,
                  minPaymentAmountInPercent: value,
                },
              })}
              maxNumber={100}
              minNumber={10}
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
    <Grid item md={6}>
      <Box p={2}>
        <SwitchInput
          data-test='signedPartialAmountRequired'
          label='signedPartialAmountRequired'
          handleChange={(e) => {
            setCurrentCustomer({
              ...currentCustomer,
              paymentServiceConfiguration: {
                ...currentCustomer.paymentServiceConfiguration,
                signedPartialAmountRequired: e.target.checked,
              },
            });
          }}
          isChecked={currentCustomer?.paymentServiceConfiguration?.signedPartialAmountRequired}
        />
      </Box>
      <Box p={2}>
        <AutocompleteWithChips
          data-test='availableAdditionalPaymentTypes'
          label='availableAdditionalPaymentTypes'
          arrayTypeValue
          arrayValue={currentCustomer?.paymentServiceConfiguration?.availableAdditionalPaymentTypes}
          selectOptions={selectOptions?.additionalPaymentTypes || []}
          onChange={(newValue) => setCurrentCustomer({
            ...currentCustomer,
            availableAdditionalPaymentTypes: newValue,
            paymentServiceConfiguration: {
              ...currentCustomer.paymentServiceConfiguration,
              availableAdditionalPaymentTypes: newValue,
            },
          })}
        />
      </Box>
      <Box p={2}>
        <AutocompleteWithChips
          data-test='blackListedPaymentTypes'
          label='blackListedPaymentTypes'
          arrayTypeValue
          arrayValue={currentCustomer?.paymentServiceConfiguration?.blackListedPaymentTypes}
          selectOptions={selectOptions.blackPaymentTypes || []}
          onChange={(newValue) => setCurrentCustomer({
            ...currentCustomer,
            blackListedPaymentTypes: newValue,
            paymentServiceConfiguration: {
              ...currentCustomer.paymentServiceConfiguration,
              blackListedPaymentTypes: newValue,
            },
          })}
        />
      </Box>
      <Box p={2}>
        <AutocompleteWithChips
          data-test='forcedPaymentMethods'
          label='forcedPaymentMethods'
          arrayTypeValue
          arrayValue={currentCustomer?.paymentServiceConfiguration?.forcedPaymentTypes}
          selectOptions={selectOptions.forcedPaymentTypes || []}
          onChange={(newValue) => setCurrentCustomer({
            ...currentCustomer,
            paymentServiceConfiguration: {
              ...currentCustomer.paymentServiceConfiguration,
              forcedPaymentTypes: newValue,
            },
          })}
        />
      </Box>
    </Grid>
  </Grid>
);

PaymentServiceConfiguration.propTypes = {
  currentCustomer: PropTypes.object,
  setCurrentCustomer: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default PaymentServiceConfiguration;
