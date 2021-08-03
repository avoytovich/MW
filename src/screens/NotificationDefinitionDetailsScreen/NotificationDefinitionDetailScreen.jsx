import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
import EventMatching from './SubSections/EventMatching';
import Templating from './SubSections/Templating';

import SectionLayout from '../../components/SectionLayout';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import SelectCustomerNotification from '../../components/utils/SelectCustomerNotification';

import localization from '../../localization';
import api from '../../api';

const NotificationDefinitionDetailScreen = () => {
  const { id } = useParams();
  const history = useHistory();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const [curTab, setCurTab] = useState(0);
  const [isLoading, setLoading] = useState(0);
  const [curNotification, setCurNotification] = useState({});
  const [notification, setNotification] = useState({});
  const [update, setUpdate] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    const notificationData = id !== 'add'
      ? api.getNotificationDefinitionById(id)
      : Promise.resolve({
        data: {
          customerId: nxState.selectedCustomer.id,
        },
      });

    notificationData
      .then(({ data }) => {
        if (!isCancelled) {
          setNotification({ ...data });
          setCurNotification(JSON.parse(JSON.stringify(data)));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => { isCancelled = true; };
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curNotification) !== JSON.stringify(notification));

    return () => setHasChanges(false);
  }, [curNotification]);

  const doSave = () => {
    if (id === 'add') {
      api.addNotificationDefinition(curNotification).then((res) => {
        const location = res.headers.location.split('/');
        const newId = location[location.length - 1];
        toast(localization.t('general.updatesHaveBeenSaved'));

        history.push(`/settings/notification-definition/${newId}`);

        setUpdate((u) => u + 1);
      });
    } else {
      api.updateNotificationDefinitionById(id, curNotification).then(() => {
        toast(localization.t('general.updatesHaveBeenSaved'));

        setUpdate((u) => u + 1);
      });
    }
  };

  const isValid = () => {
    if (!curNotification || !curNotification.eventMatcher) return false;

    const {
      subject, fact, mainIdJsonPath, filters,
    } = curNotification.eventMatcher;

    const filtersValid = !filters || filters.filter((i) => (i.filterJsonPath === '' || i.filterRegex === '')).length <= 0;

    return curNotification.name && subject && fact && mainIdJsonPath && filtersValid;
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
            url='/settings/notifications'
            section={localization.t('general.notification')}
            id={id}
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
            id='save-notification-button'
            color='primary'
            size='large'
            type='submit'
            variant='contained'
            onClick={doSave}
            disabled={!isValid()}
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
          <Tab label={localization.t('labels.eventMatching')} />
          <Tab label={localization.t('labels.templating')} />
        </Tabs>
      </Box>
      {
        curTab === 0 && curNotification && (
          <SectionLayout label='general'>
            <General
              curNotification={curNotification}
              setCurNotification={setCurNotification}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 1 && curNotification && (
          <SectionLayout label='eventMatching'>
            <EventMatching
              data={curNotification?.eventMatcher}
              curNotification={curNotification}
              setCurNotification={setCurNotification}
            />
          </SectionLayout>
        )
      }
      {
        curTab === 2 && curNotification && (
          <SectionLayout label='templating'>
            <Templating
              curNotification={curNotification}
              setCurNotification={setCurNotification}
            />
          </SectionLayout>
        )
      }
    </>
  );
};

export default NotificationDefinitionDetailScreen;
