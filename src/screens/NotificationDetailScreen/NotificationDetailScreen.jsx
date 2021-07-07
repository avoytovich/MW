import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  LinearProgress,
  Tabs,
  Tab,
  Button,
  Zoom,
  Box,
  Typography,
} from '@material-ui/core';
import General from './SubSections/General';
import HttpHeaders from './SubSections/HttpHeaders';
import OAuthConfiguration from './SubSections/OAuthConfiguration';
import TLSconfiguration from './SubSections/TLSconfiguration';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import SelectCustomerNotification from '../../components/utils/SelectCustomerNotification';
import localization from '../../localization';
import { useNotificationDetail } from '../../services/useData';
import { urlIsValid } from '../../services/helpers/inputValidators';
import { removeEmptyPropsInObject } from '../../services/helpers/dataStructuring';
import { showNotification } from '../../redux/actions/HttpNotifications';
import api from '../../api';
import SectionLayout from '../../components/SectionLayout';

const NotificationDetailScreen = () => {
  const dispatch = useDispatch();
  const [curTab, setCurTab] = useState(0);
  const { id } = useParams();
  const history = useHistory();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const {
    setUpdate,
    curNotification,
    setCurNotification,
    isLoading,
    selectOptions,
    hasChanges,
    notification,
  } = useNotificationDetail(id, nxState);

  const handleSave = () => {
    const formattedNotification = removeEmptyPropsInObject(curNotification);
    if (id === 'add') {
      api.addNotification(formattedNotification).then((res) => {
        const location = res.headers.location.split('/');
        const identityId = location[location.length - 1];
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        history.push(`/resource/notificationReceivers/${identityId}`);
        setUpdate((u) => u + 1);
      });
    } else {
      api.updateNotificationById(id, formattedNotification).then(() => {
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        setUpdate((u) => u + 1);
      });
    }
  };

  if (isLoading) return <LinearProgress />;

  if (id === 'add' && !nxState.selectedCustomer.id) {
    return <SelectCustomerNotification />;
  }

  return (
    <>
      {id !== 'add' && (
        <Box mx={2}>
          <CustomBreadcrumbs
            url='/resource/notificationReceivers'
            section={localization.t('general.notification')}
            id={notification.id}
          />
        </Box>
      )}
      <Box
        display='flex'
        flexDirection='row'
        m={2}
        justifyContent='space-between'
      >
        <Box alignSelf='center'>
          <Typography data-test='notificationName' gutterBottom variant='h3'>
            {id !== 'add'
              ? notification.name
              : `${localization.t('general.new')} ${localization.t(
                'general.notification',
              )}`}
          </Typography>
        </Box>
        <Zoom in={hasChanges}>
          <Button
            disabled={!curNotification.name || (curNotification.receiverType === 'email' && curNotification.emails.length < 1) || (curNotification.receiverType === 'webhook' && !urlIsValid(curNotification.url))}
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
          <Tab label='General' />
          <Tab label='HTTP Headers' disabled={curNotification.receiverType === 'email'} />
          <Tab label='OAuth 2.0 configuration' disabled={curNotification.receiverType === 'email'} />
          <Tab label='TLS configuration' disabled={curNotification.receiverType === 'email'} />
        </Tabs>
      </Box>
      {
        curTab === 0 && curNotification && (
          <SectionLayout label='general'>
            <General
              selectOptions={selectOptions}
              curNotification={curNotification}
              setCurNotification={setCurNotification}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 1 && curNotification && (
          <SectionLayout label='httpHeaders'>
            <HttpHeaders
              curNotification={curNotification}
              setCurNotification={setCurNotification}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 2 && curNotification && (
          <SectionLayout label='oAuthConfiguration'>
            <OAuthConfiguration
              curNotification={curNotification}
              setCurNotification={setCurNotification}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 3 && curNotification && (
          <SectionLayout label='tlsConfiguration'>
            <TLSconfiguration
              curNotification={curNotification}
              setCurNotification={setCurNotification}
            />
          </SectionLayout>
        )
      }

    </>
  );
};

export default NotificationDetailScreen;
