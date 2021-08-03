import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, LinearProgress, Button,
} from '@material-ui/core';
import SelectCustomerNotification from '../../../components/utils/SelectCustomerNotification';
import CustomBreadcrumbs from '../../../components/utils/CustomBreadcrumbs';

import { InputCustom, SelectWithChip } from '../../../components/Inputs';
import DateFormat from '../../../components/DateFormat';
import {
  privilegesValues,
} from './utils';

import localization from '../../../localization';
import api from '../../../api';

const PrivilegesDetailScreen = () => {
  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const [curPrivilege, setCurPrivilege] = useState({ serviceName: null, availableActions: [] });

  const [privilegeData, setPrivilege] = useState(null);

  useEffect(() => {
    if (id === 'add') {
      Promise.resolve({
        data: { customerId: nxState?.selectedCustomer?.id },
      });
      setPrivilege(true);
    } else {
      (async () => {
        const getPrivilegeById = await api.getPrivilegeById(id);
        setPrivilege(getPrivilegeById.data);
      })();
    }
  }, []);

  if (privilegeData === null) return <LinearProgress />;

  if (id === 'add' && !nxState.selectedCustomer.id) return <SelectCustomerNotification />;

  return (
    <div>
      {id !== 'add' && (
        <Box mx={2} pb={3}>
          <CustomBreadcrumbs
            url='/settings/administration/privileges'
            section={localization.t('labels.privileges')}
            id={privilegeData?.id}
          />
        </Box>
      )}

      <Box mx={2} pb={3}>
        <Typography gutterBottom variant='h3'>
          {id !== 'add'
            ? privilegeData?.serviceName
            : `${localization.t('general.new')} ${localization.t(
              'labels.privilege',
            )}`}
        </Typography>
      </Box>

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

        <Box p={2}>
          <Button
            disabled={!curPrivilege.serviceName || curPrivilege.availableActions.length === 0}
            id='save-privilege-button'
            color='primary'
            size='large'
            type='submit'
            variant='contained'
            onClick={() => console.log('need to add API with working POST method')}
          >
            {localization.t('general.save')}
          </Button>
        </Box>
      </Box>
      )}
    </div>
  );
};

export default PrivilegesDetailScreen;
