import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Typography,
} from '@material-ui/core';

import { InputCustom, SelectWithChip } from '../../../components/Inputs';
import DateFormat from '../../../components/DateFormat';
import {
  privilegesValues,
} from './utils';

import localization from '../../../localization';

const PrivilegesDetailsView = ({
  curPrivilege, privilegeData, id, setCurPrivilege,
}) => (
  <>
    {id !== 'add' && (
      <Box my={3} bgcolor="#fff" boxShadow={2} p={4}>
        <Box display='flex' mb='30px'>
          <Typography variant="h4">{localization.t('general.privileges.general')}</Typography>
        </Box>

        <Box display='flex' mb='30px'>
          <Box display='flex' flexDirection="column" width='30%'>
            <Typography color="secondary">{localization.t('general.privileges.createdate')}</Typography>
            <Typography><DateFormat date={privilegeData.createDate} /></Typography>
          </Box>

          <Box display='flex' flexDirection="column" width='30%'>
            <Typography color="secondary">{localization.t('general.privileges.lastupdate')}</Typography>
            <Typography><DateFormat date={privilegeData.updateDate} /></Typography>
          </Box>

          <Box display='flex' flexDirection="column" width='30%'>
            <Typography color="secondary">{localization.t('general.privileges.lastupdatereason')}</Typography>
            <Typography>{privilegeData.lastUpdateReason}</Typography>
          </Box>
        </Box>

        <Box display='flex' flexDirection="column" mb='30px'>
          <Typography color="secondary">{localization.t('general.privileges.servicename')}</Typography>
          <Typography>{privilegeData.serviceName}</Typography>
        </Box>

        <Box display='flex' flexDirection="column" mb='30px'>
          <Typography color="secondary">{localization.t('general.privileges.availableactions')}</Typography>
          <Box>
            {privilegeData.availableActions.map((action) => (
              <Typography key={action} variant="body1">
                {action}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    )}
    {id === 'add' && (

      <Box my={3} bgcolor="#fff" boxShadow={2} p={4}>
        <Box p={2} width='60%'>
          <InputCustom
            data-test='name'
            label='serviceName'
            value={curPrivilege.serviceName}
            onChangeInput={(e) => setCurPrivilege({ ...curPrivilege, serviceName: e.target.value })}
            isRequired
          />
        </Box>

        <Box p={2} width='60%'>
          <SelectWithChip
            data-test='conditionsOfAvailability'
            label='availableActions'
            value={curPrivilege.availableActions}
            selectOptions={privilegesValues}

            onChangeSelect={(e) => setCurPrivilege({
              ...curPrivilege,
              availableActions: e.target.value,
            })}
            onClickDelIcon={(chip) => {
              const newValue = [...curPrivilege.availableActions].filter(
                (val) => val !== chip,
              );
              setCurPrivilege({
                ...curPrivilege,
                availableActions: newValue,
              });
            }}
          />
        </Box>
      </Box>
    )}
  </>
);

PrivilegesDetailsView.propTypes = {
  curPrivilege: PropTypes.object,
  privilegeData: PropTypes.object,
  id: PropTypes.string,
  setCurPrivilege: PropTypes.func,

};

export default PrivilegesDetailsView;
