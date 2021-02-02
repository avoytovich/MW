import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
  FormControlLabel,
  Checkbox,
  Chip,
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import { email } from '../../services/helpers/inputValidators';
import CustomCard from '../../components/utils/CustomCard';
import localization from '../../localization';
import { SelectWithChip } from '../../components/Inputs';
import './discountDetailsScreen.scss';

const EligibilitySection = ({
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
}) => {
  const [emailsInput, changeEmailsInput] = useState('');
  const [errorMessages, setErrorMessages] = useState({ email: null });
  return (
    <CustomCard title="Eligibility">
      <Box display="flex" pb={3} pt={6}>
        {curStores === null ? (
          <Box width={1} m="10px" pt="8px">
            <CircularProgress />
          </Box>
        ) : (
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label="Stores"
              name="stores"
              type="text"
              value={curStores?.map((st) => st.name)}
              contentEditable={false}
              onClick={() => setStoresModalOpen(true)}
              variant="outlined"
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}

        {curProducts === null ? (
          <Box width={1} m="10px" pt="8px">
            <CircularProgress />
          </Box>
        ) : (
          <Box px={1} width=" 100%">
            <TextField
              fullWidth
              label="Products"
              name="catalogs"
              type="text"
              value={curProducts?.map((pr) => pr.name)}
              contentEditable={false}
              onClick={() => setProductsModalOpen(true)}
              variant="outlined"
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}
      </Box>
      <Box display="flex" py={3}>
        <Box px={1} width=" 100%">
          <TextField
            fullWidth
            label={localization.t('labels.productsByParent')}
            name="productsByParent"
            type="text"
            value={curProductsByParent?.map((pr) => pr.name) || []}
            contentEditable={false}
            onClick={() => setParentProductsModalOpen(true)}
            variant="outlined"
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EditIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <Box display="flex">
        <Box px={1} width=" 100%">
          <SelectWithChip
            label="countries"
            value={curDiscount.countries}
            selectOptions={selectOptions.countries}
            optionName={(item) => item?.id}
            onChangeSelect={(e) => setCurDiscount({
              ...curDiscount,
              countries: e.target.value,
            })}
            onClickDelIcon={(chip) => {
              const newValue = [...curDiscount.endUserGroupIds].filter(
                (val) => val !== chip,
              );
              setCurDiscount({
                ...curDiscount,
                countries: newValue,
              });
            }}
          />
        </Box>
      </Box>
      <Box display="flex">
        <Box px={1} width=" 100%">
          <SelectWithChip
            label="productsByReference"
            value={curDiscount.publisherRefIds}
            selectOptions={selectOptions.refProducts}
            optionName={(item) => item?.id}
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
      </Box>
      <Box display="flex" pt={3}>
        <Box px={1} width=" 100%">
          {curDiscount.endUserEmails?.map((chip) => (
            <Chip
              key={chip}
              variant="outlined"
              color="primary"
              onDelete={() => {
                const newValue = [...curDiscount.endUserEmails].filter(
                  (val) => val !== chip,
                );
                setCurDiscount({
                  ...curDiscount,
                  endUserEmails: newValue,
                });
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              label={chip}
            />
          ))}
        </Box>
      </Box>
      <Box display="flex" pb={3}>
        <Box px={1} width=" 100%">
          <TextField
            error={!!errorMessages.email}
            helperText={errorMessages.email}
            inputProps={{ autoComplete: 'off' }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                const validMail = email({ email: emailsInput });
                if (!validMail.email) {
                  setErrorMessages({ ...errorMessages, email: null });

                  const newValue = [...curDiscount.endUserEmails, emailsInput];
                  setCurDiscount({
                    ...curDiscount,
                    endUserEmails: newValue,
                  });
                  changeEmailsInput('');
                } else {
                  setErrorMessages({
                    ...errorMessages,
                    email: validMail.email,
                  });
                }
              }
            }}
            fullWidth
            label={localization.t('labels.endUserMails')}
            name="endUserMails"
            type="email"
            value={emailsInput}
            onChange={(e) => changeEmailsInput(e.target.value)}
            variant="outlined"
          />
        </Box>
      </Box>
      <Box display="flex" px={2} py={3}>
        <div>
          <Typography gutterBottom variant="h5">
            Source(s)
          </Typography>

          <Box display="flex" alignItems="center">
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
        </div>
      </Box>
      <Box display="flex" mx={2}>
        <div>
          <Typography gutterBottom variant="h5">
            End-user types
          </Typography>

          <Box display="flex" alignItems="center">
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
        </div>
      </Box>
    </CustomCard>
  );
};
EligibilitySection.propTypes = {
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
};
export default EligibilitySection;
