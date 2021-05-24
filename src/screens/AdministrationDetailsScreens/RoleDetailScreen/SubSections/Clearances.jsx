import React from 'react';
import {
  LinearProgress,
  Box,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../../localization';
import { SelectWithChip } from '../../../../components/Inputs';
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
          <SelectWithChip
            label='conditionsOfAvailability'
            value={curRole.availabilityConditions}
            selectOptions={selectOptions.conditionsOfAvailability}
            onChangeSelect={(e) => setCurRole({
              ...curRole,
              availabilityConditions: e.target.value,
            })}
            onClickDelIcon={(chip) => {
              const newValue = [...curRole.availabilityConditions].filter(
                (val) => val !== chip,
              );
              setCurRole({
                ...curRole,
                availabilityConditions: newValue,
              });
            }}
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
