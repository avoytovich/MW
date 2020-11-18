import React from 'react';

import PropTypes from 'prop-types';

import {
  Box,
  FormControlLabel,
  Typography,
  Divider,
  TextField,
  Checkbox,
  MenuItem,
  Chip,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';

import localization from '../../../localization';

const PaymentSection = ({
  currentCustomer,
  setCurrentCustomer,
  selectOptions,
}) => (
  <Box my={3} bgcolor="#fff" boxShadow={2} p={3} mx={3}>
    <Typography gutterBottom variant="h4">
      {localization.t('general.payment')}
    </Typography>
    <Divider light />
    <Box display="flex" flexDirection="column">
      <Box py={5} pb={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-availablePayments">
            {localization.t('labels.availablePayments')}
          </InputLabel>
          <Select
            inputProps={{
              name: 'availablePayments',
              id: 'outlined-availablePayments',
            }}
            label={localization.t('labels.availablePayments')}
            multiple
            value={
              currentCustomer.paymentServiceConfiguration
                .availableAdditionalPaymentTypes
            }
            variant="outlined"
            onChange={(e) => {
              setCurrentCustomer({
                ...currentCustomer,
                paymentServiceConfiguration: {
                  ...currentCustomer.paymentServiceConfiguration,
                  availableAdditionalPaymentTypes: e.target.value,
                },
                availableAdditionalPaymentTypes: e.target.value,
              });
            }}
            renderValue={(selected) => (
              <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                flexWrap="wrap"
              >
                {selected.map((chip) => (
                  <Chip
                    variant="outlined"
                    color="primary"
                    onDelete={() => {
                      const newValue = [
                        ...currentCustomer.paymentServiceConfiguration
                          .availableAdditionalPaymentTypes,
                      ].filter((val) => val !== chip);
                      setCurrentCustomer({
                        ...currentCustomer,
                        paymentServiceConfiguration: {
                          ...currentCustomer.paymentServiceConfiguration,
                          availableAdditionalPaymentTypes: newValue,
                        },
                        availableAdditionalPaymentTypes: newValue,
                      });
                    }}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                    key={chip}
                    label={chip}
                  />
                ))}
              </Box>
            )}
          >
            {selectOptions.paymentTypes?.map(
              (item) => item.status === 'OPTIONAL' && (
              <MenuItem key={item.id} value={item.id}>
                {item.id}
              </MenuItem>
              ),
            )}
          </Select>
        </FormControl>
      </Box>
      <Box py={5} pb={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-blockedPayments">
            {localization.t('labels.blockedPayments')}
          </InputLabel>
          <Select
            inputProps={{
              name: 'blockedPayments',
              id: 'outlined-blockedPayments',
            }}
            label={localization.t('labels.blockedPayments')}
            multiple
            value={
              currentCustomer.paymentServiceConfiguration
                .blackListedPaymentTypes
            }
            variant="outlined"
            onChange={(e) => {
              setCurrentCustomer({
                ...currentCustomer,
                paymentServiceConfiguration: {
                  ...currentCustomer.paymentServiceConfiguration,
                  blackListedPaymentTypes: e.target.value,
                },
                blackListedPaymentTypes: e.target.value,
              });
            }}
            renderValue={(selected) => (
              <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                flexWrap="wrap"
              >
                {selected.map((chip) => (
                  <Chip
                    variant="outlined"
                    color="primary"
                    onDelete={() => {
                      const newValue = [
                        ...currentCustomer.paymentServiceConfiguration
                          .blackListedPaymentTypes,
                      ].filter((val) => val !== chip);
                      setCurrentCustomer({
                        ...currentCustomer,
                        paymentServiceConfiguration: {
                          ...currentCustomer.paymentServiceConfiguration,
                          blackListedPaymentTypes: newValue,
                        },
                        blackListedPaymentTypes: newValue,
                      });
                    }}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                    key={chip}
                    label={chip}
                  />
                ))}
              </Box>
            )}
          >
            {selectOptions.paymentTypes?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box py={5} pb={2}>
        <TextField
          value={currentCustomer.paymentServiceConfiguration.maxPaymentsParts}
          fullWidth
          label={localization.t('labels.maxPaymentsPart')}
          type="number"
          InputProps={{
            inputProps: { min: 1, max: 4 },
            form: { autocomplete: 'off' },
          }}
          onChange={(e) => setCurrentCustomer({
            ...currentCustomer,
            paymentServiceConfiguration: {
              ...currentCustomer.paymentServiceConfiguration,
              maxPaymentsParts: e.target.value,
            },
          })}
          variant="outlined"
        />
      </Box>
      <Box py={5} pb={2}>
        <FormControlLabel
          label={localization.t('labels.oneClickPayment')}
          control={(
            <Checkbox
              color="primary"
              checked={
                currentCustomer.paymentServiceConfiguration
                  .promoteOneClickPayment
              }
              onChange={(e) => {
                setCurrentCustomer({
                  ...currentCustomer,
                  paymentServiceConfiguration: {
                    ...currentCustomer.paymentServiceConfiguration,
                    promoteOneClickPayment: e.target.checked,
                  },
                });
              }}
            />
          )}
        />
      </Box>
    </Box>
  </Box>
);
PaymentSection.propTypes = {
  currentCustomer: PropTypes.object,
  setCurrentCustomer: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default PaymentSection;
