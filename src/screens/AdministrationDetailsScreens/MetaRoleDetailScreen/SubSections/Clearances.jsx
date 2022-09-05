import React from 'react';
import { LinearProgress, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { InputCustom, AutocompleteWithChips } from '../../../../components/Inputs';

const Clearances = ({ curMetaRole, setCurMetaRole, selectOptions }) => (
  curMetaRole === null
    ? <LinearProgress />
    : (
      <>
        <Box p={2}>
          <AutocompleteWithChips
            data-test='aggregatedRoles'
            label='aggregatedRoles'
            arrayTypeValue
            arrayValue={curMetaRole.roleIds}
            selectOptions={selectOptions.roles}
            onChange={(newValue) => setCurMetaRole({
              ...curMetaRole,
              roleIds: newValue,
            })}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            data-test='description'
            label='description'
            isMultiline
            rowsMax={3}
            value={curMetaRole.description || ''}
            onChangeInput={(e) => {
              setCurMetaRole({
                ...curMetaRole,
                description: e.target.value,
              });
            }}
          />
        </Box>
      </>
    )
);

Clearances.propTypes = {
  curMetaRole: PropTypes.object,
  setCurMetaRole: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default Clearances;
