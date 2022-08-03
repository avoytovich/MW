import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  TextField,
  Chip,
  Autocomplete,
} from '@mui/material';

import { email } from '../../../services/helpers/inputValidators';
import { sortByAlphabetical } from '../../../services/helpers/utils';

import EditKeyValueInputs from '../EditKeyValueInputs';
import localization from '../../../localization';
import { SelectWithChip, SelectWithDeleteIcon, AutocompleteWithChips } from '../../../components/Inputs';
import { getCurrency } from '../../../services/selectOptions/selectOptions';
import { getCountriesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';

const Eligibility = ({
  curDiscount,
  updateDiscount,
  setCurDiscount,
  selectOptions,
}) => {
  const [errorMessages, setErrorMessages] = useState({ email: null });
  const countriesOptions = getCountriesOptions();

  return (
    <>
      <Grid item md={6} xs={12}>
        <Box pt={2} pl={2}>
          <Typography>{localization.t('labels.sources')}</Typography>
        </Box>
        <Box p={2}>
          <FormControlLabel
            data-test='manualRenewal'
            control={(
              <Checkbox
                name='MANUAL_RENEWAL'
                color='primary'
                checked={curDiscount?.sources?.indexOf('MANUAL_RENEWAL') >= 0}
              />
            )}
            onChange={() => updateDiscount('sources', 'MANUAL_RENEWAL', 'empty')}
            label='Manual Renewal'
          />
          <FormControlLabel
            data-test='purchase'
            control={(
              <Checkbox
                name='PURCHASE'
                color='primary'
                checked={curDiscount?.sources?.indexOf('PURCHASE') >= 0}
              />
            )}
            onChange={() => updateDiscount('sources', 'PURCHASE', 'empty')}
            label='Purchase'
          />
          <FormControlLabel
            data-test='subscription'
            control={(
              <Checkbox
                name='SUBSCRIPTION'
                color='primary'
                checked={curDiscount?.sources?.indexOf('SUBSCRIPTION') >= 0}
              />
            )}
            onChange={() => updateDiscount('sources', 'SUBSCRIPTION', 'empty')}
            label='Subscription'
          />
          <FormControlLabel
            data-test='billingPlan'
            control={(
              <Checkbox
                name='BILLING_PLAN'
                color='primary'
                checked={curDiscount?.sources?.indexOf('BILLING_PLAN') >= 0}
              />
            )}
            onChange={() => updateDiscount('sources', 'BILLING_PLAN', 'empty')}
            label='Billing Plan'
          />
        </Box>
        <Box pt={2} pl={2}>
          <Typography>{localization.t('labels.endUserTypes')}</Typography>
        </Box>
        <Box p={2}>
          <FormControlLabel
            data-test='buyer'
            control={(
              <Checkbox
                name='BUYER'
                color='primary'
                checked={curDiscount?.endUserTypes?.indexOf('BUYER') >= 0}
              />
            )}
            onChange={() => updateDiscount('endUserTypes', 'BUYER', 'empty')}
            label='End-user'
          />
          <FormControlLabel
            data-test='reseller'
            control={(
              <Checkbox
                name='RESELLER'
                color='primary'
                checked={curDiscount?.endUserTypes?.indexOf('RESELLER') >= 0}
              />
            )}
            onChange={() => updateDiscount('endUserTypes', 'RESELLER', 'empty')}
            label='Approved reseller'
          />
        </Box>
        <Box p={2}>
          <SelectWithDeleteIcon
            data-test='endUser'
            label="endUser"
            value={curDiscount.enduserId}
            selectOptions={selectOptions.endUsers}
            onChangeSelect={(e) => {
              setCurDiscount({
                ...curDiscount,
                enduserId: e.target.value,
              });
            }}
            onClickDelIcon={() => {
              setCurDiscount({
                ...curDiscount,
                enduserId: '',
              });
            }}
          />
        </Box>
        <Box p={2}>
          <SelectWithChip
            label='endUserGroups'
            value={curDiscount.endUserGroupIds}
            selectOptions={selectOptions.endUserGroups}
            onChangeSelect={(e) => {
              setCurDiscount({
                ...curDiscount,
                endUserGroupIds: e.target.value,
              });
            }}
            onClickDelIcon={(chip) => {
              const newValue = [...curDiscount.endUserGroupIds].filter(
                (val) => val !== chip,
              );
              setCurDiscount({
                ...curDiscount,
                endUserGroupIds: newValue,
              });
            }}
          />
        </Box>
        <Box p={2}>
          <Autocomplete
            data-test='endUserEmails'
            onChange={(e, newValue) => {
              if (curDiscount.endUserEmails.length > newValue.length) {
                setCurDiscount({
                  ...curDiscount,
                  endUserEmails: newValue,
                });
              } else {
                const validMail = email({ email: e.target.value });
                if (!validMail.email) {
                  setErrorMessages({ ...errorMessages, email: null });
                  setCurDiscount({
                    ...curDiscount,
                    endUserEmails: newValue,
                  });
                } else {
                  setErrorMessages({
                    ...errorMessages,
                    email: validMail.email,
                  });
                }
              }
            }}
            value={curDiscount.endUserEmails}
            multiple
            id='tags-filled'
            options={[]}
            freeSolo
            renderTags={(value, getTagProps) => value.map((option, index) => (
              <Chip
                variant='outlined'
                label={option}
                {...getTagProps({ index })}
              />
            ))}
            renderInput={(params) => (
              <TextField
                error={!!errorMessages.email}
                helperText={errorMessages.email}
                variant='outlined'
                {...params}
                label={localization.t('labels.endUserMails')}
              />
            )}
          />
        </Box>
        <Box p={2}>
          <Typography>{localization.t('labels.minimumCartAmount')}</Typography>
        </Box>
        <EditKeyValueInputs
          firstCanBeDeleted
          curValue={curDiscount.thresholds}
          setCurValue={(value) => setCurDiscount({ ...curDiscount, thresholds: value })}
          selectOptions={getCurrency()}
          labels={['currency', 'amount']}
        />
      </Grid>
      <Grid item md={6} sm={12}>
        <Box p={2}>
          <SelectWithChip
            label='countries'
            value={curDiscount.countries}
            selectOptions={countriesOptions}
            onChangeSelect={(e) => setCurDiscount({
              ...curDiscount,
              countries: e.target.value,
            })}
            onClickDelIcon={(chip) => {
              const newValue = [...curDiscount.countries].filter(
                (val) => val !== chip,
              );
              setCurDiscount({
                ...curDiscount,
                countries: newValue,
              });
            }}
          />
        </Box>
        <Box p={2}>
          <SelectWithChip
            label='stores'
            value={curDiscount.storeIds}
            selectOptions={selectOptions.stores}
            onChangeSelect={(e) => setCurDiscount({
              ...curDiscount,
              storeIds: e.target.value,
            })}
            onClickDelIcon={(chip) => {
              const newValue = [...curDiscount.storeIds].filter(
                (val) => val !== chip,
              );
              setCurDiscount({
                ...curDiscount,
                storeIds: newValue,
              });
            }}
          />
        </Box>
        <Box p={2}>
          <AutocompleteWithChips
            label='productNameOrId'
            arrayValue={curDiscount.productIds}
            selectOptions={selectOptions.discountProducts?.sort(sortByAlphabetical)}
            onChange={(newValue) => setCurDiscount({
              ...curDiscount,
              productIds: newValue,
            })}
          />
        </Box>
        <Box p={2}>
          <AutocompleteWithChips
            label='parentNameOrId'
            arrayValue={curDiscount.parentProductIds}
            selectOptions={selectOptions.parentProducts?.sort(sortByAlphabetical)}
            onChange={(newValue) => setCurDiscount({
              ...curDiscount,
              parentProductIds: newValue,
            })}
          />
        </Box>
        <Box p={2}>
          <AutocompleteWithChips
            label='productsByReference'
            arrayValue={curDiscount.publisherRefIds}
            selectOptions={selectOptions.refProducts}
            onChange={(newValue) => setCurDiscount({
              ...curDiscount,
              publisherRefIds: newValue,
            })}
          />
        </Box>
      </Grid>
    </>
  );
};

Eligibility.propTypes = {
  curDiscount: PropTypes.object,
  updateDiscount: PropTypes.func,
  setCurDiscount: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default Eligibility;
