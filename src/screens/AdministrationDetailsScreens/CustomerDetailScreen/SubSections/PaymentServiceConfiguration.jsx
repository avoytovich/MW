import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
} from '@material-ui/core';

import {
  NumberInput,
  InputCustom,
  SelectWithChip,
  SwitchInput,
} from '../../../../components/Inputs';

const PaymentServiceConfiguration = ({ currentCustomer, setCurrentCustomer, selectOptions }) => (
  <Box width={1}>
    <Box p={2}>
      <InputCustom
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
      <NumberInput
        minMAx={{ min: 1, max: 4 }}
        label='maxPaymentsParts'
        value={currentCustomer.paymentServiceConfiguration.maxPaymentsParts}
        onChangeInput={(e) => setCurrentCustomer({
          ...currentCustomer,
          paymentServiceConfiguration: {
            ...currentCustomer.paymentServiceConfiguration,
            maxPaymentsParts: e.target.value,
          },
        })}
      />
    </Box>
    <Box p={2}>
      <NumberInput
        minMAx={{
          min: 10,
          max: 100 / currentCustomer.paymentServiceConfiguration.maxPaymentsParts,
        }}
        label='minPaymentAmountInPercent'
        value={currentCustomer.paymentServiceConfiguration.minPaymentAmountInPercent}
        onChangeInput={(e) => setCurrentCustomer({
          ...currentCustomer,
          paymentServiceConfiguration: {
            ...currentCustomer.paymentServiceConfiguration,
            minPaymentAmountInPercent: e.target.value,
          },
        })}
      />
    </Box>
    <Grid item md={12}>
      <SwitchInput
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
        isChecked={currentCustomer.paymentServiceConfiguration.signedPartialAmountRequired}
      />
    </Grid>
    <Box p={2}>
      <SelectWithChip
        label='availableAdditionalPaymentTypes'
        selectOptions={selectOptions?.additionalPaymentTypes}
        value={currentCustomer.paymentServiceConfiguration.availableAdditionalPaymentTypes}
        onChangeSelect={(e) => setCurrentCustomer({
          ...currentCustomer,
          paymentServiceConfiguration: {
            ...currentCustomer.paymentServiceConfiguration,
            availableAdditionalPaymentTypes: e.target.value,
          },
        })}
        onClickDelIcon={(chip) => {
          const newValue = [
            ...currentCustomer.paymentServiceConfiguration.availableAdditionalPaymentTypes]
            .filter(
              (val) => val !== chip,
            );
          setCurrentCustomer({
            ...currentCustomer,
            paymentServiceConfiguration: {
              ...currentCustomer.paymentServiceConfiguration,
              availableAdditionalPaymentTypes: newValue,
            },
          });
        }}
      />
    </Box>
    <Box p={2}>
      <SelectWithChip
        label='blackListedPaymentTypes'
        selectOptions={selectOptions.blackPaymentTypes}
        value={currentCustomer.paymentServiceConfiguration.blackListedPaymentTypes}
        onChangeSelect={(e) => setCurrentCustomer({
          ...currentCustomer,
          paymentServiceConfiguration: {
            ...currentCustomer.paymentServiceConfiguration,
            blackListedPaymentTypes: e.target.value,
          },
        })}
        onClickDelIcon={(chip) => {
          const newValue = [
            ...currentCustomer.paymentServiceConfiguration.blackListedPaymentTypes]
            .filter(
              (val) => val !== chip,
            );
          setCurrentCustomer({
            ...currentCustomer,
            paymentServiceConfiguration: {
              ...currentCustomer.paymentServiceConfiguration,
              blackListedPaymentTypes: newValue,
            },
          });
        }}
      />
    </Box>
    <Box p={2}>
      <SelectWithChip
        selectOptions={selectOptions.forcedPaymentTypes}
        label='forcedPaymentMethods'
        value={currentCustomer.paymentServiceConfiguration.forcedPaymentTypes}
        onChangeSelect={(e) => setCurrentCustomer({
          ...currentCustomer,
          paymentServiceConfiguration: {
            ...currentCustomer.paymentServiceConfiguration,
            forcedPaymentTypes: e.target.value,
          },
        })}
        onClickDelIcon={(chip) => {
          const newValue = [
            ...currentCustomer.paymentServiceConfiguration.forcedPaymentTypes]
            .filter(
              (val) => val !== chip,
            );
          setCurrentCustomer({
            ...currentCustomer,
            paymentServiceConfiguration: {
              ...currentCustomer.paymentServiceConfiguration,
              forcedPaymentTypes: newValue,
            },
          });
        }}
      />
    </Box>
  </Box>
);

PaymentServiceConfiguration.propTypes = {
  currentCustomer: PropTypes.object,
  setCurrentCustomer: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default PaymentServiceConfiguration;
