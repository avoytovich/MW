import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Grid,
  FormControlLabel,
  Typography,
  Switch,
} from '@mui/material';
import localization from '../../../localization';
import { structureProdAutocompleteSelectOptions } from '../../../services/helpers/dataStructuring';

import { InputCustom, NumberInput, AutocompleteWithChips } from '../../../components/Inputs';
import { sortByAlphabetical } from '../../../services/helpers/utils';
import api from '../../../api';

const General = ({ setCurFulfillment, curFulfillment, selectOptions }) => (
  <Grid container>
    <Grid item md={12} sm={12}>
      <Box p={2}>
        <InputCustom
          label='name'
          value={curFulfillment.name}
          onChangeInput={(e) => setCurFulfillment({ ...curFulfillment, name: e.target.value })}
          isRequired
        />
      </Box>
      <Box display="flex" px={2} py={1} flexDirection="row" alignItems="baseline">
        <Box>
          <Typography variant='h5'>{localization.t('labels.status')}</Typography>
        </Box>
        <Box px={2}>
          <FormControlLabel
            data-test='status'
            control={(
              <Switch
                name="status"
                onChange={(e) => {
                  setCurFulfillment({
                    ...curFulfillment,
                    status: e.target.checked ? 'ENABLED' : 'DISABLED',
                  });
                }}
                color="primary"
                checked={curFulfillment.status === 'ENABLED'}
              />
            )}
            label={localization.t(
              `labels.${curFulfillment.status === 'ENABLED' ? 'enabled' : 'disabled'
              }`,
            )}
          />
        </Box>
      </Box>
      <Box p={2}>
        <AutocompleteWithChips
          arrayTypeValue
          label='productNameOrId'
          getAdditionalOptions={(searchValue) => Promise.allSettled([
            api.getProducts({ filters: `&customerId=${curFulfillment.publisherId}&status=ENABLED&id=${searchValue}` }),
            api.getProducts({ filters: `&customerId=${curFulfillment.publisherId}&status=ENABLED&genericName=*${searchValue}*` }),
          ])
            .then(([idSearch, nameSearch]) => {
              const res = idSearch.value?.data?.items?.length
                ? idSearch.value?.data?.items : nameSearch.value?.data?.items;
              return structureProdAutocompleteSelectOptions({ options: res, optionValue: 'genericName' });
            })}
          arrayValue={curFulfillment.nexwayProductId}
          selectOptions={selectOptions.products?.sort(sortByAlphabetical)}
          onChange={(newValue) => {
            setCurFulfillment({
              ...curFulfillment,
              nexwayProductId: newValue,
            });
          }}
        />
      </Box>
      <Box p={2}>
        <AutocompleteWithChips
          label='productByReference'
          arrayTypeValue
          getAdditionalOptions={(searchValue) => Promise.allSettled([
            api.getProducts({ filters: `&customerId=${curFulfillment.publisherId}&status=ENABLED&id=${searchValue}` }),
            api.getProducts({ filters: `&customerId=${curFulfillment.publisherId}&status=ENABLED&publisherRefId=*${searchValue}*` }),
          ])
            .then(([idSearch, refIdSearch]) => {
              const res = idSearch.value?.data?.items?.length
                ? idSearch.value?.data?.items : refIdSearch.value?.data?.items;
              return structureProdAutocompleteSelectOptions({ options: res, optionValue: 'publisherRefId', optionId: 'publisherRefId' });
            })}
          arrayValue={curFulfillment.publisherProductId}
          selectOptions={selectOptions.productByReference}
          onChange={(newValue) => {
            setCurFulfillment({
              ...curFulfillment,
              publisherProductId: newValue,
            });
          }}
        />
      </Box>
      <Box p={2}>
        <NumberInput
          label='threshold'
          value={curFulfillment.threshold}
          onChangeInput={(e) => setCurFulfillment({ ...curFulfillment, threshold: e.target.value })}
          minMAx={{ min: 0 }}
        />
      </Box>
    </Grid>
  </Grid>
);

General.propTypes = {
  curFulfillment: PropTypes.object,
  setCurFulfillment: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default General;
