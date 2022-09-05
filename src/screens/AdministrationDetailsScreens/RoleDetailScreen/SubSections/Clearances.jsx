import React from 'react';
import {
  LinearProgress,
  Box,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import localization from '../../../../localization';
import { AutocompleteWithChips } from '../../../../components/Inputs';
import ClearancesInputs from './ClearancesInputs';

const Clearances = ({ curRole, setCurRole, selectOptions }) => (
  curRole === null
    ? <LinearProgress />
    : (
      <Box p={2}>
        <ClearancesInputs
          setCurRole={setCurRole}
          curRole={curRole}
          selectOptions={selectOptions}
        />
        <Box py={4}>
          <Typography gutterBottom variant="h4">
            {localization.t('labels.conditionsOfAvailability')}
          </Typography>
        </Box>
        <Box pt={2}>
          <AutocompleteWithChips
            data-test='conditionsOfAvailability'
            label='conditionsOfAvailability'
            arrayTypeValue
            arrayValue={curRole.availabilityConditions}
            selectOptions={selectOptions.conditionsOfAvailability || []}
            onChange={(newValue) => setCurRole({
              ...curRole,
              availabilityConditions: newValue,
            })}
          />
        </Box>
      </Box>
    )
);

Clearances.propTypes = {
  curRole: PropTypes.object,
  setCurRole: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default Clearances;
