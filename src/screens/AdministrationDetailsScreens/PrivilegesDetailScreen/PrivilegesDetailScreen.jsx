import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, LinearProgress } from '@material-ui/core';
import CustomBreadcrumbs from '../../../components/utils/CustomBreadcrumbs';

import localization from '../../../localization';

import DateFormat from '../../../components/DateFormat';

import api from '../../../api';

const PrivilegesDetailScreen = () => {
  const { id } = useParams();

  const [privilegeData, setPrivilege] = useState(null);

  useEffect(() => {
    (async () => {
      const privilege = await api.getPrivilegeById(id);
      setPrivilege(privilege.data);
    })();
  }, []);

  if (privilegeData === null) return <LinearProgress />;

  return (
    <div>
      <Box mx={2} pb={3}>
        <CustomBreadcrumbs
          url='/settings/administration/privileges'
          section={localization.t('labels.privileges')}
          id={privilegeData?.id}
        />
      </Box>

      <Box mx={2} pb={3}>
        <Typography gutterBottom variant='h3'>
          {id !== 'add'
            ? privilegeData?.serviceName
            : `${localization.t('general.new')} ${localization.t(
              'labels.privilege',
            )}`}
        </Typography>
      </Box>

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
    </div>
  );
};

export default PrivilegesDetailScreen;
