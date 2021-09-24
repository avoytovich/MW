import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  LinearProgress,
  Tabs,
  Tab,
  Button,
  Zoom,
  Box,
  Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import General from './SubSections/General';
import Emails from './SubSections/Emails';
import Orders from './SubSections/Orders';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import localization from '../../localization';
import useEndUserDetailScreen from './useEndUserDetailScreen';
import parentPaths from '../../services/paths';

import api from '../../api';
import { removeEmptyPropsInObject } from '../../services/helpers/dataStructuring';
import SectionLayout from '../../components/SectionLayout';

const EndUserDetailScreen = ({ location }) => {
  const scope = location.pathname.split('/endusers/')[1].split('/')[0];
  const curParentPath = scope === 'enduserlist' ? parentPaths.endusers : parentPaths.resellers;
  const [curTab, setCurTab] = useState(0);
  const { id } = useParams();
  const {
    setUpdate,
    curEndUser,
    setCurEndUser,
    isLoading,
    hasChanges,
    endUser,
    selectOptions,
    orders,
    emails,
    invalidVatNumber,
    setInvalidVatNumber,
    consent,
  } = useEndUserDetailScreen(id);
  const handleSave = () => {
    const formattedData = removeEmptyPropsInObject(curEndUser);
    api.updateEndUser(id, formattedData).then(() => {
      toast(localization.t('general.updatesHaveBeenSaved'));
      setUpdate((u) => u + 1);
    });
  };

  if (isLoading) return <LinearProgress />;
  return (
    <>
      <Box mx={2}>
        <CustomBreadcrumbs
          url={curParentPath}
          section={scope === 'enduserlist' ? localization.t('labels.endUsers') : localization.t('labels.resellers')}
          id={endUser?.id}
        />
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        m={2}
        justifyContent='space-between'
      >
        <Box alignSelf='center'>
          <Typography data-test='notificationName' gutterBottom variant='h3'>
            {endUser?.fullName}
          </Typography>
        </Box>
        <Zoom in={hasChanges}>
          <Button
            disabled={curEndUser?.firstName === '' || curEndUser?.lastName === ''}
            id='save-notification-button'
            color='primary'
            size='large'
            type='submit'
            variant='contained'
            onClick={handleSave}
          >
            {localization.t('general.save')}
          </Button>
        </Zoom>
      </Box>
      <Box my={2} bgcolor='#fff'>
        <Tabs
          data-test='tabs'
          value={curTab}
          onChange={(e, newTab) => setCurTab(newTab)}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label={localization.t('labels.general')} />
          <Tab label={localization.t('labels.emails')} />
          <Tab label={localization.t('labels.orders')} />
        </Tabs>
      </Box>
      {
        curTab === 0 && curEndUser && (
          <SectionLayout label='general'>
            <General
              scope={scope}
              setInvalidVatNumber={setInvalidVatNumber}
              invalidVatNumber={invalidVatNumber}
              curEndUser={curEndUser}
              setCurEndUser={setCurEndUser}
              selectOptions={selectOptions}
              consent={consent}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 1 && curEndUser && (
          <SectionLayout label='emails'>
            <Emails
              emails={emails}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 2 && curEndUser && (
          <SectionLayout label='orders'>
            <Orders
              orders={orders}
            />
          </SectionLayout>
        )
      }

    </>
  );
};

EndUserDetailScreen.propTypes = {
  location: PropTypes.object,
};

export default EndUserDetailScreen;
