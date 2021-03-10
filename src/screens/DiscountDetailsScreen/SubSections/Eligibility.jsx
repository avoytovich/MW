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
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { email } from '../../../services/helpers/inputValidators';

import countriesOptions from '../../../services/selectOptions/countries';
import EditKeyValueInputs from '../EditKeyValueInputs';
import localization from '../../../localization';
import { SelectWithChip, ModalChipInput } from '../../../components/Inputs';
import { priceCurrency } from '../../../services/selectOptions/selectOptions';

const Eligibility = ({
  curDiscount,
  curStores,
  curProducts,
  setStoresModalOpen,
  setProductsModalOpen,
  setParentProductsModalOpen,
  updateDiscount,
  setCurDiscount,
  curProductsByParent,
  selectOptions,
  curMinCartAmount,
  setCurMinCartAmount,
}) => {
  const [errorMessages, setErrorMessages] = useState({ email: null });

  return (
    <>
      <Grid item md={6} xs={12}>
        <Box pt={2} pl={2}>
          <Typography>{localization.t('labels.sources')}</Typography>
        </Box>
        <Box p={2}>
          <FormControlLabel
            control={(
              <Checkbox
                name="MANUAL_RENEWAL"
                color="primary"
                checked={curDiscount?.sources?.indexOf('MANUAL_RENEWAL') >= 0}
              />
            )}
            onChange={() => updateDiscount('sources', 'MANUAL_RENEWAL', 'empty')}
            label="Manual Renewal"
          />
          <FormControlLabel
            control={(
              <Checkbox
                name="PURCHASE"
                color="primary"
                checked={curDiscount?.sources?.indexOf('PURCHASE') >= 0}
              />
            )}
            onChange={() => updateDiscount('sources', 'PURCHASE', 'empty')}
            label="Purchase"
          />
        </Box>
        <Box pt={2} pl={2}>
          <Typography>{localization.t('labels.endUserTypes')}</Typography>
        </Box>
        <Box p={2}>
          <FormControlLabel
            control={(
              <Checkbox
                name="BUYER"
                color="primary"
                checked={curDiscount?.endUserTypes?.indexOf('BUYER') >= 0}
              />
            )}
            onChange={() => updateDiscount('endUserTypes', 'BUYER', 'empty')}
            label="Buyer"
          />
          <FormControlLabel
            control={(
              <Checkbox
                name="RESELLER"
                color="primary"
                checked={curDiscount?.endUserTypes?.indexOf('RESELLER') >= 0}
              />
            )}
            onChange={() => updateDiscount('endUserTypes', 'RESELLER', 'empty')}
            label="Approved reseller"
          />
        </Box>
      </Grid>
      <Grid item md={6} sm={12}>
        <Box p={2}>
          <Typography>{localization.t('labels.minimumCartAmount')}</Typography>
        </Box>
        <EditKeyValueInputs
          curValue={curMinCartAmount}
          setCurValue={setCurMinCartAmount}
          selectOptions={priceCurrency}
          labels={['currency', 'amount']}
        />
        <Box p={2}>
          <SelectWithChip
            label="countries"
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
      </Grid>
      <Grid item md={6} sm={12}>
        <Box p={2}>
          <ModalChipInput
            label="stores"
            value={curStores || []}
            handleOnClick={() => setStoresModalOpen(true)}
          />
        </Box>
        <Box p={2}>
          <ModalChipInput
            label="products"
            value={curProducts || []}
            handleOnClick={() => setProductsModalOpen(true)}
          />
        </Box>
        <Box p={2}>
          <ModalChipInput
            label="productsByParent"
            value={curProductsByParent || []}
            handleOnClick={() => setParentProductsModalOpen(true)}
          />
        </Box>
      </Grid>
      <Grid item md={6} sm={12}>
        <Box p={2}>
          <SelectWithChip
            label="productsByReference"
            value={curDiscount.publisherRefIds}
            selectOptions={selectOptions.refProducts}
            onChangeSelect={(e) => setCurDiscount({
              ...curDiscount,
              publisherRefIds: e.target.value,
            })}
            onClickDelIcon={(chip) => {
              const newValue = [...curDiscount.publisherRefIds].filter(
                (val) => val !== chip,
              );
              setCurDiscount({
                ...curDiscount,
                publisherRefIds: newValue,
              });
            }}
          />
        </Box>
        <Box p={2}>
          <SelectWithChip
            label="endUserGroups"
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
            id="tags-filled"
            options={[]}
            freeSolo
            renderTags={(value, getTagProps) => value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))}
            renderInput={(params) => (
              <TextField
                error={!!errorMessages.email}
                helperText={errorMessages.email}
                variant="outlined"
                {...params}
                label={localization.t('labels.endUserMails')}
              />
            )}
          />
        </Box>
      </Grid>
    </>
  );
};

Eligibility.propTypes = {
  curDiscount: PropTypes.object,
  curStores: PropTypes.array,
  curProducts: PropTypes.array,
  setStoresModalOpen: PropTypes.func,
  setParentProductsModalOpen: PropTypes.func,
  setProductsModalOpen: PropTypes.func,
  curProductsByParent: PropTypes.array,
  updateDiscount: PropTypes.func,
  setCurDiscount: PropTypes.func,
  selectOptions: PropTypes.object,
  curMinCartAmount: PropTypes.array,
  setCurMinCartAmount: PropTypes.func,
};

export default Eligibility;