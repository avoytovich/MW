import React from 'react';
import { LinearProgress, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { SelectWithChip, InputCustom } from '../../../../components/Inputs';

const Clearances = ({ curMetaRole, setCurMetaRole, selectOptions }) => (
  curMetaRole === null
    ? <LinearProgress />
    : (
      <>
        <Box p={2}>
          <SelectWithChip
            data-test='aggregatedRoles'
            label='aggregatedRoles'
            value={curMetaRole.roleIds}
            selectOptions={selectOptions.roles}
            onChangeSelect={(e) => setCurMetaRole({
              ...curMetaRole,
              roleIds: e.target.value,
            })}
            onClickDelIcon={(chip) => {
              const newValue = [...curMetaRole.roleIds].filter(
                (val) => val !== chip,
              );
              setCurMetaRole({
                ...curMetaRole,
                roleIds: newValue,
              });
            }}
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
