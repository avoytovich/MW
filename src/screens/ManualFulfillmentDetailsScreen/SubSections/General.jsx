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
import { InputCustom, NumberInput, SelectWithChip } from '../../../components/Inputs';

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
        <SelectWithChip
          isRequired
          label='products'
          value={curFulfillment.nexwayProductId}
          selectOptions={selectOptions.products}
          onChangeSelect={(e) => setCurFulfillment({
            ...curFulfillment,
            nexwayProductId: e.target.value,
          })}
          onClickDelIcon={(chip) => {
            const newValue = [...curFulfillment.nexwayProductId].filter(
              (val) => val !== chip,
            );
            setCurFulfillment({
              ...curFulfillment,
              nexwayProductId: newValue,
            });
          }}
        />
      </Box>
      <Box p={2}>
        <SelectWithChip
          label='productByReference'
          value={curFulfillment.publisherProductId}
          selectOptions={selectOptions.productByReference}
          onChangeSelect={(e) => setCurFulfillment({
            ...curFulfillment,
            publisherProductId: e.target.value,
          })}
          onClickDelIcon={(chip) => {
            const newValue = [...curFulfillment.publisherProductId].filter(
              (val) => val !== chip,
            );
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
