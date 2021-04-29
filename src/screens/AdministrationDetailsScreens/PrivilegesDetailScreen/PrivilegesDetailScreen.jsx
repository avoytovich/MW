import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, LinearProgress } from '@material-ui/core';

import DateFormat from './../../../components/DateFormat';

import api from '../../../api';

const MetaRoleDetailScreen = () => {
  const { id } = useParams();

  const [privilegeData, setPrivilege] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    const requests = async () => {
      try {
        const privilege = await api.getPrivilegeById(id);
        setPrivilege(privilege.data)

      } catch (error) {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };
    requests();
  }, []);

  if (privilegeData === null) return <LinearProgress />;

  return (
    <div>
      <Box display='flex' mb='30px'>
        <Typography variant="h4">General</Typography>
      </Box>

      <Box display='flex' mb='30px'>
        <Box display='flex' flexDirection="column" width='30%'>
          <Typography color="secondary">Create date</Typography>
          <Typography><DateFormat date={privilegeData.createDate}/></Typography>
        </Box>

        <Box display='flex' flexDirection="column" width='30%'>
          <Typography color="secondary">Last update</Typography>
          <Typography><DateFormat date={privilegeData.updateDate}/></Typography>
        </Box>

        <Box display='flex' flexDirection="column" width='30%'>
          <Typography color="secondary">Last update reason</Typography>
          <Typography>{privilegeData.lastUpdateReason}</Typography>
        </Box>
      </Box>

      <Box display='flex' flexDirection="column" mb='30px'>
        <Typography color="secondary">Service name</Typography>
        <Typography>{privilegeData.serviceName}</Typography>
      </Box>

      <Box display='flex' flexDirection="column" mb='30px'>
        <Typography color="secondary">Available Actions</Typography>
        <Box>
          {privilegeData.availableActions.map((action, i) => (
            <Typography key={i} variant="body1">
              {action}
            </Typography>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default MetaRoleDetailScreen;
